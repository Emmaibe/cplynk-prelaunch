"use client";

import React from "react";
import { Share2, X } from "lucide-react";
import { useWaitlist } from "@/contexts/WaitlistContext";
import Image from "next/image";
import status from "@/assets/images/status.svg";

const StatusModal = () => {
    const { setIsSuccessModalOpen } = useWaitlist();

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div
                onClick={() => setIsSuccessModalOpen(false)}
                className="absolute inset-0 bg-black/50"
            />

            <div className="relative w-full max-w-[588px] rounded-[50px] bg-secondary px-3 py-14 flex flex-col gap-5 items-center">
                <X
                    onClick={() => setIsSuccessModalOpen(false)}
                    className="cursor-pointer absolute right-7 top-7 text-neutral-50"
                    size={27}
                />

                <Image src={status} alt="status image" />

                <div className="text-center max-w-[450px] mx-auto">
                    <h2 className="font-bold text-[40px] text-primary">You’re on the list!</h2>
                    <p className="text-[20px] text-neutral-50">
                        Thanks for joining the waitlist. You’ll be among the first to know when we launch
                    </p>
                </div>

                <div className="w-full max-w-[482px] flex items-center gap-2 justify-center border-t border-gray-50 pb-7 pt-14 mt-5">
                    <p className="text-neutral-50 text-[18px]">Invite friends to join CPlynk</p>
                    <Share2 className="text-primary" fill="#FFC107" />
                </div>
            </div>
        </div>
    );
};

export default StatusModal;
