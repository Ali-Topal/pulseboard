import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

import { MobileNavToggle } from "./mobile-nav-toggle"

export function Topbar() {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur-sm sm:px-6 lg:px-10">
      <div className="flex items-center gap-3">
        <MobileNavToggle />
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Pulseboard
          </p>
          <p className="text-sm font-medium text-slate-900">
            Choose a section below
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Badge variant="neutral" className="hidden sm:inline-flex">
          Draft
        </Badge>
        <Button variant="secondary" size="sm" className="hidden sm:inline-flex">
          Placeholder action
        </Button>
      </div>
    </header>
  )
}

