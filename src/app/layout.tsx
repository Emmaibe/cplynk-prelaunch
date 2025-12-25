import type { Metadata } from "next";
import {Syne} from "next/font/google";
import "./globals.css";

const syne = Syne({
    variable: "--font-syne",
    subsets: ["latin"],
    weight: ['400', '500', '600', '700', '800'],
    display: 'swap',
});

export const metadata: Metadata = {
    title: "Cplynk Pre-Launch Landing Page",
    description: "Cplynk Pre-Launch Landing Page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${syne.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
