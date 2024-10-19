"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, ArrowRight, Upload } from "lucide-react";

export default function AudioUploadSection() {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [subtitles, setSubtitles] = useState("");

  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAudioFile(e.target.files[0]);
      // Here you would typically call the Livepeer.ai API to generate subtitles
      // For now, we'll just set some dummy subtitles
      setSubtitles(
        "These are some example subtitles.\nThey would be generated from the audio file.\nYou can edit them here.",
      );
    }
  };

  const handleContinue = () => {
    // Navigate to the next step (video preview & download)
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">
        Upload Audio & Generate Subtitles
      </h2>
      <Card className="mb-6">
        <CardContent className="p-6">
          <label
            htmlFor="audio-upload"
            className="block text-sm font-medium mb-2"
          >
            Upload Audio File (MP3/WAV)
          </label>
          <Input
            id="audio-upload"
            type="file"
            accept=".mp3,.wav"
            onChange={handleAudioUpload}
            className="mb-4"
          />
          {audioFile && (
            <p className="text-sm text-gray-500 mb-4">
              Uploaded: {audioFile.name}
            </p>
          )}
          <Textarea
            placeholder="Generated subtitles will appear here..."
            value={subtitles}
            onChange={(e) => setSubtitles(e.target.value)}
            className="min-h-[200px] mb-4"
          />
          <Button className="w-full sm:w-auto">
            <Upload className="mr-2 h-4 w-4" />
            Generate Subtitles
          </Button>
        </CardContent>
      </Card>
      <div className="flex justify-between">
        <Button variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Video Creation
        </Button>
        <Button onClick={handleContinue}>
          Continue to Preview
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
