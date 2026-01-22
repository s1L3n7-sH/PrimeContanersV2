"use client";

import { addToCart } from "@/lib/features/carts/cartsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import { RootState } from "@/lib/store";
import { Product } from "@/types/product.types";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const AddToCartBtn = ({ data }: { data: Product & { quantity: number } }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { sizeSelection, colorSelection } = useAppSelector(
    (state: RootState) => state.products
  );

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: data.id,
        name: data.title,
        srcUrl: data.srcUrl,
        price: data.price,
        attributes: [sizeSelection, colorSelection.name],
        discount: data.discount,
        quantity: data.quantity,
      })
    );

    setOpen(true);

    setTimeout(() => {
      router.push('/order');
    }, 3000);
  };

  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className="bg-white w-[90%] sm:w-full max-w-sm rounded-[32px] p-8 border border-blue-100 shadow-2xl gap-0">
          <AlertDialogHeader className="flex flex-col items-center justify-center text-center">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
              className="h-20 w-20 rounded-full bg-blue-50 flex items-center justify-center mb-6 shadow-inner"
            >
              <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
            </motion.div>
            <AlertDialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-3">
              Initializing Quote
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-500 text-base mb-8 max-w-[260px] mx-auto leading-relaxed">
              We're preparing your quote details. Redirecting you to the verification step...
            </AlertDialogDescription>

            <div className="w-full bg-blue-50 rounded-full h-1.5 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-600 to-cyan-500"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2.5, ease: "easeInOut" }}
              />
            </div>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
      <button
        type="button"
        className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 w-full ml-4 rounded-full h-14 text-base font-bold text-white hover:shadow-lg hover:shadow-blue-500/30 transition-all active:scale-[0.98] flex items-center justify-center gap-2 group border border-transparent hover:border-blue-300/30"
        onClick={handleAddToCart}
      >
        <span>Request Quote</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-80 group-hover:translate-x-1 transition-transform">
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </button>
    </>
  );
};

export default AddToCartBtn;
