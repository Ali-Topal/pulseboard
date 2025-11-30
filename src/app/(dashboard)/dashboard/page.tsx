import type { ReactNode } from "react"

import { KpiCards } from "@/components/dashboard/kpi-cards"
import { kpis } from "@/content/kpis"

const SHOW_EMPTY_STATE = false

export default function DashboardOverviewPage() {
  return (
    <div className="space-y-10">
      <section className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
          Step 04
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Overview
        </h1>
        <p className="text-base text-slate-600">
          KPI cards load fake yet realistic metrics so reviewers can evaluate
          typography, spacing, and state handling before charts and tables land.
        </p>
      </section>

      <KpiCards items={kpis} showEmptyState={SHOW_EMPTY_STATE} />

      <section className="grid gap-6 lg:grid-cols-2">
        <PlaceholderCard title="Chart placeholder">
          Step 05 will replace this block with the timeline chart.
        </PlaceholderCard>
        <PlaceholderCard title="Table placeholder">
          Step 06 introduces the data table. Focus on KPIs for now.
        </PlaceholderCard>
      </section>
    </div>
  )
}

function PlaceholderCard({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-200 bg-white/60 p-6 text-sm text-slate-600 shadow-inner">
      <p className="text-base font-semibold text-slate-900">{title}</p>
      <p>{children}</p>
    </div>
  )
}

