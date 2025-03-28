"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
// import { Geist, Geist_Mono } from "next/font/google";
import { SidebarProvider } from "@/components/ui/sidebar";
import { LayoutDashboard, Bot, LogOut, Menu } from "lucide-react";
import { signOut } from "next-auth/react";
import AuthProvider from "@/context/AuthProvider";

// const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
// const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const navItems = [
  { title: "Dashboard", href: "/main/dashboard", icon: LayoutDashboard },
  { title: "Agents", href: "/main/agents", icon: Bot },
];


export default function SidebarLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <AuthProvider>
      <SidebarProvider>
        <div className="flex h-screen w-full">
          {/* Sidebar */}
          <aside
            className={`fixed lg:static z-50 left-0 top-0 w-96 h-full bg-gray-900 text-white transform transition-transform duration-300
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
                <button onClick={() => signOut()} className="flex items-center gap-3 px-3 py-2 w-full rounded-lg hover:bg-gray-800 transition-colors">
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
              className={`${isSidebarOpen && "hidden"} lg:hidden fixed top-4 left-4 bg-gray-900 p-2 rounded-md text-white z-50`}
            >
              <Menu className="w-6 h-6" />
            </button>

            {children}
          </main>
        </div>
      </SidebarProvider>
    </AuthProvider>
  );
}
