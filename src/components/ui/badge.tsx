import * as React from "react"

import { cn } from "@/lib/cn"

type BadgeVariant = "neutral" | "success" | "warning" | "destructive"

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
}

const VARIANT_MAP: Record<BadgeVariant, string> = {
  neutral: "bg-slate-100 text-slate-700 ring-slate-200",
  success: "bg-emerald-100 text-emerald-900 ring-emerald-200",
  warning: "bg-amber-100 text-amber-900 ring-amber-200",
  destructive: "bg-rose-100 text-rose-900 ring-rose-200",
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "neutral", ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset",
        VARIANT_MAP[variant],
        className,
      )}
      {...props}
    />
  ),
)
Badge.displayName = "Badge"

