"use client";

import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { submitGeneralQuote } from "@/actions/order.actions";
import { Check, Loader2, Mail, Phone, User, MapPin } from "lucide-react";
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
        <section id="quote" className="relative py-16 md:py-24 scroll-mt-28 overflow-hidden">
            {/* Enhanced gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-cyan-50 to-sky-50 -z-10" />
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] -z-10" />

            {/* Animated background shapes */}
            <motion.div
                className="absolute top-10 right-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
            <motion.div
                className="absolute bottom-10 left-10 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl"
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2,
                }}
            />

            <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
                <AlertDialogContent className="bg-white w-[90%] sm:w-full max-w-md rounded-3xl p-8 border-none shadow-2xl gap-0">
                    <div className="flex flex-col items-center justify-center text-center">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                                type: "spring",
                                stiffness: 260,
                                damping: 20,
                            }}
                            className="h-24 w-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mb-6 shadow-lg"
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                <Check className="h-12 w-12 text-white" strokeWidth={3} />
                            </motion.div>
                        </motion.div>

                        <AlertDialogTitle className="text-2xl font-bold text-gray-900 mb-2 text-center">
                            Quote Requested!
                        </AlertDialogTitle>

                        <AlertDialogDescription className="text-gray-600 text-base mb-8 text-center max-w-[300px] leading-relaxed">
                            We've received your request. Our team will review the details and get back to you shortly.
                        </AlertDialogDescription>

                        <AlertDialogFooter className="w-full sm:justify-center">
                            <AlertDialogAction
                                onClick={() => setShowSuccessDialog(false)}
                                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-xl w-full h-[52px] text-base font-medium transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:shadow-md"
                            >
                                Close
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </div>
                </AlertDialogContent>
            </AlertDialog>

            <div className="max-w-2xl mx-auto px-4 xl:px-0 relative z-10">
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <div className="inline-block mb-4">
                        <span className="text-blue-600 font-bold text-sm uppercase tracking-wider">Get Started Today</span>
                    </div>
                    <h2 className={cn([
                        integralCF.className,
                        "text-3xl md:text-5xl lg:text-6xl mb-4 bg-gradient-to-r from-gray-900 via-blue-900 to-gray-800 bg-clip-text text-transparent"
                    ])}>
                        Get A Quote
                    </h2>
                    <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-xl mx-auto">
                        Ready to get started? Fill out the form below and we'll get back to you with a customized quote tailored to your needs.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="relative"
                >
                    {/* Card background with glassmorphism */}
                    <div className="absolute inset-0 bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl" />

                    <div className="relative p-8 md:p-10">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                            <div className="w-full space-y-2">
                                <label htmlFor="name" className="text-sm font-semibold text-gray-700 pl-1">Full Name</label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="Full Name"
                                        className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-gray-50 border-2 border-gray-200 focus:border-blue-500 focus:bg-white transition-all text-sm outline-none"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="w-full space-y-2">
                                <label htmlFor="email" className="text-sm font-semibold text-gray-700 pl-1">Email Address</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="Email Address"
                                        className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-gray-50 border-2 border-gray-200 focus:border-blue-500 focus:bg-white transition-all text-sm outline-none"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="w-full space-y-2">
                                <label htmlFor="phone" className="text-sm font-semibold text-gray-700 pl-1">Phone Number</label>
                                <div className="relative group">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        placeholder="1234567890"
                                        className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-gray-50 border-2 border-gray-200 focus:border-blue-500 focus:bg-white transition-all text-sm outline-none"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="w-full space-y-2">
                                <label htmlFor="zip" className="text-sm font-semibold text-gray-700 pl-1">Zip Code</label>
                                <div className="relative group">
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                                    <input
                                        type="text"
                                        id="zip"
                                        name="zip"
                                        placeholder="00000"
                                        className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-gray-50 border-2 border-gray-200 focus:border-blue-500 focus:bg-white transition-all text-sm outline-none"
                                        required
                                    />
                                </div>
                            </div>

                            {errorMsg && (
                                <motion.p
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-lg p-3"
                                >
                                    {errorMsg}
                                </motion.p>
                            )}

                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 h-14 text-base font-semibold mt-2 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        Submitting...
                                    </>
                                ) : (
                                    "Get Your Free Quote"
                                )}
                            </Button>
                        </form>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Quote;

