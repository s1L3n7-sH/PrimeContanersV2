"use client";

import { useState } from "react";
import { format } from "date-fns";
import { parseISO } from "date-fns";
import { Pencil, Trash2, Power, Plus, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import CategoryDialog from "./CategoryDialog";
import { deleteCategory, toggleCategoryStatus } from "@/actions/category.actions";
import { useRouter } from "next/navigation";

interface Category {
    id: number;
    name: string;
    description: string | null;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export default function CategoriesTable({ categories }: { categories: Category[] }) {
    const router = useRouter();
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);
    const [loadingId, setLoadingId] = useState<number | null>(null);

    const handleCreate = () => {
        setSelectedCategory(null);
        setIsDialogOpen(true);
    };

    const handleEdit = (category: Category) => {
        setSelectedCategory(category);
        setIsDialogOpen(true);
    };

    const handleDeleteClick = (category: Category) => {
        setCategoryToDelete(category);
        setIsDeleteDialogOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!categoryToDelete) return;
        try {
            await deleteCategory(categoryToDelete.id);
            setCategoryToDelete(null);
        } catch (error) {
            console.error(error);
        }
    };

    const handleToggleStatus = async (category: Category) => {
        setLoadingId(category.id);
        try {
            await toggleCategoryStatus(category.id, category.isActive);
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingId(null);
        }
    };

    const handleDialogSuccess = () => {
        router.refresh();
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">All Categories</h2>
                <Button
                    onClick={handleCreate}
                    className="flex items-center gap-2 bg-[#2c2c9c] text-white px-4 py-2.5 rounded-lg hover:bg-[#1a1a7a] transition-colors shadow-sm h-auto"
                >
                    <Plus className="h-5 w-5" />
                    Add Category
                </Button>
            </div>

            <div className="border rounded-lg bg-white overflow-hidden shadow-sm overflow-x-auto">
                <table className="w-full text-sm text-left whitespace-nowrap">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                        <tr>
                            <th className="px-6 py-4 font-medium">Name</th>
                            <th className="px-6 py-4 font-medium">Status</th>
                            <th className="px-6 py-4 font-medium">Date Added</th>
                            <th className="px-6 py-4 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {categories.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                    No categories found.
                                </td>
                            </tr>
                        ) : (
                            categories.map((category) => (
                                <tr key={category.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-gray-900">{category.name}</td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${category.isActive
                                                ? "bg-green-100 text-green-800"
                                                : "bg-gray-100 text-gray-800"
                                                }`}
                                        >
                                            {category.isActive ? "Active" : "Inactive"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500">
                                        {format(new Date(category.createdAt), "MMM d, yyyy")}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className={`h-8 w-8 p-0 ${category.isActive ? 'text-red-600 hover:text-red-700 hover:bg-red-50' : 'text-green-600 hover:text-green-700 hover:bg-green-50'}`}
                                                onClick={() => handleToggleStatus(category)}
                                                disabled={loadingId === category.id}
                                                title={category.isActive ? "Disable" : "Enable"}
                                            >
                                                {loadingId === category.id ? (
                                                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                                ) : category.isActive ? (
                                                    <Power className="w-4 h-4" />
                                                ) : (
                                                    <Power className="w-4 h-4" />
                                                )}
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                                onClick={() => handleEdit(category)}
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                                                onClick={() => handleDeleteClick(category)}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <CategoryDialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                category={selectedCategory}
                onSuccess={handleDialogSuccess}
            />

            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the category
                            &quot;{categoryToDelete?.name}&quot;.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleConfirmDelete} className="bg-red-600 hover:bg-red-700">
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
