
import Link from "next/link";
import ProjectCard from "@/components/project/ProjectCard";
import { Project } from "@/types/project";
import { connectToDatabase } from "@/lib/mongoose";
import ProjectModals from "@/models/Project";


async function getLatestProjects(): Promise<Project[]> {
  await connectToDatabase();

  const projects = await ProjectModals.find({})
    .sort({ createdAt: -1 })
    .limit(4)
    .lean();

  return JSON.parse(JSON.stringify(projects));
}

export default async function HomeProjects() {
  const projects = await getLatestProjects();

  return (
    <section className="container mx-auto px-4 py-20">

      <div className="mb-10 text-center">
        <h2 className="text-4xl font-bold">
          Latest Projects
        </h2>

        <p className="mt-3 text-gray-500">
          Here are some of my recent works.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-4 lg:grid-cols-4">
        {projects?.map((project) => (
          <ProjectCard
            key={project._id}
            project={project}
          />
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link
          href="/projects"
          className="inline-flex rounded-lg bg-black px-6 py-3 text-white hover:opacity-90"
        >
          Show All Projects
        </Link>
      </div>

    </section>
  );
}

