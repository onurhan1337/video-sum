import { NextResponse } from "next/server";

// API endpoint to get processing results
export async function GET(request: Request) {
  try {
    // Get the trigger ID from the URL
    const url = new URL(request.url);
    const triggerId = url.searchParams.get("triggerId");

    if (!triggerId) {
      return NextResponse.json(
        { error: "No trigger ID provided" },
        { status: 400 }
      );
    }

    const workflowId =
      process.env.EACH_WORKFLOW_ID || process.env.NEXT_PUBLIC_EACH_WORKFLOW_ID;
    const apiKey =
      process.env.EACH_API_KEY || process.env.NEXT_PUBLIC_EACH_API_KEY;

    if (!workflowId || !apiKey) {
      console.error("Missing API configuration:", { workflowId, apiKey });
      return NextResponse.json(
        { error: "Missing API configuration" },
        { status: 500 }
      );
    }

    // Check execution status
    const response = await fetch(
      `https://flows.eachlabs.ai/api/v1/${workflowId}/executions/${triggerId}`,
      {
        headers: {
          "X-API-Key": apiKey,
        },
      }
    );

    if (!response.ok) {
      console.error(
        "API response not OK:",
        response.status,
        response.statusText
      );
      return NextResponse.json(
        { error: "Failed to check status" },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log("API Raw Response:", JSON.stringify(data, null, 2));

    // Parse result data if available
    if (
      (data.status === "completed" || data.status === "succeeded") &&
      data.output
    ) {
      let output = data.output;
      console.log("Raw output type:", typeof output);
      console.log("Raw output value:", output);

      // Handle double-encoded JSON if necessary
      try {
        if (
          typeof output === "string" &&
          output.startsWith('"') &&
          output.endsWith('"')
        ) {
          // First parse
          output = JSON.parse(output);
          console.log("After first parse:", typeof output);

          // Second parse if needed
          if (
            typeof output === "string" &&
            (output.startsWith("{") || output.startsWith("["))
          ) {
            output = JSON.parse(output);
            console.log("After second parse:", typeof output);
          }
        }

        // Check if output is a JSON object with a message field
        if (typeof output === "object" && output !== null && output.message) {
          console.log("Found message field in output:", output.message);

          // Return the processed output and status
          return NextResponse.json({
            status: data.status,
            completed: true,
            message: output.message,
            transcript: output.transcript || "",
            debugOutput: output,
          });
        }

        // Log the final output object
        console.log("Final output:", JSON.stringify(output, null, 2));
        console.log("Has transcript?", Boolean(output.transcript));
        console.log("Transcript type:", typeof output.transcript);
        console.log("Transcript length:", output.transcript?.length);

        // Return the processed output and status
        return NextResponse.json({
          status: data.status,
          completed: true,
          message: output.message || "",
          transcript: output.transcript || "",
          debugOutput: output,
        });
      } catch (error) {
        console.error("Error parsing output data:", error);
        return NextResponse.json({
          status: data.status,
          completed: true,
          error: "Error parsing output data",
          rawOutput: data.output,
        });
      }
    }

    // Return status information if processing is not yet complete
    return NextResponse.json({
      status: data.status,
      completed: false,
    });
  } catch (error) {
    console.error("Error checking status:", error);
    return NextResponse.json(
      { error: "Failed to check processing status" },
      { status: 500 }
    );
  }
}
