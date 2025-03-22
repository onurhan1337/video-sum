declare module "@eachlabs/aiflow" {
  interface FlowResponse {
    status: "completed" | "failed" | "running";
    error?: string;
    output?: {
      transcript: string;
      summary: string;
    };
  }

  interface Flow {
    trigger(
      workflowId: string,
      options: {
        parameters: Record<string, unknown>;
        webhook_url: string;
      }
    ): Promise<string>;
    get(triggerId: string): Promise<FlowResponse>;
  }

  interface PredictionResponse {
    status: string;
    message: string;
    predictionID: string;
  }

  interface PredictionResult {
    status: "success" | "error" | "cancelled";
    error?: string;
    output?: {
      transcript: string;
      summary: string;
    };
  }

  interface Predictions {
    run(params: {
      model: string;
      version: string;
      input: Record<string, unknown>;
    }): Promise<PredictionResponse>;
    get(predictionID: string): Promise<PredictionResult>;
  }

  export default class Each {
    constructor(config: { auth: string });
    predictions: Predictions;
    flow: Flow;
  }
}
