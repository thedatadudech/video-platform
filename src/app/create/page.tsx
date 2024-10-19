"use client";
import { useState } from "react";
import UploadTextSection from "@/components/upload-text";
import TextToImageSection from "@/components/text-to-image";
import ImageToVideoSection from "@/components/image-to-video";
// import AudioUploadSection from "@/components/audio-upload";
import VideoPreviewSection from "@/components/video-preview";

export default function CreatePage() {
  const [images, setImages] = useState<string[]>([]); // Ensure the type is correct
  const [videos, setVideos] = useState<string[]>([]); // Ensure the type is correct
  const [text, setText] = useState("");

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Create Video Clip </h1>
      <UploadTextSection setImages={setImages} text={text} setText={setText} />
      <TextToImageSection images={images} setImages={setImages} />
      <ImageToVideoSection
        images={images}
        videos={videos}
        setVideos={setVideos}
      />
      {/* <AudioUploadSection /> */}
      <VideoPreviewSection
        videos={videos}
        setVideos={setVideos}
        setImages={setImages}
        setText={setText}
      />
    </div>
  );
}
