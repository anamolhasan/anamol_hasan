"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, Zap, LogOut } from "lucide-react";
import { SignOutButton, useUser } from "@clerk/nextjs";

interface AdminSidebarProps {
  onNavigate?: () => void;
  showLogo?: boolean;
}

const AdminSidebar = ({ 
     onNavigate,
     showLogo = true,
}: AdminSidebarProps) => {
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
    <aside className="flex h-full w-64 flex-col bg-white dark:bg-neutral-900">
      {
  showLogo && (
    <div className="border-b p-6 dark:border-neutral-800">
      <Link
        href="/"
        onClick={onNavigate}
        className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
      >
        Admin Panel
      </Link>
    </div>
  )
}

      <nav className="flex-1 space-y-2 p-4">
        {navItems.map((item) => {
          const Icon = item.icon;

          const active =
            pathname === item.href ||
            (item.href !== "/admin" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 transition
              ${
                active
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                  : "hover:bg-gray-100 dark:hover:bg-neutral-800"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t p-4 dark:border-neutral-800">
        <div className="mb-3 rounded-lg bg-gray-100 p-3 dark:bg-neutral-800">
          <p className="truncate text-sm font-medium">
            {user?.fullName || user?.emailAddresses[0]?.emailAddress}
          </p>
        </div>

        <SignOutButton>
          <button className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-red-600 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900/20">
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </SignOutButton>
      </div>
    </aside>
  );
};

export default AdminSidebar;