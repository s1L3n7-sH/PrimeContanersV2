"use client";

import { Product } from "@/types/product.types";
import Image from "next/image";
import React, { useState } from "react";
import * as motion from "framer-motion/client";
import { cn } from "@/lib/utils";
import useEmblaCarousel from "embla-carousel-react";

const PhotoSection = ({ data }: { data: Product }) => {
  const [selected, setSelected] = useState<string>(data.srcUrl);
  const [emblaRef] = useEmblaCarousel({
    dragFree: true,
    containScroll: "trimSnaps",
    align: "start"
  });

  return (
    <div className="flex flex-col space-y-4">
      {/* Main Image Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative group w-full max-w-[500px] mx-auto aspect-square rounded-3xl overflow-hidden bg-white border border-blue-100 shadow-lg"
      >
        <div className="absolute inset-0 bg-blue-50/30 group-hover:bg-transparent transition-colors duration-300" />
        <Image
          src={selected}
          alt={data.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />

        {/* Decorative badge */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm border border-blue-100">
          <span className="text-xs font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent uppercase tracking-wider">
            Sample Picture
          </span>
        </div>
      </motion.div>

      {/* Thumbnails Carousel */}
      {data?.gallery && data.gallery.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full max-w-[500px] mx-auto overflow-hidden"
          ref={emblaRef}
        >
          <div className="flex gap-3 py-2 px-1">
            {data.gallery.map((photo, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setSelected(photo)}
                className={cn(
                  "relative flex-[0_0_20%] aspect-square rounded-xl overflow-hidden border transition-all duration-300",
                  selected === photo
                    ? "border-black/20 opacity-100 shadow-md ring-1 ring-black/5"
                    : "border-transparent opacity-60 hover:opacity-100 bg-gray-50"
                )}
              >
                <Image
                  src={photo}
                  alt={`${data.title} thumb ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="200px"
                />
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default PhotoSection;
