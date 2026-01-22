"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
    icon: LucideIcon;
    title: string;
    description: string;
    index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{
                y: -10,
                transition: { duration: 0.3 }
            }}
            className="group relative"
        >
            <div className="relative h-full bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden">
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Animated icon background */}
                <motion.div
                    className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full opacity-20"
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                <div className="relative z-10">
                    <motion.div
                        className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mb-6 shadow-lg"
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Icon className="w-8 h-8 text-white" strokeWidth={2} />
                    </motion.div>

                    <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                        {title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                        {description}
                    </p>
                </div>

                {/* Bottom accent line */}
                <motion.div
                    className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-600"
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                />
            </div>
        </motion.div>
    );
};

export default FeatureCard;
