"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FileSearch } from "lucide-react";

interface SummaryViewProps {
  videoUrl: string;
}

export default function SummaryView({ videoUrl }: SummaryViewProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleGenerate = () => {
    if (!videoUrl || loading) return;
    setLoading(true);
    router.push(`/results?url=${encodeURIComponent(videoUrl)}`);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-zinc-800"></div>
        <p className="text-zinc-800 text-lg font-medium">Redirecting...</p>
      </div>
    );
  }

  return (
    <button
      onClick={handleGenerate}
      className="w-full h-14 rounded-xl font-mono bg-black text-white hover:bg-black/90 transition-colors flex items-center justify-center gap-2"
    >
      <FileSearch className="h-5 w-5" />
      GENERATE SUMMARY
    </button>
  );
}
