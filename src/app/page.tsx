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
export const topSellingData: Product[] = [
  {
    id: 5,
    title: "40ft 3-Trip High Cube Shipping Container",
    srcUrl: "/images/main_2.png.webp",
    gallery: ["/images/pic5.png", "/images/pic10.png", "/images/pic11.png"],
    price: 232,
    discount: {
      amount: 0,
      percentage: 20,
    },
    rating: 5.0,
  },
  {
    id: 6,
    title: "40ft New Shipping Container",
    srcUrl: "/images/40stn_01.webp",
    gallery: ["/images/pic6.png", "/images/pic10.png", "/images/pic11.png"],
    price: 145,
    discount: {
      amount: 0,
      percentage: 0,
    },
    rating: 4.0,
  },
  {
    id: 7,
    title: "10ft Refurbished Storage Container with Roll-Up Door",
    srcUrl: "/images/main.webp",
    gallery: ["/images/pic7.png"],
    price: 80,
    discount: {
      amount: 0,
      percentage: 0,
    },
    rating: 3.0,
  },
  {
    id: 8,
    title: "20ft New High Cube Shipping Container",
    srcUrl: "/images/20hcn_01.webp",
    gallery: ["/images/pic8.png"],
    price: 210,
    discount: {
      amount: 0,
      percentage: 0,
    },
    rating: 4.5,
  },
];

export const reviewsData: Review[] = [
  {
    id: 1,
    user: "Robert C.",
    content:
      '"I needed a secure storage solution for my construction site, and PRIME Containers delivered exactly what I needed. The 20ft container arrived in excellent condition, and the delivery driver was incredibly professional placing it in a tight spot."',
    rating: 5,
    date: "August 14, 2023",
  },
  {
    id: 2,
    user: "Sarah M.",
    content: `"We bought a 40ft High Cube for our farm storage. The quality is top-notch, clearly wind and water-tight as advertised. Their team guided us through the whole process, making it super easy. Highly recommend!"`,
    rating: 5,
    date: "August 15, 2023",
  },
  {
    id: 3,
    user: "James L.",
    content: `"Converted a 40ft container into a workshop using PRIME Containers. The structural integrity was perfect for our modification project. Best prices we found after calling five different vendors."`,
    rating: 5,
    date: "August 16, 2023",
  },
  {
    id: 4,
    user: "Michael P.",
    content: `"Reliable service is hard to find in this industry, but PRIME Containers nailed it. Ordered two 20ft containers for our retail inventory overflow. They arrived clean, dry, and ready to use immediately."`,
    rating: 5,
    date: "August 17, 2023",
  },
  {
    id: 5,
    user: "David K.",
    content: `"I was hesitant about buying a used container online, but the photos sent beforehand matched exactly what arrived. No surprises, just a solid, weather-tight container for my backyard storage needs."`,
    rating: 5,
    date: "August 18, 2023",
  },
  {
    id: 6,
    user: "Jennifer A.",
    content: `"Exceptional customer service! They took the time to answer all my questions about site preparation and delivery. The driver dropped the container exactly where we marked it. A+ experience."`,
    rating: 5,
    date: "August 19, 2023",
  },
];

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

        <TeamSection />

        <Quote />
        <Reviews data={reviewsData} />
      </main>
    </>
  );
}
