import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import Image from "next/image";
import React from "react";
import * as motion from "framer-motion/client";

const AboutUs = () => {
    return (
        <section className="max-w-frame mx-auto px-4 xl:px-0 py-12 md:py-20">
            <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-10 md:gap-20">
                <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex-1"
                >
                    <div className="relative w-full h-full aspect-[4/3] rounded-[20px] overflow-hidden">
                        <video
                            src="/videos/about.mp4"
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover"
                        />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex-1 text-center md:text-left"
                >
                    <h2
                        className={cn([
                            integralCF.className,
                            "text-[32px] md:text-5xl mb-6 capitalize leading-tight",
                        ])}
                    >
                        Refining Style, <br className="hidden md:block" /> Redefining comfort
                    </h2>
                    <p className="text-black/60 text-base md:text-lg mb-8 leading-relaxed">
                        At Prime Containers, we believe that a container is more than just a steel box, it's a foundation for innovation and efficiency. Our mission is to provide high-quality, customized, and sustainable container solutions that empower you to build, store, and grow with confidence.
                        <br /><br />
                        From bespoke architectural modifications to heavy-duty industrial units, our commitment to precision engineering ensures that every container we deliver meets the highest standards of durability and functionality.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                        <div className="flex flex-col">
                            <span className="font-bold text-3xl md:text-4xl">200+</span>
                            <span className="text-black/60 text-sm">International Brands</span>
                        </div>
                        <div className="w-px h-12 bg-black/10 hidden sm:block"></div>
                        <div className="flex flex-col">
                            <span className="font-bold text-3xl md:text-4xl">2,000+</span>
                            <span className="text-black/60 text-sm">High-Quality Products</span>
                        </div>
                        <div className="w-px h-12 bg-black/10 hidden sm:block"></div>
                        <div className="flex flex-col">
                            <span className="font-bold text-3xl md:text-4xl">30,000+</span>
                            <span className="text-black/60 text-sm">Happy Customers</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default AboutUs;
