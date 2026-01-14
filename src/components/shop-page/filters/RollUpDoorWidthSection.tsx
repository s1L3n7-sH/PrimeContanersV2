"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const widths = [
    "7 ft",
    "8 ft",
    "10 ft",
];

const RollUpDoorWidthSection = () => {
    const [selectedWidths, setSelectedWidths] = useState<string[]>([]);

    const toggleWidth = (width: string) => {
        if (selectedWidths.includes(width)) {
            setSelectedWidths((prev) => prev.filter((w) => w !== width));
        } else {
            setSelectedWidths((prev) => [...prev, width]);
        }
    };

    return (
        <Accordion type="single" collapsible defaultValue="rollup-width">
            <AccordionItem value="rollup-width" className="border-none">
                <AccordionTrigger className="text-black font-bold text-xl hover:no-underline p-0 py-0.5">
                    Roll-Up Door Width
                </AccordionTrigger>
                <AccordionContent className="pt-4" contentClassName="overflow-visible">
                    <div className="flex flex-wrap gap-2 text-black/60">
                        {widths.map((width) => {
                            const isSelected = selectedWidths.includes(width);
                            return (
                                <button
                                    key={width}
                                    onClick={() => toggleWidth(width)}
                                    className={cn(
                                        "flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 border",
                                        isSelected
                                            ? "bg-[#2c2c9c] text-white border-[#2c2c9c]"
                                            : "bg-white text-black/60 border-black/10 hover:bg-[#2c2c9c]/5"
                                    )}
                                >
                                    {width}
                                </button>
                            );
                        })}
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};

export default RollUpDoorWidthSection;
