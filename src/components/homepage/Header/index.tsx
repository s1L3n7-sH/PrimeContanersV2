"use client";

import { cn } from "@/lib/utils";
import { satoshi } from "@/styles/fonts";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import * as motion from "framer-motion/client";
import VideoWithFallback from "./VideoWithFallback";
import {
  ChevronRight,
  Play,
  CheckCircle2,
  TrendingUp,
  Shield,
  Star,
  Truck,
  Phone
} from "lucide-react";

const Header = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const words = ["Premium Quality", "Built to Last", "Nationwide Delivery", "Custom Solutions"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    { icon: Shield, text: "Wind & Water-Tight Guarantee" },
    { icon: TrendingUp, text: "Thousands of Satisfied Customers" },
    { icon: Star, text: "Industry-Leading Quality" },
  ];

  return (
    <header className="relative min-h-[100vh] flex items-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-blue-950">
      {/* Video Background with Enhanced Overlay */}
      <div className="absolute inset-0 w-full h-full">
        <VideoWithFallback />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/95 via-slate-900/90 to-cyan-900/95" />

        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }} />
        </div>

        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full"
            initial={{
              x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : 0,
              y: typeof window !== 'undefined' ? Math.random() * window.innerHeight : 0,
              opacity: Math.random() * 0.5 + 0.2,
            }}
            animate={{
              y: [null, Math.random() * -100 - 50],
              opacity: [null, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 rounded-full px-4 py-2 mb-6"
            >
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-blue-100">Trusted Industry Leader</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className={cn([
                satoshi.className,
                "text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white mb-6 leading-tight"
              ])}
            >
              Professional
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-sky-400 bg-clip-text text-transparent">
                Shipping Containers
              </span>
            </motion.h1>

            {/* Rotating Features */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mb-8 h-12 flex items-center"
            >
              <motion.div
                key={currentWordIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex items-center gap-3 text-xl font-semibold text-blue-200"
              >
                <CheckCircle2 className="w-6 h-6 text-green-400" />
                {words[currentWordIndex]}
              </motion.div>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl leading-relaxed"
            >
              Transform your space with our meticulously engineered containers.
              <span className="text-white font-semibold"> From storage solutions to custom builds</span>,
              we deliver excellence nationwide.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 mb-10"
            >
              <Link
                href="/shop"
                className="group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold text-base sm:text-lg px-8 py-4 rounded-xl shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">
                  View Containers
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>

              <a
                href="tel:+1234567890"
                className="group inline-flex items-center justify-center gap-3 bg-white/10 backdrop-blur-md border-2 border-white/30 hover:bg-white/20 text-white font-bold text-base sm:text-lg px-8 py-4 rounded-xl transition-all duration-300"
              >
                <Phone className="w-5 h-5" />
                <span>(614)491-8402</span>
              </a>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4"
            >
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-gray-300">
                  <feature.icon className="w-5 h-5 text-blue-400 flex-shrink-0" />
                  <span>{feature.text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Interactive Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="hidden lg:flex flex-col gap-4"
          >
            {/* Featured Container Card */}
            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              className="relative bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-xl border border-white/20 rounded-2xl p-6 overflow-hidden group cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-cyan-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">40ft High Cube</h3>
                    <p className="text-blue-200 text-sm">Most Popular Choice</p>
                  </div>
                  <div className="bg-green-500/20 text-green-300 text-xs font-bold px-3 py-1 rounded-full border border-green-400/30">
                    In Stock
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="text-2xl font-bold text-white">340 sq ft</div>
                    <div className="text-xs text-gray-400">Storage Space</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="text-2xl font-bold text-white">9.5 ft</div>
                    <div className="text-xs text-gray-400">Interior Height</div>
                  </div>
                </div>

                <button className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-3 rounded-lg transition-all duration-300 border border-white/20">
                  View Details
                </button>
              </div>

              {/* Decorative Element */}
              <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl" />
            </motion.div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-xl border border-white/20 rounded-xl p-4"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-5 h-5 text-yellow-400" fill="currentColor" />
                  <span className="text-2xl font-bold text-white">4.9</span>
                </div>
                <p className="text-sm text-gray-300">Customer Rating</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-blue-500/20 to-sky-500/20 backdrop-blur-xl border border-white/20 rounded-xl p-4"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Truck className="w-5 h-5 text-blue-400" />
                  <span className="text-2xl font-bold text-white">24hr</span>
                </div>
                <p className="text-sm text-gray-300">Fast Delivery</p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        {/* <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-sm text-gray-400">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-1"
          >
            <div className="w-1.5 h-3 bg-white rounded-full" />
          </motion.div>
        </motion.div> */}
      </div>
    </header>
  );
};

export default Header;