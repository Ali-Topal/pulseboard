# Pulseboard Architecture

This project is a small dashboard UI built with Next.js (App Router), TypeScript, and Tailwind.

## Goals
- Clean, reusable component structure
- Dashboard-style layout with sidebar navigation
- Data display components (chart + table) using realistic fake data
- Responsive and accessible UI baseline

## Routing (Next.js App Router)
Routes are grouped under a dashboard layout:

- `/dashboard` — Overview
- `/dashboard/settings` — Settings

Recommended structure:

- `app/(dashboard)/dashboard/layout.tsx`  
  Dashboard shell (sidebar + topbar + main content slot).
- `app/(dashboard)/dashboard/page.tsx`  
  Overview page.
- `app/(dashboard)/dashboard/settings/page.tsx`  
  Settings page.

## Component structure

### `src/components/ui/`
Reusable primitives used across the app:
- `Button`, `Card`, `Input`, `Badge`, `Table` (as needed)

Rules:
- UI primitives should be presentation-focused and reusable.
- Avoid business logic here.

### `src/components/dashboard/`
Dashboard-specific building blocks:
- `Sidebar`, `Topbar`
- `KpiCards`
- `LineChart` (custom SVG)
- `DataTable`

Rules:
- Dashboard components may compose UI primitives.
- Keep components small and focused (one responsibility).

## Data
Fake data lives in `src/content/`:
- `kpis` (overview stats)
- `timeseries` (chart)
- `tableRows` (table)

Rules:
- Keep data shapes typed.
- Components should consume data via props rather than importing content directly where possible.

## Utilities
`src/lib/` contains lightweight shared helpers:
- `cn` (className helper)
- simple formatters (dates, numbers)

## Rendering strategy
- Prefer server components by default.
- Use `"use client"` only when required (e.g., sidebar toggle, chart hover, settings inputs).

## Styling conventions
- Use consistent layout spacing (section padding, max widths).
- Avoid one-off Tailwind chaos—prefer shared components and patterns.
- Ensure visible focus states and no mobile overflow.
