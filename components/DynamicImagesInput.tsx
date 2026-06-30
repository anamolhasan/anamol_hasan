"use client";

import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

interface DynamicImagesInputProps {
  previews: string[];
  onFilesChange: (files: File[]) => void;
  onPreviewsChange: (previews: string[]) => void;
}

export default function DynamicImagesInput({
  previews,
  onFilesChange,
  onPreviewsChange,
}: DynamicImagesInputProps) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(e.target.files || []);

    if (!files.length) return;

    const urls = files.map((file) =>
      URL.createObjectURL(file)
    );

    onFilesChange(files);

    onPreviewsChange([...previews, ...urls]);

    e.target.value = "";
  };

  const removeImage = (index: number) => {
    const updated = previews.filter((_, i) => i !== index);

    onPreviewsChange(updated);
  };

  return (
    <div className="space-y-4">

      <div className="flex items-center justify-between">

        <h3 className="text-lg font-semibold">
          Project Images
        </h3>

        <label>
          <input
            type="file"
            multiple
            accept="image/*"
            hidden
            onChange={handleChange}
          />

          <Button
            type="button"
            asChild
            variant="outline"
          >
            <span>
              <Plus className="mr-2 h-4 w-4" />
              Add Images
            </span>
          </Button>
        </label>

      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {previews.map((image, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-lg border"
          >
            <img
              src={image}
              alt=""
              className="h-44 w-full object-cover"
            />

            <Button
              type="button"
              size="icon"
              variant="destructive"
              className="absolute right-2 top-2"
              onClick={() => removeImage(index)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

    </div>
  );
}