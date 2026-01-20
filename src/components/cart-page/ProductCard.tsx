"use client";

import React from "react";
import { PiTrashFill } from "react-icons/pi";
import Image from "next/image";
import Link from "next/link";
import CartCounter from "@/components/ui/CartCounter";
import { Button } from "../ui/button";
import {
  addToCart,
  CartItem,
  remove,
  removeCartItem,
} from "@/lib/features/carts/cartsSlice";
import { useAppDispatch } from "@/lib/hooks/redux";

type ProductCardProps = {
  data: CartItem;
};

const ProductCard = ({ data }: ProductCardProps) => {
  const dispatch = useAppDispatch();

  return (
    <div className="flex items-start space-x-4 py-4 border-b border-gray-100 last:border-0">
      <Link
        href={`/shop/product/${data.id}/${data.name.split(" ").join("-")}`}
        className="bg-[#F0EEED] rounded-xl w-[100px] h-[100px] sm:w-[124px] sm:h-[124px] shrink-0 overflow-hidden relative group"
      >
        <Image
          src={data.srcUrl}
          width={124}
          height={124}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          alt={data.name}
          priority
        />
      </Link>
      <div className="flex flex-col flex-1">
        <div className="flex items-start justify-between gap-4">
          <Link
            href={`/shop/product/${data.id}/${data.name.split(" ").join("-")}`}
            className="text-[#1a1a1a] font-bold text-lg sm:text-xl leading-tight hover:text-[#2c2c9c] transition-colors pt-1"
          >
            {data.name}
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 text-gray-500 hover:text-red-600 hover:bg-red-50 shrink-0 transition-colors"
            onClick={() =>
              dispatch(
                remove({
                  id: data.id,
                  attributes: data.attributes,
                  quantity: data.quantity,
                })
              )
            }
          >
            <PiTrashFill className="text-2xl" />
          </Button>
        </div>

        <div className="mt-6 flex justify-end">
          <CartCounter
            initialValue={data.quantity}
            onAdd={() => dispatch(addToCart({ ...data, quantity: 1 }))}
            onRemove={() =>
              data.quantity === 1
                ? dispatch(
                  remove({
                    id: data.id,
                    attributes: data.attributes,
                    quantity: data.quantity,
                  })
                )
                : dispatch(
                  removeCartItem({ id: data.id, attributes: data.attributes })
                )
            }
            isZeroDelete
            className="px-4 py-2 h-9 sm:h-10"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
