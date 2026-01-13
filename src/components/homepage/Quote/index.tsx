"use client";

import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import React from "react";
import * as motion from "framer-motion/client";
import { Button } from "@/components/ui/button";

const Quote = () => {
    return (
        <section className="bg-[#e9eef5] py-12 md:py-20">
            <div className="max-w-3xl mx-auto px-4 xl:px-0">
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
                        Ready to get started? Fill out the form below to tell us about your project, and we'll get back to you with a customized quote tailored to your needs.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-white p-6 md:p-10 rounded-[20px] shadow-sm"
                >
                    <form className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-medium">Your Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    placeholder="John Doe"
                                    className="w-full px-4 py-3 rounded-[10px] bg-[#F0F0F0] border-transparent focus:border-black/10 focus:bg-white focus:ring-0 transition-all text-sm outline-none"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="john@example.com"
                                    className="w-full px-4 py-3 rounded-[10px] bg-[#F0F0F0] border-transparent focus:border-black/10 focus:bg-white focus:ring-0 transition-all text-sm outline-none"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label htmlFor="phone" className="text-sm font-medium">Phone</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    placeholder="(555) 000-0000"
                                    className="w-full px-4 py-3 rounded-[10px] bg-[#F0F0F0] border-transparent focus:border-black/10 focus:bg-white focus:ring-0 transition-all text-sm outline-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="company" className="text-sm font-medium">Company</label>
                                <input
                                    type="text"
                                    id="company"
                                    placeholder="Company Name"
                                    className="w-full px-4 py-3 rounded-[10px] bg-[#F0F0F0] border-transparent focus:border-black/10 focus:bg-white focus:ring-0 transition-all text-sm outline-none"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="zip" className="text-sm font-medium">Delivery Zip</label>
                            <input
                                type="text"
                                id="zip"
                                placeholder="Zip Code"
                                className="w-full px-4 py-3 rounded-[10px] bg-[#F0F0F0] border-transparent focus:border-black/10 focus:bg-white focus:ring-0 transition-all text-sm outline-none"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="message" className="text-sm font-medium">Tell us about your project and timeline</label>
                            <textarea
                                id="message"
                                rows={4}
                                placeholder="Describe your project requirements..."
                                className="w-full px-4 py-3 rounded-[10px] bg-[#F0F0F0] border-transparent focus:border-black/10 focus:bg-white focus:ring-0 transition-all text-sm outline-none resize-none"
                                required
                            />
                        </div>

                        <Button type="submit" className="w-full rounded-[10px] bg-[#2c2c9c] h-12 text-base font-medium mt-2">
                            Request Quote
                        </Button>
                    </form>
                </motion.div>
            </div>
        </section>
    );
};

export default Quote;
