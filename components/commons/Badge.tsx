import type * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/utils/cn"


const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary-500 text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary-500 text-secondary-foreground hover:bg-secondary/80",
        outline: "text-foreground",
        green: "border-transparent bg-green-700 text-white hover:bg-green-600",
        lightGreen: "bg-green-900 text-green-500 border-transparent"
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }

