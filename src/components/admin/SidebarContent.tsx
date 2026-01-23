"use client";

import React, { useState, useEffect } from "react";
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
    ChevronDown,
    ChevronRight,
    Briefcase,
    MessageCircle,
} from "lucide-react";
import { logout } from "@/app/prime-panel/actions";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type SidebarItem = {
    icon: React.ElementType;
    label: string;
    href?: string;
    subItems?: { label: string; href: string }[];
};

const sidebarItems: SidebarItem[] = [
    {
        icon: LayoutDashboard,
        label: "Dashboard",
        href: "/prime-panel/dashboard",
    },
    {
        icon: Package,
        label: "Products",
        subItems: [
            { label: "All Products", href: "/prime-panel/dashboard/products" },
            { label: "Create Product", href: "/prime-panel/dashboard/products/create" },
            { label: "Categories", href: "/prime-panel/dashboard/categories" },
        ],
    },

    {
        icon: Briefcase,
        label: "Sales Pipeline",
        href: "/prime-panel/dashboard/orders",
    },
    {
        icon: Users,
        label: "Customers",
        href: "/prime-panel/dashboard/customers",
    },
    {
        icon: MessageCircle,
        label: "FB Quote",
        href: "/prime-panel/dashboard/fb-quote",
    },
    {
        icon: Briefcase,
        label: "Careers",
        href: "/prime-panel/dashboard/careers",
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


interface SidebarContentProps {
    userRole?: string;
    onLinkClick?: () => void;
}

export default function SidebarContent({ userRole, onLinkClick }: SidebarContentProps) {
    const pathname = usePathname();
    const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({});
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    // Automatically open submenu if current path is within it
    useEffect(() => {
        const newOpenSubmenus: Record<string, boolean> = {};
        sidebarItems.forEach((item) => {
            if (item.subItems) {
                const isChildActive = item.subItems.some((sub) => pathname === sub.href);
                if (isChildActive) {
                    newOpenSubmenus[item.label] = true;
                }
            }
        });
        setOpenSubmenus((prev) => ({ ...prev, ...newOpenSubmenus }));
    }, [pathname]);

    const toggleSubmenu = (label: string) => {
        setOpenSubmenus((prev) => ({
            ...prev,
            [label]: !prev[label],
        }));
    };

    const handleLogout = async () => {
        setIsLoggingOut(true);
        await logout();
    };

    return (
        <div className="flex flex-col h-full bg-white text-gray-900">
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
                        // Staff can see Sales Pipeline, FB Quote AND Settings
                        if (item.label !== "Sales Pipeline" && item.label !== "Settings" && item.label !== "FB Quote") return null;
                    }

                    if (userRole === "ADMIN") {
                        // Admin sees everything
                    }

                    const hasSubItems = item.subItems && item.subItems.length > 0;
                    const isActive = item.href ? pathname === item.href : false;
                    const isParentActive = hasSubItems
                        ? item.subItems?.some((sub) => pathname === sub.href)
                        : false;

                    const isOpen = openSubmenus[item.label];

                    if (hasSubItems) {
                        return (
                            <div key={item.label} className="space-y-1">
                                <button
                                    onClick={() => toggleSubmenu(item.label)}
                                    className={cn(
                                        "w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                                        isParentActive
                                            ? "bg-[#2c2c9c]/5 text-[#2c2c9c]"
                                            : "text-gray-600 hover:bg-gray-50 hover:text-[#2c2c9c]"
                                    )}
                                >
                                    <div className="flex items-center gap-3">
                                        <item.icon
                                            className={cn(
                                                "h-5 w-5",
                                                isParentActive ? "text-[#2c2c9c]" : "text-gray-400"
                                            )}
                                        />
                                        {item.label}
                                    </div>
                                    {isOpen ? (
                                        <ChevronDown className="h-4 w-4" />
                                    ) : (
                                        <ChevronRight className="h-4 w-4" />
                                    )}
                                </button>

                                {isOpen && (
                                    <div className="pl-11 space-y-1">
                                        {item.subItems!.map((sub) => {
                                            const isSubActive = pathname === sub.href;
                                            return (
                                                <Link
                                                    key={sub.href}
                                                    href={sub.href}
                                                    onClick={onLinkClick}
                                                    className={cn(
                                                        "block px-3 py-2 rounded-md text-sm transition-colors",
                                                        isSubActive
                                                            ? "bg-[#2c2c9c] text-white font-medium"
                                                            : "text-gray-500 hover:bg-gray-50 hover:text-[#2c2c9c]"
                                                    )}
                                                >
                                                    {sub.label}
                                                </Link>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        );
                    }

                    return (
                        <Link
                            key={item.href || item.label}
                            href={item.href || "#"}
                            onClick={onLinkClick}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-[#2c2c9c] text-white"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-[#2c2c9c]"
                            )}
                        >
                            <item.icon
                                className={cn(
                                    "h-5 w-5",
                                    isActive ? "text-white" : "text-gray-400 group-hover:text-[#2c2c9c]"
                                )}
                            />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-gray-100">
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <button
                            className="flex w-full items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                        >
                            <LogOut className="h-5 w-5" />
                            Logout
                        </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
                            <AlertDialogDescription>
                                Are you sure you want to log out of the admin panel?
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleLogout} disabled={isLoggingOut} className="bg-red-600 hover:bg-red-700">
                                {isLoggingOut ? "Logging out..." : "Logout"}
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    );
}
