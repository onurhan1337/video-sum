"use client";

import { Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function LoadingResults() {
  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="lg:col-span-1">
        <Card className="p-4 border-green-100 bg-white shadow-md h-[450px] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-transparent"></div>
          <div className="relative space-y-4">
            <div className="h-4 w-40 bg-green-100 rounded animate-pulse"></div>

            {/* Video placeholder */}
            <div className="aspect-video bg-green-100/50 rounded-md animate-pulse flex items-center justify-center">
              <Loader2 className="h-10 w-10 animate-spin text-green-300" />
            </div>

            {/* Buttons placeholder */}
            <div className="pt-4 space-y-3">
              <div className="flex gap-2">
                <div className="h-8 w-1/2 bg-green-100/70 rounded animate-pulse"></div>
                <div className="h-8 w-1/2 bg-green-100/70 rounded animate-pulse"></div>
              </div>
              <div className="h-8 w-full bg-green-100/70 rounded animate-pulse"></div>
              <div className="mt-4 pt-4 border-t border-green-100">
                <div className="h-4 w-28 bg-green-100/70 rounded animate-pulse mb-2"></div>
                <div className="flex gap-2">
                  <div className="h-8 w-16 bg-green-100/70 rounded animate-pulse"></div>
                  <div className="h-8 w-16 bg-green-100/70 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="lg:col-span-2">
        <div className="mb-4">
          <div className="h-6 w-56 bg-green-100 rounded animate-pulse"></div>
        </div>

        <Card className="p-6 border-green-100 bg-white shadow-md">
          <div className="flex flex-col items-center justify-center py-20 space-y-6">
            <Loader2 className="h-16 w-16 animate-spin text-green-500" />
            <div>
              <p className="text-center text-xl font-bold text-primary-800">
                Processing Video
              </p>
              <p className="text-center text-primary-600 mt-2">
                This may take a moment. We are analyzing the content...
              </p>
            </div>

            <div className="w-full max-w-md mt-8">
              <div className="h-2 w-full bg-green-100 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 animate-progress"></div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
