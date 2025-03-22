import { NextResponse } from "next/server";

const API_URL = "https://flows.eachlabs.ai/api/v1";

export async function POST(request: Request) {
  try {
    const EACH_API_KEY = process.env.NEXT_PUBLIC_EACH_API_KEY;
    const WORKFLOW_ID = process.env.NEXT_PUBLIC_EACH_WORKFLOW_ID;

    if (!EACH_API_KEY || !WORKFLOW_ID) {
      return NextResponse.json(
        {
          error: "Server configuration error - missing API key or workflow ID",
        },
        { status: 500 }
      );
    }

    const { videoUrl } = await request.json();

    if (!videoUrl) {
      return NextResponse.json(
        { error: "Video URL is required" },
        { status: 400 }
      );
    }

    // Trigger workflow
    const triggerRes = await fetch(`${API_URL}/${WORKFLOW_ID}/trigger`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": EACH_API_KEY,
      },
      body: JSON.stringify({
        input: {
          youtube_url: videoUrl,
        },
      }),
    });

    const triggerData = await triggerRes.json();

    if (!triggerRes.ok) {
      return NextResponse.json(
        { error: triggerData.error || "Failed to trigger workflow" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      trigger_id: triggerData.id,
    });
  } catch (error) {
    console.error("Error processing video:", error);
    return NextResponse.json(
      { error: "Failed to process video" },
      { status: 500 }
    );
  }
}
