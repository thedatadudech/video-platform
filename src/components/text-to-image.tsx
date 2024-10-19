"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { MoveLeft, MoveRight, Trash } from "lucide-react";

interface ImageToVideoSectionProps {
  images?: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function TextToImageSection({
  images = [],
  setImages,
}: ImageToVideoSectionProps) {
  if (images.length == 0) {
    images = [
      "https://placehold.co/600x400",
      "https://placehold.co/600x400",
      "https://placehold.co/600x400",
    ];
  }

  function isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  }

  const handleMoveImage = (index: number, direction: "left" | "right") => {
    const newImages = [...images];
    const [removed] = newImages.splice(index, 1);
    newImages.splice(direction === "left" ? index - 1 : index + 1, 0, removed);
    setImages(newImages);
  };

  const handleAddImage = (url: string) => {
    console.log(url);
    if (url) {
      setImages([...images, url]);
    }
  };

  const handleDeleteImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Generated Images</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {images.map((src, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <img
                src={src}
                alt={`Image ${index + 1}`}
                className="w-full h-auto mb-2"
              />
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleMoveImage(index, "left")}
                  disabled={index === 0}
                >
                  <MoveLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleMoveImage(index, "right")}
                  disabled={index === images.length - 1}
                >
                  <MoveRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteImage(index)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex items-center">
        <input
          type="text"
          id="image-url-input"
          placeholder="Enter image URL"
          className="border p-2 mr-2"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              const inputValue = (e.target as HTMLInputElement).value.trim();
              if (inputValue && isValidUrl(inputValue)) {
                handleAddImage(inputValue);
                (e.target as HTMLInputElement).value = "";
              } else {
                alert("Please enter a valid URL.");
              }
            }
          }}
        />
        <Button
          variant="outline"
          onClick={() => {
            const input = document.getElementById(
              "image-url-input",
            ) as HTMLInputElement;
            handleAddImage(input.value);
            input.value = "";
          }}
        >
          Add Image
        </Button>
      </div>
    </div>
  );
}
