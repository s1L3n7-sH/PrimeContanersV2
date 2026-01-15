"use client";

import React from "react";
import SidebarContent from "./SidebarContent";

export default function Sidebar({ userRole }: { userRole?: string }) {
    return (
        <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 hidden md:flex flex-col z-50">
            <SidebarContent userRole={userRole} />
        </aside>
    );
}
