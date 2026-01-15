"use client";

import { createProduct } from "@/actions/product.actions";
import { ArrowLeft, Save, Upload, Info, X } from "lucide-react";
import Link from "next/link";
import { useFormStatus } from "react-dom";
import { useState } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

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
            {pending ? "Saving Product..." : "Save Product"}
        </button>
    );
}

export default function CreateProductPage() {
    const [previews, setPreviews] = useState<string[]>([]);
    const [selectedMainIndex, setSelectedMainIndex] = useState(0);
    const [showErrorDialog, setShowErrorDialog] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            // Check if any file is not an image
            const invalidFile = Array.from(files).find(file => !file.type.startsWith('image/'));
            if (invalidFile) {
                setErrorMessage(`File "${invalidFile.name}" is not a valid image. Please upload only image files.`);
                setShowErrorDialog(true);
                // Reset input
                e.target.value = "";
                setPreviews([]);
                return;
            }

            // Create object URLs for preview
            const newPreviews = Array.from(files).map((file) => URL.createObjectURL(file));
            setPreviews(newPreviews);
            setSelectedMainIndex(0); // Reset main selection to first image by default
        }
    };

    const handleSubmitClick = (e: React.MouseEvent) => {
        if (previews.length === 0) {
            e.preventDefault();
            setErrorMessage("Please upload at least one product image before saving.");
            setShowErrorDialog(true);
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
                    <h1 className="text-2xl font-bold text-gray-900">Create New Product</h1>
                    <p className="text-gray-500">Add a new container to your inventory</p>
                </div>
            </div>

            <form action={createProduct} className="space-y-8">
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
                                    placeholder="e.g. 20ft Standard Dry Container"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-4 focus:ring-[#2c2c9c]/10 focus:border-[#2c2c9c] outline-none transition-all"
                                />
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
                                placeholder="Detailed description of the container, including features, condition, and suitable uses..."
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
                            <p className="text-sm text-gray-500 mt-1">Add real photos of the product</p>
                        </div>
                        <Upload className="h-5 w-5 text-gray-400" />
                    </div>

                    <div className="p-8 space-y-6">
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 flex items-start gap-4">
                            <div className="p-2 bg-blue-100 rounded-full text-blue-600 shrink-0">
                                <Info className="h-5 w-5" />
                            </div>
                            <div className="text-blue-900 text-sm leading-relaxed">
                                <p className="font-medium mb-1">Image Upload</p>
                                <p>You can select multiple images at once. These images will be securely stored on the server.</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label htmlFor="images" className="block text-sm font-semibold text-gray-700">Select Images</label>

                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-10 text-center hover:bg-gray-50 hover:border-[#2c2c9c]/50 transition-all relative group cursor-pointer bg-gray-50/30">
                                <input
                                    type="file"
                                    name="images"
                                    id="images"
                                    multiple
                                    // Remove 'required' here to handle validation manually with dialog
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                />
                                <div className="flex flex-col items-center justify-center gap-3 pointer-events-none group-hover:scale-105 transition-transform duration-300">
                                    <div className="p-4 bg-white shadow-sm ring-1 ring-gray-200 rounded-full text-[#2c2c9c]">
                                        <Upload className="h-8 w-8" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="font-semibold text-gray-900">Click to upload or drag and drop</p>
                                        <p className="text-sm text-gray-500">SVG, PNG, JPG or GIF (max. 10MB)</p>
                                    </div>
                                </div>
                            </div>

                            {/* Previews */}
                            {previews.length > 0 && (
                                <div className="mt-6">
                                    <h3 className="text-sm font-medium text-gray-700 mb-3 block">
                                        Selected Images ({previews.length})
                                        <span className="text-xs font-normal text-gray-500 ml-2">(Click an image to set as Main Image)</span>
                                    </h3>
                                    <input type="hidden" name="mainImageIndex" value={selectedMainIndex} />
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                        {previews.map((src, idx) => (
                                            <div
                                                key={idx}
                                                onClick={() => setSelectedMainIndex(idx)}
                                                className={`relative aspect-square rounded-lg overflow-hidden border shadow-sm group cursor-pointer transition-all ${selectedMainIndex === idx
                                                    ? "ring-4 ring-[#2c2c9c] ring-offset-2 border-[#2c2c9c]"
                                                    : "border-gray-200 hover:border-[#2c2c9c]/50"
                                                    }`}
                                            >
                                                <img src={src} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />

                                                {/* Main Image Badge */}
                                                {selectedMainIndex === idx && (
                                                    <div className="absolute top-2 left-2 bg-[#2c2c9c] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm z-10">
                                                        MAIN
                                                    </div>
                                                )}

                                                {/* Hover Overlay */}
                                                <div className={`absolute inset-0 bg-black/50 transition-opacity flex items-center justify-center text-white text-xs font-medium ${selectedMainIndex === idx ? "opacity-0" : "opacity-0 group-hover:opacity-100"
                                                    }`}>
                                                    Set as Main
                                                </div>
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
                    <SubmitButton onClick={handleSubmitClick} />
                </div>
            </form>
        </div>
    );
}
