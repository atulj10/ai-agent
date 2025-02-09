"use client"; // Required for usePathname

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/context/AuthProvider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { LayoutDashboard, Bot, LogOut, Menu } from "lucide-react";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const navItems = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Agents", href: "/agents", icon: Bot },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <html lang="en">
      <head />
      <body className={`bg-[#0A0A0A] ${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          <SidebarProvider>
            <div className="flex h-screen">
              {/* Sidebar */}
              <aside
                className={`fixed lg:static left-0 top-0 w-96 h-full bg-gray-900 text-white transform transition-transform duration-300
                ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
              >
                <div className="h-full flex flex-col">
                  {/* Header */}
                  <div className="p-4 border-b border-gray-800 flex justify-between items-center">
                    <h1 className="text-2xl font-bold">AI-Agent</h1>
                    {/* Close button for mobile */}
                    <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-white">
                      ✖
                    </button>
                  </div>

                  {/* Navigation */}
                  <nav className="flex-1 p-4">
                    <ul className="space-y-2">
                      {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                          <li key={item.href}>
                            <a
                              href={item.href}
                              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors
                                ${isActive ? "bg-[#5147f3] text-white" : "hover:bg-gray-800"}
                              `}
                            >
                              <item.icon className="w-5 h-5" />
                              <span className="text-xl">{item.title}</span>
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </nav>

                  {/* Footer with Sign Out */}
                  <div className="p-4 border-t border-gray-800">
                    <button className="flex items-center gap-3 px-3 py-2 w-full rounded-lg hover:bg-gray-800 transition-colors">
                      <LogOut className="w-5 h-5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              </aside>

              {/* Main Content */}
              <main className="flex-1 overflow-auto p-6">
                {/* Hamburger Button (for mobile) */}
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className={`${isSidebarOpen && "hidden"}   lg:hidden fixed top-4 left-4 bg-gray-900 p-2 rounded-md text-white z-50`}
                >
                  <Menu className="w-6 h-6" />
                </button>

                {children}
              </main>
            </div>
          </SidebarProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
