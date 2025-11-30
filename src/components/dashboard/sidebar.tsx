import { cn } from "@/lib/cn"

type SidebarVariant = "desktop" | "mobile"

interface SidebarProps {
  variant?: SidebarVariant
}

const NAV_ITEMS = [
  { label: "Overview", description: "High-level metrics snapshot" },
  { label: "Settings", description: "Manage profile and preferences" },
]

export function Sidebar({ variant = "desktop" }: SidebarProps) {
  const isDesktop = variant === "desktop"

  return (
    <aside
      aria-label="Dashboard navigation"
      className={cn(
        "bg-white",
        isDesktop
          ? "flex h-full flex-col gap-8 border-r border-slate-200 px-6 py-8"
          : "w-full border-slate-200 px-4 py-4",
      )}
    >
      <div className="space-y-1">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
          Pulseboard
        </p>
        <p className="text-lg font-semibold text-slate-900">Dashboard shell</p>
        <p className="text-sm text-slate-500">
          Navigation stub — full experience arrives in Step 3.
        </p>
      </div>

      <nav className="space-y-2" aria-label="Primary sections">
        {NAV_ITEMS.map((item) => (
          <div
            key={item.label}
            className="rounded-lg border border-dashed border-slate-200 bg-slate-50 px-4 py-3"
          >
            <p className="text-sm font-medium text-slate-900">{item.label}</p>
            <p className="text-xs text-slate-500">{item.description}</p>
          </div>
        ))}
      </nav>
    </aside>
  )
}

