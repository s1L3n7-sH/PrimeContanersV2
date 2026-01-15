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
        <AlertDialogContent className="bg-white w-[90%] sm:w-full max-w-lg rounded-xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-[#2c2c9c]">Requesting Quote</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600">
              Please fill out the form in the quote page to verify your identity.
              <br /><br />
              Redirecting you in 3 seconds...
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
      <button
        type="button"
        className="bg-[#2c2c9c] w-full ml-3 sm:ml-5 rounded-[12px] h-11 md:h-[52px] text-sm sm:text-base text-white hover:bg-[#1a1a7a] transition-all shadow-md hover:shadow-lg"
        onClick={handleAddToCart}
      >
        Get a Quote of this product
      </button>
    </>
  );
};

export default AddToCartBtn;
