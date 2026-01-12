"use client";

import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { integralCF, satoshi } from "@/styles/fonts";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import * as motion from "framer-motion/client";
import VideoWithFallback from "./VideoWithFallback";

const Header = () => {
  return (
    <header className="pt-[100px] md:pt-[100px] overflow-hidden relative ">
      {/* Video background */}
      <div className="absolute inset-0 w-full h-full -z-10">
        <VideoWithFallback />
        {/* Darker overlay to ensure text remains readable over video */}
        <div className="absolute inset-0" style={{ backgroundColor: '#202022', opacity: 0.65 }} />
      </div>
      <div className="md:max-w-frame mx-auto px-4 h-[100vh]">
        <section className="max-w-frame px-4 flex flex-col items-center text-center">
          <motion.h2
            initial={{ y: "100px", opacity: 0 }}
            whileInView={{ y: "0", opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={cn([
              satoshi.className,
              "text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white font-bold mb-6",
            ])}
          >
            Shipping Container Sales, Rentals & Mods
          </motion.h2>
          <motion.p
            initial={{ y: "100px", opacity: 0 }}
            whileInView={{ y: "0", opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
            className="text-white/90 text-base md:text-lg mb-8 max-w-[500px] opacity-90"
          >
            Browse through our diverse range of meticulously engineered containers, designed to meet your operational needs and enhance efficiency across every application.
          </motion.p>
          <motion.div
            initial={{ y: "100px", opacity: 0 }}
            whileInView={{ y: "0", opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
          >
            <Link
              href="/shop"
              className="w-full md:w-52 mb-5 md:mb-12 inline-block text-center bg-[#2c2c9c] text-white font-bold hover:bg-[#2c2c9c]/90 transition-all duration-300 font-medium px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition duration-300 ease-in-out"
            >
              Buy Now
            </Link>
          </motion.div>
          
        </section>
       
      </div>
    </header>
  );
};

export default Header;