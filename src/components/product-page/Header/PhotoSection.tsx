"use client";

import { Product } from "@/types/product.types";
import Image from "next/image";
import React, { useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

const PhotoSection = ({ data }: { data: Product }) => {
  const [selected, setSelected] = useState<string>(data.srcUrl);
  const [emblaRef] = useEmblaCarousel({ dragFree: true, containScroll: "trimSnaps" });


  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center justify-center bg-white rounded-[13px] sm:rounded-[10px] w-full sm:w-96 md:w-full mx-auto overflow-hidden">
        <Image
          src={selected}
          width={0}
          height={0}
          sizes="100vw"
          className="rounded-md w-full h-auto hover:scale-110 transition-all duration-500"
          alt={data.title}
          priority
          unoptimized
          style={{ width: '100%', height: 'auto' }}
        />
      </div>

      {data?.gallery && data.gallery.length > 0 && (
        <div className="w-full overflow-hidden" ref={emblaRef}>
          <div className="flex space-x-2 touch-pan-y">
            {data.gallery.map((photo, index) => (
              <button
                key={index}
                type="button"
                className="bg-white rounded-[13px] xl:rounded-[10px] h-[80px] xl:h-[90px] overflow-hidden shrink-0 border border-black/10 flex-[0_0_auto]"
                onClick={() => {
                  setSelected(photo);
                }}
              >
                <Image
                  src={photo}
                  width={0}
                  height={0}
                  sizes="150px"
                  className="rounded-md w-auto h-full hover:scale-110 transition-all duration-500"
                  alt={data.title}
                  priority
                  unoptimized
                  style={{ width: 'auto', height: '100%' }}
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoSection;
