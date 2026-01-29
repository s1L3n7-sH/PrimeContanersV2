"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

const ClearAllButton = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const hasFilters = (searchParams?.toString() ?? '').length > 0;

    const handleClearAll = () => {
        router.push('/shop', { scroll: false });
    };

    if (!hasFilters) return null;

    return (
        <button
            onClick={handleClearAll}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
        >
            Clear All
        </button>
    );
};

export default ClearAllButton;
