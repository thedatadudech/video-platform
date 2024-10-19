"use client";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Share2 } from "lucide-react";
import { CircularProgress } from "@mui/material";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FullVideoSectionProps {
  videos?: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
  setVideos: React.Dispatch<React.SetStateAction<string[]>>;
  setText: React.Dispatch<React.SetStateAction<string>>;
}

export default function VideoPreviewSection({
  videos = [],
  setImages,
  setVideos,
  setText,
}: FullVideoSectionProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [transition, setTransition] = useState("fade");
  const [format, setFormat] = useState("normal");
  const output_path = "full_video.mp4";

  useEffect(() => {
    const checkVideoAvailability = async () => {
      try {
        const response = await fetch(output_path, { method: "HEAD" });
        if (response.ok) {
          setIsVideoReady(true);
        }
      } catch (error) {
        console.error("Error checking video availability:", error);
      }
    };

    checkVideoAvailability();
  }, []);

  const handleStartNewProject = () => {
    const video_urls: string[] = [];
    const image_urls: string[] = [];
    setVideos(video_urls); // Reset video URLs
    setImages(image_urls); // Reset video readiness
    setText("");
  };

  const handleContinue = async () => {
    setIsLoading(true);
    console.log(videos);
    try {
      console.log("Concatenating clips");
      const response = await fetch(
        "http://127.0.0.1:8000/clips-to-video-full/",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            clips: videos,
            transition_type: transition,
            video_format: format,
            output_filename:
              "/Users/abdullahmarkus/VSProjects/web/video-platform/public/full_video.mp4",
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setIsVideoReady(true);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleShare = () => {
    // Implement share functionality
    console.log("Sharing video...");
    const whatsappUrl = `https://wa.me/?text=Check%20out%20this%20video%3A%20${encodeURIComponent(
      window.location.origin + "/" + output_path,
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Full Video Creation</h2>
      <div className="flex items-center gap-4 mb-6">
        <Button onClick={handleContinue} disabled={isLoading}>
          {isLoading
            ? "Creating Full concatendated Video..."
            : "Create Full concatenated Video"}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>

        <label htmlFor="transition" className="text-sm font-medium">
          Transition:
        </label>
        <Select value={transition} onValueChange={setTransition}>
          <SelectTrigger id="transition" className="w-[180px]">
            <SelectValue placeholder="Select transition" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="fade">Fade</SelectItem>
            <SelectItem value="slide">Slide</SelectItem>
            <SelectItem value="zoom">Zoom</SelectItem>
            <SelectItem value="None">None</SelectItem>
          </SelectContent>
        </Select>
        <label htmlFor="format" className="text-sm font-medium">
          Video Format:
        </label>
        <Select value={format} onValueChange={setFormat}>
          <SelectTrigger id="format" className="w-[180px]">
            <SelectValue placeholder="Select transition" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="youtube">Youtube</SelectItem>
            <SelectItem value="normal">Normal</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="aspect-video bg-gray-200 mb-4">
            {/* Replace this div with an actual video player component */}
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              {isLoading ? (
                <CircularProgress size={40} color="primary" /> // Use Shadcn Spinner
              ) : isVideoReady ? (
                <video
                  src={output_path}
                  controls
                  className="w-full h-full object-contain"
                />
              ) : (
                <p>Video will appear here once ready</p>
              )}
            </div>
          </div>
          <div className="flex justify-center gap-4">
            <Button variant="outline" onClick={handleShare}>
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-between">
        <Link href="/" passHref>
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
        <Button onClick={handleStartNewProject}>Start New Project</Button>
      </div>
    </div>
  );
}
