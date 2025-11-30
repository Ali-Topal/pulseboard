import type { ReactNode } from "react"

import { Sidebar } from "@/components/dashboard/sidebar"
import { Topbar } from "@/components/dashboard/topbar"

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <a className="skip-link" href="#dashboard-main">
        Skip to main content
      </a>
      <div className="min-h-screen lg:grid lg:grid-cols-[280px_1fr]">
        <div className="hidden h-full bg-white lg:block">
          <Sidebar variant="desktop" />
        </div>

        <div className="flex min-h-screen flex-col">
          <Topbar />

          <main
            id="dashboard-main"
            className="flex-1 px-4 py-8 sm:px-6 lg:px-10"
          >
            <div className="mx-auto w-full max-w-6xl">{children}</div>
          </main>
        </div>
      </div>
    </div>
  )
}

