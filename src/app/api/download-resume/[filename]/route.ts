import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join, basename } from "path";
import { cookies } from "next/headers";
import { verifySession } from "@/lib/auth";

export async function GET(request: NextRequest) {
    try {
        // 1. Authentication Check
        const cookieStore = cookies();
        const sessionCookie = cookieStore.get("admin_session");

        if (!sessionCookie || !sessionCookie.value) {
            return NextResponse.json(
                { error: "Unauthorized access" },
                { status: 401 }
            );
        }

        const session = await verifySession(sessionCookie.value);
        if (!session || session.role !== 'ADMIN') {
            // If strictly admin-only. If staff can view, relax this. 
            // Ideally staff should browse via UI, but direct link is possible.
            // Given 'Assign Leads' feature, staff might need this. 
            // But usually staff shouldn't download all resumes unless authorized.
            // Safe default: only logged-in users.
            if (!session) {
                return NextResponse.json(
                    { error: "Invalid session" },
                    { status: 401 }
                );
            }
        }

        // Get the filename from the URL
        const url = new URL(request.url);
        const pathname = url.pathname;

        // Extract filename from path like /api/download-resume/filename.pdf
        const rawFilename = pathname.split('/').pop();

        if (!rawFilename) {
            return NextResponse.json(
                { error: "Invalid file request" },
                { status: 400 }
            );
        }

        // 2. Sanitize Filename (Prevent Path Traversal)
        // basename() strips directory paths (e.g., ../../secret.pdf -> secret.pdf)
        const filename = basename(rawFilename);

        // 3. Validate Extension
        if (!filename.toLowerCase().endsWith('.pdf')) {
            return NextResponse.json(
                { error: "Invalid file type" },
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
