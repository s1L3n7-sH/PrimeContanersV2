"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

type CategoriesSectionProps = {
  categories?: string[];
};

const CategoriesSection = ({ categories = [] }: CategoriesSectionProps) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Use passed categories or fallback to defaults if empty/undefined
  // We filter out null/undefined and empty strings just in case
  const displayCategories = categories.length > 0
    ? categories.filter(Boolean)
    : ["10 ft", "16 ft", "20 ft", "24 ft", "30 ft", "40 ft", "45 ft"];

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories((prev) => prev.filter((c) => c !== category));
    } else {
      setSelectedCategories((prev) => [...prev, category]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2 text-black/60">
      {displayCategories.map((category) => {
        const isSelected = selectedCategories.includes(category);
        return (
          <button
            key={category}
            onClick={() => toggleCategory(category)}
            className={cn(
              "flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 border",
              isSelected
                ? "bg-[#2c2c9c] text-white border-[#2c2c9c]"
                : "bg-white text-black/60 border-black/10 hover:bg-[#2c2c9c]/5"
            )}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
};

export default CategoriesSection;
