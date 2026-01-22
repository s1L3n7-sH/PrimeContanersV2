"use client";

import React from "react";
import * as motion from "framer-motion/client";
import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import { Quote } from "lucide-react";
import { useIsClient } from "usehooks-ts";
import ReviewCard from "@/components/common/ReviewCard";
import { Review } from "@/types/review.types";

type ReviewsProps = { data: Review[] };

const Reviews = ({ data }: ReviewsProps) => {
  const isClient = useIsClient();

  if (!isClient) return null;

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 via-transparent to-cyan-50/30 -z-10" />

      {/* Decorative Shapes */}
      <motion.div
        className="absolute top-20 left-10 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
        }}
      />

      <div className="w-full">
        {/* Header Section */}
        <div className="max-w-frame mx-auto px-4 xl:px-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-4">
              <Quote className="w-4 h-4" />
              <span className="text-sm font-bold uppercase tracking-wider">Testimonials</span>
            </div>

            <h2 className={cn([
              integralCF.className,
              "text-3xl md:text-5xl lg:text-6xl mb-4 bg-gradient-to-r from-gray-900 via-blue-900 to-gray-800 bg-clip-text text-transparent"
            ])}>
              Our Happy Customers
            </h2>

            <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto mb-2">
              Hear from clients who trust us to deliver excellence in every container solution
            </p>
          </motion.div>
        </div>

        {/* Continuous Scrolling Carousel */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="w-full py-8 overflow-hidden"
        >
          <div className="flex gap-6">
            {/* First set of cards */}
            <motion.div
              className="flex gap-6 flex-shrink-0"
              animate={{
                x: [0, `-${100 / 2}%`],
              }}
              transition={{
                x: {
                  duration: data.length * 120,
                  repeat: Infinity,
                  ease: "linear",
                },
              }}
            >
              {/* Duplicate reviews multiple times for seamless loop */}
              {[...data, ...data, ...data, ...data, ...data].map((review, index) => (
                <div
                  key={`${review.id}-${index}`}
                  className="w-[350px] md:w-[400px] flex-shrink-0"
                  onMouseEnter={(e) => {
                    const motionDiv = e.currentTarget.closest('.flex-shrink-0') as HTMLElement;
                    if (motionDiv) {
                      motionDiv.style.animationPlayState = 'paused';
                    }
                  }}
                  onMouseLeave={(e) => {
                    const motionDiv = e.currentTarget.closest('.flex-shrink-0') as HTMLElement;
                    if (motionDiv) {
                      motionDiv.style.animationPlayState = 'running';
                    }
                  }}
                >
                  <ReviewCard data={review} index={index % data.length} />
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Reviews;
