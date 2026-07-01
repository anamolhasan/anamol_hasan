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

async function getProjects(): Promise<Project[]> {
  const res = await fetch("http://localhost:3000/api/projects", {
    cache: "no-store",
  });

  const data = await res.json();

  return data.data;
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