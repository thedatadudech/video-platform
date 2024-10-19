import { Button } from "./ui/button";
import { ArrowRight, BookOpen, Film, Image, Mic } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <BookOpen className="h-6 w-6" />
          <span className="sr-only">Automated Educational Video Generator</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Features
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            About
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Automated Video Generator
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Transform your educational content into engaging videos with
                  ease. Powered by SwarmZero.ai and Livepeer.ai.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/create">
                  <Button className="inline-flex items-center justify-center">
                    Create Video
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 items-center">
              <div className="flex flex-col justify-center space-y-8 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    How It Works
                  </h2>
                  <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 mx-auto">
                    Our powerful AI-driven process transforms your prompts into
                    engaging videos.
                  </p>
                </div>
                <div className="w-full max-w-full space-y-4 mx-auto">
                  <div className="grid grid-cols-3 gap-8">
                    <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                      <div className="p-2 bg-black bg-opacity-50 rounded-full">
                        <BookOpen className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold">1. Input Text</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Enter or paste your prompt
                      </p>
                    </div>
                    <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                      <div className="p-2 bg-black bg-opacity-50 rounded-full">
                        <Image className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold">2. Generate Images</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        AI creates relevant illustrations
                      </p>
                    </div>
                    <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                      <div className="p-2 bg-black bg-opacity-50 rounded-full">
                        <Film className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold">3. Create Video</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Compile images into a video clip
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 Automated Video Clip Generator. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
