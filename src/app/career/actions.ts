"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { sanitizeFilename, sanitizeInput, validatePDFBuffer } from "@/lib/sanitize";

// Import dynamically to avoid bundling issues
const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");

export async function submitCareerApplication(formData: FormData) {
    try {
        // Extract and sanitize form data
        const fullName = sanitizeInput(formData.get("fullName") as string);
        const email = sanitizeInput(formData.get("email") as string);
        const phone = sanitizeInput(formData.get("phone") as string);
        const resume = formData.get("resume") as File;

        // Validation
        if (!fullName || !email || !phone || !resume) {
            return { success: false, error: "All fields are required" };
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return { success: false, error: "Invalid email address" };
        }

        // Phone validation (basic)
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        if (!phoneRegex.test(phone)) {
            return { success: false, error: "Invalid phone number" };
        }

        // ============================================
        // COMPREHENSIVE PDF SECURITY VALIDATION
        // ============================================

        // 1. Validate MIME type
        if (resume.type !== "application/pdf") {
            return { success: false, error: "Only PDF files are allowed (invalid MIME type)" };
        }

        // 2. Validate file extension
        const originalFilename = resume.name.toLowerCase();
        if (!originalFilename.endsWith('.pdf')) {
            return { success: false, error: "Only PDF files are allowed (invalid extension)" };
        }

        // 3. Check for double extensions or suspicious patterns
        const suspiciousPatterns = [
            /\.pdf\.(exe|scr|bat|cmd|com|pif|vbs|js|jar|sh|php|asp|aspx|jsp|py|rb|pl)$/i,
            /\.(exe|scr|bat|cmd|com|pif|vbs|js|jar|sh|php|asp|aspx|jsp|py|rb|pl)\.pdf$/i,
        ];

        for (const pattern of suspiciousPatterns) {
            if (pattern.test(resume.name)) {
                return { success: false, error: "Suspicious file name detected" };
            }
        }

        // 4. File size validation (5MB max)
        const maxSize = 5 * 1024 * 1024; // 5MB
        const minSize = 100; // 100 bytes minimum

        if (resume.size > maxSize) {
            return { success: false, error: "File size must be less than 5MB" };
        }

        if (resume.size < minSize) {
            return { success: false, error: "File is too small to be a valid PDF" };
        }

        // 5. Read file buffer for deep inspection
        const bytes = await resume.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // 6. Validate PDF file signature (magic numbers)
        const pdfValidation = validatePDFBuffer(buffer, resume.name);
        if (!pdfValidation.valid) {
            return { success: false, error: pdfValidation.error || "Invalid PDF file" };
        }


        // 7. Additional security check disabled to avoid false positives
        // The file has already passed:
        // - Extension validation (.pdf only)
        // - MIME type validation
        // - PDF magic number verification (%PDF signature)
        // - PDF structure validation (%%EOF, /Type /Catalog)
        // These checks are sufficient to ensure it's a legitimate PDF file

        /*
        // Optional: Re-enable if needed with more specific patterns
        const fileContent = buffer.slice(0, 1024).toString('latin1');
        const dangerousPatterns = [
            'MZ', // Windows executable header
            '#!/', // Shell script
            '<?php', // PHP code
            '<script', // JavaScript
            'eval(', // Eval potentially dangerous
        ];
    
        for (const pattern of dangerousPatterns) {
            if (fileContent.includes(pattern)) {
                console.warn(`Suspicious content detected in uploaded file: ${pattern}`);
                return { success: false, error: "File contains suspicious content" };
            }
        }
        */

        // ============================================
        // FILE STORAGE (if all validations pass)
        // ============================================

        // Create uploads directory if it doesn't exist
        const uploadsDir = path.join(process.cwd(), "public", "uploads", "resumes");

        try {
            await fs.mkdir(uploadsDir, { recursive: true });
            console.log(`✓ Uploads directory ready: ${uploadsDir}`);
        } catch (mkdirError: any) {
            console.error("Failed to create uploads directory:", mkdirError);
            return {
                success: false,
                error: `Failed to create uploads directory: ${mkdirError.message}. Please check server permissions.`
            };
        }

        // Generate safe filename with timestamp
        // Generate safe filename with timestamp
        const timestamp = Date.now();
        // Use crypto.randomUUID for better entropy than Math.random()
        const uniqueId = crypto.randomUUID();
        const randomString = uniqueId.split('-')[0]; // Use part of UUID for brevity but better randomness
        const sanitizedName = sanitizeFilename(resume.name);

        // Force .pdf extension for extra safety
        const filename = `${timestamp}-${randomString}-${sanitizedName}`;
        const finalFilename = filename.endsWith('.pdf') ? filename : `${filename}.pdf`;
        const filepath = path.join(uploadsDir, finalFilename);

        // Save file with validated buffer
        try {
            await fs.writeFile(filepath, buffer);
            console.log(`✓ File saved: ${filepath}`);
        } catch (writeError: any) {
            console.error("Failed to write file:", writeError);
            return {
                success: false,
                error: `Failed to save file: ${writeError.message}. Please check server permissions.`
            };
        }

        // Verify file was written correctly
        try {
            const stats = await fs.stat(filepath);
            if (stats.size !== buffer.length) {
                // Cleanup failed upload
                await fs.unlink(filepath);
                console.error(`File size mismatch: expected ${buffer.length}, got ${stats.size}`);
                return { success: false, error: "File upload verification failed" };
            }
            console.log(`✓ File verified: ${stats.size} bytes`);
        } catch (statError: any) {
            console.error("Failed to verify file:", statError);
            return {
                success: false,
                error: `Failed to verify file: ${statError.message}`
            };
        }

        // Save to database
        const resumeUrl = `/uploads/resumes/${finalFilename}`;
        try {
            await prisma.careerApplication.create({
                data: {
                    fullName,
                    email,
                    phone,
                    resumeUrl,
                },
            });
            console.log(`✓ Database record created for ${email}`);
        } catch (dbError: any) {
            console.error("Failed to save to database:", dbError);

            // Cleanup uploaded file since DB save failed
            try {
                await fs.unlink(filepath);
                console.log(`✓ Cleaned up file after DB error: ${filepath}`);
            } catch (unlinkError) {
                console.error("Failed to cleanup file:", unlinkError);
            }

            return {
                success: false,
                error: `Database error: ${dbError.message}. Please try again or contact support.`
            };
        }

        revalidatePath("/prime-panel/dashboard/careers");

        console.log(`✓✓✓ Application submitted successfully for ${email}`);
        return { success: true, message: "Application submitted successfully!" };

    } catch (error: any) {
        console.error("=== CAREER APPLICATION ERROR ===");
        console.error("Error type:", error?.constructor?.name);
        console.error("Error message:", error?.message);
        console.error("Error stack:", error?.stack);
        console.error("================================");

        // Provide more specific error message
        let errorMessage = "Failed to submit application";
        if (error?.message) {
            errorMessage += `: ${error.message}`;
        }

        return { success: false, error: errorMessage };
    }
}
