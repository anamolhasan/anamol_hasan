'use client'
import { Project } from '@/types/project';
import { useRouter } from 'next/navigation';
import React, { useMemo, useState } from 'react'
import { getProjectColumns } from './ProjectColumns';
import ProjectViewDialog from './ProjectViewDialog';
import TableToolbar from '../table/TableToolbar';
import { DataTable } from '../table/DataTable';


interface ProjectsTableProps {
  initialProjects: Project[];
}
const ProjectsTable = ({ 
    initialProjects 
}: ProjectsTableProps) => {
    const router = useRouter();
const [projects, setProjects] = useState(initialProjects);
const loading = false;
const [error, setError] = useState("");

const [selectedProject, setSelectedProject] =
  useState<Project | null>(null);

const [open, setOpen] = useState(false);


const handleDelete = async (id: string) => {
  try {
    const response = await fetch(`/api/projects/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete project");
    }

    setProjects((prev) =>
      prev.filter((project) => project._id !== id)
    );
  } catch (err) {
    console.error(err);
  }
}

const columns = useMemo(
  () =>
    getProjectColumns({
      router,

      onView(project) {
        setSelectedProject(project);
        setOpen(true);
      },

      onDelete(id) {
        handleDelete(id);
      },
    }),
  [router]
)


  return (
  <div className="space-y-6 rounded-lg bg-white p-6 dark:bg-neutral-950">
    <TableToolbar
      title="Projects"
      addButton={{
        href: "/admin/projects/add",
        label: "Add Project",
      }}
    />

    {error && (
      <div className="rounded bg-red-100 p-4 text-red-600">
        {error}
      </div>
    )}

    <DataTable
      columns={columns}
      data={projects}
      loading={loading}
      emptyMessage="No projects found"
    />

    <ProjectViewDialog
      open={open}
      onOpenChange={setOpen}
      project={selectedProject}
    />
  </div>
);
}

export default ProjectsTable