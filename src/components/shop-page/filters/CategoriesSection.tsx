"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

type CategoriesSectionProps = {
  categories?: string[];
};

const CategoriesSection = ({ categories = [] }: CategoriesSectionProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get current selected categories from URL
  const selectedParam = searchParams.get('length');
  const selectedCategories = selectedParam ? selectedParam.split(',') : [];

  // Use passed categories or fallback to defaults
  const displayCategories = categories.length > 0
    ? categories.filter(Boolean)
    : ["10 ft", "16 ft", "20 ft", "24 ft", "30 ft", "40 ft", "45 ft"];

  const toggleCategory = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    let newSelected: string[];

    if (selectedCategories.includes(category)) {
      // Remove category
      newSelected = selectedCategories.filter((c) => c !== category);
    } else {
      // Add category
      newSelected = [...selectedCategories, category];
    }

    if (newSelected.length > 0) {
      params.set('length', newSelected.join(','));
    } else {
      params.delete('length');
    }

    router.push(`/shop?${params.toString()}`, { scroll: false });
  };

  const clearAll = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('length');
    router.push(`/shop?${params.toString()}`, { scroll: false });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-gray-700">
          {selectedCategories.length > 0 && `(${selectedCategories.length} selected)`}
        </span>
        {selectedCategories.length > 0 && (
          <button
            onClick={clearAll}
            className="text-xs text-blue-600 hover:text-blue-700 font-medium"
          >
            Clear
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {displayCategories.map((category) => {
          const isSelected = selectedCategories.includes(category);
          return (
            <button
              key={category}
              onClick={() => toggleCategory(category)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 border-2",
                isSelected
                  ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-transparent shadow-md scale-105"
                  : "bg-white text-gray-700 border-gray-200 hover:border-blue-600 hover:bg-blue-50 hover:text-blue-600"
              )}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoriesSection;
