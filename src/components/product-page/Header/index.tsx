"use client";

import React from "react";
import PhotoSection from "./PhotoSection";
import { Product } from "@/types/product.types";
import { satoshi } from "@/styles/fonts";
import { cn } from "@/lib/utils";
import AddToCardSection from "./AddToCardSection";
import * as motion from "framer-motion/client";
import { CheckCircle2, Package, ShieldCheck, Truck } from "lucide-react";

const Header = ({ data }: { data: Product }) => {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-10">
        {/* Left Column - Photos */}
        <div>
          <PhotoSection data={data} />
        </div>

        {/* Right Column - Product Info */}
        <div className="flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              {data.inStock && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 border border-green-200 uppercase tracking-wide">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  In Stock
                </span>
              )}
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-100 uppercase tracking-wide">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified Quality
              </span>
            </div>

            {/* Title */}
            <h1
              className={cn(
                satoshi.className,
                "text-3xl md:text-4xl lg:text-5xl leading-tight mb-4 font-black text-gray-900"
              )}
            >
              {data.title}
            </h1>

            {/* Rating - Placeholder for now if needed, or remove if not using */}
            {/* <div className="flex items-center gap-2 mb-6">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-sm text-gray-500 font-medium">(4.8/5 Customer Rating)</span>
            </div> */}

            {/* Description Card */}
            <div className="bg-white rounded-2xl p-6 border border-blue-50 shadow-sm mb-8">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Package className="w-4 h-4 text-blue-600" />
                Description
              </h3>
              <p className="text-gray-600 leading-relaxed text-base whitespace-pre-line">
                {data.description || "This premium container offers a robust solution for your storage needs. Built with high-grade steel and designed for durability, it's perfect for both personal and commercial use."}
              </p>
            </div>

            {/* Key Features (Static for now, can be dynamic) */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-50/50 border border-blue-100">
                <div className="p-2 bg-white rounded-lg shadow-sm text-blue-600">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Watertight</h4>
                  <p className="text-xs text-gray-500 mt-0.5">Guaranteed leak-proof</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-50/50 border border-blue-100">
                <div className="p-2 bg-white rounded-lg shadow-sm text-blue-600">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Delivery</h4>
                  <p className="text-xs text-gray-500 mt-0.5">Nationwide shipping</p>
                </div>
              </div>
            </div>

            <hr className="h-px bg-gradient-to-r from-transparent via-blue-100 to-transparent border-none mb-8" />

            {/* Add to Cart Section */}
            <AddToCardSection data={data} />
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Header;
