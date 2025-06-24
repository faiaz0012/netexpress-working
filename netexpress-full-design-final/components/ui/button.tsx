import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "btn-3d-primary text-primary-foreground",
        destructive: "btn-3d-danger text-destructive-foreground",
        outline: "btn-3d-outline border-input bg-background hover:text-accent-foreground",
        secondary: "btn-3d bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "btn-3d-ghost hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        success: "btn-3d-success text-white",
        warning: "btn-3d-warning text-white",
        info: "btn-3d-info text-white",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
      animation: {
        none: "",
        float: "btn-float",
        pulse: "btn-pulse",
        bounce: "btn-bounce",
        glow: "btn-glow",
        morph: "btn-morph",
        neon: "btn-neon",
        ripple: "btn-ripple",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      animation: "none",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, animation, asChild = false, loading = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, animation, className }), loading && "btn-loading")}
        ref={ref}
        {...props}
      >
        {children}
      </Comp>
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
