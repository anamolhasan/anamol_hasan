"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Bold,
  Italic,
  UnderlineIcon,
  Strikethrough,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Undo2,
  Redo2,
  Quote,
  Code2,
  Minus,
  Link2,
} from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function TiptapEditor({
  value,
  onChange,
}: Props) {

  const editor = useEditor({
 extensions: [
  StarterKit,
  Underline,

  Link.configure({
    openOnClick: false,
    autolink: true,
    defaultProtocol: "https",
  }),


  Placeholder.configure({
    placeholder: "Write something...",
  }),
],

    content: value,

    immediatelyRender: false,

    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });


  useEffect(() => {
    if (!editor) return;

    if (editor.getHTML() !== value) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  if (!editor) return null;

  return (
  <div className="rounded-lg border overflow-hidden">
    <div className="flex flex-wrap gap-2 border-b bg-muted/40 p-2">

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`rounded p-2 ${
          editor.isActive("bold") ? "bg-primary text-white" : "hover:bg-muted"
        }`}
      >
        <Bold size={18} />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`rounded p-2 ${
          editor.isActive("italic")
            ? "bg-primary text-white"
            : "hover:bg-muted"
        }`}
      >
        <Italic size={18} />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
        <UnderlineIcon size={18} />
        </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`rounded p-2 ${
          editor.isActive("heading", { level: 1 })
            ? "bg-primary text-white"
            : "hover:bg-muted"
        }`}
      >
        <Heading1 size={18} />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`rounded p-2 ${
          editor.isActive("heading", { level: 2 })
            ? "bg-primary text-white"
            : "hover:bg-muted"
        }`}
      >
        <Heading2 size={18} />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        >
        <Strikethrough size={18} />
        </button>

        <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
        <Quote size={18} />
        </button>

        <button
            type="button"
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            >
            <Code2 size={18} />
            </button>

            <button
            type="button"
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            >
            <Minus size={18} />
            </button>



      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`rounded p-2 ${
          editor.isActive("bulletList")
            ? "bg-primary text-white"
            : "hover:bg-muted"
        }`}
      >
        <List size={18} />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`rounded p-2 ${
          editor.isActive("orderedList")
            ? "bg-primary text-white"
            : "hover:bg-muted"
        }`}
      >
        <ListOrdered size={18} />
      </button>


      <button
        type="button"
        onClick={() => {
            const url = window.prompt("Enter URL");

            if (url) {
            editor.chain().focus().setLink({ href: url }).run();
            }
        }}
        >
        <Link2 size={18} />
        </button>

        

      <button
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        className="rounded p-2 hover:bg-muted"
      >
        <Undo2 size={18} />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        className="rounded p-2 hover:bg-muted"
      >
        <Redo2 size={18} />
      </button>
    </div>


    <EditorContent
      editor={editor}
      className="min-h-[250px] p-4 focus:outline-none"
    />

  </div>
);
}