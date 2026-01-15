"use client";

import { setSizeSelection } from "@/lib/features/products/productsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import { RootState } from "@/lib/store";
import { cn } from "@/lib/utils";
import React from "react";

const SizeSelection = () => {
  const { sizeSelection } = useAppSelector(
    (state: RootState) => state.products
  );
  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-col">
      <span className="text-sm sm:text-base text-black/60 mb-4">
        Choose Door
      </span>
      <div className="flex items-center flex-wrap lg:space-x-3">
        {["1 Door", "2 Door"].map((size, index) => (
          <button
            key={index}
            type="button"
            className={cn([
              "bg-white border border-gray-100 text-gray-700 flex items-center justify-center px-5 lg:px-6 py-2.5 lg:py-3 text-sm lg:text-base rounded-[12px] m-1 lg:m-0 max-h-[46px] hover:border-[#2c2c9c] transition-colors",
              sizeSelection === size && "bg-[#2c2c9c] border-[#2c2c9c] font-medium text-white hover:bg-[#1a1a7a]",
            ])}
            onClick={() => dispatch(setSizeSelection(size))}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SizeSelection;
