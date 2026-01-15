"use client";

import { User, Menu } from "lucide-react";
import SidebarContent from "./SidebarContent";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

interface AdminHeaderProps {
    userName: string;
    userRole: string;
}

export default function AdminHeader({ userName, userRole }: AdminHeaderProps) {
    const [open, setOpen] = useState(false);

    return (
        <header className="h-16 bg-white border-b border-gray-200 px-4 md:px-8 flex items-center justify-between sticky top-0 z-40 w-full">
            <div className="flex items-center gap-4">
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                        <button className="md:hidden p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-md">
                            <Menu className="h-6 w-6" />
                        </button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0 w-64">
                        <SidebarContent userRole={userRole} onLinkClick={() => setOpen(false)} />
                    </SheetContent>
                </Sheet>
                <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100 cursor-pointer transition-colors">
                    <div className="h-8 w-8 rounded-full bg-[#2c2c9c]/10 flex items-center justify-center text-[#2c2c9c]">
                        <User className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-medium text-gray-700 hidden md:block">
                        {userName}
                    </span>
                </div>
            </div>
        </header>
    );
}
