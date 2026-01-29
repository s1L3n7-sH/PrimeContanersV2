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
import { Category } from "@prisma/client";
import ClearAllButton from "@/components/shop-page/filters/ClearAllButton";
import ShopSorter from "@/components/shop-page/ShopSorter";

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ length?: string; minPrice?: string; maxPrice?: string; condition?: string; category?: string; sort?: string }>;
}) {
  let dbProducts: Product[] = [];
  let lengths: string[] = []; // Renamed from categories to lengths for clarity
  let productCategories: string[] = [];

  // Await searchParams
  const params = await searchParams;

  try {
    // Parse filters
    const selectedLengths = params.length ? params.length.split(',').map(l => l.trim()) : [];
    // Condition param is legacy or can be recycled, but user requested category
    const selectedCategories = params.category ? params.category.split(',') : [];
    const sortOption = params.sort || "most-popular";

    // Build Where Clause
    const whereClause: any = { inStock: true };

    // Filter by Length
    if (selectedLengths.length > 0) {
      whereClause.length = { in: selectedLengths };
    }

    // Filter by Category (replaces old condition filter)
    if (selectedCategories.length > 0) {
      const cleanCategories = selectedCategories.map(c => c.trim());

      // Find categories by name to get IDs
      const categoryRecords = await prisma.category.findMany({
        where: {
          name: { in: cleanCategories }
        },
        select: { id: true }
      });

      const categoryIds = categoryRecords.map(c => c.id);

      if (categoryIds.length > 0) {
        whereClause.categoryId = { in: categoryIds };
      } else {
        // If categories were selected but none found in DB (e.g. invalid name), match nothing
        whereClause.categoryId = -1;
      }
    }

    // Determine Sort Order
    let orderBy: any = { createdAt: 'desc' }; // Default fallback

    if (sortOption === 'newest') {
      orderBy = { createdAt: 'desc' };
    } else if (sortOption === 'most-popular') {
      // Sort by views (clicks)
      orderBy = { views: 'desc' };
    }

    let products;
    try {
      products = await prisma.product.findMany({
        orderBy: orderBy,
        where: whereClause,
        include: { images: true }
      });
    } catch (queryError) {
      console.warn("Primary sort failed, falling back to default sort", queryError);
      // Fallback to createdAt desc if views sort fails (e.g. schema mismatch)
      products = await prisma.product.findMany({
        orderBy: { createdAt: 'desc' },
        where: whereClause,
        include: { images: true }
      });
    }

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
    lengths = distinctLengths
      .map(p => p.length)
      .filter((l): l is string => typeof l === 'string' && l.length > 0);

    // Fetch Product Categories for filter
    const dbCategories = await prisma.category.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' }
    });
    productCategories = dbCategories.map(c => c.name);

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

              <Filters categories={lengths} productCategories={productCategories} />
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
                  <MobileFilters categories={lengths} productCategories={productCategories} />
                </div>

                <ShopSorter />
              </div>
            </div>

            <div className="w-full grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-6">
              {productList.map((product, index) => (
                <ProductCard key={product.id} data={product} index={index} />
              ))}
            </div>

            {productList.length > 0 && (
              <div className="flex justify-center items-center gap-4">
                {/* Previous Button */}
                <button className="group px-6 py-2.5 rounded-full border-2 border-gray-200 hover:border-blue-600 hover:bg-blue-50 transition-all duration-300 flex items-center gap-2 bg-white shadow-sm hover:shadow-md">
                  <svg className="w-4 h-4 text-gray-600 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span className="text-sm font-bold text-gray-700 group-hover:text-blue-600 transition-colors">Previous</span>
                </button>

                {/* Next Button */}
                <button className="group px-6 py-2.5 rounded-full border-2 border-gray-200 hover:border-blue-600 hover:bg-blue-50 transition-all duration-300 flex items-center gap-2 bg-white shadow-sm hover:shadow-md">
                  <span className="text-sm font-bold text-gray-700 group-hover:text-blue-600 transition-colors">Next</span>
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
