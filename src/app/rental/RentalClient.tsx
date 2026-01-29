"use client";

import React from "react";
import { motion } from "framer-motion";
import { Building2, Sparkles, CheckCircle2 } from "lucide-react";
import Image from "next/image";

interface RentalPrice {
    term: string;
    price: string;
}

interface RentalPlan {
    id: number;
    type: string;
    category: "RENT_TO_OWN" | "SHORT_TERM";
    prices: RentalPrice[];
}

const PricingCard = ({
    type,
    prices,
    isShortTerm = false,
}: {
    type: string;
    prices: RentalPrice[];
    isShortTerm?: boolean;
}) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        whileHover={{ y: -8 }}
        className="group h-full flex flex-col bg-white rounded-[2rem] overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl hover:shadow-blue-200/40 transition-all duration-300"
    >
        <div className="relative p-8 overflow-hidden h-48 flex items-center justify-center">
            <Image
                src="/images/backgroundrental.webp"
                alt="Container"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className={`absolute inset-0 ${isShortTerm ? 'bg-gradient-to-br from-cyan-600/90 to-blue-700/90' : 'bg-gradient-to-br from-blue-700/90 to-indigo-800/90'} backdrop-blur-[2px] transition-colors duration-300`} />
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-white/10 blur-2xl z-0" />
            <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-24 h-24 rounded-full bg-black/10 blur-2xl z-0" />
            <div className="relative z-10 flex flex-col items-center text-center">
                <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-md mb-3 border border-white/20 shadow-inner">
                    <Building2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-white text-xl tracking-tight leading-snug max-w-[90%] mx-auto shadow-sm">
                    {type}
                </h3>
            </div>
        </div>
        <div className="flex-1 p-6 bg-white flex flex-col">
            <div className="space-y-2 flex-1">
                {prices.map((item, idx) => (
                    <div
                        key={idx}
                        className="group/item flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all duration-200"
                    >
                        <span className="text-gray-500 font-medium text-sm flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full ${isShortTerm ? 'bg-cyan-400' : 'bg-blue-400'} group-hover/item:scale-125 transition-transform duration-300`} />
                            {item.term}
                        </span>
                        <span className={`font-bold text-lg ${isShortTerm ? 'text-cyan-700' : 'text-blue-700'}`}>
                            {item.price}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    </motion.div>
);

export default function RentalClient({ rentalPlans }: { rentalPlans: any[] }) {
    const rentToOwnData = rentalPlans.filter(p => p.category === "RENT_TO_OWN");
    const shortTermData = rentalPlans.filter(p => p.category === "SHORT_TERM");

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 pt-24">
            <div className="relative -mt-24 mb-16 h-[400px] flex items-center justify-center overflow-hidden">
                <Image
                    src="/images/backgroundrental.webp"
                    alt="Container Yard"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 backdrop-blur-md border border-blue-400/30 text-blue-100 font-semibold text-sm mb-6"
                    >
                        <Sparkles className="w-4 h-4" />
                        Flexible Payment Options
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-7xl font-extrabold text-white mb-6 tracking-tight drop-shadow-lg"
                    >
                        Container Rental Programs
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl md:text-2xl text-gray-200 leading-relaxed max-w-2xl mx-auto drop-shadow-md"
                    >
                        Choose the perfect plan for your needs. Whether you're looking for short-term flexibility or a path to ownership.
                    </motion.p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
                <div className="mb-20">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="h-10 w-1 bg-blue-600 rounded-full" />
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">Rent-to-Own Program</h2>
                            <p className="text-gray-500">Monthly payments that go towards ownership</p>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {rentToOwnData.map((item, idx) => (
                            <PricingCard key={idx} type={item.type} prices={item.prices} />
                        ))}
                    </div>
                </div>

                <div className="mb-20">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="h-10 w-1 bg-cyan-500 rounded-full" />
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">Short-term Rental</h2>
                            <p className="text-gray-500">Flexible terms for temporary storage needs</p>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {shortTermData.map((item, idx) => (
                            <PricingCard key={idx} type={item.type} prices={item.prices} isShortTerm />
                        ))}
                    </div>
                </div>
            </div>

            <div className="w-full bg-blue-50 py-16 border-t border-blue-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl shadow-blue-200/40 border border-blue-100">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                                    Why Rent From Prime Containers?
                                </h3>
                                <div className="space-y-4">
                                    {[
                                        "Fast delivery",
                                        "Competitive monthly rates",
                                        "Wind and water tight guarantee",
                                        "Flexible upgrade options"
                                    ].map((benefit, idx) => (
                                        <div key={idx} className="flex items-center gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                                            <span className="text-gray-700">{benefit}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-8">
                                    <a
                                        href="mailto:contact@primecontainers.org?subject=Container Rental Inquiry"
                                        className="inline-flex items-center justify-center px-8 py-3 text-base font-bold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        Inquire via Email
                                    </a>
                                </div>
                            </div>
                            <div className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-lg">
                                <video
                                    src="/videos/about2.mp4"
                                    className="w-full h-full object-cover"
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                />
                                <div className="absolute inset-0 bg-blue-900/10 mix-blend-multiply" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
