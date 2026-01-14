"use client";

import { usePathname } from "next/navigation";
import React from "react";

export default function HideOnAdmin({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    if (pathname && pathname.startsWith("/prime-panel")) {
        return null;
    }

    return <>{children}</>;
}
