"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { useRouter } from "next/navigation";

import type { Project } from "@/types/project";

import ActionButtons from "@/components/table/ActionButtons";
import DeleteDialog from "@/components/table/DeleteDialog";

const columnHelper = createColumnHelper<Project>();

interface Props {
  router: ReturnType<typeof useRouter>;
  onView: (project: Project) => void;
  onDelete: (id: string) => void;
}

export function getProjectColumns({
  router,
  onView,
  onDelete,
}: Props) {
  return [
    columnHelper.accessor("title", {
      header: "Title",
    }),

    columnHelper.accessor("technologies", {
      header: "Technologies",

      cell: ({ getValue }) => (
        <div className="flex flex-wrap gap-1">
          {getValue()
            .slice(0, 3)
            .map((tech) => (
              <span
                key={tech}
                className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
              >
                {tech}
              </span>
            ))}

          {getValue().length > 3 && (
            <span className="text-xs text-muted-foreground">
              +{getValue().length - 3}
            </span>
          )}
        </div>
      ),
    }),

    columnHelper.accessor("createdAt", {
      header: "Created",

      cell: ({ getValue }) =>
        new Date(getValue()).toLocaleDateString(),
    }),

    columnHelper.display({
      id: "actions",

      header: "Actions",

      cell: ({ row }) => {
        const project = row.original;

        return (
          <div className="flex items-center gap-2">
            <ActionButtons
              onView={() => onView(project)}
              onEdit={() =>
                router.push(
                  `/admin/projects/edit?id=${project._id}`
                )
              }
            />

            <DeleteDialog
              title="Delete Project"
              description={`Are you sure you want to delete "${project.title}"?`}
              onConfirm={() => onDelete(project._id)}
            />
          </div>
        );
      },
    }),
  ];
}