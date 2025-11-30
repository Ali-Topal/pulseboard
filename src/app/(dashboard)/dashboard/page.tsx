import type { ReactNode } from "react"

import { KpiCards } from "@/components/dashboard/kpi-cards"
import { LineChart } from "@/components/dashboard/line-chart"
import { kpis } from "@/content/kpis"
import { revenueTimeseries } from "@/content/timeseries"

const SHOW_KPI_EMPTY_STATE = false
const SHOW_CHART_EMPTY_STATE = false
const SHOW_CHART_ERROR_STATE = false

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

      <KpiCards items={kpis} showEmptyState={SHOW_KPI_EMPTY_STATE} />

      <section className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <LineChart
          data={revenueTimeseries}
          simulateEmpty={SHOW_CHART_EMPTY_STATE}
          simulateError={SHOW_CHART_ERROR_STATE}
        />
        <PlaceholderCard title="Table placeholder">
          Step 06 will bring the interactive data table. Until then, this block
          holds the space so the layout stays predictable.
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

