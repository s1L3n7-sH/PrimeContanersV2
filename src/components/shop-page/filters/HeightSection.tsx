"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const heights = [
    "Half Height",
    "High cube (9.5 ft)",
    "Standard (8.5 ft)",
];

const HeightSection = () => {
    const [selectedHeights, setSelectedHeights] = useState<string[]>([]);

    const toggleHeight = (height: string) => {
        if (selectedHeights.includes(height)) {
            setSelectedHeights((prev) => prev.filter((h) => h !== height));
        } else {
            setSelectedHeights((prev) => [...prev, height]);
        }
    };

    return (
        <Accordion type="single" collapsible defaultValue="height">
            <AccordionItem value="height" className="border-none">
                <AccordionTrigger className="text-black font-bold text-xl hover:no-underline p-0 py-0.5">
                    Height
                </AccordionTrigger>
                <AccordionContent className="pt-4" contentClassName="overflow-visible">
                    <div className="flex flex-wrap gap-2 text-black/60">
                        {heights.map((height) => {
                            const isSelected = selectedHeights.includes(height);
                            return (
                                <button
                                    key={height}
                                    onClick={() => toggleHeight(height)}
                                    className={cn(
                                        "flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 border",
                                        isSelected
                                            ? "bg-[#2c2c9c] text-white border-[#2c2c9c]"
                                            : "bg-white text-black/60 border-black/10 hover:bg-[#2c2c9c]/5"
                                    )}
                                >
                                    {height}
                                </button>
                            );
                        })}
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};

export default HeightSection;
