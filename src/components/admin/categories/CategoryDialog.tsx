"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { createCategory, updateCategory } from "@/actions/category.actions";

interface Category {
    id: number;
    name: string;
    description: string | null;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

interface CategoryDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    category?: Category | null;
    onSuccess: () => void;
}

export default function CategoryDialog({ open, onOpenChange, category, onSuccess }: CategoryDialogProps) {
    const [name, setName] = useState("");


    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (category) {
            setName(category.name);
            setName(category.name);
        } else {
            setName("");

        }
        setError("");
    }, [category, open]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            let result;
            if (category) {
                result = await updateCategory(category.id, { name });
            } else {
                result = await createCategory({ name });
            }

            if (result.success) {
                onSuccess();
                onOpenChange(false);
            } else {
                setError(result.error as string);
            }
        } catch (err) {
            setError("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{category ? "Edit Category" : "Add Category"}</DialogTitle>
                    <DialogDescription>
                        {category ? "Edit the details of this category." : "Add a new product category here."}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <label htmlFor="name" className="text-sm font-medium">
                                Name
                            </label>
                            <input
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
                                required
                            />
                        </div>
                        {error && <p className="text-sm text-red-500">{error}</p>}
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="ghost" onClick={() => onOpenChange(false)} disabled={isLoading}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? "Saving..." : "Save"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog >
    );
}
