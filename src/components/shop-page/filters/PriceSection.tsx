"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";

const MIN_PRICE = 0;
const MAX_PRICE = 10000;

const PriceSection = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const minParam = searchParams.get('minPrice');
  const maxParam = searchParams.get('maxPrice');

  // Initial values from URL or defaults
  const initialMin = minParam ? Number(minParam) : MIN_PRICE;
  const initialMax = maxParam ? Number(maxParam) : MAX_PRICE;

  // We use a key to force re-render when URL params change externally (e.g. clear filters)
  // allowing defaultValue to take effect again
  const sliderKey = `${initialMin}-${initialMax}`;

  const handleValueCommit = (values: number[]) => {
    const [min, max] = values;
    const params = new URLSearchParams(searchParams.toString());

    if (min > MIN_PRICE) {
      params.set('minPrice', min.toString());
    } else {
      params.delete('minPrice');
    }

    if (max < MAX_PRICE) {
      params.set('maxPrice', max.toString());
    } else {
      params.delete('maxPrice');
    }

    router.push(`/shop?${params.toString()}`, { scroll: false });
  };

  return (
    <Accordion type="single" collapsible defaultValue="filter-price">
      <AccordionItem value="filter-price" className="border-none">
        <AccordionTrigger className="text-gray-900 font-semibold text-lg hover:no-underline py-2">
          Price Range
        </AccordionTrigger>
        <AccordionContent className="pt-6 pb-2 px-2" contentClassName="overflow-visible">
          <Slider
            key={sliderKey}
            defaultValue={[initialMin, initialMax]}
            min={MIN_PRICE}
            max={MAX_PRICE}
            step={100}
            label="$"
            onValueCommit={handleValueCommit}
            className="my-4"
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default PriceSection;
