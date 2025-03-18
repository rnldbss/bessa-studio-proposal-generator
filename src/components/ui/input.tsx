import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "border-level-5 file:text-foreground placeholder:text-muted-foreground  flex h-8 w-full min-w-0 rounded-sm border bg-transparent px-2 text-base outline-hidden file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-accent/50 focus-visible:ring",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  );
}

export { Input };
