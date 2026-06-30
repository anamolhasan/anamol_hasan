"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

export interface LinkItem {
  label: string;
  url: string;
}

interface DynamicLinksInputProps {
  title: string;
  value: LinkItem[];
  onChange: (value: LinkItem[]) => void;
}

export default function DynamicLinksInput({
  title,
  value,
  onChange,
}: DynamicLinksInputProps) {
  const addItem = () => {
    onChange([
      ...value,
      {
        label: "",
        url: "",
      },
    ]);
  };

  const removeItem = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const updateItem = (
    index: number,
    field: keyof LinkItem,
    newValue: string
  ) => {
    const updated = [...value];

    updated[index][field] = newValue;

    onChange(updated);
  };

  return (
    <div className="space-y-4">

      <div className="flex items-center justify-between">

        <h3 className="text-lg font-semibold">
          {title}
        </h3>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addItem}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add
        </Button>

      </div>

      {value.map((item, index) => (
        <div
          key={index}
          className="space-y-3 rounded-lg border p-4"
        >
          <Input
            placeholder="Label (Frontend, Backend...)"
            value={item.label}
            onChange={(e) =>
              updateItem(index, "label", e.target.value)
            }
          />

          <Input
            placeholder="https://..."
            value={item.url}
            onChange={(e) =>
              updateItem(index, "url", e.target.value)
            }
          />

          <div className="flex justify-end">

            <Button
              type="button"
              variant="destructive"
              size="icon"
              onClick={() => removeItem(index)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>

          </div>

        </div>
      ))}

      {value.length === 0 && (
        <p className="text-sm text-muted-foreground">
          No links added.
        </p>
      )}

    </div>
  );
}