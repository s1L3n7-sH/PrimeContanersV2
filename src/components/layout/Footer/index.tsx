import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";
import LinksSection from "./LinksSection";
import NewsLetterSection from "./NewsLetterSection";
import * as motion from "framer-motion/client";

const socialsData = [
  { id: 1, icon: <FaTwitter />, url: "https://twitter.com", label: "Twitter" },
  { id: 2, icon: <FaFacebookF />, url: "https://facebook.com", label: "Facebook" },
  { id: 3, icon: <FaInstagram />, url: "https://instagram.com", label: "Instagram" },
  { id: 4, icon: <FaLinkedinIn />, url: "https://linkedin.com", label: "LinkedIn" },
];

const Footer = () => {
  return (
    <footer className="relative mt-20 bg-gradient-to-b from-white via-blue-50/30 to-white">
      {/* Newsletter Section */}
      <div className="relative px-4 mb-16">
        <NewsLetterSection />
      </div>

      {/* Decorative Elements */}
      <motion.div
        className="absolute top-20 right-10 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
        }}
      />

      {/* Main Footer */}
      <div className="max-w-frame mx-auto px-4 xl:px-0 pt-12 pb-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className={cn([
                integralCF.className,
                "text-3xl lg:text-4xl mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent"
              ])}>
                PRIME Containers
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-6 max-w-sm">
                We have containers that suit your storage and shipping needs, built to last and designed for durability. From standard to custom solutions.
              </p>

              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <a href="tel:+1234567890" className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors group">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium">(123) 456-7890</span>
                </a>
                <a href="mailto:info@primecontainers.com" className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors group">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium">info@primecontainers.org</span>
                </a>
                <div className="flex items-start gap-3 text-gray-700">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium">123 Container St, Shipping City, SC 12345</span>
                </div>
              </div>

              {/* Social Media */}
              <div className="flex items-center gap-3">
                {socialsData.map((social) => (
                  <motion.a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white border-2 border-blue-200 hover:border-blue-600 hover:bg-blue-600 transition-all flex items-center justify-center text-blue-600 hover:text-white shadow-sm"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            <LinksSection />
          </div>
        </div>

        {/* Divider */}
        <div className="relative w-full mb-8">
          <div className="w-full h-px bg-gray-200" />
          <div className="absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50" />
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <motion.p
            className="text-sm text-gray-600 text-center md:text-left"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            © 2026 Prime Containers. All rights reserved. Made by{" "}
            <Link
              href="#"
              target="_blank"
              className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
            >
              Raffy Suarez
            </Link>
          </motion.p>

          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Link href="/privacy" className="text-sm text-gray-600 hover:text-blue-600 transition-colors font-medium">
              Privacy Policy
            </Link>
            <span className="text-gray-300">•</span>
            <Link href="/terms" className="text-sm text-gray-600 hover:text-blue-600 transition-colors font-medium">
              Terms of Service
            </Link>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
