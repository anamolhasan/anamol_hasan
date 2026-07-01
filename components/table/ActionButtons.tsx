"use client";

import { Button } from "@/components/ui/button";
import {
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

interface ActionButtonsProps {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;

  viewLabel?: string;
  editLabel?: string;
  deleteLabel?: string;
}

export default function ActionButtons({
  onView,
  onEdit,
  onDelete,
  viewLabel = "View",
  editLabel = "Edit",
  deleteLabel = "Delete",
}: ActionButtonsProps) {
  return (
    <div className="flex items-center gap-2">
      {onView && (
        <Button
          size="icon"
          variant="outline"
          onClick={onView}
          title={viewLabel}
        >
          <Eye className="h-4 w-4" />
        </Button>
      )}

      {onEdit && (
        <Button
          size="icon"
          variant="secondary"
          onClick={onEdit}
          title={editLabel}
        >
          <Pencil className="h-4 w-4" />
        </Button>
      )}

      {onDelete && (
        <Button
          size="icon"
          variant="destructive"
          onClick={onDelete}
          title={deleteLabel}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}