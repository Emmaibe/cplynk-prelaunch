"use client";

import Hero from "@/components/landing/hero";
import Why from "@/components/landing/Why";
import Footer from "@/components/landing/Footer";
import {useWaitlist} from "@/contexts/WaitlistContext";
import {useEffect} from "react";
import WaitlistForm from "@/components/waitlist/WaitlistForm";
import StatusModal from "@/components/waitlist/StatusModal";

export default function Home() {
    const {isWaitlistModalOpen, setIsWaitlistModalOpen, isSuccessModalOpen} = useWaitlist();

    useEffect(() => {
        if (isWaitlistModalOpen || isSuccessModalOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [isWaitlistModalOpen, isSuccessModalOpen]);

    return (
        <>
            <Hero/>
            <Why />
            <Footer />

            {
                isWaitlistModalOpen && (
                    <div className="absolute top-0 flex items-center justify-center h-screen w-full">
                        <div onClick={() => setIsWaitlistModalOpen(false)} className="fixed inset-0 z-20 bg-black opacity-50" />

                        <WaitlistForm />
                    </div>
                )
            }

            {
                isSuccessModalOpen && (
                    <StatusModal />
                )
            }
        </>
    );
}