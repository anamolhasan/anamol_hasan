import Image from "next/image";
import Link from "next/link";
import React from "react";

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

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow transition hover:shadow-lg">
      <div className="relative h-56 w-full">
        <Image
          src={project.images[0]}
          alt={project.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="space-y-4 p-5">
        {" "}
        <h2 className="text-xl font-bold"> {project.title} </h2>{" "}
        <div className="flex flex-wrap gap-2">
          {" "}
          {project.technologies.slice(0, 4).map((tech) => (
            <span key={tech} className="rounded bg-blue-100 px-2 py-1 text-xs">
              {" "}
              {tech}{" "}
            </span>
          ))}{" "}
        </div>{" "}
        <Link
          href={`/projects/${project._id}`}
          className="inline-flex rounded-lg bg-black px-4 py-2 text-white hover:opacity-90"
        >
          {" "}
          View Details{" "}
        </Link>{" "}
      </div>{" "}
    </div>
  );
};

export default ProjectCard;
