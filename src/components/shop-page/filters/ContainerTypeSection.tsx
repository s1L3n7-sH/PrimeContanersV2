"use client";

import { getAllCategories } from "@/actions/category.actions";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const ContainerTypeSection = () => {
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [containerTypes, setContainerTypes] = useState<any[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const { data } = await getAllCategories();
            if (data) {
                setContainerTypes(data);
            }
        }
        fetchCategories();
    }, [])

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
                        {containerTypes.filter(c => c.isActive).map((cat) => {
                            const type = cat.name;
                            const isSelected = selectedTypes.includes(type);
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => toggleType(type)}
                                    className={cn(
                                        "flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 border",
                                        isSelected
                                            ? "bg-[#2c2c9c] text-white border-[#2c2c9c]"
                                            : "bg-white text-black/60 border-black/10 hover:bg-[#2c2c9c]/5"
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
