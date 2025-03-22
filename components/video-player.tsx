"use client"

import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"

interface VideoPlayerProps {
  url: string
}

export default function VideoPlayer({ url }: VideoPlayerProps) {
  const [embedUrl, setEmbedUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      // Convert various video URLs to embed URLs
      if (url.includes("youtube.com") || url.includes("youtu.be")) {
        // Extract YouTube video ID
        let videoId = ""
        if (url.includes("youtube.com/watch?v=")) {
          videoId = url.split("v=")[1].split("&")[0]
        } else if (url.includes("youtu.be/")) {
          videoId = url.split("youtu.be/")[1].split("?")[0]
        }

        if (videoId) {
          setEmbedUrl(`https://www.youtube.com/embed/${videoId}`)
        } else {
          throw new Error("Could not extract YouTube video ID")
        }
      } else if (url.includes("vimeo.com")) {
        // Extract Vimeo video ID
        const vimeoId = url.split("vimeo.com/")[1].split("?")[0]
        setEmbedUrl(`https://player.vimeo.com/video/${vimeoId}`)
      } else {
        throw new Error("Unsupported video platform")
      }
    } catch (err) {
      console.error("Error parsing video URL:", err)
      setError("Could not embed this video. Please check the URL and try again.")
    }
  }, [url])

  if (error) {
    return (
      <div className="aspect-video bg-green-50 flex items-center justify-center text-center p-4 rounded-md border border-green-100">
        <p className="text-sm text-primary-700 font-mono">{error}</p>
      </div>
    )
  }

  if (!embedUrl) {
    return (
      <div className="aspect-video bg-green-50 flex items-center justify-center rounded-md border border-green-100">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 text-green-500 animate-spin" />
          <div className="text-sm text-primary-700 font-mono">LOADING VIDEO...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="aspect-video rounded-md overflow-hidden border border-green-100 shadow-sm">
      <iframe
        src={embedUrl}
        className="w-full h-full"
        allowFullScreen
        title="Video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      ></iframe>
    </div>
  )
}

