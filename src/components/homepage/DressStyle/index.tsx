import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import React from "react";
import * as motion from "framer-motion/client";
import DressStyleCard from "./DressStyleCard";

const DressStyle = () => {
  const categories = [
    {
      title: "Refrigerated Containers",
      description: "Keep perishables fresh with advanced temperature control containers.",
      url: "/shop#refrigerated",
      className: "md:col-span-5 h-[350px] md:h-[500px] bg-[url('/images/base1.jpeg')]",
      accent: "from-blue-600 to-cyan-600"
    },
    {
      title: "Custom Modifications",
      description: "Transform your container with expert, tailored modification services.",
      url: "/shop#modifications",
      className: "md:col-span-7 h-[350px] md:h-[500px] bg-[url('/images/base2.jpg')]",
      accent: "from-cyan-600 to-blue-700"
    },
    {
      title: "Container Transport",
      description: "Robust chassis for safe and efficient container transportation.",
      url: "/shop#transport",
      className: "md:col-span-7 h-[350px] md:h-[500px] bg-[url('/images/base3.jpg')]",
      accent: "from-blue-700 to-cyan-600"
    },
    {
      title: "Project Gallery",
      description: "Explore our portfolio of innovative container solutions and custom builds.",
      url: "/shop#gallery",
      className: "md:col-span-5 h-[350px] md:h-[500px] bg-[url('/images/base4.jpg')]",
      accent: "from-cyan-600 to-sky-600"
    }
  ];

  return (
    <div className="px-4 xl:px-0 py-16 md:py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-50 to-transparent -z-10" />

      {/* Decorative Blur */}
      <motion.div
        className="absolute -top-24 -left-24 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
      />

      <section className="max-w-frame mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-4">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
            </svg>
            <span className="text-sm font-bold uppercase tracking-wider">Our Solutions</span>
          </div>
          <h2 className={cn([
            integralCF.className,
            "text-3xl md:text-5xl lg:text-6xl mb-4 bg-gradient-to-r from-gray-900 via-blue-900 to-gray-800 bg-clip-text text-transparent"
          ])}>
            Explore Our Container Solutions
          </h2>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
            From refrigerated units to custom builds, discover the perfect container solution for your needs
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-12 gap-6"
        >
          {categories.map((category, index) => (
            <DressStyleCard
              key={index}
              title={category.title}
              description={category.description}
              url={category.url}
              className={category.className}
              accent={category.accent}
              index={index}
            />
          ))}
        </motion.div>
      </section>
    </div>
  );
};

export default DressStyle;
