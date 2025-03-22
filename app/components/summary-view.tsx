"use client";

import ReactMarkdown from "react-markdown";
import { Loader2 } from "lucide-react";
import React from "react";

export interface SummaryViewProps {
  summary: string;
  isLoading: boolean;
  error: string;
}

export default function SummaryView({
  summary,
  isLoading,
  error,
}: SummaryViewProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center pb-8 pt-2 space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
        <p className="text-zinc-800 text-sm font-medium">Loading summary...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-600 bg-red-50 rounded-lg">
        <p className="font-medium">Error</p>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  if (!summary) {
    return (
      <div className="py-8 text-center">
        <p className="text-zinc-700 font-medium">No summary available</p>
        <p className="text-zinc-500 text-sm mt-2">
          Please try processing the video again.
        </p>
      </div>
    );
  }

  return (
    <div
      className="prose prose-zinc max-w-none bg-white p-6 rounded-lg"
      style={{ fontFamily: "Geist Mono, monospace" }}
    >
      <ReactMarkdown
        components={{
          h1: ({ ...props }) => (
            <h1
              className="text-3xl font-bold text-black mb-6 pb-2 border-b-2 border-zinc-200"
              {...props}
            />
          ),
          h2: ({ ...props }) => (
            <h2
              className="text-2xl font-bold text-black mt-8 mb-4 pb-1 border-b border-zinc-200"
              {...props}
            />
          ),
          h3: ({ ...props }) => (
            <h3
              className="text-xl font-bold text-zinc-900 mt-6 mb-3"
              {...props}
            />
          ),
          p: ({ ...props }) => (
            <p
              className="text-base text-zinc-700 leading-relaxed my-3"
              {...props}
            />
          ),
          ul: ({ ...props }) => (
            <ul className="list-disc pl-6 my-4 space-y-2" {...props} />
          ),
          ol: ({ ...props }) => (
            <ol className="list-decimal pl-6 my-4 space-y-2" {...props} />
          ),
          li: ({ ...props }) => <li className="text-zinc-700" {...props} />,
          strong: ({ ...props }) => (
            <strong className="font-bold text-black" {...props} />
          ),
          em: ({ ...props }) => (
            <em className="italic text-zinc-800" {...props} />
          ),
          a: ({ ...props }) => (
            <a
              className="text-blue-700 hover:text-blue-900 underline"
              {...props}
            />
          ),
          blockquote: ({ ...props }) => (
            <blockquote
              className="pl-4 border-l-4 border-zinc-300 italic text-zinc-600 my-4"
              {...props}
            />
          ),
          code: ({
            inline,
            ...props
          }: { inline?: boolean } & React.HTMLAttributes<HTMLElement>) =>
            inline ? (
              <code
                className="bg-zinc-100 text-zinc-800 px-1 py-0.5 rounded text-sm"
                {...props}
              />
            ) : (
              <code
                className="block bg-zinc-100 text-zinc-800 p-3 rounded-md text-sm overflow-x-auto my-4"
                {...props}
              />
            ),
          pre: ({ ...props }) => (
            <pre
              className="bg-zinc-100 rounded-md p-0 my-4 overflow-hidden"
              {...props}
            />
          ),
        }}
      >
        {summary}
      </ReactMarkdown>
    </div>
  );
}
