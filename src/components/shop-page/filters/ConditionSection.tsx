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

const conditions = [
    "One-Trip", // "New" often means One-Trip in containers
    "Used",
    "Cargo Worthy",
    "Wind & Watertight",
    "As Is"
];

const ConditionSection = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Get selected conditions from URL
    const selectedParam = searchParams.get('condition');
    const selectedConditions = selectedParam ? selectedParam.split(',') : [];

    const toggleCondition = (condition: string) => {
        const params = new URLSearchParams(searchParams.toString());
        let newSelected: string[];

        if (selectedConditions.includes(condition)) {
            newSelected = selectedConditions.filter((c) => c !== condition);
        } else {
            newSelected = [...selectedConditions, condition];
        }

        if (newSelected.length > 0) {
            params.set('condition', newSelected.join(','));
        } else {
            params.delete('condition');
        }

        router.push(`/shop?${params.toString()}`, { scroll: false });
    };

    return (
        <Accordion type="single" collapsible defaultValue="condition">
            <AccordionItem value="condition" className="border-none">
                <AccordionTrigger className="text-gray-900 font-semibold text-lg hover:no-underline py-2">
                    Condition
                </AccordionTrigger>
                <AccordionContent className="pt-2">
                    <div className="flex flex-col gap-2">
                        {conditions.map((condition) => {
                            const isSelected = selectedConditions.includes(condition);
                            return (
                                <button
                                    key={condition}
                                    onClick={() => toggleCondition(condition)}
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
                                        {condition}
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
