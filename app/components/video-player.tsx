"use client";

import { useEffect, useState } from "react";

export default function VideoPlayer({ url }: { url: string }) {
  const [videoId, setVideoId] = useState<string | null>(null);

  useEffect(() => {
    // Extract YouTube video ID from various URL formats
    const extractYouTubeID = (url: string) => {
      const regExp =
        /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
      const match = url.match(regExp);
      return match && match[7].length === 11 ? match[7] : null;
    };

    const id = extractYouTubeID(url);
    setVideoId(id);
  }, [url]);

  if (!videoId) {
    return (
      <div className="aspect-video bg-gray-100 flex items-center justify-center rounded-lg">
        <p className="text-sm text-gray-500">Invalid YouTube URL</p>
      </div>
    );
  }

  return (
    <div className="aspect-video rounded-lg overflow-hidden">
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}
