"use client"

import { useEffect, useState, type ReactElement } from "react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { KpiMetric } from "@/content/kpis"
import { formatCurrency, formatNumber, formatPercent } from "@/lib/formatters"
import { cn } from "@/lib/cn"

type KpiCardsProps = {
  items: KpiMetric[]
  showEmptyState?: boolean
}

const LOADING_DURATION = 900

export function KpiCards({ items, showEmptyState = false }: KpiCardsProps) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), LOADING_DURATION)
    return () => clearTimeout(timer)
  }, [])

  const hasData = !showEmptyState && items.length > 0

  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={`kpi-skeleton-${index}`}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="space-y-4">
              <div className="h-4 w-24 animate-pulse rounded-full bg-slate-200" />
              <div className="h-10 w-32 animate-pulse rounded-full bg-slate-200" />
              <div className="h-3 w-40 animate-pulse rounded-full bg-slate-100" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (!hasData) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white/70 p-8 text-center shadow-inner">
        <p className="text-lg font-semibold text-slate-900">
          No metrics available
        </p>
        <p className="text-sm text-slate-500">
          Toggle mock data back on in `kpis.ts` or feed live stats once the API
          is ready.
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <Card key={item.id} className="h-full">
          <CardHeader>
            <CardDescription>{item.caption}</CardDescription>
            <CardTitle>{item.label}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-3xl font-semibold text-slate-900">
              {formatKpiValue(item)}
            </p>
            <div className="flex items-center gap-2">
              <TrendBadge change={item.change} trend={item.trend} />
              <span className="text-xs text-slate-500">vs last period</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function formatKpiValue(metric: KpiMetric): string {
  switch (metric.unit) {
    case "currency":
      return formatCurrency(metric.value)
    case "percent":
      return formatPercent(metric.value)
    default:
      return formatNumber(metric.value)
  }
}

function TrendBadge({
  change,
  trend,
}: Pick<KpiMetric, "change" | "trend">): ReactElement {
  const isPositive = change > 0
  const isNegative = change < 0

  const variant = isPositive
    ? "success"
    : isNegative
      ? "destructive"
      : "neutral"

  return (
    <Badge
      variant={variant}
      className={cn(
        "flex items-center gap-1 uppercase tracking-wide",
        trend === "flat" && "text-slate-700",
      )}
    >
      <span aria-hidden>{trendIcon(trend)}</span>
      {change > 0 ? "+" : ""}
      {formatPercent(change)}
    </Badge>
  )
}

function trendIcon(trend: KpiMetric["trend"]) {
  if (trend === "up") return "↗"
  if (trend === "down") return "↘"
  return "→"
}

