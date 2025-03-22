import { streamText } from "ai"
import { openai } from "@ai-sdk/openai"

export const maxDuration = 30 // Allow responses up to 30 seconds

export async function POST(req: Request) {
  try {
    const { transcript } = await req.json()

    if (!transcript) {
      return Response.json({ error: "Transcript is required" }, { status: 400 })
    }

    // Use AI SDK to generate a summary from the transcript
    const result = streamText({
      model: openai("gpt-4o"),
      prompt: `Summarize the following transcript in a structured format with headings and bullet points:\n\n${transcript}`,
      system:
        "You are an expert summarizer. Create concise, well-structured summaries that capture the key points of the content. Use markdown formatting with headings, subheadings, and bullet points to organize the information clearly.",
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error("Error generating summary:", error)
    return Response.json({ error: "Failed to generate summary" }, { status: 500 })
  }
}

