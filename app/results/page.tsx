"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowLeft,
  Download,
  ThumbsUp,
  ThumbsDown,
  VideoIcon,
  Sparkles,
  Loader2,
} from "lucide-react";
import VideoPlayer from "@/components/video-player";
import SummaryView from "@/app/components/summary-view";

export default function ResultsPage() {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [triggerId, setTriggerId] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const url = searchParams.get("url");
  const videoUrl = url ? decodeURIComponent(url) : null;

  // Step 1: Start processing when URL is available
  useEffect(() => {
    if (!url || loading || triggerId || error) return;

    async function startProcessing() {
      setLoading(true);
      setError("");
      setSummary("");

      try {
        const response = await fetch("/api/process-video", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to start processing");
        }

        setTriggerId(data.triggerId);
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Unknown error";
        setError(message);
        setLoading(false);
      }
    }

    startProcessing();
  }, [url, loading, triggerId, error]);

  // Step 2: Poll for results when we have a triggerId
  useEffect(() => {
    if (!triggerId || !loading) return;

    const pollInterval = setInterval(checkStatus, 5000);
    let mounted = true;

    async function checkStatus() {
      try {
        const response = await fetch(`/api/get-results?triggerId=${triggerId}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to check status");
        }

        // If processing is complete
        if (data.completed) {
          if (mounted) {
            if (data.error) {
              setError(data.error);
            } else {
              setSummary(data.message || "");
            }

            setLoading(false);
            clearInterval(pollInterval);
          }
        }
      } catch (error) {
        if (mounted) {
          const message =
            error instanceof Error ? error.message : "Unknown error";
          setError(message);
          setLoading(false);
          clearInterval(pollInterval);
        }
      }
    }

    // Initial check
    checkStatus();

    // Clean up
    return () => {
      mounted = false;
      clearInterval(pollInterval);
    };
  }, [triggerId, loading]);

  // Try again button handler
  const handleTryAgain = () => {
    setTriggerId(null);
    setError("");
  };

  if (!videoUrl) {
    return (
      <div className="container py-12 text-center">
        <h2 className="text-2xl font-bold mb-4 text-zinc-800">
          No Video URL Provided
        </h2>
        <p className="mb-6 text-zinc-600">
          Please return to the home page and submit a video URL.
        </p>
        <Button asChild className="bg-zinc-600 hover:bg-zinc-700 text-white">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-zinc-50 to-white">
      <main className="flex-1 container py-8 pt-20">
        <div className="mb-6 ml-4">
          <Button
            variant="outline"
            size="sm"
            asChild
            className="border-zinc-200 text-zinc-800 hover:bg-zinc-50 hover:text-zinc-900 font-mono"
          >
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              NEW VIDEO
            </Link>
          </Button>
        </div>

        {loading && !summary ? (
          <div className="py-12 flex flex-col items-center justify-center">
            <Loader2 className="h-12 w-12 animate-spin text-zinc-500 mb-4" />
            <p className="text-zinc-800 font-medium">Processing video...</p>
            <p className="text-zinc-600 text-sm mt-2">
              This may take a minute or two
            </p>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-3 ml-4">
            <div className="lg:col-span-1">
              <Card className="p-4 border-zinc-100 bg-white shadow-md overflow-hidden relative">
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-50/50 to-transparent pointer-events-none"></div>

                <div className="relative">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="bg-zinc-100 rounded-full p-1">
                      <VideoIcon className="h-4 w-4 text-zinc-600" />
                    </div>
                    <h2 className="text-lg font-medium text-zinc-800">
                      Video Preview
                    </h2>
                  </div>

                  <VideoPlayer url={videoUrl} />

                  <div className="mt-6 space-y-4">
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2 border-zinc-200 text-zinc-800 hover:bg-zinc-50 font-mono text-xs w-full"
                        disabled={!summary}
                        onClick={() => {
                          if (summary) {
                            const blob = new Blob([summary], {
                              type: "text/plain",
                            });
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement("a");
                            a.href = url;
                            a.download = "video-summary.md";
                            document.body.appendChild(a);
                            a.click();
                            document.body.removeChild(a);
                            URL.revokeObjectURL(url);
                          }
                        }}
                      >
                        <Download className="h-4 w-4" />
                        DOWNLOAD SUMMARY
                      </Button>
                    </div>

                    <div className="pt-4 border-t border-zinc-100">
                      <h3 className="text-sm font-medium mb-2 text-zinc-800">
                        Was this helpful?
                      </h3>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-2 border-zinc-200 text-zinc-800 hover:bg-zinc-50"
                        >
                          <ThumbsUp className="h-4 w-4" />
                          Yes
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-2 border-zinc-200 text-zinc-800 hover:bg-zinc-50"
                        >
                          <ThumbsDown className="h-4 w-4" />
                          No
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-5">
                <div className="bg-zinc-100 rounded-full p-2">
                  <Sparkles className="h-5 w-5 text-zinc-700" />
                </div>
                <h2 className="text-xl font-bold text-zinc-900 font-['Geist Mono']">
                  VIDEO SUMMARY
                </h2>
              </div>

              {error ? (
                <Card className="p-6 border-red-100 bg-white shadow-md">
                  <div className="p-4 text-red-600 bg-red-50/50 rounded-lg">
                    <p className="font-medium">Error</p>
                    <p className="text-sm">{error}</p>
                    <Button
                      onClick={handleTryAgain}
                      className="mt-4 bg-zinc-600 hover:bg-zinc-700 text-white"
                    >
                      Try Again
                    </Button>
                  </div>
                </Card>
              ) : (
                <Card className="p-6 border-zinc-100 bg-white shadow-md">
                  {loading ? (
                    <div className="py-12 flex flex-col items-center justify-center">
                      <Loader2 className="h-8 w-8 animate-spin text-zinc-500 mb-4" />
                      <p className="text-zinc-800 font-medium">
                        Generating summary...
                      </p>
                      <p className="text-zinc-600 text-sm mt-2">
                        This may take a minute or two
                      </p>
                    </div>
                  ) : (
                    <SummaryView summary={summary} isLoading={false} error="" />
                  )}
                </Card>
              )}
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-zinc-100 py-6 bg-gradient-to-b from-white to-zinc-50/30">
        <div className="container flex justify-center">
          <p className="text-sm text-zinc-700 font-mono">
            © 2024 VIDIFY. MADE WITH AI.
          </p>
        </div>
      </footer>
    </div>
  );
}
