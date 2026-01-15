"use client";

import { Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { deleteProduct, toggleProductStock } from "@/actions/product.actions";
import { useState } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ProductActionsProps {
    productId: number;
    initialInStock: boolean;
}

export default function ProductActions({ productId, initialInStock }: ProductActionsProps) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [inStock, setInStock] = useState(initialInStock);
    const [isToggling, setIsToggling] = useState(false);

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await deleteProduct(productId);
        } catch (error) {
            console.error("Failed to delete product", error);
        } finally {
            setIsDeleting(false);
        }
    };

    const handleToggleStock = async () => {
        const newState = !inStock;
        setIsToggling(true);
        // Optimistic update
        setInStock(newState);
        try {
            await toggleProductStock(productId, newState);
        } catch (error) {
            // Revert on failure
            setInStock(!newState);
            console.error("Failed to update stock status", error);
        } finally {
            setIsToggling(false);
        }
    };

    return (
        <div className="flex items-center justify-end gap-3">
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <button
                        className="text-gray-400 hover:text-blue-600 transition-colors p-1 disabled:opacity-50"
                        title={inStock ? "Disable Product (Mark Out of Stock)" : "Enable Product (Mark In Stock)"}
                        disabled={isToggling}
                    >
                        {inStock ? (
                            <Eye className="h-4 w-4" />
                        ) : (
                            <EyeOff className="h-4 w-4 text-gray-500" />
                        )}
                    </button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{inStock ? "Disable Product?" : "Enable Product?"}</AlertDialogTitle>
                        <AlertDialogDescription>
                            {inStock
                                ? "This will hide the product from the shop and homepage. Customers will not be able to view it."
                                : "The product will become visible on the shop and homepage immediately."
                            }
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleToggleStock} className="bg-[#2c2c9c] hover:bg-[#1a1a7a]">
                            {inStock ? "Disable" : "Enable"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <Link
                href={`/prime-panel/dashboard/products/${productId}`}
                className="text-gray-400 hover:text-[#2c2c9c] transition-colors p-1"
                title="Edit Product"
            >
                <Pencil className="h-4 w-4" />
            </Link>

            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <button
                        disabled={isDeleting}
                        className="text-gray-400 hover:text-red-600 transition-colors p-1 disabled:opacity-50"
                        title="Delete Product"
                    >
                        <Trash2 className="h-4 w-4" />
                    </button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the product and its associated images from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
