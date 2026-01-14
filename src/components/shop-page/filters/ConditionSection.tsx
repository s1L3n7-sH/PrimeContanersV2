"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const conditions = [
    "3-Trip",
    "New",
    "Refurbished",
    "Used",
];

const ConditionSection = () => {
    const [selectedConditions, setSelectedConditions] = useState<string[]>([]);

    const toggleCondition = (condition: string) => {
        if (selectedConditions.includes(condition)) {
            setSelectedConditions((prev) => prev.filter((c) => c !== condition));
        } else {
            setSelectedConditions((prev) => [...prev, condition]);
        }
    };

    return (
        <Accordion type="single" collapsible defaultValue="condition">
            <AccordionItem value="condition" className="border-none">
                <AccordionTrigger className="text-black font-bold text-xl hover:no-underline p-0 py-0.5">
                    Condition
                </AccordionTrigger>
                <AccordionContent className="pt-4" contentClassName="overflow-visible">
                    <div className="flex flex-wrap gap-2 text-black/60">
                        {conditions.map((condition) => {
                            const isSelected = selectedConditions.includes(condition);
                            return (
                                <button
                                    key={condition}
                                    onClick={() => toggleCondition(condition)}
                                    className={cn(
                                        "flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 border",
                                        isSelected
                                            ? "bg-[#2c2c9c] text-white border-[#2c2c9c]"
                                            : "bg-white text-black/60 border-black/10 hover:bg-[#2c2c9c]/5"
                                    )}
                                >
                                    {condition}
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
