"use client";

import Image from "next/image";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const brandsData: { id: string; srcUrl: string }[] = [
  {
    id: "hapag-loyd",
    srcUrl: "/icons/hapag-loyd.svg",
  },
  {
    id: "cism",
    srcUrl: "/icons/cism.svg",
  },
  {
    id: "cosco",
    srcUrl: "/icons/cosco.svg",
  },
  {
    id: "maersk",
    srcUrl: "/icons/maersk.svg",
  },
  {
    id: "evergreen",
    srcUrl: "/icons/evergreen.svg",
  },
  {
    id: "msc",
    srcUrl: "/icons/msc.svg",
  },
  {
    id: "cma",
    srcUrl: "/icons/cma.svg",
  },
];

const Brands = () => {
  const [api, setApi] = React.useState<any>();

  React.useEffect(() => {
    if (!api) {
      return;
    }

    const interval = setInterval(() => {
      api.scrollNext();
    }, 4000);

    return () => clearInterval(interval);
  }, [api]);

  return (
    <div className="bg-black">
      <div className="max-w-frame mx-auto py-5 md:py-11 px-4 xl:px-0">
        <Carousel
          setApi={setApi}
          opts={{
            align: "center",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4 md:-ml-8 items-center">
            {brandsData.map((brand) => (
              <CarouselItem
                key={brand.id}
                className="pl-4 md:pl-8 basis-1/3 md:basis-1/5 flex justify-center"
              >
                <Image
                  priority
                  src={brand.srcUrl}
                  height={0}
                  width={0}
                  alt={brand.id}
                  className="h-auto w-auto max-w-[116px] lg:max-w-48 max-h-[26px] lg:max-h-9"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
};

export default Brands;
