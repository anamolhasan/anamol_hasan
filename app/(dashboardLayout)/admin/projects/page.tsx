import connectToDatabase from "@/lib/mongoose";
import Project from "@/models/Project";

import ProjectsTable from "@/components/project/ProjectsTable";

export default async function ProjectsPage() {
  await connectToDatabase();

  const projects = await Project.find({})
    .sort({ createdAt: -1 })
    .lean();

  const serializedProjects = JSON.parse(
    JSON.stringify(projects)
  );

  return (
    <ProjectsTable
      initialProjects={serializedProjects}
    />
  );
}