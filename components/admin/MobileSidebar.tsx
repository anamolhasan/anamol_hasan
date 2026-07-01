"use client";

import { Menu } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import AdminSidebar from "./AdminSidebar";

const MobileSidebar = () => {
  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border bg-background"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </SheetTrigger>

        <SheetContent side="left" className="w-72 p-0">
          <SheetHeader className="sr-only">
            <SheetTitle>Admin Navigation</SheetTitle>
          </SheetHeader>

          <AdminSidebar showLogo={false} />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileSidebar;