import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import React from "react";
import * as motion from "framer-motion/client";
import DressStyleCard from "./DressStyleCard";

const DressStyle = () => {
  return (
    <div className="px-4 xl:px-0">
      <section className="max-w-frame mx-auto  px-6 pb-6 pt-10 md:p-[70px] rounded-[40px] text-center">
        <motion.div
          initial={{ y: "100px", opacity: 0 }}
          whileInView={{ y: "0", opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6"
        >
          <DressStyleCard
            title="Secure & reliable Refrigerated containers"
            description="Keep perishables fresh with advanced temperature control containers."
            url="/shop#casual"
            className="md:col-span-5 h-[300px] md:h-[500px] bg-[url('/images/base1.jpeg')]"
          />
          <DressStyleCard
            title="Tailored container solutions Container modifications"
            description="Customize your container with expert, tailored modification services."
            url="/shop#formal"
            className="md:col-span-7 h-[300px] md:h-[500px] bg-[url('/images/base2.jpg')]"
          />
          <DressStyleCard
            title="Efficient container transport Container chassis"
            description="Robust chassis for safe and efficient container transportation."
            url="/shop#party"
            className="md:col-span-7 h-[300px] md:h-[500px] bg-[url('/images/base3.jpg')]"
          />
          <DressStyleCard
            title="View our work Project gallery"
            description="Explore our gallery for innovative container solutions, from offices to custom storage."
            url="/shop#gym"
            className="md:col-span-5 h-[300px] md:h-[500px] bg-[url('/images/base4.jpg')]"
          />
        </motion.div>
      </section>
    </div>
  );
};

export default DressStyle;
