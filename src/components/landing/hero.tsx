import React from 'react';
import Image from "next/image";
import logo from "@/assets/icons/logo.svg"
import hero_icon from "@/assets/images/hero-icon.svg"
import car from "@/assets/images/red-car.svg"
import hero_asset from "@/assets/images/hero-asset.svg"
import { motion } from "framer-motion";
import {useWaitlist} from "@/contexts/WaitlistContext";

const Hero = () => {
    const { setIsWaitlistModalOpen } = useWaitlist();

    return (
        <section
            style={{
                backgroundImage: `url(${hero_asset.src})`,
            }}
            className="text-neutral-50 flex flex-col gap-20 items-center justify-center w-screen bg-secondary px-2"
        >
            <Image src={logo} alt={"logo"} className="mt-20 max-sm:w-[92px]" />

            <div className="flex flex-col items-center gap-9">
                <h1 className="max-w-[620px] text-[64px] leading-[120%] font-bold text-center max-sm:text-[40px]">Be the first to ride with <span className="text-primary">Cplynk</span></h1>

                <p className="max-w-[855px] text-xl font-normal text-center max-sm:text-base">
                    We are on a mission to make ride-sharing feel more human,
                    built on trust, flexibility, shared movement, and everyday life.
                    Join a community choosing a better way to move.
                </p>

                <motion.button
                    whileHover={{scale: 1.02}}
                    whileTap={{scale: 0.97}}
                    onClick={() => setIsWaitlistModalOpen(true)}
                    className="cursor-pointer text-text_color px-6 py-3.5 rounded-[14px] bg-primary text-base font-bold max-sm:text-sm"
                >
                    Join Waitlist
                </motion.button>
            </div>

            <div className="relative flex justify-center">
                <Image src={hero_icon} alt={"hero"} />
                <Image src={car} alt={"red car"} className="absolute bottom-0" />
            </div>
        </section>
    );
};

export default Hero;