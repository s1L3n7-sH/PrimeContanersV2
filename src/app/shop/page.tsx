import BreadcrumbShop from "@/components/shop-page/BreadcrumbShop";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MobileFilters from "@/components/shop-page/filters/MobileFilters";
import Filters from "@/components/shop-page/filters";
import { FiSliders } from "react-icons/fi";
import ProductCard from "@/components/common/ProductCard";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { prisma } from "@/lib/prisma";
import { Product } from "@/types/product.types";

export const revalidate = 0;

export default async function ShopPage() {
  let dbProducts: Product[] = [];
  let categories: string[] = [];

  try {
    // Fetch Products
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
      where: { inStock: true },
      include: { images: true }
    });

    dbProducts = products.map(p => ({
      id: p.id,
      title: p.title,
      srcUrl: p.images[0]?.url || '/images/placeholder.png',
      gallery: p.images.map(img => img.url),
      price: Number(p.price),
      discount: {
        amount: 0,
        percentage: 0
      },
      rating: Number(p.rating) || 0
    }));

    // Fetch Distinct Lengths for Categories
    const distinctLengths = await prisma.product.findMany({
      select: { length: true },
      distinct: ['length'],
      where: { length: { not: null } },
      orderBy: { length: 'asc' }
    });
    categories = distinctLengths
      .map(p => p.length)
      .filter((l): l is string => typeof l === 'string' && l.length > 0);

  } catch (e) {
    console.error("Failed to fetch shop data", e);
  }

  // Use DB products if available
  const productList = dbProducts;

  return (
    <main className="pb-20">
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <hr className="h-[1px] border-t-black/10 mb-5 sm:mb-6" />
        <BreadcrumbShop />
        <div className="flex md:space-x-5 items-start">
          <div className="hidden md:block min-w-[295px] max-w-[295px] border border-black/10 rounded-[20px] px-5 md:px-6 py-5 space-y-5 md:space-y-6">
            <div className="flex items-center justify-between">
              <span className="font-bold text-black text-xl">Length</span>
              <FiSliders className="text-2xl text-black/40" />
            </div>
            <Filters categories={categories} />
          </div>
          <div className="flex flex-col w-full space-y-5">
            <div className="flex flex-col lg:flex-row lg:justify-between">
              <div className="flex items-center justify-between">
                <h1 className="font-bold text-2xl md:text-[32px]">Storage Container</h1>
                <MobileFilters />
              </div>
              <div className="flex flex-col sm:items-center sm:flex-row">
                <span className="text-sm md:text-base text-black/60 mr-3">
                  Showing 1-{productList.length} of {productList.length} Products
                </span>
                <div className="flex items-center">
                  Sort by:{" "}
                  <Select defaultValue="most-popular">
                    <SelectTrigger className="font-medium text-sm px-1.5 sm:text-base w-fit text-black bg-transparent shadow-none border-none">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="most-popular">Most Popular</SelectItem>
                      <SelectItem value="low-price">Low Price</SelectItem>
                      <SelectItem value="high-price">High Price</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <div className="w-full grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
              {productList.map((product) => (
                <ProductCard key={product.id} data={product} />
              ))}
            </div>
            <hr className="border-t-black/10" />
            <Pagination className="justify-between">
              <PaginationPrevious href="#" className="border border-black/10" />
              <PaginationContent>
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    className="text-black/50 font-medium text-sm"
                    isActive
                  >
                    1
                  </PaginationLink>
                </PaginationItem>
                {/* Pagination placeholder, would need real pagination logic */}
              </PaginationContent>

              <PaginationNext href="#" className="border border-black/10" />
            </Pagination>
          </div>
        </div>
      </div>
    </main>
  );
}
