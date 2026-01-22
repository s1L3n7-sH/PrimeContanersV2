import React from "react";
import CategoriesSection from "@/components/shop-page/filters/CategoriesSection";
import ConditionSection from "@/components/shop-page/filters/ConditionSection";
import { LayoutGrid } from "lucide-react";

interface FiltersProps {
  categories?: string[];
}

const Filters = ({ categories }: FiltersProps) => {
  return (
    <div className="space-y-6">
      {/* Categories (Length) */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <LayoutGrid className="w-4 h-4 text-blue-600" />
          Container Length
        </h3>
        <CategoriesSection categories={categories} />
      </div>

      <div className="h-px bg-gray-100" />

      {/* Condition Filter */}
      <ConditionSection />
    </div>
  );
};

export default Filters;
