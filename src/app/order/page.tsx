"use client";

import BreadcrumbCart from "@/components/cart-page/BreadcrumbCart";
import ProductCard from "@/components/cart-page/ProductCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import { FaArrowRight } from "react-icons/fa6";
import { TbBasketExclamation } from "react-icons/tb";
import React, { useState } from "react";
import { RootState } from "@/lib/store";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import Link from "next/link";
import { submitQuoteRequest } from "@/actions/order.actions";
import { clearCart } from "@/lib/features/carts/cartsSlice";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function OrderPage() {
  const { cart } = useAppSelector((state: RootState) => state.carts);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!cart || cart.items.length === 0) return;

    setIsSubmitting(true);
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMsg("Please enter a valid email address.");
      setIsSubmitting(false);
      return;
    }

    // Phone validation (numbers only)
    const phoneRegex = /^\d+$/;
    if (!phoneRegex.test(phone)) {
      setErrorMsg("Phone number must contain only numbers.");
      setIsSubmitting(false);
      return;
    }

    const cartItemsJson = JSON.stringify(cart.items);

    try {
      await submitQuoteRequest(formData, cartItemsJson);
      setShowSuccessDialog(true);
    } catch (error) {
      console.error(error);
      setErrorMsg("Failed to submit quote request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccessDialog(false);
    dispatch(clearCart());
    router.push("/");
  };

  return (
    <main className="pb-20 relative">
      <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <AlertDialogContent className="bg-white w-[90%] sm:w-full max-w-md rounded-[24px] p-8 border-none shadow-2xl gap-0">
          <div className="flex flex-col items-center justify-center text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
              className="h-24 w-24 bg-[#E8F5E9] rounded-full flex items-center justify-center mb-6"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Check className="h-12 w-12 text-[#2E7D32]" strokeWidth={3} />
              </motion.div>
            </motion.div>

            <AlertDialogTitle className="text-2xl font-bold text-[#1a1a1a] mb-2 text-center">
              Quote Requested!
            </AlertDialogTitle>

            <AlertDialogDescription className="text-[#666666] text-base mb-8 text-center max-w-[300px] leading-relaxed">
              We've received your request. Our team will review the details and get back to you shortly.
            </AlertDialogDescription>

            <AlertDialogFooter className="w-full sm:justify-center">
              <AlertDialogAction
                onClick={handleSuccessClose}
                className="bg-[#2c2c9c] hover:bg-[#1a1a7a] text-white rounded-xl w-full h-[52px] text-base font-medium transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:shadow-md"
              >
                Back to Shopping
              </AlertDialogAction>
            </AlertDialogFooter>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      <div className="max-w-frame mx-auto px-4 xl:px-0">
        {cart && cart.items.length > 0 ? (
          <>
            <BreadcrumbCart />
            <h2
              className={cn([
                integralCF.className,
                "font-bold text-[32px] md:text-[40px] text-black uppercase mb-5 md:mb-6",
              ])}
            >
              your order
            </h2>
            <div className="flex flex-col lg:flex-row space-y-5 lg:space-y-0 lg:space-x-5 items-start">
              {/* Product List */}
              <div className="w-full p-3.5 md:px-6 flex-col space-y-4 md:space-y-6 rounded-[20px] border border-black/10">
                {cart?.items.map((product, idx, arr) => (
                  <React.Fragment key={idx}>
                    <ProductCard data={product} />
                    {arr.length - 1 !== idx && (
                      <hr className="border-t-black/10" />
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Quote Information Form */}
              <div className="w-full lg:max-w-[505px] p-5 md:px-6 flex-col space-y-4 md:space-y-6 rounded-[20px] border border-black/10 sticky top-5">
                <h6 className="text-xl md:text-2xl font-bold text-black">
                  Quote Information
                </h6>

                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-gray-700">Name <span className="text-red-500">*</span></label>
                    <input name="name" type="text" id="name" required className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2c2c9c] focus:border-transparent outline-none" placeholder="Your Full Name" />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-700">Email <span className="text-red-500">*</span></label>
                    <input name="email" type="email" id="email" required className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2c2c9c] focus:border-transparent outline-none" placeholder="your@email.com" />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number <span className="text-red-500">*</span></label>
                    <input name="phone" type="tel" id="phone" required className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2c2c9c] focus:border-transparent outline-none" placeholder="(123) 456-7890" />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="zip" className="text-sm font-medium text-gray-700">Zip Code <span className="text-red-500">*</span></label>
                    <input name="zip" type="text" id="zip" required className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2c2c9c] focus:border-transparent outline-none" placeholder="e.g. 10001" />
                  </div>

                  {errorMsg && (
                    <p className="text-red-500 text-sm mt-2">{errorMsg}</p>
                  )}

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="text-sm md:text-base font-medium bg-[#2c2c9c] rounded-full w-full py-4 h-[54px] md:h-[60px] group hover:bg-[#1a1a7a] transition-all shadow-md hover:shadow-lg mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Quote Request"}
                    {!isSubmitting && <FaArrowRight className="text-xl ml-2 group-hover:translate-x-1 transition-all" />}
                  </Button>
                </form>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center flex-col text-gray-300 mt-32">
            <TbBasketExclamation strokeWidth={1} className="text-6xl" />
            <span className="block mb-4">Your order list is empty.</span>
            <Button className="rounded-full w-24" asChild>
              <Link href="/shop">Buy</Link>
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
