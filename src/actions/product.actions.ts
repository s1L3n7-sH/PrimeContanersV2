'use server';

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { writeFile, mkdir, unlink } from "fs/promises";
import { join } from "path";

export async function createProduct(formData: FormData) {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const length = formData.get("length") as string;
    const categoryId = formData.get("categoryId") ? Number(formData.get("categoryId")) : null;

    // Basic validation
    if (!title || !description) {
        throw new Error("Title and Description are required");
    }

    const imageFiles = formData.getAll("images") as File[];

    // 1. Filter out empty file objects (files with 0 size or 'undefined' name)
    const validImageFiles = imageFiles.filter(file => file.size > 0 && file.name !== 'undefined');

    // 2. Validate at least one image is present
    if (validImageFiles.length === 0) {
        throw new Error("At least one product image is required");
    }

    // Reorder files based on selected main image
    const mainIndex = Number(formData.get("mainImageIndex") || 0);
    if (mainIndex > 0 && mainIndex < validImageFiles.length) {
        const mainFile = validImageFiles[mainIndex];
        // Remove it from current position
        validImageFiles.splice(mainIndex, 1);
        // Add it to the front
        validImageFiles.unshift(mainFile);
    }

    // 3. Validate file types are images
    for (const file of validImageFiles) {
        if (!file.type.startsWith("image/")) {
            throw new Error(`File ${file.name} is not a valid image`);
        }
    }

    // 4. Proceed with upload
    const imageUrls: string[] = [];

    // Ensure directory exists
    const uploadDir = join(process.cwd(), "public/uploads/products");
    try {
        await mkdir(uploadDir, { recursive: true });
    } catch (e) {
        // Ignore if already exists
    }

    for (const file of validImageFiles) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Create unique filename
        // Replace spaces and special chars to match web standards
        const safeName = file.name.replace(/[^a-zA-Z0-9.]/g, '-');
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const filename = `${uniqueSuffix}-${safeName}`;
        const filepath = join(uploadDir, filename);

        await writeFile(filepath, buffer);
        imageUrls.push(`/uploads/products/${filename}`);
    }

    try {
        await prisma.product.create({
            data: {
                title,
                description,
                length: length || null,
                categoryId: categoryId,
                images: {
                    create: imageUrls.map(url => ({
                        url
                    }))
                }
            } as any,
        });
    } catch (error) {
        console.error("Failed to create product:", error);
        throw new Error("Failed to create product");
    }

    revalidatePath("/prime-panel/dashboard/products");
    redirect("/prime-panel/dashboard/products");
}

export async function deleteProduct(id: number) {
    try {
        // 1. Fetch the product to get image URLs
        const product = await prisma.product.findUnique({
            where: { id },
            include: { images: true }
        });

        if (!product) {
            throw new Error("Product not found");
        }

        // 2. Delete files from filesystem
        for (const image of product.images) {
            // Check if it's a local upload (starts with /uploads/)
            if (image.url.startsWith("/uploads/")) {
                const filePath = join(process.cwd(), "public", image.url);
                try {
                    await unlink(filePath);
                } catch (e) {
                    console.error(`Failed to delete file: ${filePath}`, e);
                    // Continue deletion even if one file fails
                }
            }
        }

        // 3. Delete from DB (Cascade will handle ProductImage records, but we do it cleanly)
        await prisma.product.delete({
            where: { id },
        });

        revalidatePath("/prime-panel/dashboard/products");
        revalidatePath("/shop"); // Also update the shop page
    } catch (error) {
        console.error("Failed to delete product:", error);
        throw new Error("Failed to delete product");
    }
}

export async function updateProduct(id: number, formData: FormData) {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const length = formData.get("length") as string;

    if (!title || !description) {
        throw new Error("Title and Description are required");
    }

    try {
        await prisma.product.update({
            where: { id },
            data: {
                title,
                description,
                length: length || null,
            },
        });
    } catch (error) {
        console.error("Failed to update product:", error);
        throw new Error("Failed to update product");
    }

    revalidatePath("/prime-panel/dashboard/products");
    revalidatePath("/shop"); // Update shop page
    redirect("/prime-panel/dashboard/products");
}

export async function toggleProductStock(id: number, inStock: boolean) {
    try {
        await prisma.product.update({
            where: { id },
            data: { inStock },
        });
        revalidatePath("/prime-panel/dashboard/products");
        revalidatePath("/shop");
    } catch (error) {
        console.error("Failed to toggle product stock:", error);
        throw new Error("Failed to toggle product stock");
    }
}
