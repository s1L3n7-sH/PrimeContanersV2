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
import { Grid3x3, LayoutGrid, SlidersHorizontal } from "lucide-react";
import ProductCard from "@/components/common/ProductCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { prisma } from "@/lib/prisma";
import { Product } from "@/types/product.types";
import ClearAllButton from "@/components/shop-page/filters/ClearAllButton";

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ length?: string; minPrice?: string; maxPrice?: string; condition?: string }>;
}) {
  let dbProducts: Product[] = [];
  let categories: string[] = [];

  // Await searchParams
  const params = await searchParams;

  try {
    // Parse filters
    const selectedLengths = params.length ? params.length.split(',').map(l => l.trim()) : [];
    const conditions = params.condition ? params.condition.split(',') : [];

    // Build Where Clause
    const whereClause: any = { inStock: true };

    // Filter by Length
    if (selectedLengths.length > 0) {
      whereClause.length = { in: selectedLengths };
    }

    // Filter by Condition (Search in title or description since no specific field)
    if (conditions.length > 0) {
      whereClause.OR = conditions.map(condition => ({
        OR: [
          { title: { contains: condition } },
          { description: { contains: condition } }
        ]
      }));
    }

    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
      where: whereClause,
      include: { images: true }
    });

    dbProducts = products.map(p => ({
      id: p.id,
      title: p.title,
      srcUrl: p.images[0]?.url || '/images/placeholder.png',
      gallery: p.images.map(img => img.url),
      price: Number(p.price),
      discount: { amount: 0, percentage: 0 },
      rating: Number(p.rating) || 0
    }));

    // Fetch Distinct Lengths
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

  const productList = dbProducts;

  return (
    <main className="pb-20 bg-gradient-to-b from-white via-blue-50/20 to-white">
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <div className="py-6">
          <BreadcrumbShop />
        </div>

        <div className="flex md:gap-8 items-start">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden md:block w-72 flex-shrink-0 sticky top-24">
            <div className="bg-white border border-blue-100 rounded-3xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-bold text-black text-xl flex items-center gap-2">
                  <SlidersHorizontal className="w-5 h-5 text-blue-600" />
                  Filters
                </h2>
                <ClearAllButton />
              </div>

              <Filters categories={categories} />
            </div>
          </aside>

          {/* Products Section */}
          <div className="flex flex-col w-full space-y-6">
            <div className="bg-white border border-blue-100 rounded-3xl p-6 shadow-sm">
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="font-bold text-2xl md:text-3xl bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-1">
                      Storage Containers
                    </h1>
                    <p className="text-sm text-gray-600">
                      Showing <span className="font-semibold text-gray-900">{productList.length}</span> {productList.length === 1 ? 'product' : 'products'}
                    </p>
                  </div>
                  <MobileFilters categories={categories} />
                </div>

                <div className="flex items-center gap-3 bg-gray-50 rounded-full px-4 py-2.5 border border-gray-200">
                  <span className="text-sm font-medium text-gray-700">Sort by:</span>
                  <Select defaultValue="most-popular">
                    <SelectTrigger className="font-semibold text-sm w-fit text-gray-900 bg-transparent shadow-none border-none h-auto p-0">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="most-popular">Most Popular</SelectItem>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="low-price">Price: Low to High</SelectItem>
                      <SelectItem value="high-price">Price: High to Low</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-6">
              {productList.map((product, index) => (
                <ProductCard key={product.id} data={product} index={index} />
              ))}
            </div>

            {/* Pagination... (rest of the file) */}
            {productList.length > 0 && (
              <div className="flex justify-center items-center gap-2 py-8">
                {/* Previous Button */}
                <button className="group px-5 py-2.5 rounded-full border-2 border-gray-200 hover:border-blue-600 hover:bg-blue-50 transition-all duration-300 flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-600 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">Previous</span>
                </button>

                {/* Page Numbers */}
                <div className="flex items-center gap-2">
                  {/* Active Page */}
                  <button className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
                    1
                  </button>

                  {/* Other Pages */}
                  <button className="w-10 h-10 rounded-full bg-white border border-gray-200 hover:border-blue-600 text-gray-700 hover:text-blue-600 font-semibold text-sm transition-all duration-300 hover:bg-blue-50 hover:scale-105">
                    2
                  </button>

                  <button className="w-10 h-10 rounded-full bg-white border border-gray-200 hover:border-blue-600 text-gray-700 hover:text-blue-600 font-semibold text-sm transition-all duration-300 hover:bg-blue-50 hover:scale-105">
                    3
                  </button>

                  {/* Ellipsis */}
                  <span className="px-2 text-gray-400">...</span>

                  <button className="w-10 h-10 rounded-full bg-white border border-gray-200 hover:border-blue-600 text-gray-700 hover:text-blue-600 font-semibold text-sm transition-all duration-300 hover:bg-blue-50 hover:scale-105">
                    10
                  </button>
                </div>

                {/* Next Button */}
                <button className="group px-5 py-2.5 rounded-full border-2 border-gray-200 hover:border-blue-600 hover:bg-blue-50 transition-all duration-300 flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">Next</span>
                  <svg className="w-4 h-4 text-gray-600 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}

            {/* Empty State */}
            {productList.length === 0 && (
              <div className="bg-white border border-blue-100 rounded-3xl p-12 text-center shadow-sm">
                <div className="max-w-md mx-auto">
                  <Grid3x3 className="w-16 h-16 text-blue-200 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">No Products Found</h3>
                  <p className="text-gray-600">
                    We couldn't find any containers matching your criteria. Try adjusting your filters.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
