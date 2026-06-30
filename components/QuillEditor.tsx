/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

interface QuillEditorProps {
  value: string;
  onChange: (value: string) => void;
  modules?: any;
  formats?: any;
}

export default function QuillEditor({
  value,
  onChange,
  modules,
  formats,
}: QuillEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);

  useEffect(() => {
    if (!containerRef.current || quillRef.current) return;

    const editorElement = document.createElement("div");
    containerRef.current.appendChild(editorElement);

    const quill = new Quill(editorElement, {
      theme: "snow",
      modules,
      formats,
    });

    quillRef.current = quill;

    if (value) {
      quill.root.innerHTML = value;
    }

    const handleChange = () => {
      onChange(quill.root.innerHTML);
    };

    quill.on("text-change", handleChange);

    return () => {
      quill.off("text-change", handleChange);

      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }

      quillRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!quillRef.current) return;

    const currentContent = quillRef.current.root.innerHTML;

    if (value !== currentContent) {
      quillRef.current.root.innerHTML = value || "";
    }
  }, [value]);

  return <div ref={containerRef} className="min-h-[200px]" />;
}