import ProductListSec from "@/components/common/ProductListSec";
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
    user: "Alex K.",
    content:
      '"Finding clothes that align with my personal style used to be a challenge until I discovered PRIME Containers. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.”',
    rating: 5,
    date: "August 14, 2023",
  },
  {
    id: 2,
    user: "Sarah M.",
    content: `"I'm blown away by the quality and style of the clothes I received from PRIME Containers. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.”`,
    rating: 5,
    date: "August 15, 2023",
  },
  {
    id: 3,
    user: "Ethan R.",
    content: `"This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt."`,
    rating: 5,
    date: "August 16, 2023",
  },
  {
    id: 4,
    user: "Olivia P.",
    content: `"As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out."`,
    rating: 5,
    date: "August 17, 2023",
  },
  {
    id: 5,
    user: "Liam K.",
    content: `"This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion."`,
    rating: 5,
    date: "August 18, 2023",
  },
  {
    id: 6,
    user: "Samantha D.",
    content: `"I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt."`,
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

        <div className="mb-[50px] sm:mb-20">
          <ProductListSec
            title="top selling"
            data={topSellingData}
            viewAllLink="/shop#top-selling"
          />
        </div>

        <div className="mb-[50px] sm:mb-20">
          <DressStyle />
        </div>
        <Quote />
        <Reviews data={reviewsData} />
      </main>
    </>
  );
}
