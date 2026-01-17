import React from "react";
import { getAllCategories } from "@/actions/category.actions";
import CategoriesTable from "@/components/admin/categories/CategoriesTable";

export default async function CategoriesPage() {
    const { data: categories } = await getAllCategories();

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Product Categories</h1>
            <CategoriesTable categories={categories || []} />
        </div>
    );
}
