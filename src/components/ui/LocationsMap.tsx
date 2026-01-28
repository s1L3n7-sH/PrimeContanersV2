"use client";

import React, { useState } from "react";
import { ComposableMap, Geographies, Geography, Marker, Annotation } from "react-simple-maps";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import { MapPin, ChevronRight } from "lucide-react";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

interface Location {
    name: string;
    coordinates: [number, number];
    region: string;
    state: string;
}

// Region configuration with brand colors
const regionConfig: Record<string, { color: string; bgColor: string; label: string }> = {
    WEST: { color: "#3b82f6", bgColor: "bg-blue-500", label: "West" },
    MIDWEST: { color: "#8b5cf6", bgColor: "bg-violet-500", label: "Midwest" },
    SOUTHWEST: { color: "#f59e0b", bgColor: "bg-amber-500", label: "Southwest" },
    SOUTHEAST: { color: "#10b981", bgColor: "bg-emerald-500", label: "Southeast" },
    NORTHEAST: { color: "#ef4444", bgColor: "bg-red-500", label: "Northeast" },
};

// Locations with state abbreviations
const locations: Location[] = [
    // WEST
    { name: "Oakland", coordinates: [-122.2711, 37.8044], region: "WEST", state: "CA" },
    { name: "Seattle", coordinates: [-122.3321, 47.6062], region: "WEST", state: "WA" },
    { name: "Bakersfield", coordinates: [-119.0187, 35.3733], region: "WEST", state: "CA" },
    { name: "Sacramento", coordinates: [-121.4944, 38.5816], region: "WEST", state: "CA" },
    { name: "Spokane", coordinates: [-117.4260, 47.6588], region: "WEST", state: "WA" },
    { name: "Stockton", coordinates: [-121.2908, 37.9577], region: "WEST", state: "CA" },
    { name: "Long Beach", coordinates: [-118.1937, 33.7701], region: "WEST", state: "CA" },
    { name: "Portland", coordinates: [-122.6765, 45.5231], region: "WEST", state: "OR" },
    { name: "Fresno", coordinates: [-119.7726, 36.7468], region: "WEST", state: "CA" },
    { name: "Los Angeles", coordinates: [-118.2437, 34.0522], region: "WEST", state: "CA" },
    { name: "Salt Lake City", coordinates: [-111.8910, 40.7608], region: "WEST", state: "UT" },
    { name: "Denver", coordinates: [-104.9903, 39.7392], region: "WEST", state: "CO" },
    { name: "Idaho Falls", coordinates: [-112.0340, 43.4917], region: "WEST", state: "ID" },
    { name: "Twin Falls", coordinates: [-114.4609, 42.5630], region: "WEST", state: "ID" },
    { name: "Boise", coordinates: [-116.2023, 43.6150], region: "WEST", state: "ID" },
    // MIDWEST
    { name: "Chicago", coordinates: [-87.6298, 41.8781], region: "MIDWEST", state: "IL" },
    { name: "Wilmington", coordinates: [-88.1488, 41.3142], region: "MIDWEST", state: "IL" },
    { name: "Cincinnati", coordinates: [-84.5120, 39.1031], region: "MIDWEST", state: "OH" },
    { name: "Cleveland", coordinates: [-81.6944, 41.4993], region: "MIDWEST", state: "OH" },
    { name: "Columbus", coordinates: [-82.9988, 39.9612], region: "MIDWEST", state: "OH" },
    { name: "Detroit", coordinates: [-83.0458, 42.3314], region: "MIDWEST", state: "MI" },
    { name: "Fort Wayne", coordinates: [-85.1394, 41.0793], region: "MIDWEST", state: "IN" },
    { name: "Indianapolis", coordinates: [-86.1581, 39.7684], region: "MIDWEST", state: "IN" },
    { name: "Kansas City", coordinates: [-94.5786, 39.0997], region: "MIDWEST", state: "MO" },
    { name: "Little Rock", coordinates: [-92.2896, 34.7465], region: "MIDWEST", state: "AR" },
    { name: "Milwaukee", coordinates: [-87.9065, 43.0389], region: "MIDWEST", state: "WI" },
    { name: "Minneapolis", coordinates: [-93.2650, 44.9778], region: "MIDWEST", state: "MN" },
    { name: "Omaha", coordinates: [-95.9345, 41.2565], region: "MIDWEST", state: "NE" },
    { name: "St Louis", coordinates: [-90.1994, 38.6270], region: "MIDWEST", state: "MO" },
    { name: "Wichita", coordinates: [-97.3301, 37.6872], region: "MIDWEST", state: "KS" },
    // SOUTHWEST
    { name: "Dallas", coordinates: [-96.7970, 32.7767], region: "SOUTHWEST", state: "TX" },
    { name: "Fort Worth", coordinates: [-97.3308, 32.7555], region: "SOUTHWEST", state: "TX" },
    { name: "Houston", coordinates: [-95.3698, 29.7604], region: "SOUTHWEST", state: "TX" },
    { name: "El Paso", coordinates: [-106.4850, 31.7619], region: "SOUTHWEST", state: "TX" },
    { name: "Austin", coordinates: [-97.7431, 30.2672], region: "SOUTHWEST", state: "TX" },
    { name: "San Antonio", coordinates: [-98.4936, 29.4241], region: "SOUTHWEST", state: "TX" },
    { name: "Oklahoma City", coordinates: [-97.5164, 35.4676], region: "SOUTHWEST", state: "OK" },
    { name: "Tulsa", coordinates: [-95.9928, 36.1540], region: "SOUTHWEST", state: "OK" },
    // SOUTHEAST
    { name: "Jacksonville", coordinates: [-81.6557, 30.3322], region: "SOUTHEAST", state: "FL" },
    { name: "Miami", coordinates: [-80.1918, 25.7617], region: "SOUTHEAST", state: "FL" },
    { name: "Tampa", coordinates: [-82.4572, 27.9506], region: "SOUTHEAST", state: "FL" },
    { name: "Orlando", coordinates: [-81.3792, 28.5383], region: "SOUTHEAST", state: "FL" },
    { name: "Atlanta", coordinates: [-84.3880, 33.7490], region: "SOUTHEAST", state: "GA" },
    { name: "Columbus", coordinates: [-84.9403, 32.4922], region: "SOUTHEAST", state: "GA" },
    { name: "Louisville", coordinates: [-85.7585, 38.2527], region: "SOUTHEAST", state: "KY" },
    { name: "New Orleans", coordinates: [-90.0715, 29.9511], region: "SOUTHEAST", state: "LA" },
    { name: "Charlotte", coordinates: [-80.8431, 35.2271], region: "SOUTHEAST", state: "NC" },
    { name: "Nashville", coordinates: [-86.7816, 36.1627], region: "SOUTHEAST", state: "TN" },
    { name: "Memphis", coordinates: [-90.0490, 35.1495], region: "SOUTHEAST", state: "TN" },
    { name: "Knoxville", coordinates: [-83.9207, 35.9606], region: "SOUTHEAST", state: "TN" },
    { name: "Norfolk", coordinates: [-76.2859, 36.8508], region: "SOUTHEAST", state: "VA" },
    { name: "Chesapeake", coordinates: [-76.2875, 36.7682], region: "SOUTHEAST", state: "VA" },
    { name: "Richmond", coordinates: [-77.4360, 37.5407], region: "SOUTHEAST", state: "VA" },
    { name: "Mobile", coordinates: [-88.0399, 30.6954], region: "SOUTHEAST", state: "AL" },
    { name: "Savannah", coordinates: [-81.0998, 32.0835], region: "SOUTHEAST", state: "GA" },
    // NORTHEAST
    { name: "Newark", coordinates: [-74.1724, 40.7357], region: "NORTHEAST", state: "NJ" },
    { name: "New York", coordinates: [-74.0060, 40.7128], region: "NORTHEAST", state: "NY" },
    { name: "Baltimore", coordinates: [-76.6122, 39.2904], region: "NORTHEAST", state: "MD" },
];

// Group locations by region
const locationsByRegion = locations.reduce((acc, loc) => {
    if (!acc[loc.region]) acc[loc.region] = [];
    acc[loc.region].push(loc);
    return acc;
}, {} as Record<string, Location[]>);

const LocationsMap = () => {
    const [activeRegion, setActiveRegion] = useState<string | null>(null);
    const [hoveredLocation, setHoveredLocation] = useState<Location | null>(null);

    return (
        <section className="w-full py-10 md:py-14">
            <div className="max-w-frame mx-auto px-4 xl:px-0">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-6 md:mb-8"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 mb-3">
                        <MapPin className="w-3.5 h-3.5 text-blue-600" />
                        <span className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                            {locations.length}+ Service Locations
                        </span>
                    </div>
                    <h2 className={cn([
                        integralCF.className,
                        "text-3xl md:text-5xl lg:text-6xl mb-4 bg-gradient-to-r from-gray-900 via-blue-900 to-gray-800 bg-clip-text text-transparent"
                    ])}>
                        NATIONWIDE COVERAGE
                    </h2>
                    <p className="text-gray-500 text-sm max-w-md mx-auto">
                        Delivering premium containers coast to coast
                    </p>
                </motion.div>

                {/* Main Content: Map + Locations */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 md:gap-6">
                    {/* Map Container - Compact */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-3 relative bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 rounded-2xl overflow-hidden shadow-xl border border-gray-200/60"
                    >
                        {/* Decorative elements */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200/30 rounded-full blur-2xl" />
                        <div className="absolute bottom-0 left-0 w-40 h-40 bg-cyan-200/20 rounded-full blur-3xl" />

                        {/* Map */}
                        <div className="relative aspect-[1.5/1] md:aspect-[1.8/1]">
                            <ComposableMap
                                projection="geoAlbersUsa"
                                className="w-full h-full"
                                projectionConfig={{ scale: 900 }}
                            >
                                <defs>
                                    {Object.entries(regionConfig).map(([region, config]) => (
                                        <radialGradient key={region} id={`dot-${region}`}>
                                            <stop offset="0%" stopColor={config.color} stopOpacity="1" />
                                            <stop offset="100%" stopColor={config.color} stopOpacity="0.7" />
                                        </radialGradient>
                                    ))}
                                </defs>

                                <Geographies geography={geoUrl}>
                                    {({ geographies }) =>
                                        geographies.map((geo) => (
                                            <Geography
                                                key={geo.rsmKey}
                                                geography={geo}
                                                fill="#93c5fd"
                                                stroke="#3b82f6"
                                                strokeWidth={0.8}
                                                style={{
                                                    default: { outline: "none", fill: "#bfdbfe" },
                                                    hover: { outline: "none", fill: "#93c5fd" },
                                                    pressed: { outline: "none", fill: "#60a5fa" },
                                                }}
                                            />
                                        ))
                                    }
                                </Geographies>

                                {locations.map(({ name, coordinates, region, state }, index) => {
                                    const config = regionConfig[region];
                                    const isActive = !activeRegion || activeRegion === region;
                                    const isHovered = hoveredLocation?.name === name && hoveredLocation?.state === state;
                                    const pinSize = isHovered ? 1.3 : 1;

                                    return (
                                        <Marker key={`${name}-${state}`} coordinates={coordinates}>
                                            <motion.g
                                                initial={{ scale: 0, y: 0 }}
                                                animate={{
                                                    scale: isActive ? pinSize : 0.4,
                                                    opacity: isActive ? 1 : 0.25,
                                                    y: isHovered ? -3 : 0
                                                }}
                                                transition={{ delay: index * 0.01, type: "spring", stiffness: 300 }}
                                                onMouseEnter={() => setHoveredLocation({ name, coordinates, region, state })}
                                                onMouseLeave={() => setHoveredLocation(null)}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                {/* Shadow */}
                                                <ellipse
                                                    cx={0}
                                                    cy={2}
                                                    rx={3}
                                                    ry={1.5}
                                                    fill="rgba(0,0,0,0.2)"
                                                />
                                                {/* Pin shape */}
                                                <path
                                                    d="M0,-12 C-4,-12 -7,-9 -7,-5 C-7,0 0,4 0,4 C0,4 7,0 7,-5 C7,-9 4,-12 0,-12 Z"
                                                    fill={config.color}
                                                    stroke="#fff"
                                                    strokeWidth={1.2}
                                                />
                                                {/* Inner circle */}
                                                <circle
                                                    cx={0}
                                                    cy={-6}
                                                    r={2.5}
                                                    fill="#fff"
                                                    opacity={0.9}
                                                />
                                            </motion.g>
                                        </Marker>
                                    );
                                })}
                            </ComposableMap>

                            {/* Tooltip */}
                            <AnimatePresence>
                                {hoveredLocation && (
                                    <motion.div
                                        className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg bg-white shadow-lg text-sm font-medium text-gray-800 flex items-center gap-1.5"
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        <span
                                            className="w-2 h-2 rounded-full"
                                            style={{ backgroundColor: regionConfig[hoveredLocation.region].color }}
                                        />
                                        {hoveredLocation.name}, {hoveredLocation.state}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Region Pills - Inside map footer */}
                        <div className="relative z-10 flex flex-wrap justify-center gap-1.5 px-3 py-3 bg-white/70 backdrop-blur-sm border-t border-gray-200">
                            {Object.entries(regionConfig).map(([region, config]) => {
                                const count = locationsByRegion[region]?.length || 0;
                                return (
                                    <button
                                        key={region}
                                        onClick={() => setActiveRegion(activeRegion === region ? null : region)}
                                        className={cn([
                                            "flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-all",
                                            activeRegion === region
                                                ? "bg-blue-600 text-white shadow-md"
                                                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                                        ])}
                                    >
                                        <span
                                            className="w-2 h-2 rounded-full"
                                            style={{ backgroundColor: config.color }}
                                        />
                                        {config.label}
                                        <span className="opacity-60">({count})</span>
                                    </button>
                                );
                            })}
                        </div>
                    </motion.div>

                    {/* Locations List - Outside Map */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden"
                    >
                        <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                            <h3 className={cn([integralCF.className, "text-sm text-gray-800"])}>
                                SERVICE LOCATIONS
                            </h3>
                            <p className="text-xs text-gray-500 mt-0.5">
                                {activeRegion ? `${regionConfig[activeRegion].label} Region` : 'All Regions'}
                            </p>
                        </div>

                        <div className="max-h-[320px] md:max-h-[400px] overflow-y-auto custom-scrollbar">
                            {Object.entries(regionConfig).map(([region, config]) => {
                                const regionLocations = locationsByRegion[region] || [];
                                const isVisible = !activeRegion || activeRegion === region;

                                if (!isVisible) return null;

                                return (
                                    <div key={region} className="border-b border-gray-50 last:border-0">
                                        {/* Region Header */}
                                        <button
                                            onClick={() => setActiveRegion(activeRegion === region ? null : region)}
                                            className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-gray-50 transition-colors"
                                        >
                                            <div className="flex items-center gap-2">
                                                <span
                                                    className="w-3 h-3 rounded-full"
                                                    style={{ backgroundColor: config.color }}
                                                />
                                                <span className="font-semibold text-sm text-gray-800">
                                                    {config.label}
                                                </span>
                                                <span className="text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
                                                    {regionLocations.length}
                                                </span>
                                            </div>
                                            <ChevronRight className={cn([
                                                "w-4 h-4 text-gray-400 transition-transform",
                                                activeRegion === region && "rotate-90"
                                            ])} />
                                        </button>

                                        {/* Cities List */}
                                        <motion.div
                                            initial={false}
                                            animate={{ height: activeRegion === region || !activeRegion ? 'auto' : 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-4 pb-3 grid grid-cols-2 gap-x-3 gap-y-1">
                                                {regionLocations.map((loc) => (
                                                    <motion.div
                                                        key={`${loc.name}-${loc.state}`}
                                                        className={cn([
                                                            "text-xs py-1 px-2 rounded-md flex items-center gap-1.5 transition-colors cursor-pointer",
                                                            hoveredLocation?.name === loc.name && hoveredLocation?.state === loc.state
                                                                ? "bg-blue-50 text-blue-700"
                                                                : "text-gray-600 hover:bg-gray-50"
                                                        ])}
                                                        onMouseEnter={() => setHoveredLocation(loc)}
                                                        onMouseLeave={() => setHoveredLocation(null)}
                                                    >
                                                        <span
                                                            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                                                            style={{ backgroundColor: config.color }}
                                                        />
                                                        <span className="truncate">{loc.name}</span>
                                                        <span className="text-gray-400 flex-shrink-0">{loc.state}</span>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Custom scrollbar styles */}
            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #f1f5f9;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #cbd5e1;
                    border-radius: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #94a3b8;
                }
            `}</style>
        </section>
    );
};

export default LocationsMap;
