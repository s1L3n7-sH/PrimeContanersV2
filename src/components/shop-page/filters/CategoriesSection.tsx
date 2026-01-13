"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";


const categories = [
  "10 ft",
  "16 ft",
  "20 ft",
  "24 ft",
  "30 ft",
  "40 ft",
  "45 ft",
];

const CategoriesSection = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories((prev) => prev.filter((c) => c !== category));
    } else {
      setSelectedCategories((prev) => [...prev, category]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2 text-black/60">
      {categories.map((category) => {
        const isSelected = selectedCategories.includes(category);
        return (
          <button
            key={category}
            onClick={() => toggleCategory(category)}
            className={cn(
              "flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 border",
              isSelected
                ? "bg-black text-white border-black"
                : "bg-white text-black/60 border-black/10 hover:bg-black/5"
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
