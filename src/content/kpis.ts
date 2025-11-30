export type KpiMetric = {
  id: string
  label: string
  value: number
  unit: "currency" | "percent" | "count"
  change: number
  trend: "up" | "down" | "flat"
  caption: string
}

export const kpis: KpiMetric[] = [
  {
    id: "arr",
    label: "Monthly Recurring Revenue",
    value: 78450,
    unit: "currency",
    change: 6.4,
    trend: "up",
    caption: "vs last 30 days",
  },
  {
    id: "activation",
    label: "Activation rate",
    value: 41.2,
    unit: "percent",
    change: 1.3,
    trend: "up",
    caption: "new workspaces completed onboarding",
  },
  {
    id: "tickets",
    label: "Open support tickets",
    value: 57,
    unit: "count",
    change: -12,
    trend: "down",
    caption: "awaiting agent response",
  },
  {
    id: "nps",
    label: "Net promoter score",
    value: 48,
    unit: "count",
    change: -2.1,
    trend: "down",
    caption: "rolling 30 day sample",
  },
]

