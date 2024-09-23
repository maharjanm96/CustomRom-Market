"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
    value?: number;
  }
>(({ className, value = 0, ...props }, ref) => {
  let indicatorClass = "h-full transition-all";
  let percentageValue = 0;

  if (value < 0) {
    indicatorClass += " bg-red-500"; // Red for negative
    percentageValue = Math.min(100, Math.abs(value)); // Increase left for negative values
  } else if (value > 0) {
    indicatorClass += " bg-green-500"; // Green for positive
    percentageValue = Math.min(100, value); // Increase right for positive values
  }

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-4 w-full overflow-hidden rounded-full bg-secondary border-2 border-gray-400",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={indicatorClass}
        style={{
          width: `${percentageValue}%`, // Adjust width based on value
        }}
      />
    </ProgressPrimitive.Root>
  );
});
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
