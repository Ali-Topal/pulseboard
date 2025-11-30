"use client"

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { TimeseriesPoint } from "@/content/timeseries"
import { formatCurrency, formatNumber } from "@/lib/formatters"
import { cn } from "@/lib/cn"

const VIEWBOX_WIDTH = 720
const VIEWBOX_HEIGHT = 260
const LOADING_MS = 900

type LineChartProps = {
  data: TimeseriesPoint[]
  simulateEmpty?: boolean
  simulateError?: boolean
  title?: string
  subtitle?: string
  unit?: "currency" | "count"
}

export function LineChart({
  data,
  simulateEmpty = false,
  simulateError = false,
  title = "Revenue trend",
  subtitle = "ARR over the last 12 months",
  unit = "currency",
}: LineChartProps) {
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading")
  const [activeIndex, setActiveIndex] = useState(data.length - 1)
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setStatus(simulateError ? "error" : "ready")
    }, LOADING_MS)
    return () => clearTimeout(timer)
  }, [simulateError])

  const preparedData = useMemo(() => {
    if (simulateEmpty) return []
    return data
  }, [data, simulateEmpty])

  useEffect(() => {
    setActiveIndex(preparedData.length - 1)
  }, [preparedData])

  const values = preparedData.map((point) => point.value)
  const minValue = Math.min(...values)
  const maxValue = Math.max(...values)
  const yRange = maxValue - minValue || 1

  const points = useMemo(() => {
    if (!preparedData.length) return []

    const step = VIEWBOX_WIDTH / Math.max(1, preparedData.length - 1)

    return preparedData.map((point, index) => {
      const x = index * step
      const normalizedY = (point.value - minValue) / yRange
      const y = VIEWBOX_HEIGHT - normalizedY * (VIEWBOX_HEIGHT - 40) - 20
      return { ...point, x, y }
    })
  }, [preparedData, minValue, yRange])

  const pathDefinition = useMemo(() => {
    if (!points.length) return ""
    return points
      .map((point, index) =>
        index === 0 ? `M ${point.x} ${point.y}` : `L ${point.x} ${point.y}`,
      )
      .join(" ")
  }, [points])

  const areaDefinition = useMemo(() => {
    if (!points.length) return ""
    const first = points[0]
    const last = points[points.length - 1]
    return `${pathDefinition} L ${last.x} ${VIEWBOX_HEIGHT} L ${first.x} ${VIEWBOX_HEIGHT} Z`
  }, [pathDefinition, points])

  const activePoint = points[activeIndex] ?? points[points.length - 1]

  const handlePointerMove = useCallback(
    (clientX: number) => {
      if (!svgRef.current || !points.length) return
      const { left, width } = svgRef.current.getBoundingClientRect()
      const relativeX = Math.max(0, Math.min(clientX - left, width))
      const xRatio = relativeX / width
      const index = Math.round(xRatio * (points.length - 1))
      setActiveIndex(index)
    },
    [points],
  )

  if (status === "loading") {
    return (
      <Card className="h-full">
        <CardHeader className="space-y-2">
          <div className="h-4 w-28 animate-pulse rounded bg-slate-200" />
          <div className="h-6 w-48 animate-pulse rounded bg-slate-200" />
        </CardHeader>
        <CardContent>
          <div className="h-64 animate-pulse rounded-2xl bg-slate-100" />
        </CardContent>
      </Card>
    )
  }

  if (status === "error") {
    return (
      <StateCard title={title} subtitle={subtitle}>
        <ErrorState />
      </StateCard>
    )
  }

  if (!preparedData.length) {
    return (
      <StateCard title={title} subtitle={subtitle}>
        <EmptyState />
      </StateCard>
    )
  }

  return (
    <Card className="h-full">
      <CardHeader className="space-y-2">
        <div className="flex items-center gap-3">
          <Badge variant="neutral">12 mo</Badge>
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            {subtitle}
          </span>
        </div>
        <CardTitle>{title}</CardTitle>
        {activePoint ? (
          <p className="text-sm text-slate-500">
            {formatMonth(activePoint.date)} • {formatValue(activePoint.value, unit)}
          </p>
        ) : null}
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="relative">
          <svg
            ref={svgRef}
            role="img"
            aria-label={`${title} line chart`}
            viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
            className="h-[260px] w-full"
            onMouseMove={(event) => handlePointerMove(event.clientX)}
            onTouchMove={(event) =>
              handlePointerMove(event.touches[0]?.clientX ?? 0)
            }
            onMouseLeave={() => setActiveIndex(points.length - 1)}
            onTouchEnd={() => setActiveIndex(points.length - 1)}
          >
            <defs>
              <linearGradient id="chart-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0f172a" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
              </linearGradient>
            </defs>

            <path
              d={areaDefinition}
              fill="url(#chart-gradient)"
              opacity="0.6"
              aria-hidden
            />
            <path
              d={pathDefinition}
              fill="none"
              stroke="#0f172a"
              strokeWidth={3}
              strokeLinecap="round"
              aria-hidden
            />

            {points.map((point, index) => (
              <circle
                key={point.id}
                cx={point.x}
                cy={point.y}
                r={index === activeIndex ? 6 : 4}
                fill={index === activeIndex ? "#0f172a" : "#94a3b8"}
                opacity={index === activeIndex ? 1 : 0.6}
                aria-hidden
              />
            ))}
          </svg>

          {activePoint ? (
            <div
              className="pointer-events-none absolute left-0 top-0 h-full w-full"
              aria-hidden
            >
              <div
                className="absolute flex -translate-x-1/2 flex-col items-center gap-2"
                style={{
                  left: `${(activePoint.x / VIEWBOX_WIDTH) * 100}%`,
                  top: `${(activePoint.y / VIEWBOX_HEIGHT) * 100}%`,
                }}
              >
                <span className="h-12 w-px bg-slate-300" />
                <div className="rounded-lg border border-slate-200 bg-white px-3 py-1 text-xs font-semibold shadow-md">
                  <p>{formatValue(activePoint.value, unit)}</p>
                  <p className="text-[11px] text-slate-500">
                    {formatMonth(activePoint.date)}
                  </p>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
          <LegendItem
            label="Peak"
            value={formatValue(maxValue, unit)}
            dotClassName="bg-slate-900"
          />
          <LegendItem
            label="Low"
            value={formatValue(minValue, unit)}
            dotClassName="bg-slate-400"
          />
          <LegendItem
            label="Average"
            value={formatValue(average(values), unit)}
            dotClassName="bg-slate-500"
          />
        </div>
      </CardContent>
    </Card>
  )
}

function StateCard({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle: string
  children: ReactNode
}) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <p className="text-sm text-slate-500">{subtitle}</p>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}

function EmptyState() {
  return (
    <div className="space-y-2 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center">
      <p className="text-base font-semibold text-slate-900">
        No chart data available
      </p>
      <p className="text-sm text-slate-500">
        Provide at least two data points to render the chart. Add fake entries in{" "}
        <code className="rounded bg-slate-100 px-1">timeseries.ts</code>.
      </p>
    </div>
  )
}

function ErrorState() {
  return (
    <div className="space-y-2 rounded-2xl border border-rose-200 bg-rose-50/80 p-8 text-center text-rose-700">
      <p className="text-base font-semibold">Chart failed to load</p>
      <p className="text-sm">
        Retry later or inspect the fake fetch handler for intentional failures.
      </p>
    </div>
  )
}

function LegendItem({
  label,
  value,
  dotClassName,
}: {
  label: string
  value: string
  dotClassName?: string
}) {
  return (
    <div className="flex items-center gap-2">
      <span
        aria-hidden
        className={cn("h-2.5 w-2.5 rounded-full bg-slate-500", dotClassName)}
      />
      <span className="font-semibold text-slate-900">{value}</span>
      <span>{label}</span>
    </div>
  )
}

function formatValue(value: number, unit: "currency" | "count"): string {
  if (unit === "currency") return formatCurrency(value)
  return formatNumber(value)
}

function formatMonth(dateString: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
  }).format(new Date(dateString))
}

function average(values: number[]): number {
  if (!values.length) return 0
  return values.reduce((sum, value) => sum + value, 0) / values.length
}

