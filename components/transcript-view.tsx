"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

interface TranscriptViewProps {
  videoUrl: string
}

// Mock transcript data - in a real app, this would come from an API
const mockTranscript = `
[00:00:00] Hello and welcome to this video about artificial intelligence and its applications in modern society.
[00:00:10] Today we'll be discussing how AI is transforming various industries and what the future might hold.
[00:00:20] Let's start by defining what artificial intelligence actually is.
[00:00:30] AI refers to computer systems designed to perform tasks that typically require human intelligence.
[00:00:40] These tasks include learning, reasoning, problem-solving, perception, and language understanding.
[00:00:50] The field of AI research was founded on the assumption that human intelligence can be precisely described.
[00:01:00] And that a machine can be made to simulate it.
[00:01:10] There are several types of AI, including narrow or weak AI, which is designed to perform a specific task.
[00:01:20] And general or strong AI, which can perform any intellectual task that a human being can do.
[00:01:30] Currently, all existing AI systems are examples of narrow AI.
[00:01:40] Some common applications of AI that you might encounter in your daily life include:
[00:01:50] Virtual assistants like Siri, Alexa, and Google Assistant.
[00:02:00] Recommendation systems on platforms like Netflix, YouTube, and Amazon.
[00:02:10] Facial recognition technology used in security systems and on social media platforms.
[00:02:20] And autonomous vehicles, which use AI to navigate and make driving decisions.
[00:02:30] AI is also making significant impacts in healthcare, finance, education, and manufacturing.
[00:02:40] In healthcare, AI is being used to diagnose diseases, develop new medications, and personalize treatment plans.
[00:02:50] In finance, AI algorithms are used for fraud detection, algorithmic trading, and risk assessment.
[00:03:00] In education, AI can provide personalized learning experiences and automate administrative tasks.
[00:03:10] And in manufacturing, AI-powered robots are improving efficiency and safety on factory floors.
[00:03:20] Despite these advancements, there are also concerns about the ethical implications of AI.
[00:03:30] These include issues related to privacy, bias, job displacement, and the potential for autonomous weapons.
[00:03:40] As AI continues to evolve, it's important for society to establish guidelines and regulations.
[00:03:50] To ensure that AI is developed and used in ways that benefit humanity as a whole.
[00:04:00] Thank you for watching this overview of artificial intelligence and its applications.
`

export default function TranscriptView({ videoUrl }: TranscriptViewProps) {
  const [transcript, setTranscript] = useState<string>("")
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredTranscript, setFilteredTranscript] = useState<string>("")

  useEffect(() => {
    // In a real app, this would fetch the transcript from an API
    const fetchTranscript = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setTranscript(mockTranscript)
      } catch (error) {
        console.error("Error fetching transcript:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTranscript()
  }, [videoUrl])

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredTranscript(transcript)
      return
    }

    // Simple search implementation - in a real app, this could be more sophisticated
    const lines = transcript.split("\n")
    const matchedLines = lines.filter((line) => line.toLowerCase().includes(searchTerm.toLowerCase()))

    setFilteredTranscript(matchedLines.join("\n"))
  }, [searchTerm, transcript])

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-4 bg-green-200/60 rounded animate-pulse w-3/4"></div>
        <div className="h-4 bg-green-200/60 rounded animate-pulse"></div>
        <div className="h-4 bg-green-200/60 rounded animate-pulse"></div>
        <div className="h-4 bg-green-200/60 rounded animate-pulse w-1/2"></div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-green-500" />
          <Input
            placeholder="Search transcript..."
            className="pl-8 border-green-200 focus-visible:ring-green-400 font-mono"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {searchTerm && (
          <Button
            variant="outline"
            onClick={() => setSearchTerm("")}
            className="border-green-200 text-primary-800 hover:bg-green-50 font-mono text-xs"
          >
            CLEAR
          </Button>
        )}
      </div>

      <div className="max-h-[600px] overflow-y-auto border border-green-100 rounded-md p-4 bg-white">
        {filteredTranscript ? (
          filteredTranscript.split("\n").map((line, index) => {
            if (!line.trim()) return null

            // Extract timestamp if present
            const timestampMatch = line.match(/\[([\d:]+)\]/)
            const timestamp = timestampMatch ? timestampMatch[1] : null
            const content = timestamp ? line.replace(/\[[\d:]+\]\s*/, "") : line

            // Highlight search term if present
            if (searchTerm && line.toLowerCase().includes(searchTerm.toLowerCase())) {
              const regex = new RegExp(`(${searchTerm})`, "gi")
              const parts = content.split(regex)

              return (
                <div key={index} className="mb-3 flex">
                  {timestamp && (
                    <span className="text-xs font-mono text-green-600 mr-2 mt-0.5 whitespace-nowrap">{timestamp}</span>
                  )}
                  <p className="text-sm text-primary-800">
                    {parts.map((part, i) =>
                      part.toLowerCase() === searchTerm.toLowerCase() ? (
                        <span key={i} className="bg-green-100 text-primary-900 px-0.5 rounded">
                          {part}
                        </span>
                      ) : (
                        part
                      ),
                    )}
                  </p>
                </div>
              )
            }

            return (
              <div key={index} className="mb-3 flex">
                {timestamp && (
                  <span className="text-xs font-mono text-green-600 mr-2 mt-0.5 whitespace-nowrap">{timestamp}</span>
                )}
                <p className="text-sm text-primary-800">{content}</p>
              </div>
            )
          })
        ) : (
          <p className="text-center text-primary-600">No transcript available</p>
        )}
      </div>
    </div>
  )
}

