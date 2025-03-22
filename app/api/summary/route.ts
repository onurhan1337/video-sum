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

    // Trigger workflow and wait for completion
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
    console.log("Trigger response:", triggerData);

    if (!triggerRes.ok || !triggerData.trigger_id) {
      return NextResponse.json(
        { error: triggerData.error || "Failed to trigger workflow" },
        { status: 500 }
      );
    }

    // Poll for results
    let attempts = 0;
    const maxAttempts = 60; // 5 minutes maximum (with 5-second intervals)

    while (attempts < maxAttempts) {
      const executionRes = await fetch(
        `${API_URL}/${WORKFLOW_ID}/executions/${triggerData.trigger_id}`,
        {
          headers: {
            "X-API-Key": EACH_API_KEY,
          },
        }
      );

      const executionData = await executionRes.json();
      console.log("Execution status:", executionData.status);

      if (executionData.status === "completed" && executionData.step_results) {
        const lastStep =
          executionData.step_results[executionData.step_results.length - 1];
        if (lastStep?.output) {
          const output = JSON.parse(lastStep.output);
          return NextResponse.json(output);
        }
      } else if (executionData.status === "failed") {
        return NextResponse.json(
          { error: "Workflow execution failed" },
          { status: 500 }
        );
      }

      // Wait 5 seconds before next attempt
      await new Promise((resolve) => setTimeout(resolve, 5000));
      attempts++;
    }

    return NextResponse.json({ error: "Workflow timed out" }, { status: 504 });
  } catch (error) {
    console.error("Error processing video:", error);
    return NextResponse.json(
      { error: "Failed to process video" },
      { status: 500 }
    );
  }
}
