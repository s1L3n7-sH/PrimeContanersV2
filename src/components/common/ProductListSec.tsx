import React from "react";
import * as motion from "framer-motion/client";
import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import ProductCard from "./ProductCard";
import { Product } from "@/types/product.types";
import Link from "next/link";
import { ArrowRight, Sparkles, Package } from "lucide-react";

type ProductListSecProps = {
  title: string;
  data: Product[];
  viewAllLink?: string;
};

const ProductListSec = ({ title, data, viewAllLink }: ProductListSecProps) => {
  return (
    <section className="max-w-frame mx-auto py-16 md:py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/30 to-transparent -z-10" />

      {/* Decorative Shapes */}
      <motion.div
        className="absolute -top-20 -right-20 w-72 h-72 bg-cyan-400/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
        }}
      />

      {/* Header Section */}
      <div className="text-center mb-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-4"
        >
          <Package className="w-4 h-4" />
          <span className="text-sm font-bold uppercase tracking-wider">Premium Collection</span>
        </motion.div>

        <motion.h2
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={cn([
            integralCF.className,
            "text-3xl md:text-5xl lg:text-6xl mb-4 bg-gradient-to-r from-gray-900 via-blue-900 to-gray-800 bg-clip-text text-transparent"
          ])}
        >
          {title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto"
        >
          Explore our curated selection of premium shipping containers, each engineered for excellence
        </motion.p>
      </div>

      {/* Products Carousel */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full mb-12"
        >
          <CarouselContent className="mx-4 xl:mx-0 -ml-6">
            {data.map((product, index) => (
              <CarouselItem
                key={product.id}
                className="w-full max-w-[220px] sm:max-w-[320px] pl-6"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: index * 0.1,
                    duration: 0.5,
                    type: "spring",
                    stiffness: 100
                  }}
                >
                  <ProductCard data={product} index={index} />
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* View All Button */}
        {viewAllLink && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="w-full px-4 sm:px-0 text-center"
          >
            <Link
              href={viewAllLink}
              className="group relative inline-flex items-center gap-3 px-8 py-4 overflow-hidden rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-sm sm:text-base shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              {/* Animated background on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Shine effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

              <span className="relative z-10 flex items-center gap-3">
                View All Products
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 transition-colors">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </span>

              {/* Pulse effect */}
              <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-10 group-hover:animate-ping" />
            </Link>
          </motion.div>
        )}
      </motion.div>

      {/* Stats Bar */}
      {/* <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="mt-16 px-4"
      >
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-50 via-cyan-50 to-blue-50 rounded-2xl p-6 sm:p-8 border border-blue-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Products", value: `${data.length}+`, icon: "📦" },
              { label: "In Stock", value: "Available", icon: "✓" },
              { label: "Shipping", value: "Nationwide", icon: "🚚" },
              { label: "Quality", value: "Certified", icon: "⭐" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 + index * 0.1, duration: 0.4 }}
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div> */}
    </section>
  );
};

export default ProductListSec;
