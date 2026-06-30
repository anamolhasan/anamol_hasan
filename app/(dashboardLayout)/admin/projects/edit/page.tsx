/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProjectForm from "@/components/ProjectForm";

export default function EditProjectPage() {
  const searchParams = useSearchParams();
  console.log(searchParams)
  const projectId = searchParams.get("id");
  const [projectData, setProjectData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!projectId) {
      setError("Project ID not found");
      setIsLoading(false);
      return;
    }

    const fetchProject = async () => {
      try {
        const response = await fetch(`/api/projects/${projectId}`);
        const result = await response.json();
        console.log(result)

        if (!response.ok) {
          setError(result.message || "Failed to fetch project");
          return;
        }

        const data = result.data;

          setProjectData({
            _id: data._id,
            title: data.title,
            description: data.description,
            images: data.images,
            liveLinks: data.liveLinks,
            sourceCodes: data.sourceCodes,
            technologies: data.technologies,
          });
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  if (isLoading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-600">{error}</div>;
  }

  if (!projectData) {
    return <div className="p-6 text-center">Project not found</div>;
  }

  return <ProjectForm initialData={projectData} isEditing={true} />;
}
