"use client";

import { Product } from "@/types/product.types";
import Image from "next/image";
import React, { useState } from "react";

const PhotoSection = ({ data }: { data: Product }) => {
  const [selected, setSelected] = useState<string>(data.srcUrl);
  const [isLandscape, setIsLandscape] = useState(false);

  return (
    <div className="flex flex-col space-y-2">
      <div className={`flex items-center justify-center bg-white rounded-[13px] sm:rounded-[20px] w-full sm:w-96 md:w-full mx-auto overflow-hidden ${isLandscape
        ? 'aspect-[4/3]'
        : 'h-full max-h-[530px] min-h-[330px] lg:min-h-[380px] xl:min-h-[530px]'
        }`}>
        <Image
          src={selected}
          width={444}
          height={530}
          onLoadingComplete={(image) => {
            if (image.naturalWidth > image.naturalHeight) {
              setIsLandscape(true);
            } else {
              setIsLandscape(false);
            }
          }}
          className={`rounded-md w-full h-full hover:scale-110 transition-all duration-500 ${isLandscape ? 'object-contain' : 'object-cover'}`}
          alt={data.title}
          priority
          unoptimized
        />
      </div>

      {data?.gallery && data.gallery.length > 0 && (
        <div className="flex space-x-3.5 w-full overflow-x-auto pb-2">
          {data.gallery.map((photo, index) => (
            <button
              key={index}
              type="button"
              className="bg-white rounded-[13px] xl:rounded-[16px] min-w-[100px] w-[100px] h-[100px] xl:w-[110px] xl:h-[110px] aspect-square overflow-hidden shrink-0 border border-black/10"
              onClick={() => {
                setSelected(photo);
                // Don't reset isLandscape here to prevent layout shift/flicker
                // wait for onLoadingComplete to determine new ratio
              }}
            >
              <Image
                src={photo}
                width={152}
                height={167}
                className="rounded-md w-full h-full object-cover hover:scale-110 transition-all duration-500"
                alt={data.title}
                priority
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PhotoSection;
