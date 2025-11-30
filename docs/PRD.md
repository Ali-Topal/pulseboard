# Pulseboard PRD (v0.1)

## Goal
Build a portfolio-ready dashboard UI that demonstrates professional front-end workmanship: layout, navigation, data presentation (chart + table), and a settings page. No backend required.

## Target user
- Primary: a client evaluating your ability to build clean dashboard UIs (SaaS/admin style)
- Secondary: recruiters reviewing component structure and UI polish

## Success criteria
- Looks polished at 375px / 768px / 1280px
- Consistent spacing, typography, and component styling
- Sidebar navigation works and feels responsive (desktop + mobile)
- Chart and table look production-ready with realistic fake data
- Settings page feels like a real product (not a form dump)
- Basic UX states exist: loading / empty / error (fake is fine)
- `npm run lint` and `npm run build` pass on each merged PR

## Scope (deliverables)

### Routes / pages (App Router)
- `/dashboard` — Overview
- `/dashboard/settings` — User settings

### Core UI components
- Sidebar (nav + active state)
- Topbar (page title + user menu placeholder)
- KPI cards (3–4 stats)
- Chart (fake timeseries)
- Table (fake rows, status badges)
- Settings form sections:
  - Profile (name/email/avatar placeholder)
  - Preferences (toggles)
  - Danger zone (sign out/delete placeholder)

### Data
- Fake data only, stored locally in `src/content/*`
- No API integration in v0.1

## Out of scope (explicit)
- Authentication / real user accounts
- Real API calls, websockets, polling, caching
- Role-based access control
- Exporting data (CSV/PDF)
- Payments / billing
- Complex charting features (multi-series, zoom, etc.)

## UX requirements
- Mobile-first layout
- Sidebar behavior:
  - Desktop: fixed sidebar
  - Mobile: drawer/menu (simple)
- Clear empty state messaging for table
- Predictable hover/focus states for all interactive elements
- No horizontal scrolling bugs

## Accessibility baseline
- Semantic structure and headings
- Keyboard navigation works for sidebar + settings form
- Visible focus styles
- Buttons vs links used correctly

## Technical constraints
- Next.js (App Router) + TypeScript + Tailwind
- Avoid new dependencies unless justified
- Keep logic minimal; prefer server components where possible
- Only use `"use client"` when interactivity requires it

## Repo structure (intended)
- `app/(dashboard)/dashboard/layout.tsx` (shell layout)
- `app/(dashboard)/dashboard/page.tsx` (overview)
- `app/(dashboard)/dashboard/settings/page.tsx` (settings)
- `src/components/ui/*` (Button, Card, Input, Table, Badge, etc.)
- `src/components/dashboard/*` (Sidebar, Topbar, KPI, Chart, DataTable)
- `src/content/*` (fake data)
- `src/lib/*` (cn, formatters)

## Risks / unknowns
- Final visual style tokens (radius/shadows/accent color) need a decision early.
- Chart implementation: custom SVG vs library (default: custom/simple).
