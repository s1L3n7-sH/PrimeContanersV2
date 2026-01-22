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
import { Check, Loader2, ShieldCheck, ShoppingBag } from "lucide-react";

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

    // Phone validation
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
    <main className="pb-20 min-h-screen bg-gradient-to-b from-white via-blue-50/20 to-white relative">
      <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <AlertDialogContent className="bg-white w-[90%] sm:w-full max-w-md rounded-[32px] p-8 border border-blue-100 shadow-2xl gap-0">
          <div className="flex flex-col items-center justify-center text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
              className="h-24 w-24 bg-gradient-to-br from-green-50 to-emerald-100 rounded-full flex items-center justify-center mb-6 shadow-inner"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Check className="h-10 w-10 text-emerald-600" strokeWidth={3} />
              </motion.div>
            </motion.div>

            <AlertDialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-3 text-center">
              Quote Requested!
            </AlertDialogTitle>

            <AlertDialogDescription className="text-gray-500 text-base mb-8 text-center max-w-[300px] leading-relaxed mx-auto">
              We've received your request. Our team will review the details and get back to you shortly.
            </AlertDialogDescription>

            <AlertDialogFooter className="w-full sm:justify-center">
              <AlertDialogAction
                onClick={handleSuccessClose}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:shadow-lg hover:shadow-blue-500/30 text-white rounded-full w-full h-[52px] text-base font-bold transition-all border border-transparent"
              >
                Back to Shopping
              </AlertDialogAction>
            </AlertDialogFooter>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      <div className="max-w-frame mx-auto px-4 xl:px-0 pt-6">
        {cart && cart.items.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <BreadcrumbCart />

            <div className="flex items-center gap-3 mb-8">
              <ShoppingBag className="w-8 h-8 text-blue-600" />
              <h2
                className={cn([
                  integralCF.className,
                  "font-bold text-[32px] md:text-[40px] text-gray-900",
                ])}
              >
                Your Order
              </h2>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 items-start">
              {/* Product List */}
              <div className="w-full bg-white rounded-3xl border border-blue-100 shadow-sm p-6 overflow-hidden">
                <div className="space-y-6">
                  {cart?.items.map((product, idx, arr) => (
                    <React.Fragment key={idx}>
                      <ProductCard data={product} />
                      {arr.length - 1 !== idx && (
                        <div className="h-px bg-gray-100" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Quote Information Form */}
              <div className="w-full lg:max-w-[480px] lg:sticky lg:top-24">
                <div className="bg-white rounded-3xl border border-blue-100 shadow-lg p-6 md:p-8 relative overflow-hidden">
                  {/* Decorative background blur */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />

                  <div className="flex items-center gap-2 mb-6 relative">
                    <ShieldCheck className="w-5 h-5 text-blue-600" />
                    <h6 className="text-xl font-bold text-gray-900">
                      Quote Information
                    </h6>
                  </div>

                  <form onSubmit={handleSubmit} className="flex flex-col space-y-5 relative">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-semibold text-gray-700 ml-1">Full Name</label>
                      <input
                        name="name"
                        type="text"
                        id="name"
                        required
                        className="w-full p-3.5 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all placeholder:text-gray-400"
                        placeholder="Full Name"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-semibold text-gray-700 ml-1">Email Address</label>
                      <input
                        name="email"
                        type="email"
                        id="email"
                        required
                        className="w-full p-3.5 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all placeholder:text-gray-400"
                        placeholder="Email Address"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="phone" className="text-sm font-semibold text-gray-700 ml-1">Phone</label>
                        <input
                          name="phone"
                          type="tel"
                          id="phone"
                          required
                          className="w-full p-3.5 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all placeholder:text-gray-400"
                          placeholder="(123) 456-7890"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="zip" className="text-sm font-semibold text-gray-700 ml-1">Zip Code</label>
                        <input
                          name="zip"
                          type="text"
                          id="zip"
                          required
                          className="w-full p-3.5 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all placeholder:text-gray-400"
                          placeholder="10001"
                        />
                      </div>
                    </div>

                    {errorMsg && (
                      <div className="p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm font-medium flex items-center gap-2 animate-pulse">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                        {errorMsg}
                      </div>
                    )}

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="mt-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:shadow-lg hover:shadow-blue-500/30 text-white rounded-full w-full py-6 h-auto text-lg font-bold transition-all disabled:opacity-70 disabled:cursor-not-allowed group relative overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          <>
                            Submit Request
                            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </span>
                    </Button>

                    <p className="text-xs text-center text-gray-400 mt-4">
                      By submitting, you agree to our Terms of Service and Privacy Policy.
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="min-h-[60vh] flex flex-col items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="w-10 h-10 text-blue-300" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
              <p className="text-gray-500 mb-8 max-w-sm mx-auto">
                Looks like you haven't added any containers to your cart yet.
              </p>
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 py-6 h-auto text-base font-semibold shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 transition-all"
                asChild
              >
                <Link href="/shop">Browse Containers</Link>
              </Button>
            </motion.div>
          </div>
        )}
      </div>
    </main>
  );
}
