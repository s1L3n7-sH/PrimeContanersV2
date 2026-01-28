import ProductListSec from "@/components/common/ProductListSec";
import TeamSection from "@/components/homepage/TeamSection";
import AboutUs from "@/components/homepage/AboutUs";
import Quote from "@/components/homepage/Quote";
import Brands from "@/components/homepage/Brands";
import DressStyle from "@/components/homepage/DressStyle";
import Header from "@/components/homepage/Header";
import Reviews from "@/components/homepage/Reviews";
import { Product } from "@/types/product.types";
import { Review } from "@/types/review.types";
import { prisma } from "@/lib/prisma";

// Keep static data for specific sections if needed, or fallbacks
import { reviewsData } from "@/lib/staticData";

export const revalidate = 0; // Ensure fresh data on every request

export default async function Home() {
  // Fetch latest products from DB
  let dbProducts: Product[] = [];
  try {
    const products = await prisma.product.findMany({
      take: 8,
      orderBy: { createdAt: 'desc' },
      where: { inStock: true },
      include: { images: true }
    });

    dbProducts = products.map(p => ({
      id: p.id,
      title: p.title,
      srcUrl: p.images[0]?.url || '/images/placeholder.png', // Fallback image
      gallery: p.images.map(img => img.url),
      price: Number(p.price),
      discount: {
        amount: 0,
        percentage: 0
      },
      rating: Number(p.rating) || 5
    }));
  } catch (e) {
    console.error("Failed to fetch products for homepage", e);
  }

  // Fallback to static data if DB is empty (optional, but good for demo if no products added yet)
  const newArrivals = dbProducts.length > 0 ? dbProducts : [];

  return (
    <>
      <Header />
      <Brands />
      <AboutUs />
      <main className="my-[50px] sm:my-[72px]">
        {newArrivals.length > 0 && (
          <ProductListSec
            title="Shipping containers for sale"
            data={newArrivals}
            viewAllLink="/shop"
          />
        )}

        <div className="max-w-frame mx-auto px-4 xl:px-0">
          <hr className="h-[1px] border-t-black/10 my-10 sm:my-16" />
        </div>

        {/* <div className="mb-[50px] sm:mb-20">
          <ProductListSec
            title="top selling"
            data={topSellingData}
            viewAllLink="/shop#top-selling"
          />
        </div> */}


        <div className="mb-[50px] sm:mb-20">
          <DressStyle />
        </div>

        {/* <TeamSection /> */}

        <Quote />
        <Reviews data={reviewsData} />
      </main>
    </>
  );
}
