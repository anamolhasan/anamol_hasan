"use client";

import Link from "next/link";
import { useUser } from "@clerk/nextjs";

import AdminSidebar from "@/components/admin/AdminSidebar";
import MobileSidebar from "@/components/admin/MobileSidebar";

const AdminLayoutComponent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-950">
      {/* Mobile Header */}
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-white px-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 md:hidden">
        <Link
          href="/"
          className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
        >
          Admin Panel
        </Link>

        <MobileSidebar />
      </header>

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden h-screen w-64 shrink-0 border-r bg-white dark:border-neutral-800 dark:bg-neutral-900 md:h-screen md:w-64 md:flex-col md:border-r md:block">
          <AdminSidebar />
        </aside>

        {/* Main Content */}
        <main className="min-w-0 flex-1">
          <div className="p-4 md:p-8">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayoutComponent;