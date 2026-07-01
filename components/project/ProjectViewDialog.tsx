"use client";

import Link from "next/link";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Badge } from "@/components/ui/badge";

import { ExternalLink, Calendar } from "lucide-react";
import { FaGithub } from "react-icons/fa";

import RichTextViewer from "@/components/editor/RichTextViewer";
import ProjectGallery from "@/components/project/ProjectGallery";
import { Project } from "@/types/project";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: Project | null;
}

export default function ProjectViewDialog({
  open,
  onOpenChange,
  project,
}: Props) {
  if (!project) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-full overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{project.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-8">
          <ProjectGallery images={project.images} />

          <div>
            <h3 className="mb-3 font-semibold">Technologies</h3>

            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <Badge key={tech}>{tech}</Badge>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-3 font-semibold">Description</h3>

            <RichTextViewer content={project.description} />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h3 className="font-semibold">Live Links</h3>

              {project.liveLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.url}
                  target="_blank"
                  className="flex items-center gap-2 rounded-lg border p-3 hover:bg-muted"
                >
                  <ExternalLink className="h-4 w-4" />
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">Source Codes</h3>

              {project.sourceCodes.map((link, index) => (
                <Link
                  key={index}
                  href={link.url}
                  target="_blank"
                  className="flex items-center gap-2 rounded-lg border p-3 hover:bg-muted"
                >
                  <FaGithub className="h-4 w-4" />
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Created :{new Date(project.createdAt).toLocaleDateString()}
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Updated :{new Date(project.updatedAt).toLocaleDateString()}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
