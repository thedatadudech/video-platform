"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight } from "lucide-react";

interface UploadTextSectionProps {
  text?: string;
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
  setText: React.Dispatch<React.SetStateAction<string>>;
}

export default function UploadTextSection({
  text,
  setText,
  setImages,
}: UploadTextSectionProps) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Here you would typically send the text to your backend for processing
    try {
      const response = await fetch("http://127.0.0.1:8000/text-to-image/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: text }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      // console.log("Response data:", data);

      // const imageURLs = [
      //   "https://obj-store.livepeer.cloud/livepeer-cloud-ai-images/810b871b/bcebdbc4.png",
      //   "https://obj-store.livepeer.cloud/livepeer-cloud-ai-images/810b871b/80542936.png",
      //   "https://obj-store.livepeer.cloud/livepeer-cloud-ai-images/810b871b/da63b02e.png",
      // ];
      // setImages(imageURLs);

      const imageUrls = data.image_url.map(
        (image: { url: string }) => image.url,
      );
      console.log(imageUrls);
      setImages(imageUrls);
      setLoading(false);

      // Navigate to the next step (image generation) with the response data
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  // Navigate to the next step (image generation)

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Generate Images from Prompt</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Enter your text prompt here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          style={{ width: "100%" }}
        />
        <Button type="submit" className="w-full sm:w-auto" disabled={loading}>
          {loading ? "Creating Images..." : "Create Images"}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}
