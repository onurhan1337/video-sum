"use client"

import { useState, useEffect } from "react"

interface SummaryViewProps {
  videoUrl: string
}

// Mock summary data - in a real app, this would come from an API
const mockSummary = `
# AI Applications in Modern Society

## Overview
This video provides a comprehensive introduction to artificial intelligence (AI) and its wide-ranging applications across various sectors of modern society. It explains the fundamental concepts of AI and highlights how this technology is transforming industries and daily life.

## Key Points

### Definition and Types of AI
- AI refers to computer systems designed to perform tasks that typically require human intelligence
- These tasks include learning, reasoning, problem-solving, perception, and language understanding
- Current AI systems are examples of narrow/weak AI (designed for specific tasks) rather than general/strong AI

### Common Applications
1. **Consumer Technology**
   - Virtual assistants (Siri, Alexa, Google Assistant)
   - Recommendation systems (Netflix, YouTube, Amazon)
   - Facial recognition technology
   - Autonomous vehicles

2. **Industry Applications**
   - Healthcare: Disease diagnosis, medication development, personalized treatment
   - Finance: Fraud detection, algorithmic trading, risk assessment
   - Education: Personalized learning, administrative automation
   - Manufacturing: AI-powered robotics improving efficiency and safety

### Ethical Considerations
- Privacy concerns
- Algorithmic bias
- Job displacement
- Potential for autonomous weapons
- Need for guidelines and regulations to ensure beneficial development

## Conclusion
While AI offers tremendous benefits and opportunities across multiple domains, it's crucial to address the ethical implications and establish appropriate governance frameworks to ensure AI serves humanity's best interests.
`

export default function SummaryView({ videoUrl }: SummaryViewProps) {
  const [summary, setSummary] = useState<string>("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, this would fetch the summary from an API
    const fetchSummary = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500))
        setSummary(mockSummary)
      } catch (error) {
        console.error("Error fetching summary:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchSummary()
  }, [videoUrl])

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

  // Convert markdown-like text to JSX
  const renderMarkdown = (text: string) => {
    const lines = text.split("\n")
    return lines.map((line, index) => {
      if (line.startsWith("# ")) {
        return (
          <h1 key={index} className="text-2xl font-bold mt-4 mb-2 text-primary-800">
            {line.substring(2)}
          </h1>
        )
      } else if (line.startsWith("## ")) {
        return (
          <h2 key={index} className="text-xl font-semibold mt-3 mb-2 text-primary-700">
            {line.substring(3)}
          </h2>
        )
      } else if (line.startsWith("### ")) {
        return (
          <h3 key={index} className="text-lg font-medium mt-2 mb-1 text-primary-600">
            {line.substring(4)}
          </h3>
        )
      } else if (line.startsWith("- ")) {
        return (
          <li key={index} className="ml-4 flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-green-500 flex-shrink-0"></span>
            <span>{line.substring(2)}</span>
          </li>
        )
      } else if (line.startsWith("1. ") || line.startsWith("2. ") || line.startsWith("3. ") || line.startsWith("4. ")) {
        return (
          <li key={index} className="ml-4 list-decimal">
            {line.substring(3)}
          </li>
        )
      } else if (line.trim() === "") {
        return <br key={index} />
      } else {
        return (
          <p key={index} className="mb-2">
            {line}
          </p>
        )
      }
    })
  }

  return (
    <div className="prose prose-sm max-w-none prose-headings:text-primary-800 prose-p:text-primary-700 prose-li:text-primary-700">
      {summary ? renderMarkdown(summary) : <p className="text-center text-primary-600">No summary available</p>}
    </div>
  )
}

