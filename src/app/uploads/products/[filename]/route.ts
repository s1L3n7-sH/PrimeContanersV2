
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import { readFile, stat } from "fs/promises";
import { existsSync } from "fs";

export async function GET(
    request: NextRequest,
    { params }: { params: { filename: string } }
) {
    const filename = params.filename;

    // Security check: prevent directory traversal
    if (!filename || filename.includes("..") || filename.includes("/") || filename.includes("\\")) {
        return new NextResponse("Invalid filename", { status: 400 });
    }

    // Define the absolute path to the file in the public directory
    const filePath = join(process.cwd(), "public", "uploads", "products", filename);

    try {
        // Check if file exists
        if (!existsSync(filePath)) {
            return new NextResponse("File not found", { status: 404 });
        }

        // Read file
        const fileBuffer = await readFile(filePath);

        // Determine content type
        let contentType = "application/octet-stream";
        const ext = filename.split('.').pop()?.toLowerCase();

        if (ext === "jpg" || ext === "jpeg") contentType = "image/jpeg";
        else if (ext === "png") contentType = "image/png";
        else if (ext === "webp") contentType = "image/webp";
        else if (ext === "gif") contentType = "image/gif";
        else if (ext === "svg") contentType = "image/svg+xml";

        // Return the file with caching headers
        return new NextResponse(fileBuffer, {
            headers: {
                "Content-Type": contentType,
                "Cache-Control": "public, max-age=31536000, immutable",
            },
        });
    } catch (error) {
        console.error("Error serving file:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
