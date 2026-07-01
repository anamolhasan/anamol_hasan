import ProjectGallery from "@/components/project/ProjectGallery";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ExternalLink,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import ProjectModel from "@/models/Project";
import { Project } from "@/types/project";
import { connectToDatabase } from "@/lib/mongoose";



async function getProject(
  id: string
): Promise<Project | null> {
  await connectToDatabase();

  const project = await ProjectModel.findById(id).lean();

  if (!project) {
    return null;
  }

  return JSON.parse(
    JSON.stringify(project)
  ) as Project;
}

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProjectDetailsPage({ params }: Props) {
  const { id } = await params;

  const project = await getProject(id);

  if (!project) {
    notFound();
  }

  return (
    <div className="container mx-auto px-24 py-16">
      <ProjectGallery images={project.images} />
    

    
<div className="mt-10 space-y-8">

  <div>
    <h1 className="text-4xl font-bold">
      {project.title}
    </h1>
  </div>

  <div>
    <h2 className="mb-3 text-xl font-semibold">
      Technologies
    </h2>

    <div className="flex flex-wrap gap-3">
      {project.technologies.map((tech) => (
        <span
          key={tech}
          className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700"
        >
          {tech}
        </span>
      ))}
    </div>
  </div>

  <div className="grid gap-8 md:grid-cols-2">

    
<div>
  <h2 className="mb-4 text-2xl font-semibold">
    Live Demo
  </h2>

  <div className="flex flex-wrap gap-4">
    {project.liveLinks.map((item, index) => (
      <Link
        key={index}
        href={item.url}
        target="_blank"
        className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700"
      >
        <ExternalLink className="h-5 w-5" />
        {item.label}
      </Link>
    ))}
  </div>
</div>



    
<div>
  <h2 className="mb-4 text-2xl font-semibold">
    Source Code
  </h2>

  <div className="flex flex-wrap gap-4">
    {project.sourceCodes.map((item, index) => (
      <Link
        key={index}
        href={item.url}
        target="_blank"
        className="inline-flex items-center gap-2 rounded-lg border px-5 py-3 transition hover:bg-gray-100 dark:hover:bg-neutral-900"
      >
        <FaGithub className="h-5 w-5" />
        {item.label}
      </Link>
    ))}
  </div>
</div>



    
<div>
  <h2 className="mb-5 text-2xl font-semibold">
    Project Description
  </h2>

  <div
    className="prose prose-lg max-w-none dark:prose-invert"
    dangerouslySetInnerHTML={{
      __html: project.description,
    }}
  />
</div>



  </div>

</div>


    </div>
  );
}
