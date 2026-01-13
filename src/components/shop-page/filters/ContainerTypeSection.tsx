"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const containerTypes = [
    "Refrigerated сontainer",
    "Bleacher",
    "Conjoined",
    "Dry",
    "Flat rack",
    "Ground level office",
    "Hazmat",
    "Office trailer",
    "Specialty containers",
    "Tank",
    "w/ Roll-Up Doors",
];

const ContainerTypeSection = () => {
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

    const toggleType = (type: string) => {
        if (selectedTypes.includes(type)) {
            setSelectedTypes((prev) => prev.filter((t) => t !== type));
        } else {
            setSelectedTypes((prev) => [...prev, type]);
        }
    };

    return (
        <Accordion type="single" collapsible defaultValue="container-type">
            <AccordionItem value="container-type" className="border-none">
                <AccordionTrigger className="text-black font-bold text-xl hover:no-underline p-0 py-0.5">
                    Category
                </AccordionTrigger>
                <AccordionContent className="pt-4" contentClassName="overflow-visible">
                    <div className="flex flex-wrap gap-2 text-black/60">
                        {containerTypes.map((type) => {
                            const isSelected = selectedTypes.includes(type);
                            return (
                                <button
                                    key={type}
                                    onClick={() => toggleType(type)}
                                    className={cn(
                                        "flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 border",
                                        isSelected
                                            ? "bg-black text-white border-black"
                                            : "bg-white text-black/60 border-black/10 hover:bg-black/5"
                                    )}
                                >
                                    {type}
                                </button>
                            );
                        })}
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};

export default ContainerTypeSection;
