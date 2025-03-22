import { NextResponse } from "next/server";

// API endpoint to trigger video processing
export async function POST(request: Request) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: "No URL provided" }, { status: 400 });
    }

    const workflowId =
      process.env.EACH_WORKFLOW_ID || process.env.NEXT_PUBLIC_EACH_WORKFLOW_ID;
    const apiKey =
      process.env.EACH_API_KEY || process.env.NEXT_PUBLIC_EACH_API_KEY;

    if (!workflowId || !apiKey) {
      return NextResponse.json(
        { error: "Missing API configuration" },
        { status: 500 }
      );
    }

    // Trigger the workflow
    const response = await fetch(
      `https://flows.eachlabs.ai/api/v1/${workflowId}/trigger`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": apiKey,
        },
        body: JSON.stringify({ input: { youtube_url: url } }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.error || "Failed to process video" },
        { status: response.status }
      );
    }

    const data = await response.json();

    if (!data.trigger_id) {
      return NextResponse.json(
        { error: "No trigger ID returned" },
        { status: 500 }
      );
    }

    // Return the trigger ID to the client
    return NextResponse.json({ triggerId: data.trigger_id });
  } catch (error) {
    console.error("Error processing video:", error);
    return NextResponse.json(
      { error: "Failed to process video" },
      { status: 500 }
    );
  }
}
