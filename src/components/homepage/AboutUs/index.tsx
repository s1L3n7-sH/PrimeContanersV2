"use client";

import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import Image from "next/image";
import React from "react";
import * as motion from "framer-motion/client";
import FeatureCard from "@/components/ui/feature-card";
import {
    Shield,
    Truck,
    Target,
    Award,
    Users,
    TrendingUp,
    CheckCircle2,
    Sparkles
} from "lucide-react";

const AboutUs = () => {
    const features = [
        {
            icon: Shield,
            title: "Built to Last",
            description: "Premium steel construction ensures maximum durability and weather resistance for decades of reliable service."
        },
        {
            icon: Truck,
            title: "Fast Delivery",
            description: "Professional delivery and placement service anywhere in the region with expert precision."
        },
        {
            icon: Target,
            title: "Custom Solutions",
            description: "From standard units to fully customized modifications tailored to your unique requirements."
        },
        {
            icon: Award,
            title: "Industry Leading",
            description: "Over 30,000 satisfied customers trust us for quality containers and exceptional service."
        },
    ];

    const benefits = [
        "Wind & Water-Tight Guarantee",
        "Certified Quality Standards",
        "Flexible Financing Options",
        "Expert Installation Support",
        "Nationwide Delivery Network",
        "24/7 Customer Service"
    ];

    return (
        <section className="relative max-w-frame mx-auto px-4 xl:px-0 py-16 md:py-24 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/30 to-transparent -z-10" />

            {/* Decorative Shapes */}
            <motion.div
                className="absolute top-20 right-10 w-64 h-64 bg-blue-400/5 rounded-full blur-3xl"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                }}
            />

            {/* Section Header */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
            >
                <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-4">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-sm font-bold uppercase tracking-wider">About Prime Containers</span>
                </div>
                <h2 className={cn([
                    integralCF.className,
                    "text-3xl md:text-5xl lg:text-6xl mb-6 bg-gradient-to-r from-gray-900 via-blue-900 to-gray-800 bg-clip-text text-transparent"
                ])}>
                    Your Trusted Container Partner
                </h2>
                <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                    Transforming spaces with <span className="text-blue-600 font-semibold">premium shipping containers</span> designed
                    for durability, flexibility, and innovation.
                </p>
            </motion.div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-2 gap-12 mb-20 items-center">
                {/* Left: Image & Stats */}
                <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="relative"
                >
                    {/* Video Container */}
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                        <video
                            src="/videos/about.mp4"
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover aspect-[4/3]"
                        />
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/30 via-transparent to-cyan-900/20 group-hover:from-blue-900/40 transition-all duration-500" />

                        {/* Floating Stats */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            className="absolute bottom-6 left-6 right-6"
                        >
                            <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-blue-100">
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="text-center">
                                        <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-1">
                                            30K+
                                        </div>
                                        <div className="text-xs text-gray-600 font-medium">Customers</div>
                                    </div>
                                    <div className="text-center border-x border-gray-200">
                                        <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-1">
                                            15+
                                        </div>
                                        <div className="text-xs text-gray-600 font-medium">Years</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-1">
                                            99%
                                        </div>
                                        <div className="text-xs text-gray-600 font-medium">Satisfied</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Right: Content */}
                <motion.div
                    initial={{ x: 50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                >
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                        Engineering Excellence Since 2009
                    </h3>
                    <p className="text-gray-600 text-lg leading-relaxed mb-6">
                        At Prime Containers, we believe that a container is more than just a steel box—it's
                        a <span className="text-blue-600 font-semibold">foundation for innovation</span> and
                        efficiency. Our mission is to provide high-quality, customized, and sustainable container
                        solutions that empower you to build, store, and grow with confidence.
                    </p>
                    <p className="text-gray-600 text-lg leading-relaxed mb-8">
                        From bespoke architectural modifications to heavy-duty industrial units, our commitment
                        to <span className="text-cyan-600 font-semibold">precision engineering</span> ensures
                        that every container we deliver meets the highest standards of durability and functionality.
                    </p>

                    {/* Benefits List */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {benefits.map((benefit, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                                className="flex items-center gap-3 group"
                            >
                                <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <CheckCircle2 className="w-4 h-4 text-white" strokeWidth={3} />
                                </div>
                                <span className="text-gray-700 font-medium">{benefit}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Features Grid */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-16"
            >
                <div className="text-center mb-12">
                    <h3 className={cn([
                        integralCF.className,
                        "text-3xl md:text-4xl mb-4 text-gray-900"
                    ])}>
                        Why Choose Prime Containers
                    </h3>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        We deliver excellence through every container, combining quality craftsmanship with exceptional service
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <FeatureCard
                            key={index}
                            icon={feature.icon}
                            title={feature.title}
                            description={feature.description}
                            index={index}
                        />
                    ))}
                </div>
            </motion.div>

            {/* CTA Section */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-700 rounded-3xl p-8 md:p-12 overflow-hidden"
            >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
                        backgroundSize: '30px 30px'
                    }} />
                </div>

                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="text-center md:text-left">
                        <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
                            Ready to Get Started?
                        </h3>
                        <p className="text-blue-100 text-lg">
                            Let's discuss your container needs and find the perfect solution for you.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <a
                            href="/#quote"
                            className="group inline-flex items-center justify-center gap-2 bg-white text-blue-700 font-bold px-8 py-4 rounded-xl hover:bg-blue-50 transition-all duration-300 shadow-xl whitespace-nowrap"
                        >
                            Get Free Quote
                            <motion.span
                                animate={{ x: [0, 5, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                →
                            </motion.span>
                        </a>
                        <a
                            href="tel:+1234567890"
                            className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-bold px-8 py-4 rounded-xl hover:bg-white/20 transition-all duration-300 whitespace-nowrap"
                        >
                            📞 (123) 456-7890
                        </a>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default AboutUs;
