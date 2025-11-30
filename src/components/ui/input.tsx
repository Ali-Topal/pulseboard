import * as React from "react"

import { cn } from "@/lib/cn"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", error, id, ...props }, ref) => {
    const generatedId = React.useId()
    const inputId = id ?? generatedId
    const errorId = error ? `${inputId}-error` : undefined

    return (
      <div className="space-y-2">
        <input
          ref={ref}
          id={inputId}
          type={type}
          className={cn(
            "flex h-11 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100",
            error && "border-rose-500 focus-visible:outline-rose-500",
            className,
          )}
          aria-invalid={Boolean(error)}
          aria-describedby={errorId}
          {...props}
        />
        {error ? (
          <p id={errorId} className="text-sm font-medium text-rose-600">
            {error}
          </p>
        ) : null}
      </div>
    )
  },
)
Input.displayName = "Input"

