import { updateProduct } from "@/actions/product.actions";
import { ArrowLeft, Save, Upload, Info } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { SubmitButton } from "@/components/admin/SubmitButton";

export default async function EditProductPage({ params }: { params: { id: string } }) {
    const id = parseInt(params.id);
    if (isNaN(id)) notFound();

    const product = await prisma.product.findUnique({
        where: { id },
    });

    if (!product) notFound();

    return (
        <div className="max-w-4xl mx-auto pb-12">
            <div className="flex items-center gap-4 mb-8">
                <Link
                    href="/prime-panel/dashboard/products"
                    className="p-2 bg-white border border-gray-200 shadow-sm hover:bg-gray-50 rounded-lg transition-colors text-gray-500 hover:text-gray-900"
                >
                    <ArrowLeft className="h-5 w-5" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Edit Product</h1>
                    <p className="text-gray-500">Update container details</p>
                </div>
            </div>

            <form action={updateProduct.bind(null, product.id)} className="space-y-8">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-6 border-b border-gray-200 bg-gray-50/50 flex items-start justify-between">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900">Product Information</h2>
                            <p className="text-sm text-gray-500 mt-1">Basic details about the container</p>
                        </div>
                        <Info className="h-5 w-5 text-gray-400" />
                    </div>

                    <div className="p-8 space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label htmlFor="title" className="block text-sm font-semibold text-gray-700">
                                    Product Title <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    required
                                    defaultValue={product.title}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-4 focus:ring-[#2c2c9c]/10 focus:border-[#2c2c9c] outline-none transition-all"
                                />
                            </div>

                            <div className="space-y-2">
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="length"
                                        id="length"
                                        defaultValue={product.length || ""}
                                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-4 focus:ring-[#2c2c9c]/10 focus:border-[#2c2c9c] outline-none transition-all"
                                    />
                                </div>
                                <label htmlFor="length" className="block text-sm font-semibold text-gray-700">
                                    Length
                                </label>

                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="description" className="block text-sm font-semibold text-gray-700">
                                Description <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                name="description"
                                id="description"
                                rows={6}
                                required
                                defaultValue={product.description}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-4 focus:ring-[#2c2c9c]/10 focus:border-[#2c2c9c] outline-none transition-all resize-y"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-end gap-4 pt-4">
                    <Link
                        href="/prime-panel/dashboard/products"
                        className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 hover:text-gray-900 transition-colors bg-white shadow-sm"
                    >
                        Cancel
                    </Link>
                    <SubmitButton text="Update Product" loadingText="Updating..." />
                </div>
            </form>
        </div>
    );
}
