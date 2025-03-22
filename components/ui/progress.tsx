"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value = 0, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-zinc-100",
        className
      )}
      {...props}
    >
      <div
        className="h-full w-full flex-1 bg-zinc-600 transition-all"
        style={{
          transform: `translateX(-${100 - (value || 0)}%)`,
          transition: "transform 0.2s ease-in-out",
        }}
      />
    </div>
  )
);
Progress.displayName = "Progress";

export { Progress };
