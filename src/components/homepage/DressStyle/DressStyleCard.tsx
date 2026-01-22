import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import * as motion from "framer-motion/client";
import { ArrowRight } from "lucide-react";

type DressStyleCardProps = {
  title: string;
  url: string;
  className?: string;
  description?: string;
  accent?: string;
  index?: number;
};

const DressStyleCard = ({
  title,
  url,
  className,
  description,
  accent = "from-blue-600 to-cyan-600",
  index = 0
}: DressStyleCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ y: -8 }}
      className={cn([
        "w-full rounded-3xl bg-white bg-top text-left bg-no-repeat bg-cover group overflow-hidden relative cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-500",
        className,
      ])}
    >
      {/* Dark Overlay - Stays consistent, just slightly lighter on hover */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/45 to-black/75 group-hover:from-black/50 group-hover:via-black/30 group-hover:to-black/60 transition-all duration-500" />

      {/* Subtle white glow border on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 rounded-3xl ring-2 ring-white/30" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 h-full flex flex-col justify-between p-8 md:p-10">
        {/* Top Content */}
        <div>
          {/* Category Badge */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + 0.2 }}
            className={cn([
              "inline-flex items-center gap-2 bg-gradient-to-r text-white px-4 py-2 rounded-full text-xs font-bold mb-4 shadow-lg backdrop-blur-sm",
              accent
            ])}
          >
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            Available Now
          </motion.div>

          <motion.h3
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + 0.3 }}
            className="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight group-hover:scale-105 transition-transform origin-left duration-300"
          >
            {title}
          </motion.h3>

          {description && (
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 + 0.4 }}
              className="text-sm md:text-base text-gray-200 group-hover:text-white max-w-[300px] leading-relaxed transition-colors duration-300"
            >
              {description}
            </motion.p>
          )}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 + 0.5 }}
          className="mt-auto"
        >
          <Link
            href={url}
            className="group/btn inline-flex items-center gap-3 rounded-full bg-white text-gray-900 px-6 py-3 text-sm font-bold shadow-lg hover:shadow-xl hover:gap-4 hover:scale-105 transition-all duration-300"
          >
            <span>Explore Solutions</span>
            <div className={cn([
              "w-6 h-6 rounded-full bg-gradient-to-r flex items-center justify-center transition-all",
              accent
            ])}>
              <ArrowRight className="w-4 h-4 text-white group-hover/btn:translate-x-0.5 transition-transform" />
            </div>
          </Link>
        </motion.div>
      </div>

      {/* Elegant Shine Effect on Hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      </div>

      {/* Bottom shadow for depth */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
    </motion.div>
  );
};

export default DressStyleCard;
