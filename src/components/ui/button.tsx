import * as React from "react"

import { cn } from "@/lib/cn"

type ButtonVariant = "primary" | "secondary" | "ghost"
type ButtonSize = "sm" | "md" | "lg"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
}

const VARIANT_MAP: Record<ButtonVariant, string> = {
  primary:
    "bg-slate-900 text-white shadow-sm hover:bg-slate-800 focus-visible:outline-slate-900",
  secondary:
    "bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 focus-visible:outline-slate-200",
  ghost: "bg-transparent text-slate-900 hover:bg-slate-100 focus-visible:outline-slate-200",
}

const SIZE_MAP: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-5 text-base",
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      fullWidth,
      type = "button",
      ...props
    },
    ref,
  ) => (
    <button
      ref={ref}
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50",
        VARIANT_MAP[variant],
        SIZE_MAP[size],
        fullWidth && "w-full",
        className,
      )}
      {...props}
    />
  ),
)
Button.displayName = "Button"

