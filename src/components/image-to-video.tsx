"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RefreshCw, ArrowRight } from "lucide-react";
import { useState } from "react";
import { CircularProgress } from "@mui/material";

interface TextToImageSectionProps {
  videos?: string[];
  images?: string[];
  setVideos: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function ImageToVideoSection({
  images = [],
  videos = [],
  setVideos,
}: TextToImageSectionProps) {
  const [loading, setLoading] = useState(false);
  const [regenerating, setRegenerating] = useState(false);
  const [videoCreationComplete, setVideoCreationComplete] = useState(false); // New state

  const convertImageToVideo = async (
    imageUrl: string,
  ): Promise<string | null> => {
    try {
      const response = await fetch("http://127.0.0.1:8000/image-to-video/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image_path: imageUrl }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      return data.video_url; // Assuming the response contains a video_url field
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      return null;
    }
  };

  const handleRegenerate = async (index: number) => {
    setRegenerating(true);
    console.log("Regenerating image at index:", index);
    const imageUrl = images[index];
    const videoUrl = await convertImageToVideo(imageUrl);

    if (videoUrl) {
      setVideos((prevVideos) => {
        const updatedVideos = [...prevVideos];
        updatedVideos[index] = videoUrl;
        console.log("Image at index:", index, "regenerated");
        setRegenerating(false);
        return updatedVideos;
      });
    }
  };
  const handleCreateVideo = async () => {
    setLoading(true);
    setVideoCreationComplete(false);
    const currentImages = [...images];
    const videoUrls: string[] = [];

    for (const image_url of currentImages) {
      console.log(image_url);
      const videoUrl = await convertImageToVideo(image_url);
      if (videoUrl) {
        videoUrls.push(videoUrl);
      }
    }
    setVideos(videoUrls);
    setLoading(false);
    setVideoCreationComplete(true);

    console.log("Video URLs:", videoUrls);

    // Navigate to the next step (audio upload & subtitle generation)
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Generated Videos</h2>
      <Button onClick={handleCreateVideo} disabled={loading}>
        {loading ? "Creating Video..." : "Create Video"}
        <ArrowRight className="ml-2 h-4 w-4" />
        {loading && <CircularProgress size={20} color="primary" />}
      </Button>
      {videoCreationComplete && videos.length > 0 ? ( // Check for video creation completion
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {videos.map((src, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <video src={src} controls className="w-full h-auto mb-2" />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleRegenerate(index)}
                  disabled={loading}
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  {regenerating ? "Regenerating Video..." : "Regenerate Video"}
                  {regenerating && (
                    <CircularProgress size={20} color="primary" />
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p>
          No videos generated yet. Please upload text to generate images and
          then create videos.
        </p>
      )}
    </div>
  );
}
