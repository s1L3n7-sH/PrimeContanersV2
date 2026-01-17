"use client";

import { Pencil, Trash2, Power } from "lucide-react";
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
import { Button } from "@/components/ui/button";

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
        <div className="flex items-center justify-end gap-2">
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button
                        variant="outline"
                        size="sm"
                        className={`h-8 w-8 p-0 ${inStock ? 'text-red-600 hover:text-red-700 hover:bg-red-50' : 'text-green-600 hover:text-green-700 hover:bg-green-50'}`}
                        title={inStock ? "Disable Product (Mark Out of Stock)" : "Enable Product (Mark In Stock)"}
                        disabled={isToggling}
                    >
                        {isToggling ? (
                            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        ) : inStock ? (
                            <Power className="h-4 w-4" />
                        ) : (
                            <Power className="h-4 w-4" />
                        )}
                    </Button>
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
                passHref
            >
                <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    title="Edit Product"
                >
                    <Pencil className="h-4 w-4" />
                </Button>
            </Link>

            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                        title="Delete Product"
                        disabled={isDeleting}
                    >
                        {isDeleting ? (
                            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        ) : (
                            <Trash2 className="h-4 w-4" />
                        )}
                    </Button>
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
