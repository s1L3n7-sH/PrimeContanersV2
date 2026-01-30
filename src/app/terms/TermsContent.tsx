"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
    FileText,
    Building2,
    Scale,
    Globe,
    AlertCircle,
    Shield,
    Clock,
    Mail,
    Phone,
    ArrowRight
} from "lucide-react";

// Animation variants
const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const TermsContent = () => {
    return (
        <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
            {/* Hero Section */}
            <div className="relative h-[400px] md:h-[450px] flex items-center justify-center overflow-hidden">
                <Image
                    src="/images/legal/terms-hero.png"
                    alt="Terms of Service"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-blue-800/70 to-blue-900/80" />
                <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl" />

                <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-blue-100 font-semibold text-sm mb-6"
                    >
                        <Scale className="w-4 h-4" />
                        Legal Information
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight"
                    >
                        Terms of Service
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-blue-100 leading-relaxed max-w-2xl mx-auto"
                    >
                        Please read these terms carefully before using our services.
                    </motion.p>

                    {/* Last Updated */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="mt-8 flex items-center justify-center gap-2 text-blue-200"
                    >
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">Last Updated: January 29, 2026</span>
                    </motion.div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-4 py-12 md:py-16">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    className="space-y-12"
                >
                    {/* Introduction */}
                    <motion.section variants={fadeInUp}>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                                <FileText className="w-5 h-5 text-blue-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Introduction</h2>
                        </div>
                        <div className="prose prose-lg text-gray-600 max-w-none">
                            <p>
                                Welcome to Prime Containers. These Terms of Service ("Terms") govern your use of our website, products, and services. By accessing our website or purchasing our products, you agree to be bound by these Terms. Please read them carefully before using our services.
                            </p>
                            <p>
                                Prime Containers is committed to providing high-quality shipping containers and exceptional customer service. These terms are designed to ensure a clear understanding of our mutual responsibilities and to protect both parties in our business relationship.
                            </p>
                        </div>
                    </motion.section>

                    {/* Products and Services */}
                    <motion.section variants={fadeInUp}>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-cyan-100 flex items-center justify-center">
                                <Building2 className="w-5 h-5 text-cyan-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Products and Services</h2>
                        </div>
                        <div className="prose prose-lg text-gray-600 max-w-none">
                            <p>
                                Prime Containers offers new and used shipping containers for sale and rental. All products are subject to availability and may vary based on location and inventory. We strive to provide accurate descriptions and photographs of our containers, but minor variations may occur due to the nature of used equipment.
                            </p>
                            <h4>Product Conditions</h4>
                            <ul>
                                <li><strong>New/One-Trip Containers:</strong> Containers that have made only one ocean voyage and are in excellent condition.</li>
                                <li><strong>Cargo Worthy:</strong> Used containers that meet international shipping standards and are certified for ocean transport.</li>
                                <li><strong>Wind & Water Tight:</strong> Used containers suitable for storage that may have cosmetic wear but are structurally sound and weatherproof.</li>
                                <li><strong>As-Is:</strong> Containers sold in their current condition, which may require repairs or modifications.</li>
                            </ul>
                        </div>
                    </motion.section>

                    {/* Pricing and Payment */}
                    <motion.section variants={fadeInUp}>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                                <Scale className="w-5 h-5 text-green-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Pricing and Payment</h2>
                        </div>
                        <div className="prose prose-lg text-gray-600 max-w-none">
                            <p>
                                All prices displayed on our website are in US Dollars and are subject to change without notice. Quoted prices are valid for 7 days from the date of the quote unless otherwise specified. Delivery charges are calculated based on your location and will be provided as part of your quote.
                            </p>
                            <p>
                                Payment is due in full before delivery unless alternative payment arrangements have been agreed upon in writing. We accept major credit cards, bank transfers, and certified checks. A deposit may be required to secure your order.
                            </p>
                        </div>
                    </motion.section>

                    {/* Delivery Terms */}
                    <motion.section variants={fadeInUp}>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                                <Globe className="w-5 h-5 text-amber-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Delivery Terms</h2>
                        </div>
                        <div className="prose prose-lg text-gray-600 max-w-none">
                            <p>
                                Delivery times are estimates and may vary based on location, weather conditions, and equipment availability. Once a delivery is scheduled, the customer is responsible for ensuring the delivery site is accessible and prepared according to our delivery guidelines.
                            </p>
                            <p>
                                If delivery cannot be completed due to site access issues, insufficient clearance, or other site-related problems not disclosed prior to delivery, a rescheduling fee may apply. Cancellation of a scheduled delivery with less than 48 hours notice may result in a cancellation fee.
                            </p>
                            <p>
                                For detailed information about preparing your site for delivery, please visit our <Link href="/delivery-guidelines" className="text-blue-600 hover:underline">Delivery Guidelines</Link> page.
                            </p>
                        </div>
                    </motion.section>

                    {/* Returns and Refunds */}
                    <motion.section variants={fadeInUp}>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                                <AlertCircle className="w-5 h-5 text-red-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Returns and Refunds</h2>
                        </div>
                        <div className="prose prose-lg text-gray-600 max-w-none">
                            <p>
                                Due to the nature of our products, all sales are final once delivery has been accepted. Please inspect your container upon delivery and note any concerns with the driver before signing the delivery receipt. Any damage during delivery must be reported within 24 hours.
                            </p>
                            <p>
                                Deposits for orders that are cancelled before delivery may be subject to a cancellation fee. Refunds, when applicable, will be processed within 10-14 business days using the original payment method.
                            </p>
                        </div>
                    </motion.section>

                    {/* Limitation of Liability */}
                    <motion.section variants={fadeInUp}>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                                <Shield className="w-5 h-5 text-purple-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Limitation of Liability</h2>
                        </div>
                        <div className="prose prose-lg text-gray-600 max-w-none">
                            <p>
                                Prime Containers shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your purchase or use of our products. Our total liability shall not exceed the purchase price of the product(s) in question.
                            </p>
                            <p>
                                We are not responsible for any permits, zoning requirements, or local regulations that may apply to the placement or use of shipping containers on your property. It is the customer's responsibility to verify compliance with all applicable laws and regulations.
                            </p>
                        </div>
                    </motion.section>

                    {/* Governing Law */}
                    <motion.section variants={fadeInUp}>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                                <Scale className="w-5 h-5 text-indigo-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Governing Law</h2>
                        </div>
                        <div className="prose prose-lg text-gray-600 max-w-none">
                            <p>
                                These Terms shall be governed by and construed in accordance with the laws of the State of Ohio, United States, without regard to its conflict of law provisions. Any disputes arising from these Terms shall be resolved in the courts located in Ohio.
                            </p>
                        </div>
                    </motion.section>

                    {/* Changes to Terms */}
                    <motion.section variants={fadeInUp}>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                                <Clock className="w-5 h-5 text-gray-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Changes to Terms</h2>
                        </div>
                        <div className="prose prose-lg text-gray-600 max-w-none">
                            <p>
                                We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting to our website. Your continued use of our services after any changes indicates your acceptance of the modified Terms. We encourage you to review these Terms periodically.
                            </p>
                        </div>
                    </motion.section>
                </motion.div>

                {/* Related Links */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mt-12 p-6 bg-gray-50 rounded-2xl border border-gray-200"
                >
                    <p className="text-gray-600 mb-4">
                        See also our <Link href="/privacy" className="text-blue-600 hover:underline font-medium">Privacy Policy</Link> to understand how we collect and protect your data.
                    </p>
                </motion.div>

                {/* Contact Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-8 bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-700 rounded-2xl p-8 md:p-10 text-white"
                >
                    <div className="text-center">
                        <Mail className="w-10 h-10 mx-auto mb-4 text-cyan-300" />
                        <h3 className="text-2xl font-bold mb-3">Questions About Our Terms?</h3>
                        <p className="text-blue-100 mb-6 max-w-xl mx-auto">
                            If you have any questions about our Terms of Service, please don't hesitate to reach out.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="mailto:contact@primecontainers.org"
                                className="inline-flex items-center justify-center gap-2 bg-white text-blue-700 font-bold px-6 py-3 rounded-xl hover:bg-blue-50 transition-all"
                            >
                                <Mail className="w-5 h-5" />
                                contact@primecontainers.org
                            </a>
                            <a
                                href="tel:+16144918402"
                                className="inline-flex items-center justify-center gap-2 bg-white/20 backdrop-blur-sm text-white font-bold px-6 py-3 rounded-xl border border-white/30 hover:bg-white/30 transition-all"
                            >
                                <Phone className="w-5 h-5" />
                                (614) 491-8402
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </main>
    );
};

export default TermsContent;
