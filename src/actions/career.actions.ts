"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { sanitizeFilename, sanitizeInput } from "@/lib/sanitize";

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

        // File validation - only PDF
        if (resume.type !== "application/pdf") {
            return { success: false, error: "Only PDF files are allowed" };
        }

        // File size validation (5MB max)
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (resume.size > maxSize) {
            return { success: false, error: "File size must be less than 5MB" };
        }

        // Create uploads directory if it doesn't exist
        const uploadsDir = join(process.cwd(), "public", "uploads", "resumes");
        try {
            await mkdir(uploadsDir, { recursive: true });
        } catch (error) {
            // Directory might already exist
        }

        // Generate safe filename
        const timestamp = Date.now();
        const sanitizedOriginalName = sanitizeFilename(resume.name);
        const filename = `${timestamp}-${sanitizedOriginalName}`;
        const filepath = join(uploadsDir, filename);

        // Save file
        const bytes = await resume.arrayBuffer();
        const buffer = Buffer.from(bytes);
        await writeFile(filepath, buffer);

        // Save to database
        const resumeUrl = `/uploads/resumes/${filename}`;
        await prisma.careerApplication.create({
            data: {
                fullName,
                email,
                phone,
                resumeUrl,
            },
        });


        revalidatePath("/prime-panel/dashboard/careers");

        return { success: true, message: "Application submitted successfully!" };
    } catch (error) {
        console.error("Error submitting career application:", error);
        return { success: false, error: "Failed to submit application" };
    }
}
