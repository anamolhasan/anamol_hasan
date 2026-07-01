
import Link from "next/link";
import ProjectCard from "@/components/project/ProjectCard";

interface LinkItem {
  label: string;
  url: string;
}

interface Project {
  _id: string;
  title: string;
  description: string;
  images: string[];
  liveLinks: LinkItem[];
  sourceCodes: LinkItem[];
  technologies: string[];
}

async function getLatestProjects(): Promise<Project[]> {
  const res = await fetch(
    "http://localhost:3000/api/projects?limit=4",
    {
      cache: "no-store",
    }
  );

  const data = await res.json();

  return data.data;
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
        {projects.map((project) => (
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

