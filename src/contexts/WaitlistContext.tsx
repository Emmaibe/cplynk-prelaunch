"use client";

import React, {createContext, ReactNode, useContext, useState} from "react";

interface WaitlistContextTypes {
    isWaitlistModalOpen: boolean;
    setIsWaitlistModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isSuccessModalOpen: boolean;
    setIsSuccessModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const WaitlistContext = createContext<WaitlistContextTypes | undefined>(undefined);

const WaitlistContextProvider = ({ children }: { children: ReactNode }) => {
    const [isWaitlistModalOpen, setIsWaitlistModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false
    );

    return (
        <WaitlistContext.Provider value={{
            isWaitlistModalOpen, setIsWaitlistModalOpen, isSuccessModalOpen, setIsSuccessModalOpen,
        }}>
            {children}
        </WaitlistContext.Provider>
    )
}

export default WaitlistContextProvider;

export const useWaitlist = () => {
    const context = useContext(WaitlistContext);
    if (!context) {
        throw new Error("useWaitlist must be used within a WaitlistContextProvider");
    }
    return context;
}