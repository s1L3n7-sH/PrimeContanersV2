"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Check } from "lucide-react";

const ConditionSection = ({ categories = [] }: { categories?: string[] }) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Get selected categories from URL
    const selectedParam = searchParams?.get('category');
    const selectedCategories = selectedParam ? selectedParam.split(',') : [];

    const toggleCategory = (category: string) => {
        const params = new URLSearchParams(searchParams?.toString() ?? '');
        let newSelected: string[];

        if (selectedCategories.includes(category)) {
            newSelected = selectedCategories.filter((c) => c !== category);
        } else {
            newSelected = [...selectedCategories, category];
        }

        if (newSelected.length > 0) {
            params.set('category', newSelected.join(','));
        } else {
            params.delete('category');
        }

        router.push(`/shop?${params.toString()}`, { scroll: false });
    };

    // If no categories provided, show nothing or placeholder?
    // User requested functional component based on product category.
    // If empty, better to hide or show "No categories".
    // For now assuming categories will be passed.
    const displayCategories = categories.length > 0 ? categories : [];

    if (displayCategories.length === 0) return null;

    return (
        <Accordion type="single" collapsible defaultValue="category">
            <AccordionItem value="category" className="border-none">
                <AccordionTrigger className="text-gray-900 font-semibold text-lg hover:no-underline py-2">
                    Condition
                </AccordionTrigger>
                <AccordionContent className="pt-2">
                    <div className="flex flex-col gap-2">
                        {displayCategories.map((category) => {
                            const isSelected = selectedCategories.includes(category);
                            return (
                                <button
                                    key={category}
                                    onClick={() => toggleCategory(category)}
                                    className="flex items-center gap-3 group text-left w-full hover:bg-gray-50 p-2 rounded-lg transition-colors"
                                >
                                    <div className={cn(
                                        "w-5 h-5 rounded border flex items-center justify-center transition-all",
                                        isSelected
                                            ? "bg-blue-600 border-blue-600 text-white"
                                            : "border-gray-300 bg-white group-hover:border-blue-400"
                                    )}>
                                        {isSelected && <Check className="w-3.5 h-3.5" />}
                                    </div>
                                    <span className={cn(
                                        "text-sm font-medium transition-colors",
                                        isSelected ? "text-blue-700" : "text-gray-600 group-hover:text-gray-900"
                                    )}>
                                        {category}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};

export default ConditionSection;
