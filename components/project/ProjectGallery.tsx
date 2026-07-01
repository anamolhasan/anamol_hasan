"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";

interface Props {
  images: string[];
}

export default function ProjectGallery({ images }: Props) {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  const [isOpen, setIsOpen] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);


const goNext = () => {
  const next =
    currentIndex === images.length - 1
      ? 0
      : currentIndex + 1;

  setCurrentIndex(next);
  setSelectedImage(images[next]);
};

const goPrevious = () => {
  const prev =
    currentIndex === 0
      ? images.length - 1
      : currentIndex - 1;

  setCurrentIndex(prev);
  setSelectedImage(images[prev]);
};


  return (
    <div className="space-y-5">
      <div
        className="relative aspect-video overflow-hidden rounded-xl border cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <Image
          src={selectedImage}
          alt="Project Image"
          fill
          className="object-cover"
        />
      </div>

      <div className="grid grid-cols-4 gap-3">
        {images.map((image, index) => (
          <Button
            key={index}
            type="button"
            onClick={() => {
              setSelectedImage(image);
              setCurrentIndex(index);
            }}
            className={`relative h-10 md:h-32 w-full overflow-hidden rounded-lg border-2 p-0 transition
            ${
              selectedImage === image ? "border-blue-600" : "border-transparent"
            }`}
          >
            <Image src={image} alt="" fill className="object-cover" />
          </Button>
        ))}
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="absolute right-5 top-5 rounded-full bg-white p-2 text-black hover:bg-gray-200"
          >
            <X className="h-6 w-6" />
          </button>

          
<button
  type="button"
  onClick={goPrevious}
  className="absolute left-6 top-1/2 z-50 -translate-y-1/2 rounded-full bg-white/90 p-3 shadow hover:bg-white"
>
  <ChevronLeft className="h-7 w-7 text-black" />
</button>



          <div className="relative h-[85vh] w-[90vw]">
            <Image
              src={images[currentIndex]}
              alt="Project Image"
              fill
              className="object-contain"
              priority
            />
          </div>

          
<button
  type="button"
  onClick={goNext}
  className="absolute right-6 top-1/2 z-50 -translate-y-1/2 rounded-full bg-white/90 p-3 shadow hover:bg-white"
>
  <ChevronRight className="h-7 w-7 text-black" />
</button>


        </div>
      )}
    </div>
  );
}
