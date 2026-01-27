import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import React from "react";
import { Truck, ArrowRight } from "lucide-react";
import Link from "next/link";
import * as motion from "framer-motion/client";

const NewsLetterSection = () => {
  return (
    <div className="relative overflow-hidden py-10 md:py-14 px-6 md:px-16 max-w-frame mx-auto bg-gradient-to-r from-blue-700 via-blue-800 to-[#0f3f85] rounded-[32px] shadow-2xl border border-white/10">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-12">
        <div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-3 mb-4 text-blue-200"
          >
            <Truck className="w-6 h-6" />
            <span className="text-sm font-bold uppercase tracking-widest">Premium Quality Containers</span>
          </motion.div>
          <h2
            className={cn([
              integralCF.className,
              "font-bold text-3xl md:text-4xl lg:text-5xl text-white leading-tight",
            ])}
          >
            NATIONWIDE DELIVERY <br className="hidden md:block" />
            <span className="text-cyan-400">STRAIGHT TO YOUR SITE</span>
          </h2>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 lg:justify-end">
          <Link href="/#quote" className="w-full sm:w-auto">
            <Button
              className="w-full sm:w-auto px-8 h-14 rounded-2xl bg-white text-blue-900 font-bold text-lg hover:bg-blue-50 hover:scale-105 transition-all shadow-lg flex items-center justify-center gap-2 group"
            >
              Get a Quote Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href="/shop" className="w-full sm:w-auto">
            <Button
              className="w-full sm:w-auto px-8 h-14 rounded-2xl bg-blue-600/20 text-white font-bold text-lg hover:bg-white/10 transition-all backdrop-blur-sm border border-white/20"
            >
              View Inventory
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewsLetterSection;
