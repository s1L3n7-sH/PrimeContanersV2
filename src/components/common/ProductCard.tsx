import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product.types";

type ProductCardProps = {
  data: Product;
};

const ProductCard = ({ data }: ProductCardProps) => {
  return (
    <div className="flex flex-col items-start aspect-auto w-full h-full">
      <Link
        href={`/shop/product/${data.id}/${data.title.split(" ").join("-")}`}
        className="w-full flex flex-col h-full"
      >
        <div className="bg-[#f4f4f4] rounded-[13px] lg:rounded-[10px] w-full lg:max-w-[295px] aspect-square mb-2.5 xl:mb-4 overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
          <Image
            src={data.srcUrl}
            width={295}
            height={298}
            className="rounded-md w-full h-full object-contain hover:scale-110 transition-all duration-500"
            alt={data.title}
            priority
          />
        </div>
        <strong className="text-black text-lg md:text-xl">{data.title}</strong>
        {/* <div className="w-full mt-auto pt-2">
          <div className="w-full bg-[#F0F0F0] rounded-md px-4 py-2 text-sm text-black/40 text-center">
            <strong>Enter Zip Code</strong> to see the price
          </div>
        </div> */}
      </Link>

    </div>
  );
};

export default ProductCard;
