/**
 * Comprehensive PDF file validation
 * Validates file extension, MIME type, and file signature (magic numbers)
 */
export async function validatePDFFile(file: File): Promise<{ valid: boolean; error?: string }> {
    // 1. Check file extension
    const fileName = file.name.toLowerCase();
    if (!fileName.endsWith('.pdf')) {
        return { valid: false, error: 'Only PDF files are allowed' };
    }

    // 2. Check MIME type
    if (file.type !== 'application/pdf') {
        return { valid: false, error: 'Invalid file type. Only PDF files are allowed' };
    }

    // 3. Verify PDF magic number (file signature)
    // PDF files start with %PDF- (hex: 25 50 44 46 2D)
    try {
        const arrayBuffer = await file.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);

        // Check if file starts with PDF signature
        const pdfSignature = [0x25, 0x50, 0x44, 0x46]; // %PDF

        if (uint8Array.length < 4) {
            return { valid: false, error: 'Invalid PDF file' };
        }

        for (let i = 0; i < pdfSignature.length; i++) {
            if (uint8Array[i] !== pdfSignature[i]) {
                return { valid: false, error: 'Invalid PDF file signature. File may be corrupted or not a real PDF' };
            }
        }

        return { valid: true };
    } catch (error) {
        return { valid: false, error: 'Failed to validate PDF file' };
    }
}

/**
 * Server-side PDF validation using buffer
 */
export function validatePDFBuffer(buffer: Buffer, filename: string): { valid: boolean; error?: string } {
    // 1. Check file extension
    const name = filename.toLowerCase();
    if (!name.endsWith('.pdf')) {
        return { valid: false, error: 'Only PDF files with .pdf extension are allowed' };
    }

    // 2. Reject dangerous extensions that might be hidden
    const dangerousExtensions = [
        '.exe', '.scr', '.bat', '.cmd', '.com', '.pif',
        '.vbs', '.js', '.jar', '.sh', '.php', '.asp',
        '.aspx', '.jsp', '.py', '.rb', '.pl', '.html', '.htm', '.phtml', '.shtml', '.shtm', '.php5', '.ini'
    ];

    for (const ext of dangerousExtensions) {
        if (name.includes(ext)) {
            return { valid: false, error: 'Suspicious file detected' };
        }
    }

    // 3. Verify PDF magic number (file signature)
    // PDF files must start with %PDF- (hex: 25 50 44 46 2D)
    const pdfSignature = Buffer.from([0x25, 0x50, 0x44, 0x46]); // %PDF

    if (buffer.length < 4) {
        return { valid: false, error: 'File is too small to be a valid PDF' };
    }

    const fileSignature = buffer.slice(0, 4);
    if (!fileSignature.equals(pdfSignature)) {
        return { valid: false, error: 'Invalid PDF file signature. This is not a valid PDF file' };
    }

    // 4. Additional check: PDF files should end with %%EOF or contain PDF structure
    const fileContent = buffer.toString('latin1');
    if (!fileContent.includes('%%EOF') && !fileContent.includes('/Type /Catalog')) {
        return { valid: false, error: 'Invalid PDF structure detected' };
    }

    return { valid: true };
}

/**
 * Sanitize user input to prevent XSS attacks
 * Removes HTML tags and dangerous characters
 */
export function sanitizeInput(input: string): string {
    if (!input) return "";

    // Remove HTML tags
    let sanitized = input.replace(/<[^>]*>/g, "");

    // Remove script tags and their content
    sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");

    // Remove dangerous characters
    sanitized = sanitized.replace(/[<>]/g, "");

    // Encode special characters
    sanitized = sanitized
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#x27;")
        .replace(/\//g, "&#x2F;");

    return sanitized.trim();
}

/**
 * Sanitize filename to prevent directory traversal and other attacks
 */
export function sanitizeFilename(filename: string): string {
    if (!filename) return "";

    // Remove path separators
    let sanitized = filename.replace(/[\/\\]/g, "");

    // Remove dangerous characters
    sanitized = sanitized.replace(/[^a-zA-Z0-9._-]/g, "_");

    // Ensure it ends with .pdf
    if (!sanitized.toLowerCase().endsWith('.pdf')) {
        sanitized = sanitized + '.pdf';
    }

    // Limit length (max 200 chars including extension)
    if (sanitized.length > 200) {
        sanitized = sanitized.substring(0, 196) + '.pdf';
    }

    return sanitized;
}

/**
 * Validate and sanitize email
 */
export function sanitizeEmail(email: string): string {
    if (!email) return "";

    // Remove whitespace
    let sanitized = email.trim().toLowerCase();

    // Remove dangerous characters
    sanitized = sanitized.replace(/[<>'"]/g, "");

    return sanitized;
}

/**
 * Validate and sanitize phone number
 */
export function sanitizePhone(phone: string): string {
    if (!phone) return "";

    // Keep only digits, spaces, hyphens, plus, and parentheses
    return phone.replace(/[^\d\s\-\+\(\)]/g, "").trim();
}
