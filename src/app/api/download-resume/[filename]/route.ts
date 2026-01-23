import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";

export async function GET(request: NextRequest) {
    try {
        // Get the filename from the URL
        const url = new URL(request.url);
        const pathname = url.pathname;

        // Extract filename from path like /api/download-resume/filename.pdf
        const filename = pathname.split('/').pop();

        if (!filename || !filename.endsWith('.pdf')) {
            return NextResponse.json(
                { error: "Invalid file" },
                { status: 400 }
            );
        }

        // Construct the file path
        const filePath = join(process.cwd(), "public", "uploads", "resumes", filename);

        // Read the file
        const fileBuffer = await readFile(filePath);

        // Return the PDF with proper headers
        return new NextResponse(fileBuffer, {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `inline; filename="${filename}"`,
                'Cache-Control': 'private, max-age=0',
            },
        });
    } catch (error: any) {
        console.error("Error serving PDF:", error);

        if (error.code === 'ENOENT') {
            return NextResponse.json(
                { error: "File not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { error: "Failed to load file" },
            { status: 500 }
        );
    }
}
