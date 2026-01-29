"use client";

import { usePathname } from "next/navigation";
import React from "react";

const LayoutSpacing = () => {
  const pathname = usePathname();

  if (!pathname || !pathname.includes("product")) return null;

  return <div className="mb-20 md:mb-0" />;
};

export default LayoutSpacing;
