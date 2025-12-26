"use client";

import React from 'react';
import { motion } from "framer-motion";
import driver from "@/assets/images/driver.svg";
import riders from "@/assets/images/riders.svg";
import car from "@/assets/images/car.svg";
import Image from "next/image";
import {useWaitlist} from "@/contexts/WaitlistContext";

const Why = () => {
    const [page, setPage] = React.useState<string>(navItems[0].value);

    return (
        <section className="py-16 px-2 bg-neutral-50 flex flex-col gap-24 items-center justify-center">
            <div className="flex flex-col items-center text-secondary gap-2">
                <div className="w-fit font-bold text-base flex items-center bg-secondary p-1.5 rounded-full">
                    {
                        navItems.map((item) => (
                            <div
                                key={item.value}
                                className="relative z-0"
                            >
                                <button
                                    onClick={() => setPage(item.value)}
                                    className={`
                                        relative z-10 cursor-pointer py-3 px-5 
                                        ${item.value === page ? "text-secondary" : "text-primary"} 
                                        transition-colors duration-400 z-[10]
                                    `}
                                >
                                    {item.name}
                                </button>

                                {page && page === item.value && (
                                    <motion.span
                                        layoutId="pill-tab"
                                        transition={{ ease: "easeInOut", duration: 0.4 }}
                                        className="absolute bg-primary inset-0 rounded-full z-0 pointer-events-none"
                                    ></motion.span>
                                )}
                            </div>
                        ))
                    }
                </div>
                <h2 className="font-bold text-[40px] mt-6">
                    {
                        page === "driver" ?
                            "Why Drive with Cplynk?" :
                            "Why Riders Choose Cplynk"
                    }
                </h2>
                <p className="text-2xl">
                    {
                        page === "driver" ?
                            "Turn your everyday commute into something more rewarding" :
                            "Skip the stress. Share a ride with people going your way and enjoy a calmer commute"
                    }
                </p>
            </div>

            <div
                style={{ backgroundImage: `url(${page === "driver" ? driver.src : riders.src})` }}
                className="w-full max-w-[1152px] h-[679px] rounded-[50px] p-10 flex"
            >
                {
                    page === "driver" ?
                        (
                            <WhyChooseReasonsCard page={page} />
                        ) :
                        (
                            <WhyChooseReasonsCard page={page} />
                        )
                }
            </div>
        </section>
    );
};

export default Why;

const navItems = [
    {
        name: "Drivers",
        value: "driver",
    },
    {
        name: "Riders",
        value: "riders",
    }
]

const why = {
    driver: [
        'Drive on your own schedule',
        'Earn on Your Commute',
        'Safety First',
        'Quick Payouts',
        'Reliable Support',
        'Be part of a community',
    ],
    riders: [
        'Upfront Pricing',
        'Trusted Drivers',
        'Simple Payments',
        'Save Time',
        'Meet People',
        'Reliable Service'
    ],
}

const WhyChooseReasonsCard = ({ page }: {
    page: string;
}) => {
    const { setIsWaitlistModalOpen } = useWaitlist();

    return (
        <motion.div
            layoutId="why-choose"
            transition={{ ease: "circIn", duration: 0.4 }}
            className={`
                relative flex-none w-full sm:w-[456px] p-7 rounded-[40px] h-full
                ${page === "riders" ? "ml-auto" : "mr-auto"}
            `}
        >
            <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-[40px]" />

            <div className="relative h-full z-10 rounded-[40px] flex flex-col justify-between">
                <div>
                    <Image src={car} alt={"car icon"} />
                </div>

                {
                    page && page === "driver" ? why.driver.map((item, index) => (
                        <p key={index} className="font-semibold text-[20px] text-neutral-50">{item}</p>
                    )) : why.riders.map((item, index) => (
                        <p key={index} className="font-semibold text-[20px] text-neutral-50">{item}</p>
                    ))
                }
                <motion.button
                    whileHover={{scale: 1.02}}
                    whileTap={{scale: 0.97}}
                    onClick={() => setIsWaitlistModalOpen(true)}
                    className="w-fit text-text_color px-6 py-3.5 rounded-[14px] bg-primary text-base font-bold"
                >
                    Join Waitlist
                </motion.button>
            </div>
        </motion.div>
    )
}