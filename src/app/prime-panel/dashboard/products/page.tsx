import { Prisma } from "@prisma/client";
import { Plus, Package } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import DraggableProductsTable from "@/components/admin/DraggableProductsTable";

export const dynamic = 'force-dynamic';

type ProductWithImages = Prisma.ProductGetPayload<{
    include: { images: true }
}>;

export default async function ProductsPage() {
    let products: ProductWithImages[] = [];
    try {
        products = await prisma.product.findMany({
            orderBy: [
                { displayOrder: 'asc' },
                { createdAt: 'desc' }
            ],
            include: { images: true }
        });
    } catch (e) {

        console.error("Failed to fetch products", e);
    }

    // Map products to ensure displayOrder is included
    const productsWithDisplayOrder = products.map((p, index) => ({
        id: p.id,
        title: p.title,
        length: p.length,
        inStock: p.inStock,
        createdAt: p.createdAt,
        displayOrder: (p as any).displayOrder ?? index,
        images: p.images.map(img => ({ id: img.id, url: img.url }))
    }));

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Products</h1>
                    <p className="text-gray-500">Manage your container inventory</p>
                </div>
                <Link
                    href="/prime-panel/dashboard/products/create"
                    className="flex items-center gap-2 bg-[#2c2c9c] text-white px-4 py-2.5 rounded-lg hover:bg-[#1a1a7a] transition-colors shadow-sm"
                >
                    <Plus className="h-5 w-5" />
                    Add Product
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {products.length === 0 ? (
                    <div className="p-16 flex flex-col items-center justify-center text-center text-gray-500">
                        <div className="bg-gray-100 p-4 rounded-full mb-4">
                            <Package className="h-8 w-8 text-gray-400" />
                        </div>
                        <p className="text-lg font-medium text-gray-900 mb-1">No products yet</p>
                        <p className="text-sm max-w-sm mx-auto mb-6">Get started by creating your first product to display on your website.</p>
                        <Link
                            href="/prime-panel/dashboard/products/create"
                            className="text-[#2c2c9c] font-medium hover:underline underline-offset-4"
                        >
                            Create Product
                        </Link>
                    </div>
                ) : (
                    <DraggableProductsTable initialProducts={productsWithDisplayOrder} />
                )}
            </div>
        </div>
    );
}
