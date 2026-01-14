"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const attributes = [
    "Double door",
    "Hard top",
    "Open side",
    "Soft top",
];

const AttributesSection = () => {
    const [selectedAttributes, setSelectedAttributes] = useState<string[]>([]);

    const toggleAttribute = (attribute: string) => {
        if (selectedAttributes.includes(attribute)) {
            setSelectedAttributes((prev) => prev.filter((a) => a !== attribute));
        } else {
            setSelectedAttributes((prev) => [...prev, attribute]);
        }
    };

    return (
        <Accordion type="single" collapsible defaultValue="attributes">
            <AccordionItem value="attributes" className="border-none">
                <AccordionTrigger className="text-black font-bold text-xl hover:no-underline p-0 py-0.5">
                    Attributes
                </AccordionTrigger>
                <AccordionContent className="pt-4" contentClassName="overflow-visible">
                    <div className="flex flex-wrap gap-2 text-black/60">
                        {attributes.map((attribute) => {
                            const isSelected = selectedAttributes.includes(attribute);
                            return (
                                <button
                                    key={attribute}
                                    onClick={() => toggleAttribute(attribute)}
                                    className={cn(
                                        "flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 border",
                                        isSelected
                                            ? "bg-[#2c2c9c] text-white border-[#2c2c9c]"
                                            : "bg-white text-black/60 border-black/10 hover:bg-[#2c2c9c]/5"
                                    )}
                                >
                                    {attribute}
                                </button>
                            );
                        })}
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};

export default AttributesSection;
