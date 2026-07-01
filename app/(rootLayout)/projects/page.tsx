import ProjectCard from "@/components/project/ProjectCard";
import connectToDatabase from "@/lib/mongoose";
import ProjectModel from "@/models/Project";
import { Project } from "@/types/project";



async function getProjects(): Promise<Project[]> {
  await connectToDatabase();

  const projects = await ProjectModel.find({})
    .sort({ createdAt: -1 })
    .lean();

  return JSON.parse(
    JSON.stringify(projects)
  ) as Project[];
}

 const ProjectsPage = async() => {
  const projects = await getProjects();

  return (
    <section className="container mx-auto px-4 py-16">

      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold">
          All Projects
        </h1>

        <p className="mt-3 text-gray-500">
          Explore all of my recent works.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard
            key={project._id}
            project={project}
          />
        ))}
      </div>

    </section>
  );
}
export default ProjectsPage;