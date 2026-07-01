/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TiptapEditor from "./TiptapEditor";
import DynamicImagesInput from "./DynamicImagesInput";
import DynamicLinksInput from "./DynamicLinksInput";


interface LinkItem {
  label: string;
  url: string;
}

interface ProjectFormProps {
  initialData?: {
    _id: string;
    title: string;
    description: string;
    images: string[];
    liveLinks: LinkItem[];
    sourceCodes: LinkItem[];
    technologies: string[];
  };
  isEditing?: boolean;
}

export default function ProjectForm({
  initialData,
  isEditing = false,
}: ProjectFormProps) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
  title: initialData?.title || "",
  description: initialData?.description || "",
  liveLinks: initialData?.liveLinks || [],
  sourceCodes: initialData?.sourceCodes || [],
  technologies: initialData?.technologies?.join(", ") || "",
});

const [imageFiles, setImageFiles] = useState<File[]>([]);

const [previews, setPreviews] = useState<string[]>(
  initialData?.images || []
);
const [existingImages, setExistingImages] = useState<string[]>(
  initialData?.images || []
);

const [deletedImages, setDeletedImages] = useState<string[]>([]);

const removeExistingImage = (index: number) => {
  const removedImage = existingImages[index];

  setDeletedImages((prev) => [...prev, removedImage]);

  setExistingImages((prev) =>
    prev.filter((_, i) => i !== index)
  );

  setPreviews((prev) =>
    prev.filter((_, i) => i !== index)
  );
};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDescriptionChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      description: value,
    }));
  };

  const getPublicId = (url: string) => {
      const part = url.split("/upload/")[1];

      const withoutVersion = part.replace(/^v\d+\//, "");

      return withoutVersion.replace(/\.[^/.]+$/, "");
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    setError("");

    const imageUrls = [...existingImages];

    if (imageFiles.length > 0) {
      for (const file of imageFiles) {
        const uploadFormData = new FormData();

        uploadFormData.append("file", file);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: uploadFormData,
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message);
        }

        imageUrls.push(result.url);
      }
    }

    try {
     const payload = {
      title: formData.title,
      description: formData.description,
      images: imageUrls,
      liveLinks: formData.liveLinks,
      sourceCodes: formData.sourceCodes,
      technologies:
      typeof formData.technologies === "string"
        ? formData.technologies
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean)
        : formData.technologies,
    };

      const url = isEditing
        ? `/api/projects/${initialData?._id}`
        : "/api/projects";

      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      // শুধুমাত্র Update এর সময়
      if (isEditing && deletedImages.length > 0) {
        await Promise.all(
          deletedImages.map((url) =>
            fetch("/api/cloudinary/delete", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                publicId: getPublicId(url),
              }),
            })
          )
        );
      }

      router.push("/admin/projects");
      router.refresh();
    } catch (error: any) {
      setError(error.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 rounded-lg shadow bg-white">
      <h1 className="text-3xl font-bold mb-6">
        {isEditing ? "Update Project" : "Add New Project"}
      </h1>

      {error && (
        <div className="mb-4 rounded bg-red-100 p-3 text-red-600">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          name="title"
          placeholder="Project Title"
          value={formData.title}
          onChange={handleChange}
        />

        <div>
          <label className="mb-2 block font-medium">
            Description
          </label>

          <TiptapEditor
            value={formData.description}
            onChange={handleDescriptionChange}
          />
        </div>

       <DynamicImagesInput
          previews={previews}
          existingImages={existingImages}
          onRemoveExistingImage={removeExistingImage}
          onFilesChange={setImageFiles}
          onPreviewsChange={setPreviews}
        />

        <DynamicLinksInput
          title="Live Links"
          value={formData.liveLinks}
          onChange={(links: LinkItem[]) =>
            setFormData((prev) => ({
              ...prev,
              liveLinks: links,
            }))
          }
        />

  

        <DynamicLinksInput
          title="Source Codes"
          value={formData.sourceCodes}
          onChange={(links: LinkItem[]) =>
            setFormData((prev) => ({
              ...prev,
              sourceCodes: links,
            }))
          }
        />

        <Input
          name="technologies"
          placeholder="React, Next.js, TypeScript"
          value={formData.technologies}
          onChange={handleChange}
        />

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full"
        >
          {isLoading
            ? isEditing
              ? "Updating..."
              : "Creating..."
            : isEditing
            ? "Update Project"
            : "Create Project"}
        </Button>
      </form>
    </div>
  );
}