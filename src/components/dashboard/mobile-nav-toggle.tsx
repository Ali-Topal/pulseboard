"use client"

import { useEffect, useRef, useState } from "react"

import { Button } from "@/components/ui/button"

import { Sidebar } from "./sidebar"

export function MobileNavToggle() {
  const [open, setOpen] = useState(false)
  const drawerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    const drawer = drawerRef.current
    const focusable = drawer
      ? Array.from(
          drawer.querySelectorAll<HTMLElement>(
            "a[href], button:not([disabled]), [tabindex]:not([tabindex='-1'])",
          ),
        )
      : []

    focusable[0]?.focus()

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false)
        return
      }

      if (event.key === "Tab" && focusable.length > 0) {
        const first = focusable[0]
        const last = focusable[focusable.length - 1]

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [open])

  useEffect(() => {
    const { style } = document.body
    const previous = style.overflow
    if (open) {
      style.overflow = "hidden"
    }
    return () => {
      style.overflow = previous
    }
  }, [open])

  return (
    <>
      <button
        type="button"
        className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-900 transition hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 lg:hidden"
        aria-label="Open navigation"
        aria-controls="mobile-dashboard-nav"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        <span aria-hidden className="flex flex-col gap-1.5">
          <span className="block h-0.5 w-5 rounded-full bg-current" />
          <span className="block h-0.5 w-5 rounded-full bg-current" />
          <span className="block h-0.5 w-5 rounded-full bg-current" />
        </span>
      </button>

      {open ? (
        <div className="fixed inset-0 z-40 lg:hidden" aria-hidden={!open}>
          <div
            aria-hidden
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          <div
            ref={drawerRef}
            role="dialog"
            aria-modal
            id="mobile-dashboard-nav"
            className="relative ml-auto flex h-full w-[320px] flex-col bg-white px-4 pb-8 pt-4 shadow-2xl"
          >
            <div className="mb-4 flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Pulseboard
                </p>
                <p className="text-base font-semibold text-slate-900">
                  Navigation
                </p>
              </div>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setOpen(false)}
              >
                Close
              </Button>
            </div>

            <Sidebar variant="mobile" onNavigate={() => setOpen(false)} />
          </div>
        </div>
      ) : null}
    </>
  )
}

