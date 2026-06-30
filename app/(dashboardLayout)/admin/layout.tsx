"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, Zap, LogOut } from "lucide-react";
import { SignOutButton, useUser } from "@clerk/nextjs";
import { div } from "framer-motion/m";

const AdminLayoutComponent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  const { user } = useUser();

  const navItems = [
    {
      label: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      label: "Projects",
      href: "/admin/projects",
      icon: Zap,
    },
    {
      label: "Blog",
      href: "/admin/blog",
      icon: FileText,
    },
  ];

  return (
    // <div className="">
    //   <div className="bg-gray-50 dark:bg-neutral-950">
        <div className="flex h-screen">
          {/* Sidebar */}
          <aside className="w-64 bg-white dark:bg-neutral-900 border-r dark:border-neutral-800 shadow-sm flex flex-col">
            <div className="p-6 border-b dark:border-neutral-800">
              <Link href={'/'} className="text-2xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Admin Panel
              </Link>
            </div>

            <nav className="p-4 space-y-2 flex-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                      ${
                        isActive
                          ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-semibold"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-800"
                      }
                    `}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* User Info & Logout */}
            <div className="p-4 border-t dark:border-neutral-800">
              <div className="bg-gray-100 dark:bg-neutral-800 rounded-lg p-3 mb-3">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {user?.fullName || user?.emailAddresses[0]?.emailAddress}
                </p>
              </div>
              <SignOutButton>
                <button className="w-full flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-red-100 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg transition-colors">
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm">Logout</span>
                </button>
              </SignOutButton>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            <div className="p-8">
              {children}
            </div>
          </main>
        </div>
    //   </div>
    // </div>
  );
};

export default AdminLayoutComponent;
