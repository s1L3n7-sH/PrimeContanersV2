import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

type DressStyleCardProps = {
  title: string;
  url: string;
  className?: string;
  description?: string;
};

const DressStyleCard = ({ title, url, className, description }: DressStyleCardProps) => {
  return (
    <div
      className={cn([
        "w-full h-[300px] rounded-[20px] bg-white bg-top text-left py-6 px-6 md:px-10 bg-no-repeat bg-cover flex flex-col justify-between group overflow-hidden hover:shadow-lg transition-all border border-black/5 relative",
        className,
      ])}
    >
      <div className="absolute inset-x-0 top-0 h-2/3 bg-gradient-to-b from-black/100 via-black/70 to-transparent pointer-events-none" />

      <div className="z-10 relative">
        <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">{title}</h3>
        {description && (
          <p className="text-sm md:text-base text-white max-w-[220px] leading-relaxed">
            {description}
          </p>
        )}
      </div>

      <div className="z-10 relative mt-auto">
        <Link
          href={url}
          className="inline-flex items-center justify-center rounded-full bg-[#2c2c9c] backdrop-blur-sm text-white px-6 py-2.5 text-sm font-semibold shadow-sm transition-transform group-hover:scale-105 active:scale-95"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default DressStyleCard;
