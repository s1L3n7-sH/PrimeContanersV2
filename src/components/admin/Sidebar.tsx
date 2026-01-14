"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    LogOut,
    Settings,
    Package,
    Users,
    ShoppingBag,
} from "lucide-react";
import { logout } from "@/app/prime-panel/actions";

const sidebarItems = [
    {
        icon: LayoutDashboard,
        label: "Dashboard",
        href: "/prime-panel/dashboard",
    },
    {
        icon: Package,
        label: "Products",
        href: "/prime-panel/dashboard/products",
    },
    {
        icon: ShoppingBag,
        label: "Orders",
        href: "/prime-panel/dashboard/orders",
    },
    {
        icon: Users,
        label: "Customers",
        href: "/prime-panel/dashboard/customers",
    },
    {
        icon: Users, // Using same icon, or could use Shield/UserCog
        label: "Staff",
        href: "/prime-panel/dashboard/staff",
    },
    {
        icon: Settings,
        label: "Settings",
        href: "/prime-panel/dashboard/settings",
    },
];

export default function Sidebar({ userRole }: { userRole?: string }) {
    const pathname = usePathname();

    return (
        <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 flex flex-col z-50">
            <div className="p-6 border-b border-gray-100 flex justify-center">
                <Image
                    priority
                    src="/images/chacha.png"
                    height={40}
                    width={140}
                    alt="Prime Container"
                    className="w-auto h-10"
                />
            </div>

            <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
                {sidebarItems.map((item) => {
                    // RBAC Logic
                    if (userRole === "STAFF") {
                        // Staff can ONLY see Orders
                        if (item.label !== "Orders") return null;
                    }

                    if (userRole === "ADMIN") {
                        // Admin sees everything
                    }

                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-[#2c2c9c] text-white"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-[#2c2c9c]"
                            )}
                        >
                            <item.icon className={cn("h-5 w-5", isActive ? "text-white" : "text-gray-400 group-hover:text-[#2c2c9c]")} />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-gray-100">
                <form action={logout}>
                    <button
                        type="submit"
                        className="flex w-full items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                    >
                        <LogOut className="h-5 w-5" />
                        Logout
                    </button>
                </form>
            </div>
        </aside>
    );
}
