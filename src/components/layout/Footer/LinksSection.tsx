import React from "react";
import { FooterLinks } from "./footer.types";
import Link from "next/link";
import { cn } from "@/lib/utils";

const footerLinksData: FooterLinks[] = [
  {
    id: 1,
    title: "Services",
    children: [
      {
        id: 11,
        label: "Buy Containers",
        url: "/shop",
      },
      {
        id: 12,
        label: "Rent Containers",
        url: "/rental",
      },
      {
        id: 13,
        label: "Delivery Info",
        url: "/shop#new-arrivals",
      },
      {
        id: 14,
        label: "Request Quote",
        url: "/#quote",
      },
    ],
  },
  {
    id: 2,
    title: "Company",
    children: [
      {
        id: 21,
        label: "About Us",
        url: "/#about",
      },
      {
        id: 22,
        label: "Careers",
        url: "/career",
      },
      {
        id: 23,
        label: "Privacy Policy",
        url: "/privacy",
      },
      {
        id: 24,
        label: "Terms of Service",
        url: "/terms",
      },
    ],
  },
  {
    id: 3,
    title: "Support",
    children: [
      {
        id: 31,
        label: "Contact Us",
        url: "/#quote", // Directing to quote as contact
      },
      {
        id: 33,
        label: "FAQs",
        url: "/#faq",
      },
      {
        id: 34,
        label: "Support Center",
        url: "/#quote",
      },
    ],
  },
];

const LinksSection = () => {
  return (
    <>
      {footerLinksData.map((item) => (
        <section className="flex flex-col mt-5" key={item.id}>
          <h3 className="font-medium text-sm md:text-base uppercase tracking-widest mb-6">
            {item.title}
          </h3>
          {item.children.map((link) => (
            <Link
              href={link.url}
              key={link.id}
              className="text-black/60 hover:text-blue-600 transition-colors text-sm md:text-base mb-4 w-fit"
            >
              {link.label}
            </Link>
          ))}
        </section>
      ))}
    </>
  );
};

export default LinksSection;
