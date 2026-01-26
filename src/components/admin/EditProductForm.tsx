"use client";

import { updateProduct } from "@/actions/product.actions";
import { ArrowLeft, Save, Upload, Info, X, Trash2 } from "lucide-react";
import Link from "next/link";
import { useFormStatus } from "react-dom";
import { useState } from "react";
import { Product, ProductImage } from "@prisma/client";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Image from "next/image";

type FullProduct = Product & { images: ProductImage[] };

function SubmitButton({ onClick }: { onClick: (e: React.MouseEvent) => void }) {
    const { pending } = useFormStatus();
    return (
        <button
            type="submit"
            onClick={onClick}
            disabled={pending}
            className="flex items-center gap-2 bg-[#2c2c9c] text-white px-6 py-2.5 rounded-lg hover:bg-[#1a1a7a] transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
        >
            <Save className="h-4 w-4" />
            {pending ? "Saving Changes..." : "Save Changes"}
        </button>
    );
}

export default function EditProductForm({ product, categories }: { product: FullProduct; categories: any[] }) {
    // Initial state setup
    // We assume product.images is sorted by ID or creation.
    // If we want to support "Main Image", and we use implicit order (first is main),
    // we need to know which one is INTENDED to be main.
    const [existingImages, setExistingImages] = useState<ProductImage[]>(product.images);
    const [deletedImageIds, setDeletedImageIds] = useState<number[]>([]);

    // Initialize mainImageId: if images exist, default to the first one (which is currently "Main").
    const [mainImageId, setMainImageId] = useState<number | null>(product.images.length > 0 ? product.images[0].id : null);

    // New uploads
    const [newPreviews, setNewPreviews] = useState<string[]>([]);
    // If the user selects a NEW image as main, we track its index here.
    const [selectedNewMainIndex, setSelectedNewMainIndex] = useState<number | null>(null);

    const [showErrorDialog, setShowErrorDialog] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const invalidFile = Array.from(files).find(file => !file.type.startsWith('image/'));
            if (invalidFile) {
                setErrorMessage(`File "${invalidFile.name}" is not a valid image. Please upload only image files.`);
                setShowErrorDialog(true);
                e.target.value = "";
                return;
            }

            const newUrls = Array.from(files).map((file) => URL.createObjectURL(file));
            setNewPreviews(prev => [...prev, ...newUrls]);
        }
    };

    const handleDeleteExisting = (imageId: number) => {
        setExistingImages(prev => {
            const newList = prev.filter(img => img.id !== imageId);
            // If we deleted the main image, set new main to the first available content
            if (mainImageId === imageId) {
                if (newList.length > 0) {
                    setMainImageId(newList[0].id);
                    setSelectedNewMainIndex(null);
                } else if (newPreviews.length > 0) {
                    setMainImageId(null);
                    setSelectedNewMainIndex(0);
                } else {
                    setMainImageId(null);
                    setSelectedNewMainIndex(null);
                }
            }
            return newList;
        });
        setDeletedImageIds(prev => [...prev, imageId]);
    };

    // Helper to handle main image selection
    const handleSetMainResult = (isExisting: boolean, idOrIndex: number) => {
        if (isExisting) {
            setMainImageId(idOrIndex);
            setSelectedNewMainIndex(null);
        } else {
            setMainImageId(null); // No existing ID selected
            setSelectedNewMainIndex(idOrIndex);
        }
    };

    return (
        <div className="max-w-4xl mx-auto pb-12">
            <AlertDialog open={showErrorDialog} onOpenChange={setShowErrorDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Validation Error</AlertDialogTitle>
                        <AlertDialogDescription>
                            {errorMessage}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction onClick={() => setShowErrorDialog(false)} className="bg-[#2c2c9c]">
                            Okay
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

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
                <input type="hidden" name="deletedImageIds" value={JSON.stringify(deletedImageIds)} />
                {/* Send Main Image Info */}
                <input type="hidden" name="mainImageId" value={mainImageId ? mainImageId.toString() : ""} />
                <input type="hidden" name="newMainIndex" value={selectedNewMainIndex !== null ? selectedNewMainIndex.toString() : ""} />

                {/* Product Details Section */}
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
                                <label htmlFor="categoryId" className="block text-sm font-semibold text-gray-700">
                                    Category
                                </label>
                                <div className="relative">
                                    <select
                                        name="categoryId"
                                        id="categoryId"
                                        defaultValue={product.categoryId || ""}
                                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-4 focus:ring-[#2c2c9c]/10 focus:border-[#2c2c9c] outline-none transition-all appearance-none bg-white"
                                    >
                                        <option value="">Select a category</option>
                                        {categories.map((cat) => (
                                            <option key={cat.id} value={cat.id}>
                                                {cat.name}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
                                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="length" className="block text-sm font-semibold text-gray-700">
                                    Length
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="length"
                                        id="length"
                                        defaultValue={product.length || ""}
                                        placeholder="e.g. 20ft"
                                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-4 focus:ring-[#2c2c9c]/10 focus:border-[#2c2c9c] outline-none transition-all"
                                    />
                                </div>
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

                {/* Images Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-6 border-b border-gray-200 bg-gray-50/50 flex items-start justify-between">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900">Product Images</h2>
                            <p className="text-sm text-gray-500 mt-1">Manage product photos</p>
                        </div>
                        <Upload className="h-5 w-5 text-gray-400" />
                    </div>

                    <div className="p-8 space-y-6">
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 flex items-start gap-4">
                            <div className="p-2 bg-blue-100 rounded-full text-blue-600 shrink-0">
                                <Info className="h-5 w-5" />
                            </div>
                            <div className="text-blue-900 text-sm leading-relaxed">
                                <p className="font-medium mb-1">Image Management</p>
                                <p>You can remove existing images or upload new ones. Click on an image to set it as <strong>Main</strong>.</p>
                            </div>
                        </div>

                        {/* Existing Images */}
                        {existingImages.length > 0 && (
                            <div className="space-y-3">
                                <h3 className="text-sm font-medium text-gray-700">Existing Images</h3>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                    {existingImages.map((img, idx) => (
                                        <div
                                            key={img.id}
                                            className={`relative aspect-square rounded-lg overflow-hidden border shadow-sm group cursor-pointer transition-all ${mainImageId === img.id ? "ring-4 ring-[#2c2c9c] ring-offset-2 border-[#2c2c9c]" : "border-gray-200 hover:border-[#2c2c9c]/50"
                                                }`}
                                            onClick={() => handleSetMainResult(true, img.id)}
                                        >
                                            <Image src={img.url} alt={`Existing ${idx}`} fill className="object-cover" />
                                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDeleteExisting(img.id);
                                                    }}
                                                    className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                            {/* Main Badge */}
                                            {mainImageId === img.id && (
                                                <div className="absolute top-2 left-2 bg-[#2c2c9c] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm z-10">
                                                    MAIN
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="space-y-4 pt-4 border-t border-gray-100">
                            <label htmlFor="images" className="block text-sm font-semibold text-gray-700">Add New Images</label>

                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-10 text-center hover:bg-gray-50 hover:border-[#2c2c9c]/50 transition-all relative group cursor-pointer bg-gray-50/30">
                                <input
                                    type="file"
                                    name="images"
                                    id="images"
                                    multiple
                                    accept="image/*, .webp"
                                    onChange={handleImageChange}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                />
                                <div className="flex flex-col items-center justify-center gap-3 pointer-events-none group-hover:scale-105 transition-transform duration-300">
                                    <div className="p-4 bg-white shadow-sm ring-1 ring-gray-200 rounded-full text-[#2c2c9c]">
                                        <Upload className="h-8 w-8" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="font-semibold text-gray-900">Click to upload or drag and drop</p>
                                        <p className="text-sm text-gray-500">SVG, PNG, JPG, GIF or WEBP (max. 10MB)</p>
                                    </div>
                                </div>
                            </div>

                            {/* New Previews */}
                            {newPreviews.length > 0 && (
                                <div className="mt-6">
                                    <h3 className="text-sm font-medium text-gray-700 mb-3">
                                        New Images to Upload ({newPreviews.length})
                                    </h3>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                        {newPreviews.map((src, idx) => (
                                            <div
                                                key={idx}
                                                className={`relative aspect-square rounded-lg overflow-hidden border shadow-sm group cursor-pointer transition-all ${selectedNewMainIndex === idx ? "ring-4 ring-[#2c2c9c] ring-offset-2 border-[#2c2c9c]" : "border-gray-200 hover:border-[#2c2c9c]/50"
                                                    }`}
                                                onClick={() => handleSetMainResult(false, idx)}
                                            >
                                                <img src={src} alt={`New Preview ${idx}`} className="w-full h-full object-cover" />
                                                {/* Main Badge */}
                                                {selectedNewMainIndex === idx ? (
                                                    <div className="absolute top-2 left-2 bg-[#2c2c9c] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm z-10">
                                                        MAIN
                                                    </div>
                                                ) : (
                                                    <div className="absolute top-2 right-2 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm z-10">
                                                        NEW
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
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
                    <SubmitButton onClick={() => { }} />
                </div>
            </form>
        </div>
    );
}

