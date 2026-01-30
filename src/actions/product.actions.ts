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

    console.log("--- Starting Create Product Action ---");
    console.log("Received FormData:", {
        title,
        description,
        length,
        categoryId,
        imagesCount: formData.getAll("images").length
    });

    // Basic validation
    if (!title || !description) {
        throw new Error("Title and Description are required");
    }

    const imageFiles = formData.getAll("images") as File[];

    // 1. Filter out empty file objects (files with 0 size or 'undefined' name)
    const validImageFiles = imageFiles.filter(file => file.size > 0 && file.name !== 'undefined');

    console.log("Valid images to process:", validImageFiles.length);

    // 2. Validate at least one image is present
    if (validImageFiles.length === 0) {
        console.error("No valid images found!");
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
        console.log(`Processing image: ${file.name} (${file.size} bytes)`);
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Create unique filename
        // Replace spaces and special chars to match web standards
        const safeName = file.name.replace(/[^a-zA-Z0-9.]/g, '-');
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const filename = `${uniqueSuffix}-${safeName}`;
        const filepath = join(uploadDir, filename);

        await writeFile(filepath, buffer);
        console.log(`File written to disk: ${filepath}`);
        imageUrls.push(`/uploads/products/${filename}`);
    }

    try {
        const newProduct = await prisma.product.create({
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
        console.log("Product created in DB with ID:", newProduct.id);
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
    const categoryId = formData.get("categoryId") ? Number(formData.get("categoryId")) : null;
    const deletedImageIdsJson = formData.get("deletedImageIds") as string;

    let deletedImageIds: number[] = [];
    try {
        if (deletedImageIdsJson) {
            deletedImageIds = JSON.parse(deletedImageIdsJson);
        }
    } catch (e) {
        console.error("Failed to parse deletedImageIds", e);
    }

    if (!title || !description) {
        throw new Error("Title and Description are required");
    }

    try {
        // 1. Handle Deleted Images
        if (deletedImageIds.length > 0) {
            // Fetch images to get URLs for deletion
            const imagesToDelete = await prisma.productImage.findMany({
                where: {
                    id: { in: deletedImageIds },
                    productId: id
                }
            });

            // Delete from FS
            for (const img of imagesToDelete) {
                if (img.url.startsWith("/uploads/")) {
                    const filePath = join(process.cwd(), "public", img.url);
                    try {
                        await unlink(filePath);
                    } catch (e) {
                        console.error(`Failed to delete file: ${filePath}`, e);
                    }
                }
            }

            // Delete from DB
            await prisma.productImage.deleteMany({
                where: {
                    id: { in: deletedImageIds },
                    productId: id
                }
            });
        }

        // 2. Handle New Image Uploads
        const imageFiles = formData.getAll("images") as File[];
        const validImageFiles = imageFiles.filter(file => file.size > 0 && file.name !== 'undefined');
        const newImageUrls: string[] = [];

        if (validImageFiles.length > 0) {
            const uploadDir = join(process.cwd(), "public/uploads/products");
            try {
                await mkdir(uploadDir, { recursive: true });
            } catch (e) {
                // Ignore if exists
            }

            for (const file of validImageFiles) {
                if (!file.type.startsWith("image/")) continue;

                const bytes = await file.arrayBuffer();
                const buffer = Buffer.from(bytes);
                const safeName = file.name.replace(/[^a-zA-Z0-9.]/g, '-');
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                const filename = `${uniqueSuffix}-${safeName}`;
                const filepath = join(uploadDir, filename);

                await writeFile(filepath, buffer);
                newImageUrls.push(`/uploads/products/${filename}`);
            }
        }

        // 3. Handle Reordering / Main Image Logic
        const mainImageId = formData.get("mainImageId") ? Number(formData.get("mainImageId")) : null;
        const newMainIndex = formData.get("newMainIndex") ? Number(formData.get("newMainIndex")) : null;

        // Fetch current images (after deletions)
        const currentImages = await prisma.productImage.findMany({
            where: { productId: id },
            orderBy: { id: 'asc' }
        });

        // 3a. Prepare list of all image URLs in desired order
        let orderedUrls: string[] = [];

        // Helper to find URL
        let mainImageUrl: string | null = null;
        const otherExistingUrls: string[] = [];

        // Distribute existing images
        for (const img of currentImages) {
            if (mainImageId && img.id === mainImageId) {
                mainImageUrl = img.url;
            } else {
                otherExistingUrls.push(img.url);
            }
        }

        // Distribute new images
        let mainNewImageUrl: string | null = null;
        const otherNewUrls: string[] = [];

        newImageUrls.forEach((url, idx) => {
            if (newMainIndex !== null && idx === newMainIndex) {
                mainNewImageUrl = url;
            } else {
                otherNewUrls.push(url);
            }
        });

        // Construct final list
        // Order: [Main Image] -> [Other Existing] -> [Other New]
        if (mainImageUrl) {
            orderedUrls.push(mainImageUrl);
        } else if (mainNewImageUrl) {
            orderedUrls.push(mainNewImageUrl);
        }

        // Add others
        orderedUrls = [...orderedUrls, ...otherExistingUrls, ...otherNewUrls];

        // 4. Update Product
        // We need to re-create images to ensure order (Main is first)
        // Transaction to ensure atomicity
        await prisma.$transaction(async (tx) => {
            // Delete all existing images links (not files)
            await tx.productImage.deleteMany({
                where: { productId: id }
            });

            // Update product details
            await tx.product.update({
                where: { id },
                data: {
                    title,
                    description,
                    length: length || null,
                    categoryId: categoryId,
                    // Re-insert images in order
                    images: {
                        create: orderedUrls.map(url => ({
                            url
                        }))
                    }
                },
            });
        });

    } catch (error) {
        console.error("Failed to update product:", error);
        throw new Error("Failed to update product");
    }

    revalidatePath("/prime-panel/dashboard/products");
    revalidatePath("/shop");
    revalidatePath(`/shop/product/${id}`);
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

export async function updateProductOrder(orderedProductIds: number[]) {
    try {
        // Update each product's displayOrder based on its position in the array
        await prisma.$transaction(
            orderedProductIds.map((id, index) =>
                prisma.product.update({
                    where: { id },
                    data: { displayOrder: index },
                })
            )
        );

        revalidatePath("/prime-panel/dashboard/products");
        revalidatePath("/shop");
        revalidatePath("/");

        return { success: true };
    } catch (error) {
        console.error("Failed to update product order:", error);
        throw new Error("Failed to update product order");
    }
}
