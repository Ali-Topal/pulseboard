import { DataTable } from "@/components/dashboard/data-table"
import { KpiCards } from "@/components/dashboard/kpi-cards"
import { LineChart } from "@/components/dashboard/line-chart"
import { invoiceRows } from "@/content/table-rows"
import { kpis } from "@/content/kpis"
import { revenueTimeseries } from "@/content/timeseries"

const SHOW_KPI_EMPTY_STATE = false
const SHOW_CHART_EMPTY_STATE = false
const SHOW_CHART_ERROR_STATE = false
const SHOW_TABLE_EMPTY_STATE = false
const SHOW_TABLE_ERROR_STATE = false

export default function DashboardOverviewPage() {
  return (
    <div className="space-y-10">
      <section className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
          Overview
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Performance snapshot
        </h1>
        <p className="text-base text-slate-600">
          KPI cards, charts, and table data run on fake content so reviewers can focus
          on structure, responsiveness, and polish.
        </p>
      </section>

      <KpiCards items={kpis} showEmptyState={SHOW_KPI_EMPTY_STATE} />

      <section>
        <LineChart
          data={revenueTimeseries}
          simulateEmpty={SHOW_CHART_EMPTY_STATE}
          simulateError={SHOW_CHART_ERROR_STATE}
        />
      </section>

      <section>
        <DataTable
          rows={invoiceRows}
          simulateEmpty={SHOW_TABLE_EMPTY_STATE}
          simulateError={SHOW_TABLE_ERROR_STATE}
        />
      </section>
    </div>
  )
}

