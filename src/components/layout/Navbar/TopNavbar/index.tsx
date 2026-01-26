"use client";

import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { NavMenu } from "../navbar.types";
import { MenuList } from "./MenuList";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { MenuItem } from "./MenuItem";
import Image from "next/image";
import ResTopNavbar from "./ResTopNavbar";
import { Truck, Phone, Mail, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const data: NavMenu = [
  {
    id: 1,
    label: "Containers",
    type: "MenuItem",
    url: "/shop",
    children: [],
  },
  {
    id: 2,
    type: "MenuItem",
    label: "Rental",
    url: "/rental",
    children: [],
  },
  {
    id: 3,
    type: "MenuItem",
    label: "Delivery",
    url: "/shop#new-arrivals",
    children: [],
  },
  {
    id: 4,
    type: "MenuItem",
    label: "Contact",
    url: "/shop#brands",
    children: [],
  },
  {
    id: 5,
    type: "MenuItem",
    label: "Career",
    url: "/career",
    children: [],
  },
];


const TopNavbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top Info Bar - Hidden on mobile */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="hidden lg:block bg-gradient-to-r from-blue-700 via-blue-800 to-cyan-700 text-white py-2 relative overflow-hidden"
      >
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />

        <div className="max-w-frame mx-auto px-4 xl:px-0 flex items-center justify-between text-sm relative z-10">
          <div className="flex items-center gap-6">
            <a
              href="tel:+1234567890"
              className="flex items-center gap-2 hover:text-blue-100 transition-colors group"
            >
              <Phone className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              <span className="font-medium">(614)491-8402</span>
            </a>
            <a
              href="mailto:contact@primecontainers.org"
              className="flex items-center gap-2 hover:text-blue-100 transition-colors group"
            >
              <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>contact@primecontainers.org</span>
            </a>
          </div>
          <div className="flex items-center gap-2 text-blue-100">
            <MapPin className="w-4 h-4" />
            <span>Nationwide Delivery Available</span>
          </div>
        </div>
      </motion.div>

      {/* Main Navigation */}
      <nav
        className={cn(
          "sticky top-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-white/95 backdrop-blur-xl shadow-2xl"
            : "bg-white shadow-md"
        )}
      >
        <div className="max-w-frame mx-auto px-4 xl:px-0">
          <div className="flex items-center justify-between h-20">
            {/* Left: Mobile Menu + Logo */}
            <div className="flex items-center gap-4">
              <div className="block lg:hidden">
                <ResTopNavbar data={data} />
              </div>

              <Link
                href="/"
                className={cn([
                  "relative group",
                  integralCF.className,
                ])}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Image
                    priority
                    src="/images/chacha.png"
                    height={50}
                    width={170}
                    alt="Prime Container"
                    className="w-[120px] lg:w-[180px] h-auto"
                  />
                </motion.div>
              </Link>
            </div>

            {/* Center: Navigation Links - Hidden on mobile */}
            <div className="hidden lg:flex items-center">
              <NavigationMenu>
                <NavigationMenuList className="gap-1">
                  {data.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                      {item.type === "MenuItem" && item.url && (
                        <Link
                          href={item.url!}
                          className="relative px-4 py-2 text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors"
                        >
                          {item.label}
                        </Link>
                      )}
                      {item.type === "MenuList" && (
                        <MenuList data={item.children} label={item.label} />
                      )}
                    </motion.div>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* Right: Contact Info + CTA */}
            <div className="flex items-center gap-3">
              {/* Phone - Tablet and up */}
              <motion.a
                href="tel:+1234567890"
                whileHover={{ scale: 1.05 }}
                className="hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl hover:from-blue-100 hover:to-cyan-100 transition-all duration-300 group"
              >
                <div className="p-2 bg-white rounded-lg shadow-sm group-hover:shadow-md transition-shadow">
                  <Phone className="w-4 h-4 text-blue-600 group-hover:rotate-12 transition-transform" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 font-medium">Call Us</span>
                  <span className="text-sm font-bold text-gray-800">(614)491-8402</span>
                </div>
              </motion.a>

              {/* CTA Button */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/#quote"
                  className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-700 text-white font-bold text-sm px-5 py-3 rounded-xl shadow-lg hover:shadow-xl overflow-hidden transition-all duration-300"
                >
                  {/* Animated background on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-700 via-blue-800 to-blue-900 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Shine effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                  <Truck className="w-5 h-5 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
                  <span className="relative z-10 whitespace-nowrap">Get Quote</span>

                  {/* Pulse effect */}
                  <div className="absolute inset-0 rounded-xl bg-blue-400 opacity-0 group-hover:opacity-20 group-hover:animate-ping" />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom border gradient */}
        <div className="h-1 bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
      </nav>

      <style jsx global>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 3s infinite;
        }
      `}</style>
    </>
  );
};

export default TopNavbar;
