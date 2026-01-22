"use client";

import React from 'react';
import { motion } from 'framer-motion';
import {
    Package,
    Truck,
    Shield,
    Zap,
    CheckCircle2,
    Award,
    Container,
    Box
} from 'lucide-react';

const FloatingIcons = () => {
    const icons = [
        { Icon: Package, position: { top: '10%', left: '5%' }, delay: 0 },
        { Icon: Truck, position: { top: '20%', right: '8%' }, delay: 0.2 },
        { Icon: Shield, position: { bottom: '25%', left: '10%' }, delay: 0.4 },
        { Icon: Zap, position: { top: '60%', right: '15%' }, delay: 0.6 },
        { Icon: CheckCircle2, position: { top: '45%', left: '8%' }, delay: 0.8 },
        { Icon: Award, position: { bottom: '15%', right: '12%' }, delay: 1 },
        { Icon: Container, position: { top: '35%', right: '5%' }, delay: 1.2 },
        { Icon: Box, position: { bottom: '40%', left: '15%' }, delay: 1.4 },
    ];

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {icons.map((item, index) => (
                <motion.div
                    key={index}
                    className="absolute"
                    style={item.position}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                        opacity: [0.1, 0.3, 0.1],
                        scale: [1, 1.2, 1],
                        rotate: [0, 360],
                    }}
                    transition={{
                        delay: item.delay,
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    <item.Icon className="w-12 h-12 md:w-16 md:h-16 text-blue-400/30" strokeWidth={1.5} />
                </motion.div>
            ))}
        </div>
    );
};

export default FloatingIcons;
