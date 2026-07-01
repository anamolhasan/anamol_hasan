"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";

interface RichTextViewerProps {
  content: string;
}

export default function RichTextViewer({
  content,
}: RichTextViewerProps) {
  const editor = useEditor({
    immediatelyRender: false,

    editable: false,

    extensions: [
      StarterKit,
      Link,
      Underline,
      Image,
    ],

    content,
  });

  return (
    <div className="prose dark:prose-invert max-w-none">
      <EditorContent editor={editor} />
    </div>
  );
}