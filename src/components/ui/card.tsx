import * as React from "react"

import { cn } from "@/lib/cn"

type DivProps = React.HTMLAttributes<HTMLDivElement>
export type CardProps = DivProps

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900",
        className,
      )}
      {...props}
    />
  ),
)
Card.displayName = "Card"

export const CardHeader = React.forwardRef<HTMLDivElement, DivProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("mb-4 space-y-1", className)} {...props} />
  ),
)
CardHeader.displayName = "CardHeader"

export const CardTitle = React.forwardRef<
  React.ElementRef<"h3">,
  React.ComponentPropsWithoutRef<"h3">
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-lg font-semibold leading-tight", className)}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

export const CardDescription = React.forwardRef<
  React.ElementRef<"p">,
  React.ComponentPropsWithoutRef<"p">
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-sm text-slate-500", className)} {...props} />
))
CardDescription.displayName = "CardDescription"

export const CardContent = React.forwardRef<HTMLDivElement, DivProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("space-y-4", className)} {...props} />
  ),
)
CardContent.displayName = "CardContent"

export const CardFooter = React.forwardRef<HTMLDivElement, DivProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("mt-6 flex items-center justify-end gap-3", className)}
      {...props}
    />
  ),
)
CardFooter.displayName = "CardFooter"

