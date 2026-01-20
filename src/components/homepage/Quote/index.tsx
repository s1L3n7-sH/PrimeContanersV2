"use client";

import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { submitGeneralQuote } from "@/actions/order.actions";
import { Check, Loader2 } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const Quote = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccessDialog, setShowSuccessDialog] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
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

        try {
            await submitGeneralQuote(formData);
            setShowSuccessDialog(true);
            (e.target as HTMLFormElement).reset();
        } catch (error) {
            console.error(error);
            setErrorMsg("Failed to submit quote request. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="quote" className="bg-[#e9eef5] py-12 md:py-20 scroll-mt-28 relative">
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
                                onClick={() => setShowSuccessDialog(false)}
                                className="bg-[#2c2c9c] hover:bg-[#1a1a7a] text-white rounded-xl w-full h-[52px] text-base font-medium transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:shadow-md"
                            >
                                Close
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </div>
                </AlertDialogContent>
            </AlertDialog>

            <div className="max-w-xl mx-auto px-4 xl:px-0">
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-10"
                >
                    <h2
                        className={cn([
                            integralCF.className,
                            "text-[32px] md:text-5xl mb-4 capitalize leading-tight",
                        ])}
                    >
                        Get A Quote
                    </h2>
                    <p className="text-black/60 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
                        Ready to get started? Fill out the form below and we'll get back to you with a customized quote tailored to your needs.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-white p-6 md:p-10 rounded-[14px] shadow-sm border border-black/10"
                >
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div className="w-full space-y-2">
                            <label htmlFor="name" className="text-sm font-medium pl-1">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Full Name"
                                className="w-full px-4 py-3 rounded-[10px] bg-[#F0F0F0] border border-black/10 focus:border-black/10 focus:bg-white focus:ring-2 focus:ring-[#2c2c9c] transition-all text-sm outline-none"
                                required
                            />
                        </div>
                        <div className="w-full space-y-2">
                            <label htmlFor="email" className="text-sm font-medium pl-1">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Email Address"
                                className="w-full px-4 py-3 rounded-[10px] bg-[#F0F0F0] border border-black/10 focus:border-black/10 focus:bg-white focus:ring-2 focus:ring-[#2c2c9c] transition-all text-sm outline-none"
                                required
                            />
                        </div>
                        <div className="w-full space-y-2">
                            <label htmlFor="phone" className="text-sm font-medium pl-1">Phone</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                placeholder="Phone Number"
                                className="w-full px-4 py-3 rounded-[10px] bg-[#F0F0F0] border border-black/10 focus:border-black/10 focus:bg-white focus:ring-2 focus:ring-[#2c2c9c] transition-all text-sm outline-none"
                                required
                            />
                        </div>
                        <div className="w-full space-y-2">
                            <label htmlFor="zip" className="text-sm font-medium pl-1">Zip Code</label>
                            <input
                                type="text"
                                id="zip"
                                name="zip"
                                placeholder="00000"
                                className="w-full px-4 py-3 rounded-[10px] bg-[#F0F0F0] border border-black/10 focus:border-black/10 focus:bg-white focus:ring-2 focus:ring-[#2c2c9c] transition-all text-sm outline-none"
                                required
                            />
                        </div>

                        {errorMsg && (
                            <p className="text-red-500 text-sm mt-1">{errorMsg}</p>
                        )}

                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full rounded-[10px] bg-[#2c2c9c] h-[46px] text-base font-medium mt-2 shadow-md hover:shadow-xl hover:bg-[#1a1a7a] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Submitting...
                                </>
                            ) : (
                                "Get Quote"
                            )}
                        </Button>
                    </form>
                </motion.div>
            </div>
        </section>
    );
};

export default Quote;
