import React from "react";
import Rating from "../ui/Rating";
import { Review } from "@/types/review.types";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Quote, CheckCircle2 } from "lucide-react";

type ReviewCardProps = {
  data: Review;
  className?: string;
  index?: number;
};

const ReviewCard = ({
  data,
  className,
  index = 0,
}: ReviewCardProps) => {
  return (
    <motion.div
      className={cn([
        "relative bg-white h-full min-h-[320px] flex flex-col items-start border border-blue-100 rounded-3xl p-6 md:p-8 overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 group",
        className,
      ])}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {/* Decorative Quote Icon */}
      <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full opacity-20 group-hover:opacity-30 transition-opacity" />
      <Quote className="absolute top-6 right-6 w-12 h-12 text-blue-200 opacity-50" />

      {/* Gradient Border Effect on Hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 rounded-3xl ring-2 ring-blue-300/50" />
      </div>

      <div className="relative z-10 w-full flex flex-col h-full">
        {/* Rating */}
        <motion.div
          className="mb-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 + 0.2 }}
        >
          <Rating
            initialValue={data.rating}
            allowFraction
            SVGclassName="inline-block"
            size={20}
            readonly
            fillColor="#3b82f6"
            emptyColor="#e5e7eb"
          />
        </motion.div>

        {/* Review Content */}
        <motion.p
          className="text-gray-700 text-sm md:text-base leading-relaxed mb-6 flex-grow line-clamp-4 md:line-clamp-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 + 0.3 }}
        >
          "{data.content}"
        </motion.p>

        {/* User Info */}
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 + 0.4 }}
        >
          {/* Avatar */}
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
            {data.user.charAt(0).toUpperCase()}
          </div>

          {/* Name & Verification */}
          <div className="flex-grow">
            <div className="flex items-center gap-2">
              <strong className="text-gray-900 font-bold text-base">
                {data.user}
              </strong>
              <CheckCircle2 className="w-5 h-5 text-green-500 fill-green-500" />
            </div>
            <div className="text-xs text-gray-500 font-medium mt-0.5">
              Verified Customer
            </div>
          </div>
        </motion.div>
      </div>

      {/* Subtle gradient overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-blue-50/30 to-transparent pointer-events-none rounded-b-3xl" />
    </motion.div>
  );
};

export default ReviewCard;
