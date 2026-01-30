"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
    Shield,
    Lock,
    Eye,
    Users,
    Mail,
    Phone,
    CheckCircle2,
    Globe,
    Clock
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

const PrivacyContent = () => {
    return (
        <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
            {/* Hero Section */}
            <div className="relative h-[400px] md:h-[450px] flex items-center justify-center overflow-hidden">
                <Image
                    src="/images/legal/privacy-hero.png"
                    alt="Privacy Policy"
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
                        <Shield className="w-4 h-4" />
                        Your Privacy Matters
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight"
                    >
                        Privacy Policy
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-blue-100 leading-relaxed max-w-2xl mx-auto"
                    >
                        Learn how we collect, use, and protect your personal information.
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
                    {/* Privacy Overview */}
                    <motion.section variants={fadeInUp}>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                                <Shield className="w-5 h-5 text-blue-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Privacy Overview</h2>
                        </div>
                        <div className="prose prose-lg text-gray-600 max-w-none">
                            <p>
                                At Prime Containers, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or purchase our products. Please read this policy carefully to understand our practices regarding your personal data.
                            </p>
                        </div>
                        <div className="mt-6 grid sm:grid-cols-3 gap-4">
                            <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl border border-green-100">
                                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                                <span className="font-medium text-green-800">No Data Selling</span>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl border border-green-100">
                                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                                <span className="font-medium text-green-800">Secure Encryption</span>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl border border-green-100">
                                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                                <span className="font-medium text-green-800">Your Control</span>
                            </div>
                        </div>
                    </motion.section>

                    {/* Information We Collect */}
                    <motion.section variants={fadeInUp}>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-cyan-100 flex items-center justify-center">
                                <Eye className="w-5 h-5 text-cyan-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Information We Collect</h2>
                        </div>
                        <div className="prose prose-lg text-gray-600 max-w-none">
                            <h4>Personal Information</h4>
                            <p>When you request a quote, make a purchase, or contact us, we may collect:</p>
                            <ul>
                                <li>Name and contact information (email address, phone number, mailing address)</li>
                                <li>Delivery location and site information</li>
                                <li>Payment information (credit card details are processed securely and not stored on our servers)</li>
                                <li>Communication preferences</li>
                            </ul>

                            <h4>Automatically Collected Information</h4>
                            <p>When you visit our website, we may automatically collect:</p>
                            <ul>
                                <li>IP address and browser type</li>
                                <li>Device information and operating system</li>
                                <li>Pages visited and time spent on our website</li>
                                <li>Referring website addresses</li>
                            </ul>
                        </div>
                    </motion.section>

                    {/* How We Use Information */}
                    <motion.section variants={fadeInUp}>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                                <Users className="w-5 h-5 text-green-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">How We Use Your Information</h2>
                        </div>
                        <div className="prose prose-lg text-gray-600 max-w-none">
                            <p>We use the information we collect to:</p>
                            <ul>
                                <li>Process your orders and arrange delivery</li>
                                <li>Respond to your inquiries and provide customer support</li>
                                <li>Send you quotes, order confirmations, and delivery updates</li>
                                <li>Improve our website, products, and services</li>
                                <li>Send promotional communications (with your consent)</li>
                                <li>Comply with legal obligations and protect our rights</li>
                            </ul>
                        </div>
                    </motion.section>

                    {/* Information Sharing */}
                    <motion.section variants={fadeInUp}>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                                <Globe className="w-5 h-5 text-amber-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Information Sharing</h2>
                        </div>
                        <div className="prose prose-lg text-gray-600 max-w-none">
                            <p>
                                We do not sell, trade, or rent your personal information to third parties. We may share your information with:
                            </p>
                            <ul>
                                <li><strong>Service Providers:</strong> Trusted third parties who assist in operating our business (payment processors, delivery partners, etc.)</li>
                                <li><strong>Legal Requirements:</strong> When required by law, court order, or government regulation</li>
                                <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                            </ul>
                            <p>
                                All service providers are contractually obligated to protect your information and use it only for the purposes we specify.
                            </p>
                        </div>
                    </motion.section>

                    {/* Data Security */}
                    <motion.section variants={fadeInUp}>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                                <Lock className="w-5 h-5 text-purple-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Data Security</h2>
                        </div>
                        <div className="prose prose-lg text-gray-600 max-w-none">
                            <p>
                                We implement industry-standard security measures to protect your personal information, including:
                            </p>
                            <ul>
                                <li>SSL/TLS encryption for data transmission</li>
                                <li>Secure payment processing (PCI-DSS compliant)</li>
                                <li>Regular security assessments and updates</li>
                                <li>Limited access to personal information on a need-to-know basis</li>
                            </ul>
                            <p>
                                While we strive to protect your information, no method of transmission over the internet or electronic storage is 100% secure. We encourage you to take steps to protect your personal information as well.
                            </p>
                        </div>
                    </motion.section>

                    {/* Your Rights */}
                    <motion.section variants={fadeInUp}>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                                <Users className="w-5 h-5 text-blue-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Your Rights</h2>
                        </div>
                        <div className="prose prose-lg text-gray-600 max-w-none">
                            <p>You have the right to:</p>
                            <ul>
                                <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
                                <li><strong>Correction:</strong> Request that we correct any inaccurate information</li>
                                <li><strong>Deletion:</strong> Request that we delete your personal information (subject to legal obligations)</li>
                                <li><strong>Opt-Out:</strong> Unsubscribe from marketing communications at any time</li>
                            </ul>
                            <p>
                                To exercise any of these rights, please contact us using the information provided below.
                            </p>
                        </div>
                    </motion.section>

                    {/* Cookies */}
                    <motion.section variants={fadeInUp}>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                                <Globe className="w-5 h-5 text-gray-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Cookies and Tracking</h2>
                        </div>
                        <div className="prose prose-lg text-gray-600 max-w-none">
                            <p>
                                Our website uses cookies and similar tracking technologies to enhance your browsing experience, analyze website traffic, and understand where our visitors come from. You can control cookie preferences through your browser settings.
                            </p>
                            <p>
                                We may use analytics tools such as Google Analytics to help us understand how visitors use our website. These tools collect information sent by your browser, including the pages you visit and other information that assists us in improving our services.
                            </p>
                        </div>
                    </motion.section>

                    {/* Children's Privacy */}
                    <motion.section variants={fadeInUp}>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-pink-100 flex items-center justify-center">
                                <Shield className="w-5 h-5 text-pink-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Children's Privacy</h2>
                        </div>
                        <div className="prose prose-lg text-gray-600 max-w-none">
                            <p>
                                Our website and services are not intended for children under the age of 18. We do not knowingly collect personal information from children. If you believe we have inadvertently collected information from a child, please contact us immediately so we can delete it.
                            </p>
                        </div>
                    </motion.section>

                    {/* Changes to Policy */}
                    <motion.section variants={fadeInUp}>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                                <Clock className="w-5 h-5 text-indigo-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Changes to This Policy</h2>
                        </div>
                        <div className="prose prose-lg text-gray-600 max-w-none">
                            <p>
                                We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically to stay informed about how we protect your information.
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
                        See also our <Link href="/terms" className="text-blue-600 hover:underline font-medium">Terms of Service</Link> to understand the terms and conditions for using our services.
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
                        <h3 className="text-2xl font-bold mb-3">Questions About Your Privacy?</h3>
                        <p className="text-blue-100 mb-6 max-w-xl mx-auto">
                            If you have any questions about our Privacy Policy or how we handle your data, please don't hesitate to reach out.
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

export default PrivacyContent;
