import React from 'react';
import logo from "@/assets/icons/logo.svg";
import linkedin from "@/assets/icons/linkedin.svg";
import facebook from "@/assets/icons/facebook.svg";
import x from "@/assets/icons/x.svg";
import instagram from "@/assets/icons/instagram.svg";
import copyright from "@/assets/icons/copyright.svg";
import Image from "next/image";

const Footer = () => {
    return (
        <section className="h-[600px] flex justify-center items-center bg-gray-50">
            <footer className="p-2 bg-secondary w-full max-w-[1152px] rounded-[50px] h-[374px] flex flex-col items-center justify-between">
                <div className="flex flex-col items-center gap-[20px]">
                    <Image src={logo} alt={"logo"} className="mt-20" />
                    <p className="text-neutral-50 text-[18px]">Shared Rides. Shared Stories. Navigating Lagos together.</p>
                    <div className="w-full flex items-center justify-between max-w-[206px]">
                        <Image src={linkedin} alt={"linkedin icon"} />
                        <Image src={facebook} alt={"facebook icon"} />
                        <Image src={x} alt={"x icon"} />
                        <Image src={instagram} alt={"instagram icon"} />
                    </div>
                </div>

                <div className="w-full max-w-[928px] flex items-center gap-2 justify-center border-t border-gray-50 p-7">
                    <Image src={copyright} alt={"copy right icon"} />
                    <p className="text-primary text-[18px]">2025 All Rights Reserved</p>
                </div>
            </footer>
        </section>
    );
};

export default Footer;