import { Prisma } from "@prisma/client";
import { Plus, Package } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import ProductActions from "@/components/admin/ProductActions";

export const dynamic = 'force-dynamic';

type ProductWithImages = Prisma.ProductGetPayload<{
    include: { images: true }
}>;

export default async function ProductsPage() {
    let products: ProductWithImages[] = [];
    try {
        products = await prisma.product.findMany({
            orderBy: { createdAt: 'desc' },
            include: { images: true }
        });
    } catch (e) {

        console.error("Failed to fetch products", e);
    }

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
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 border-b border-gray-200 font-semibold text-gray-700 uppercase tracking-wider text-xs">
                                <tr>
                                    <th className="px-6 py-4">Product</th>
                                    <th className="px-6 py-4">Length</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Date Added</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {products.map((product: any) => (
                                    <tr key={product.id} className={`hover:bg-gray-50 transition-colors group ${!product.inStock ? 'bg-gray-50/50' : ''}`}>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="h-12 w-12 rounded-lg bg-gray-100 border border-gray-200 overflow-hidden relative flex-shrink-0">
                                                    {product.images && product.images[0] ? (
                                                        <img
                                                            src={product.images[0].url}
                                                            alt={product.title}
                                                            className={`w-full h-full object-cover ${!product.inStock ? 'opacity-50' : ''}`}
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center">
                                                            <Package className="h-5 w-5 text-gray-400" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className={`font-medium text-gray-900 ${!product.inStock ? 'text-gray-500' : ''}`}>{product.title}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">{product.length || '-'}</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${product.inStock ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                                {product.inStock ? 'In Stock' : 'Unavailable'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-500">
                                            {new Date(product.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <ProductActions productId={product.id} initialInStock={product.inStock} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
