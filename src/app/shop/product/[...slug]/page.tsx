import {
  topSellingData,
} from "@/lib/staticData";

import BreadcrumbProduct from "@/components/product-page/BreadcrumbProduct";
import Header from "@/components/product-page/Header";
import Tabs from "@/components/product-page/Tabs";
import { Product } from "@/types/product.types";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

export const revalidate = 0;

export default async function ProductPage({
  params,
}: {
  params: { slug: string[] };
}) {
  const productId = Number(params.slug[0]);
  let productData: Product | undefined;

  try {
    if (!isNaN(productId)) {
      let dbProduct;
      try {
        dbProduct = await prisma.product.update({
          where: { id: productId },
          data: {
            views: {
              increment: 1
            }
          },
          include: { images: true }
        });
      } catch (err) {
        // Fallback if update fails
        console.warn("Could not update view count", err);
        dbProduct = await prisma.product.findUnique({
          where: { id: productId },
          include: { images: true }
        });
      }

      if (dbProduct && dbProduct.inStock) {
        productData = {
          id: dbProduct.id,
          title: dbProduct.title,
          srcUrl: dbProduct.images[0]?.url || '/images/placeholder.png',
          gallery: dbProduct.images.length > 0 ? dbProduct.images.map((i: any) => i.url) : [],
          price: Number(dbProduct.price),
          discount: {
            amount: 0,
            percentage: 0
          },
          rating: Number(dbProduct.rating) || 0,
          description: dbProduct.description
        };
      }
    }
  } catch (e) {
    console.error("Error fetching individual product", e);
  }

  // Fallback to searching in static arrays if not found in DB (legacy support)
  // Note: newArrivalsData and relatedProductData are no longer exported arrays from page.tsx logic
  // so we skip searching them to avoid import errors.
  if (!productData) {
    productData = topSellingData.find(p => p.id === productId);
  }

  if (!productData?.title) {
    notFound();
  }

  // Related products can just be static or a different DB query


  return (
    <main>
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <hr className="h-[1px] border-t-black/10 mb-5 sm:mb-6" />
        <BreadcrumbProduct title={productData?.title ?? "product"} />
        <section className="mb-11">
          <Header data={productData} />
        </section>
        <Tabs />
      </div>

    </main>
  );
}
