/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

interface Project {
  _id: string;
  title: string;
  description: string;
  image: string;
  liveLink: string;
  sourceCode: string;
  technologies: string[];
  createdAt: string;
  updatedAt: string;
}

const columnHelper = createColumnHelper<Project>();

export default function ProjectsPage() {
  const router = useRouter();
  const [data, setData] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/projects");
      const result = await response.json();
      console.log(result.data);

      if (!response.ok) {
        setError(result.message || "Failed to fetch projects");
        return;
      }

      setData(result.data);
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this project?")) {
      return;
    }

    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        alert("Failed to delete project");
        return;
      }

      setData((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Error deleting project:", err);
      alert("An error occurred while deleting");
    }
  };

  const columns = [
    columnHelper.accessor("title", {
      header: "Title",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("description", {
      header: "Description",
      cell: (info) => (
        <span className="line-clamp-2">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor("technologies", {
      header: "Technologies",
      cell: (info) => (
        <div className="flex flex-wrap gap-1">
          {info.getValue().slice(0, 3).map((tech, idx) => (
            <span
              key={idx}
              className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs px-2 py-1 rounded"
            >
              {tech}
            </span>
          ))}
          {info.getValue().length > 3 && (
            <span className="text-xs text-gray-600 dark:text-gray-400">
              +{info.getValue().length - 3}
            </span>
          )}
        </div>
      ),
    }),
    columnHelper.accessor("createdAt", {
      header: "Created",
      cell: (info) =>
        new Date(info.getValue()).toLocaleDateString(),
    }),
    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: (info) => (
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              router.push(
                `/admin/projects/edit?id=${info.row.original._id}`
              )
            }
          >
            Edit
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => handleDelete(info.row.original._id)}
          >
            Delete
          </Button>
        </div>
      ),
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-6 bg-white dark:bg-neutral-950 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Projects</h1>
        <Button onClick={() => router.push("/admin/projects/add")}>
          Add New Project
        </Button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="text-center py-8">Loading projects...</div>
      ) : data.length === 0 ? (
        <div className="text-center py-8 text-gray-600 dark:text-gray-400">
          No projects found
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr
                  key={headerGroup.id}
                  className="border-b dark:border-gray-700"
                >
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-4 py-3 text-left font-semibold bg-gray-50 dark:bg-neutral-900"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-neutral-900/50"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-3 text-sm">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
        Showing {data.length} project{data.length !== 1 ? "s" : ""}
      </div>
    </div>
  );
}
