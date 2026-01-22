"use client";

import CartCounter from "@/components/ui/CartCounter";
import React, { useState } from "react";
import AddToCartBtn from "./AddToCartBtn";
import { Product } from "@/types/product.types";
import { cn } from "@/lib/utils";

const AddToCardSection = ({ data }: { data: Product }) => {
  const [quantity, setQuantity] = useState<number>(1);

  return (
    <div className={cn(
      "fixed md:relative w-full bottom-0 left-0 z-20 md:z-auto transition-all duration-300",
      "bg-white/80 backdrop-blur-md md:bg-transparent border-t md:border-none border-blue-100",
      "p-4 md:p-0 safe-area-bottom"
    )}>
      <div className="flex items-center justify-between sm:justify-start gap-4 max-w-frame mx-auto">
        <div className="flex-shrink-0">
          <CartCounter onAdd={setQuantity} onRemove={setQuantity} />
        </div>
        <AddToCartBtn data={{ ...data, quantity }} />
      </div>
    </div>
  );
};

export default AddToCardSection;
