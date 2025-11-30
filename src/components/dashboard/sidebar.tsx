"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/cn"

type SidebarVariant = "desktop" | "mobile"

interface SidebarProps {
  variant?: SidebarVariant
  onNavigate?: () => void
}

const NAV_ITEMS = [
  {
    label: "Overview",
    description: "Metrics & KPIs snapshot",
    href: "/dashboard",
    badge: "OV",
  },
  {
    label: "Settings",
    description: "Profile & preferences",
    href: "/dashboard/settings",
    badge: "ST",
  },
]

export function Sidebar({ variant = "desktop", onNavigate }: SidebarProps) {
  const pathname = usePathname()
  const isDesktop = variant === "desktop"

  return (
    <aside
      aria-label="Dashboard navigation"
      className={cn(
        "bg-white",
        isDesktop
          ? "flex h-full flex-col gap-8 border-r border-slate-200 px-6 py-8"
          : "w-full border-b border-slate-200 px-4 py-4",
      )}
    >
      <div className="space-y-1">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
          Pulseboard
        </p>
        <p className="text-lg font-semibold text-slate-900">
          Navigate the product
        </p>
        <p className="text-sm text-slate-500">
          Links here stay consistent across desktop + mobile.
        </p>
      </div>

      <nav className="flex-1 space-y-2" aria-label="Primary sections">
        {NAV_ITEMS.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname?.startsWith(item.href))

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "group flex items-center justify-between rounded-xl border px-4 py-3 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900",
                isActive
                  ? "border-slate-900 bg-slate-900 text-white shadow-md"
                  : "border-slate-200 bg-white text-slate-900 hover:border-slate-300 hover:bg-slate-50",
              )}
              onClick={() => {
                if (!isDesktop) {
                  onNavigate?.()
                }
              }}
            >
              <div className="flex items-center gap-3">
                <span
                  aria-hidden
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-xl border text-xs font-semibold uppercase tracking-wide",
                    isActive
                      ? "border-white/40 bg-white/10 text-white"
                      : "border-slate-200 bg-slate-50 text-slate-600",
                  )}
                >
                  {item.badge}
                </span>
                <div>
                  <p className="text-sm font-semibold">{item.label}</p>
                  <p
                    className={cn(
                      "text-xs",
                      isActive ? "text-slate-200" : "text-slate-500",
                    )}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
              <span
                aria-hidden
                className={cn(
                  "text-xs font-semibold uppercase tracking-wide",
                  isActive ? "text-white" : "text-slate-400",
                )}
              >
                {isActive ? "Active" : "Go"}
              </span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}

