"use client"

import { useEffect, useState, type ComponentProps } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table } from "@/components/ui/table"
import type { InvoiceRow } from "@/content/table-rows"
import { formatCurrency } from "@/lib/formatters"

type DataTableProps = {
  rows: InvoiceRow[]
  simulateEmpty?: boolean
  simulateError?: boolean
}

const LOADING_MS = 900

export function DataTable({
  rows,
  simulateEmpty = false,
  simulateError = false,
}: DataTableProps) {
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading")
  const [data, setData] = useState<InvoiceRow[]>([])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (simulateError) {
        setStatus("error")
        return
      }
      setData(simulateEmpty ? [] : rows)
      setStatus("ready")
    }, LOADING_MS)

    return () => clearTimeout(timer)
  }, [rows, simulateEmpty, simulateError])

  if (status === "loading") {
    return (
      <Card>
        <CardHeader className="space-y-2">
          <div className="h-4 w-32 animate-pulse rounded bg-slate-200" />
          <div className="h-5 w-48 animate-pulse rounded bg-slate-200" />
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={`row-skeleton-${index}`}
                className="h-12 animate-pulse rounded-lg bg-slate-100"
              />
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (status === "error") {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-xl border border-rose-200 bg-rose-50/80 p-6 text-sm text-rose-700">
            Something went wrong while loading the table. Refresh or try again later.
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-slate-900 dark:text-slate-50">
            Recent invoices
          </CardTitle>
          <p className="text-sm text-slate-500 dark:text-slate-300">
            Tracking six most recent enterprise customer renewals.
          </p>
        </div>
        <Button variant="secondary" size="sm">
          Export
        </Button>
      </CardHeader>
      <CardContent>
        {data.length ? (
          <Table>
            <Table.Header>
              <Table.Row className="bg-slate-200 text-slate-700">
                <Table.Head>Invoice</Table.Head>
                <Table.Head>Customer</Table.Head>
                <Table.Head>Plan</Table.Head>
                <Table.Head className="text-right">Amount</Table.Head>
                <Table.Head>Status</Table.Head>
                <Table.Head>Issued</Table.Head>
                <Table.Head>Due</Table.Head>
                <Table.Head className="sr-only">Actions</Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {data.map((row) => (
                <TableRow key={row.id} row={row} />
              ))}
            </Table.Body>
          </Table>
        ) : (
          <div className="space-y-2 rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-center">
            <p className="text-base font-semibold text-slate-900">
              No results
            </p>
            <p className="text-sm text-slate-500">
              Try syncing from your billing provider or adjusting filters once they exist.
            </p>
            <Button size="sm" variant="primary">
              Add invoice
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function TableRow({ row }: { row: InvoiceRow }) {
  return (
    <Table.Row className="focus-within:bg-slate-50">
      <Table.Cell className="font-semibold text-slate-900">{row.id}</Table.Cell>
      <Table.Cell>{row.customer}</Table.Cell>
      <Table.Cell>
        <span className="rounded-full border border-slate-200 px-2 py-1 text-xs font-semibold uppercase tracking-wide">
          {row.plan}
        </span>
      </Table.Cell>
      <Table.Cell className="text-right font-semibold text-slate-900">
        {formatCurrency(row.amount)}
      </Table.Cell>
      <Table.Cell>
        <StatusBadge status={row.status} />
      </Table.Cell>
      <Table.Cell>{formatDate(row.issuedOn)}</Table.Cell>
      <Table.Cell>{formatDate(row.dueOn)}</Table.Cell>
      <Table.Cell className="text-right">
        <Button
          variant="ghost"
          size="sm"
          aria-label={`Open actions for invoice ${row.id}`}
          className="px-2"
        >
          •••
        </Button>
      </Table.Cell>
    </Table.Row>
  )
}

function StatusBadge({ status }: { status: InvoiceRow["status"] }) {
  const config: Record<
    InvoiceRow["status"],
    { label: string; variant: ComponentProps<typeof Badge>["variant"] }
  > = {
    paid: { label: "Paid", variant: "success" },
    pending: { label: "Pending", variant: "warning" },
    overdue: { label: "Overdue", variant: "destructive" },
  }

  const { label, variant } = config[status]

  return <Badge variant={variant}>{label}</Badge>
}

function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(new Date(dateString))
}

