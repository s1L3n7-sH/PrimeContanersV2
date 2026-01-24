"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Linkedin, Twitter, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import Image from "next/image";

// Placeholder data - User can replace these with real details later
const teamMembers = [
    {
        id: 1,
        name: "William McGhee",
        role: "Founder & CEO",
        bio: "Visionary leader with 15+ years in logistics and container solutions.",
        email: "william@primecontainers.com",
        phone: "(555) 123-4567",
        image: null, // Placeholder will be used
        color: "from-blue-500 to-cyan-500",
    },
    {
        id: 2,
        name: "Heather Mchezron",
        role: "Head of Sales",
        bio: "Expert in finding the perfect container solution for any project scale.",
        email: "heather@primecontainers.com",
        phone: "(555) 234-5678",
        image: null,
        color: "from-indigo-500 to-purple-500",
    },
    {
        id: 3,
        name: "Raffy Suarez",
        role: "IT Personel",
        bio: "Maintains our digital infrastructure to ensure seamless operations and security.",
        email: "raffy@primecontainers.com",
        phone: "(555) 345-6789",
        image: null,
        color: "from-cyan-500 to-teal-500",
    },
];

const TeamSection = () => {
    return (
        <section className="py-24 bg-white overflow-hidden relative">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50" />
            <div className="absolute top-40 -left-20 w-72 h-72 bg-cyan-50 rounded-full blur-3xl opacity-50" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-4">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm font-bold uppercase tracking-wider">Our Team</span>
                    </div>
                    <h2 className={cn([
                        integralCF.className,
                        "text-3xl md:text-5xl lg:text-6xl mb-4 bg-gradient-to-r from-gray-900 via-blue-900 to-gray-800 bg-clip-text text-transparent"
                    ])}>
                        Meet the Workforce
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Our dedicated team of professionals is committed to delivering excellence
                        in every container solution we provide.
                    </p>
                </motion.div>

                {/* Team Grid */}
                <div className="flex flex-wrap justify-center gap-8 items-stretch">
                    {teamMembers.map((member, idx) => (
                        <motion.div
                            key={member.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 0.5 }}
                            whileHover={{ y: -10 }}
                            className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col w-full md:w-[calc(50%-2rem)] lg:w-[calc(25%-1.5rem)]"
                        >
                            {/* Image Area */}
                            <div className="relative w-32 h-32 mx-auto mb-6">
                                <div
                                    className={`absolute inset-0 rounded-full bg-gradient-to-br ${member.color} blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300`}
                                />
                                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-md bg-gray-50 flex items-center justify-center">
                                    {member.image ? (
                                        <Image
                                            src={member.image}
                                            alt={member.name}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className={`w-full h-full bg-gradient-to-br ${member.color} flex items-center justify-center text-white`}>
                                            <span className="text-3xl font-bold">
                                                {member.name
                                                    .split(" ")
                                                    .map((n) => n[0])
                                                    .join("")}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Status Indicator */}
                                <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-sm" title="Online" />
                            </div>

                            {/* Info */}
                            <div className="text-center flex-1 flex flex-col">
                                <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                                    {member.name}
                                </h3>
                                <p className="text-sm font-medium text-gray-500 mb-4 uppercase tracking-wide">
                                    {member.role}
                                </p>
                                <p className="text-sm text-gray-600 mb-6 leading-relaxed hidden md:block">
                                    {member.bio}
                                </p>

                                {/* Contact Actions */}
                                <div className="flex items-center justify-center gap-3 mt-auto">
                                    <a
                                        href={`mailto:${member.email}`}
                                        className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300"
                                        title="Send Email"
                                    >
                                        <Mail className="w-4 h-4" />
                                    </a>
                                    <a
                                        href={`tel:${member.phone}`}
                                        className="p-2 rounded-full bg-cyan-50 text-cyan-600 hover:bg-cyan-600 hover:text-white transition-all duration-300"
                                        title="Call"
                                    >
                                        <Phone className="w-4 h-4" />
                                    </a>
                                    <a
                                        href="#"
                                        className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-800 hover:text-white transition-all duration-300"
                                        title="LinkedIn"
                                    >
                                        <Linkedin className="w-4 h-4" />
                                    </a>
                                </div>
                            </div>

                            {/* Hover Overlay Line */}
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 group-hover:w-1/2 transition-all duration-300 rounded-t-full" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TeamSection;
