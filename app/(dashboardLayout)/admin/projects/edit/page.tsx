import { notFound } from "next/navigation";

import ProjectForm from "@/components/ProjectForm";
import connectToDatabase from "@/lib/mongoose";
import Project from "@/models/Project";

interface EditProjectPageProps {
  searchParams: Promise<{
    id?: string;
  }>;
}

export default async function EditProjectPage({
  searchParams,
}: EditProjectPageProps) {
  const { id } = await searchParams;

  if (!id) {
    notFound();
  }

  await connectToDatabase();

  const project = await Project.findById(id).lean();

  if (!project) {
    notFound();
  }

  const projectData = JSON.parse(JSON.stringify(project));

  return (
    <ProjectForm
      initialData={projectData}
      isEditing
    />
  );
}