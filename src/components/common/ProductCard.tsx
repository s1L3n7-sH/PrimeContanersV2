"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product.types";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Star } from "lucide-react";

type ProductCardProps = {
  data: Product;
  index?: number;
};

const ProductCard = ({ data, index = 0 }: ProductCardProps) => {
  return (
    <motion.div
      className="flex flex-col h-full group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        delay: index * 0.1,
        duration: 0.6,
        type: "spring",
        stiffness: 100
      }}
    >
      <Link
        href={`/shop/product/${data.id}/${data.title.split(" ").join("-")}`}
        className="flex flex-col h-full"
      >
        {/* Image Container */}
        <motion.div
          className="relative w-full aspect-square mb-4 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 shadow-md group-hover:shadow-xl transition-all duration-500"
          whileHover={{ y: -4 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {/* Product Image */}
          <motion.div
            className="relative w-full h-full flex items-center justify-center p-0"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
          >
            <Image
              src={data.srcUrl}
              width={320}
              height={320}
              className="w-full h-full object-cover drop-shadow-md"
              alt={data.title}
              priority
            />
          </motion.div>

          {/* Subtle gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-blue-600/0 via-transparent to-transparent group-hover:from-blue-600/10 transition-all duration-500" />

          {/* Featured badge */}
          {index < 3 && (
            <motion.div
              className="absolute top-3 left-3"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
            >
              <div className="flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                <Sparkles className="w-3 h-3" />
                Sample Picture
              </div>
            </motion.div>
          )}

          {/* Rating Badge */}
          {data.rating && (
            <motion.div
              className="absolute top-3 right-3"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.4, duration: 0.5 }}
            >
              <div className="flex items-center gap-1 bg-white/95 backdrop-blur-sm text-gray-900 text-xs font-bold px-2.5 py-1.5 rounded-full shadow-md">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span>{data.rating}</span>
              </div>
            </motion.div>
          )}

          {/* Subtle border on hover */}
          <div className="absolute inset-0 ring-2 ring-blue-500/0 group-hover:ring-blue-500/20 rounded-2xl transition-all duration-500" />
        </motion.div>

        {/* Product Info - Fixed height for alignment */}
        <div className="flex flex-col flex-grow">
          {/* Product Title - Fixed height */}
          <motion.h3
            className="text-gray-900 text-base md:text-lg font-bold mb-3 line-clamp-2 min-h-[3.5rem] group-hover:text-blue-600 transition-colors duration-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.5 }}
          >
            {data.title}
          </motion.h3>

          {/* Elegant Underline Effect */}
          <div className="relative w-full mb-3">
            {/* Base line */}
            <div className="w-full h-px bg-gray-200" />
            {/* Animated gradient line */}
            <div className="absolute top-0 left-0 h-px w-0 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600 group-hover:w-full transition-all duration-700 ease-out" />
          </div>

          {/* View Details Button - Always at bottom */}
          <motion.div
            className="mt-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.6 }}
          >
            <div className="group/btn inline-flex items-center gap-2 text-sm font-bold text-blue-600 transition-all duration-300">
              <span>View Details</span>
              <motion.div
                className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center group-hover/btn:bg-blue-600 transition-all duration-300"
                whileHover={{ scale: 1.1, rotate: 45 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowRight className="w-4 h-4 text-blue-600 group-hover/btn:text-white transition-all" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
