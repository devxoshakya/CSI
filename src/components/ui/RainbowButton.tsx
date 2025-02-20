import React from "react";

import { cn } from "@/lib/utils";
interface RainbowButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function RainbowButton({
  children,
  className,
  ...props
}: RainbowButtonProps) {
  return (
    <button
    className={cn(
      // Base button styles with higher z-index
      "group relative inline-flex h-11 cursor-pointer items-center justify-center rounded-md px-8 py-2 font-medium transition-all z-99",
      // Solid border
      "border border-gray-300 hover:border-gray-400",
      // White background
      "bg-white",
      // Bottom gradient glow effect using before pseudo-element
      "before:absolute before:bottom-[-1px] before:left-1/2 before:z-[-1] before:h-[5px] before:w-4/5 before:-translate-x-1/2 before:bg-[linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))] before:content-[''] before:animate-rainbow before:blur-md",
      // Content positioning
      "isolate [&>*]:relative",
      // Focus and disabled states
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-200 disabled:pointer-events-none disabled:opacity-50",
      // Text color
      "text-neutral-900",
      className
      )}
    {...props}
    >
      {children}
    </button>
  );
}
