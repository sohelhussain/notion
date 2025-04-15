import { Loader } from "lucide-react";

import {cva, type VariantProps} from "class-variance-authority";

import {cn} from "@/lib/utils";

const spinnerVariants = cva(
  "text-muted-foreground animate-spin",
  {
    variants: {
      size: {
        sm: "w-4 h-4",
        md: "w-6 h-6",
        lg: "w-8 h-8",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export function Spinner({ size = "md" }: VariantProps<typeof spinnerVariants>) {
  return (
    <div className={cn(spinnerVariants({ size }))}>
      <Loader />
    </div>
  );
}