"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import {
    Truck,
    MapPin,
    AlertTriangle,
    CheckCircle2,
    ChevronDown,
    Ruler,
    TreeDeciduous,
    Mountain,
    RotateCcw,
    CloudRain,
    Package,
    Phone,
    ArrowRight,
    Clock,
    Shield,
    FileCheck,
    Sparkles,
    CircleDot
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

// FAQ Data with expanded content
const faqs = [
    {
        question: "What's included in my delivery cost?",
        answer: "Your container quote includes delivery to your location. Final pricing varies based on distance from our nearest depot and container size. We believe in straightforward, transparent pricing with no hidden fees or surprise charges. Simply enter your ZIP code on any product page to receive an accurate, instant estimate. Our team is also available to provide custom quotes for unique delivery situations or remote locations."
    },
    {
        question: "When can I expect my container to arrive?",
        answer: "Standard delivery typically takes 7-10 business days from order confirmation, though many deliveries happen sooner depending on your location and our current inventory. Timing can vary based on your region, weather conditions, and current demand. Our dedicated logistics team will reach out within 24-48 hours of your order to schedule a delivery window that works best for your schedule. We'll also call you the day before delivery to confirm timing."
    },
    {
        question: "Are permits or foundations necessary?",
        answer: "Most residential and commercial locations don't require a permanent foundation — level surfaces like packed earth, gravel pads, or concrete work great for container placement. For foundations, we recommend either a compacted gravel pad (6-8 inches deep) or concrete railroad ties at each corner for optimal drainage and stability. Permit requirements differ by municipality, so we strongly suggest checking with your local building department before delivery. Our team is happy to provide guidance based on your specific location."
    },
    {
        question: "Can I specify door placement direction?",
        answer: "Absolutely! During checkout, you can indicate your preferred door orientation — whether you want the doors facing toward or away from your property, driveway, or access point. This helps us load the container correctly on our trailer so it's positioned exactly how you need it upon drop-off. If you're unsure, our delivery coordinator will discuss options with you when scheduling."
    },
    {
        question: "What happens if my location isn't suitable?",
        answer: "If our driver arrives and determines the site is inaccessible or unsafe for delivery, we'll need to reschedule for a later date. To avoid any rescheduling fees (typically $150-250 depending on distance), please notify us at least 48 hours in advance if there are any changes to your site conditions, access routes, or if you need more time to prepare the drop zone."
    },
    {
        question: "Do you deliver to all 50 states?",
        answer: "We currently deliver throughout the contiguous United States, with depot locations strategically placed to serve most areas efficiently. Delivery to Alaska, Hawaii, and remote locations may require special arrangements and additional logistics planning. Contact our team for specific availability and pricing for your area."
    }
];

const DeliveryGuidelinesContent = () => {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
            {/* Hero Section - Similar to Rental Page */}
            <div className="relative h-[450px] flex items-center justify-center overflow-hidden">
                <Image
                    src="/images/delivery/hero.png"
                    alt="Container Delivery"
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
                        <Truck className="w-4 h-4" />
                        Delivery Information
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-7xl font-extrabold text-white mb-6 tracking-tight drop-shadow-lg"
                    >
                        Delivery Guidelines
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl md:text-2xl text-gray-200 leading-relaxed max-w-2xl mx-auto drop-shadow-md"
                    >
                        Everything you need to know to prepare for a smooth, hassle-free container delivery experience.
                    </motion.p>
                </div>
            </div>

            {/* Introduction Section */}
            <section className="py-20 md:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="grid lg:grid-cols-2 gap-12 items-center"
                    >
                        <motion.div variants={fadeInUp}>
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100 text-blue-700 mb-4">
                                <Sparkles className="w-4 h-4" />
                                <span className="text-sm font-semibold">Before You Order</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                Planning Your Container Delivery
                            </h2>
                            <div className="prose prose-lg text-gray-600 space-y-4">
                                <p>
                                    Receiving a shipping container at your home or business is an exciting step toward gaining secure, weatherproof storage. However, proper preparation is essential to ensure a seamless delivery process. Our professional drivers handle hundreds of deliveries each month, and they've helped us identify the key factors that make the difference between a quick drop-off and a complicated situation.
                                </p>
                                <p>
                                    This comprehensive guide covers everything from space requirements and ground conditions to road access and what to expect on delivery day. Taking a few minutes to review these guidelines now can save you time, money, and potential headaches later.
                                </p>
                            </div>
                            <div className="mt-8 flex flex-wrap gap-4">
                                <div className="flex items-center gap-2 text-gray-700">
                                    <Clock className="w-5 h-5 text-blue-600" />
                                    <span className="font-medium">7-10 Day Delivery</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-700">
                                    <Shield className="w-5 h-5 text-blue-600" />
                                    <span className="font-medium">Insured Transit</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-700">
                                    <FileCheck className="w-5 h-5 text-blue-600" />
                                    <span className="font-medium">Free Estimates</span>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div variants={fadeInUp} className="relative lg:min-h-[450px]">
                            <div className="relative h-[450px] rounded-2xl overflow-hidden shadow-2xl">
                                <Image
                                    src="/images/delivery/container-placement.png"
                                    alt="Container successfully delivered"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-lg border border-gray-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                                        <CheckCircle2 className="w-6 h-6 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900">10,000+</p>
                                        <p className="text-sm text-gray-500">Successful Deliveries</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Space Requirements Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                    >
                        <motion.div variants={fadeInUp} className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Space & Clearance Requirements
                            </h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                Understanding the space needed for both the delivery truck and your container ensures a smooth drop-off process.
                            </p>
                        </motion.div>

                        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
                            <motion.div variants={fadeInUp} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 h-full">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                                        <Package className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900">20-Foot Container Requirements</h3>
                                </div>
                                <div className="space-y-4 text-gray-600">
                                    <p>
                                        A standard 20-foot shipping container measures approximately 20 feet long, 8 feet wide, and 8.5 feet tall. While the container itself is compact, the delivery process requires significantly more space for the truck to maneuver and position the unit properly.
                                    </p>
                                    <ul className="space-y-3">
                                        <li className="flex items-start gap-3">
                                            <CircleDot className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                            <span><strong>Forward Clearance:</strong> Minimum 80-100 feet of straight, unobstructed space in front of the drop location for the truck to back in and slide the container off.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <CircleDot className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                            <span><strong>Road Height:</strong> At least 14 feet of vertical clearance along the entire access route to accommodate the truck and loaded container.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <CircleDot className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                            <span><strong>Path Width:</strong> 12-14 feet of horizontal clearance for the delivery vehicle to navigate safely without damaging property.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <CircleDot className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                            <span><strong>Drop Zone Height:</strong> 16 feet of overhead clearance at the final placement location to allow the truck bed to tilt.</span>
                                        </li>
                                    </ul>
                                </div>
                            </motion.div>

                            <motion.div variants={fadeInUp} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 h-full">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-lg bg-cyan-100 flex items-center justify-center">
                                        <Package className="w-5 h-5 text-cyan-600" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900">40-Foot Container Requirements</h3>
                                </div>
                                <div className="space-y-4 text-gray-600">
                                    <p>
                                        A 40-foot container provides twice the storage capacity but requires additional maneuvering space due to its length. These larger units are transported on extended trailers, which have a wider turning radius and need more room to operate safely.
                                    </p>
                                    <ul className="space-y-3">
                                        <li className="flex items-start gap-3">
                                            <CircleDot className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                                            <span><strong>Forward Clearance:</strong> Minimum 100-125 feet of straight space is essential for the longer trailer to position and unload properly.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <CircleDot className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                                            <span><strong>Road Height:</strong> Same 14-foot minimum vertical clearance applies throughout the delivery route.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <CircleDot className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                                            <span><strong>Path Width:</strong> 12-14 feet of side clearance, with extra caution needed around tight corners and narrow passages.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <CircleDot className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                                            <span><strong>Turning Radius:</strong> Sharp corners require approximately 125 feet of clearance for the extended trailer to navigate.</span>
                                        </li>
                                    </ul>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Road Access Section */}
            <section className="py-16 md:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="grid lg:grid-cols-2 gap-12 items-stretch"
                    >
                        <motion.div variants={fadeInUp} className="order-2 lg:order-1">
                            <div className="relative h-full min-h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                                <Image
                                    src="/images/delivery/road-clearance.png"
                                    alt="Road clearance for container delivery"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="order-1 lg:order-2">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-100 text-amber-700 mb-4">
                                <AlertTriangle className="w-4 h-4" />
                                <span className="text-sm font-semibold">Access Considerations</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                Road & Access Requirements
                            </h2>
                            <div className="prose prose-lg text-gray-600 space-y-4">
                                <p>
                                    Your access road plays a critical role in determining whether delivery can proceed smoothly. Our trucks are heavy-duty commercial vehicles that require stable, well-maintained surfaces to operate safely. Before scheduling delivery, we recommend walking or driving the route yourself to identify any potential obstacles.
                                </p>
                            </div>
                            <div className="mt-6 space-y-4">
                                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                                    <Mountain className="w-6 h-6 text-gray-700 flex-shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-gray-900">Unpaved & Rough Surfaces</h4>
                                        <p className="text-gray-600 mt-1">Gravel, dirt, or deteriorated roads may not support our heavy equipment. Soft or muddy conditions can cause trucks to become stuck, potentially requiring expensive towing services.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                                    <TreeDeciduous className="w-6 h-6 text-gray-700 flex-shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-gray-900">Overhead Obstructions</h4>
                                        <p className="text-gray-600 mt-1">Anything below 14 feet overhead poses a problem — this includes utility lines, tree branches, awnings, covered bridges, and any other structures along your access route.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                                    <RotateCcw className="w-6 h-6 text-gray-700 flex-shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-gray-900">Sharp Turns & Narrow Passages</h4>
                                        <p className="text-gray-600 mt-1">Extended trailers have wide turning radiuses. Sharp 90-degree turns, narrow driveways, or gated entrances may require special coordination or alternate drop locations.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                                    <CloudRain className="w-6 h-6 text-gray-700 flex-shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-gray-900">Weather Conditions</h4>
                                        <p className="text-gray-600 mt-1">Snow, ice, flooding, or recent heavy rain can make roads temporarily impassable. We'll work with you to reschedule if conditions are unsafe on your planned delivery date.</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Delivery Methods Section */}
            <section className="py-16 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                    >
                        <motion.div variants={fadeInUp} className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Delivery Methods Explained
                            </h2>
                            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                                We offer two primary delivery methods to accommodate different site conditions and equipment availability.
                            </p>
                        </motion.div>

                        <div className="grid lg:grid-cols-2 gap-8">
                            <motion.div variants={fadeInUp} className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20">
                                <div className="relative h-56 w-full">
                                    <Image
                                        src="/images/delivery/tilt-bed-delivery.png"
                                        alt="Tilt bed truck delivery"
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent" />
                                </div>
                                <div className="p-8">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                                            <Truck className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-2xl font-bold">Tilt-Bed Delivery</h3>
                                    </div>
                                    <p className="text-blue-100 mb-6 leading-relaxed">
                                        Our most common delivery method uses specialized tilt-bed trailers that hydraulically angle to slide the container directly onto your property. This ground-level placement eliminates the need for cranes, forklifts, or other heavy equipment at your location — making it ideal for residential properties, rural sites, and anywhere without on-site machinery.
                                    </p>
                                    <ul className="space-y-3">
                                        <li className="flex items-start gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                                            <span>Works with both 20-foot and 40-foot containers</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                                            <span>No additional equipment or labor required at your site</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                                            <span>Choose door orientation (facing forward or backward) at checkout</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                                            <span>Typically completed in under 30 minutes once positioned</span>
                                        </li>
                                    </ul>
                                </div>
                            </motion.div>

                            <motion.div variants={fadeInUp} className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20">
                                <div className="relative h-56 w-full">
                                    <Image
                                        src="/images/delivery/flatbed-delivery.png"
                                        alt="Flatbed truck delivery"
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent" />
                                </div>
                                <div className="p-8">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                                            <Package className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-2xl font-bold">Flatbed Delivery</h3>
                                    </div>
                                    <p className="text-blue-100 mb-6 leading-relaxed">
                                        Standard flatbed trailers transport containers to locations equipped with unloading machinery. This method is commonly used at commercial facilities, construction sites, and industrial properties that already have cranes, reach stackers, or heavy forklifts available. Flatbed delivery offers more flexibility in placement since the container can be lifted and positioned precisely.
                                    </p>
                                    <ul className="space-y-3">
                                        <li className="flex items-start gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                                            <span>Requires crane, forklift, or reach stacker at destination</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                                            <span>More precise placement options for challenging locations</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                                            <span>Ideal for stacking containers or elevated placement</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                                            <span>May have shorter lead times in some regions</span>
                                        </li>
                                    </ul>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Site Preparation Section */}
            <section className="py-16 md:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="grid lg:grid-cols-2 gap-12 items-stretch"
                    >
                        <motion.div variants={fadeInUp} className="flex flex-col justify-center">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-100 text-green-700 mb-4">
                                <CheckCircle2 className="w-4 h-4" />
                                <span className="text-sm font-semibold">Site Preparation</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                Preparing Your Drop Zone
                            </h2>
                            <div className="prose prose-lg text-gray-600 space-y-4">
                                <p>
                                    The condition of your placement site directly impacts both the delivery process and the long-term performance of your container. Taking time to properly prepare the drop zone ensures faster delivery, better drainage, and extended container life. Here's our recommended preparation checklist, based on thousands of successful deliveries.
                                </p>
                            </div>
                            <div className="mt-8 space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                                    </div>
                                    <div>
                                        <span className="font-semibold text-gray-900">Level Ground:</span>
                                        <span className="text-gray-600"> Ensure the placement area is as level as possible to prevent container shifting and door alignment issues.</span>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                                    </div>
                                    <div>
                                        <span className="font-semibold text-gray-900">Stable Surface:</span>
                                        <span className="text-gray-600"> Concrete, asphalt, compacted gravel, or firm packed earth all work well. Avoid soft grass or muddy areas.</span>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                                    </div>
                                    <div>
                                        <span className="font-semibold text-gray-900">Clear Debris:</span>
                                        <span className="text-gray-600"> Remove rocks, branches, equipment, vehicles, and any other obstacles from the drop zone and access path.</span>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                                    </div>
                                    <div>
                                        <span className="font-semibold text-gray-900">Overhead Clearance:</span>
                                        <span className="text-gray-600"> Trim tree branches and verify there are no wires, awnings, or structures in the immediate drop area.</span>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                                    </div>
                                    <div>
                                        <span className="font-semibold text-gray-900">Backup Location:</span>
                                        <span className="text-gray-600"> Identify an alternate placement spot in case the primary location has unexpected issues.</span>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                                    </div>
                                    <div>
                                        <span className="font-semibold text-gray-900">Be Present:</span>
                                        <span className="text-gray-600"> Have someone on-site during delivery to direct the driver and make real-time decisions if needed.</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="flex items-center">
                            <div className="relative w-full h-full min-h-[550px] rounded-2xl overflow-hidden shadow-2xl">
                                <Image
                                    src="/images/delivery/ground-preparation.png"
                                    alt="Prepared concrete pad for container"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                    >
                        <motion.div variants={fadeInUp} className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Frequently Asked Questions
                            </h2>
                            <p className="text-xl text-gray-600">
                                Get answers to the most common questions about container delivery.
                            </p>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="space-y-4">
                            {faqs.map((faq, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 }}
                                    className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
                                >
                                    <button
                                        onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                        className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-gray-50 transition-colors"
                                    >
                                        <span className="font-semibold text-gray-900 text-lg">{faq.question}</span>
                                        <ChevronDown className={cn([
                                            "w-5 h-5 text-gray-400 transition-transform duration-300",
                                            openFaq === index && "rotate-180"
                                        ])} />
                                    </button>
                                    <motion.div
                                        initial={false}
                                        animate={{ height: openFaq === index ? "auto" : 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-700 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-400/20 rounded-full blur-2xl" />

                        <div className="relative z-10">
                            <MapPin className="w-12 h-12 mx-auto mb-4 text-cyan-400" />
                            <h2 className="text-2xl md:text-4xl font-bold mb-4">
                                Questions About Your Site?
                            </h2>
                            <p className="text-blue-100 max-w-2xl mx-auto mb-8 text-lg">
                                Unsure if your location will work for container delivery? Our experienced team offers complimentary site evaluations. We'll review your access roads, drop zone conditions, and help you plan for a successful delivery.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href="/#quote"
                                    className="inline-flex items-center justify-center gap-2 bg-white text-blue-700 font-bold px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
                                >
                                    Get a Free Quote
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                                <a
                                    href="tel:+16144918402"
                                    className="inline-flex items-center justify-center gap-2 bg-white/20 backdrop-blur-sm text-white font-bold px-8 py-4 rounded-xl border border-white/30 hover:bg-white/30 transition-all"
                                >
                                    <Phone className="w-5 h-5" />
                                    (614) 491-8402
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </main>
    );
};

export default DeliveryGuidelinesContent;
