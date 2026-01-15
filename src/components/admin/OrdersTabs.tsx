"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const tabs = [
    { name: "Pending", href: "/prime-panel/dashboard/orders/pending" },
    { name: "Processed", href: "/prime-panel/dashboard/orders/processed" },
    { name: "Done", href: "/prime-panel/dashboard/orders/done" },
    { name: "Canceled", href: "/prime-panel/dashboard/orders/canceled" },
];

export default function OrdersTabs() {
    const pathname = usePathname();

    return (
        <div className="border-b border-gray-200 mb-6">
            <nav className="-mb-px flex space-x-4 md:space-x-8" aria-label="Tabs">
                {tabs.map((tab) => {
                    const isActive = pathname === tab.href;
                    return (
                        <Link
                            key={tab.name}
                            href={tab.href}
                            className={cn(
                                isActive
                                    ? "border-[#2c2c9c] text-[#2c2c9c]"
                                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                                "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors"
                            )}
                            aria-current={isActive ? "page" : undefined}
                        >
                            {tab.name}
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}
