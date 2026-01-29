"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";

export default function ShopSorter() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentSort = searchParams?.get("sort") || "most-popular";

    const handleSortChange = (value: string) => {
        const params = new URLSearchParams(searchParams?.toString() ?? '');
        params.set("sort", value);
        router.push(`?${params.toString()}`);
    };

    return (
        <div className="flex items-center gap-3 bg-gray-50 rounded-full px-4 py-2.5 border border-gray-200">
            <span className="text-sm font-medium text-gray-700">Sort by:</span>
            <Select value={currentSort} onValueChange={handleSortChange}>
                <SelectTrigger className="font-semibold text-sm w-fit text-gray-900 bg-transparent shadow-none border-none h-auto p-0 focus:ring-0">
                    <SelectValue placeholder="Sort order" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="most-popular">Most Popular</SelectItem>
                    <SelectItem value="newest">Newest First</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}
