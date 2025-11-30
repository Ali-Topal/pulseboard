export type TableStatus = "paid" | "pending" | "overdue"

export type InvoiceRow = {
  id: string
  customer: string
  plan: string
  amount: number
  status: TableStatus
  issuedOn: string
  dueOn: string
}

export const invoiceRows: InvoiceRow[] = [
  {
    id: "INV-3645",
    customer: "Luna Analytics",
    plan: "Enterprise",
    amount: 18450,
    status: "paid",
    issuedOn: "2024-10-01",
    dueOn: "2024-10-15",
  },
  {
    id: "INV-3646",
    customer: "Northwind Media",
    plan: "Growth",
    amount: 8250,
    status: "pending",
    issuedOn: "2024-10-05",
    dueOn: "2024-10-20",
  },
  {
    id: "INV-3647",
    customer: "Copperlane Studios",
    plan: "Growth",
    amount: 6120,
    status: "overdue",
    issuedOn: "2024-09-14",
    dueOn: "2024-09-29",
  },
  {
    id: "INV-3648",
    customer: "Atlas Learning",
    plan: "Starter",
    amount: 1900,
    status: "paid",
    issuedOn: "2024-09-21",
    dueOn: "2024-10-05",
  },
  {
    id: "INV-3649",
    customer: "Daybreak Finance",
    plan: "Enterprise",
    amount: 20950,
    status: "pending",
    issuedOn: "2024-10-10",
    dueOn: "2024-10-25",
  },
  {
    id: "INV-3650",
    customer: "Kindred Health",
    plan: "Growth",
    amount: 7430,
    status: "paid",
    issuedOn: "2024-10-08",
    dueOn: "2024-10-23",
  },
]

