import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { SlidersHorizontal, X } from "lucide-react";
import Filters from ".";
import ClearAllButton from "./ClearAllButton";

const MobileFilters = ({ categories }: { categories?: string[] }) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button
          type="button"
          className="h-10 w-10 flex items-center justify-center rounded-full bg-blue-50 text-blue-600 md:hidden border border-blue-100"
        >
          <SlidersHorizontal className="w-5 h-5 mx-auto" />
        </button>
      </DrawerTrigger>
      <DrawerContent className="h-[85vh] flex flex-col rounded-t-[20px]">
        <DrawerHeader className="border-b border-gray-100 pb-4">
          <div className="flex items-center justify-between">
            <span className="font-bold text-gray-900 text-xl flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-blue-600" />
              Filters
            </span>
            <div className="flex items-center gap-4">
              <ClearAllButton />
              <DrawerClose asChild>
                <button className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200">
                  <X className="w-4 h-4" />
                </button>
              </DrawerClose>
            </div>
          </div>
          <DrawerTitle className="hidden">filters</DrawerTitle>
          <DrawerDescription className="hidden">filters</DrawerDescription>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          <Filters categories={categories} />
        </div>

        <DrawerFooter className="border-t border-gray-100 pt-4">
          <DrawerClose asChild>
            <button className="w-full bg-blue-600 text-white rounded-full py-3 font-semibold text-sm hover:bg-blue-700 transition-colors">
              View Results
            </button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileFilters;
