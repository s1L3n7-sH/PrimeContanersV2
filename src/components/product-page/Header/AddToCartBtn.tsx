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
        <AlertDialogContent className="bg-white w-[90%] sm:w-full max-w-sm rounded-[24px] p-8 border-none shadow-2xl gap-0">
          <AlertDialogHeader className="flex flex-col items-center justify-center text-center">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
              className="h-16 w-16 rounded-full bg-[#eef2ff] flex items-center justify-center mb-6"
            >
              <Loader2 className="h-8 w-8 text-[#2c2c9c] animate-spin" />
            </motion.div>
            <AlertDialogTitle className="text-xl font-bold text-[#1a1a1a] mb-2">
              Requesting Quote
            </AlertDialogTitle>
            <AlertDialogDescription className="text-[#666666] text-sm/relaxed mb-6 leading-relaxed">
              We're preparing your quote details. Please complete the form on the next page to verify your identity.
            </AlertDialogDescription>
            <div className="flex items-center space-x-2 text-xs font-medium text-[#2c2c9c]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2c2c9c] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2c2c9c]"></span>
              </span>
              <p>Redirecting you in a few seconds...</p>
            </div>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
      <button
        type="button"
        className="bg-[#2c2c9c] w-full ml-3 sm:ml-5 rounded-[12px] h-11 md:h-[52px] text-sm sm:text-base text-white hover:bg-[#1a1a7a] transition-all shadow-md hover:shadow-lg active:scale-[0.98]"
        onClick={handleAddToCart}
      >
        Get a Quote of this product
      </button>
    </>
  );
};

export default AddToCartBtn;
