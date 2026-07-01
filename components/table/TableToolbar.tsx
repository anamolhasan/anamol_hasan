"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";

interface TableToolbarProps {
  title: string;
  search?: string;
  onSearchChange?: (value: string) => void;

  addButton?: {
    href: string;
    label: string;
  };
}

export default function TableToolbar({
  title,
  search,
  onSearchChange,
  addButton,
}: TableToolbarProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        {onSearchChange && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search..."
              className="pl-9 w-full sm:w-64"
            />
          </div>
        )}

        {addButton && (
          <Button asChild>
            <Link href={addButton.href}>
              <Plus className="mr-2 h-4 w-4" />
              {addButton.label}
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}