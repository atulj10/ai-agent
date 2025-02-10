"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body className={`bg-[#0A0A0A] w-full h-full ${geistSans.variable} ${geistMono.variable} antialiased`}>
        <main className="flex h-full w-full">{children}</main>
      </body>
    </html>
  );
}
