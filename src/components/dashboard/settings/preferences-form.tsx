"use client"

import { FormEvent, useState } from "react"

import { Button } from "@/components/ui/button"
import { userAccount } from "@/content/user"

type PreferenceKey = keyof typeof userAccount.preferences

type PreferenceState = Record<PreferenceKey, boolean>

export function PreferencesForm() {
  const [prefs, setPrefs] = useState<PreferenceState>({
    weeklySummary: userAccount.preferences.weeklySummary,
    productUpdates: userAccount.preferences.productUpdates,
    pushAlerts: userAccount.preferences.pushAlerts,
    darkMode: userAccount.preferences.darkMode,
  })
  const [status, setStatus] = useState<"idle" | "saving" | "success">("idle")

  function toggle(key: PreferenceKey): void {
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    setStatus("saving")
    setTimeout(() => setStatus("success"), 800)
  }

  return (
    <section className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">Preferences</h2>
        <p className="text-sm text-slate-500">
          Control when Pulseboard reaches out and which channels we use.
        </p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <PreferenceToggle
          label="Weekly summary"
          description="Receive a Monday digest of KPIs."
          active={prefs.weeklySummary}
          onChange={() => toggle("weeklySummary")}
        />
        <PreferenceToggle
          label="Product updates"
          description="Let us email you when new features launch."
          active={prefs.productUpdates}
          onChange={() => toggle("productUpdates")}
        />
        <PreferenceToggle
          label="Push alerts"
          description="Send urgent incidents to the mobile app."
          active={prefs.pushAlerts}
          onChange={() => toggle("pushAlerts")}
        />
        <PreferenceToggle
          label="Dark mode"
          description="Sync UI theme with your preference."
          active={prefs.darkMode}
          onChange={() => toggle("darkMode")}
        />

        <div className="flex items-center gap-3">
          <Button type="submit" disabled={status === "saving"}>
            {status === "saving" ? "Saving…" : "Save preferences"}
          </Button>
          {status === "success" ? (
            <span className="text-sm font-medium text-emerald-700">
              Preferences updated
            </span>
          ) : null}
        </div>
      </form>
    </section>
  )
}

type PreferenceToggleProps = {
  label: string
  description: string
  active: boolean
  onChange: () => void
}

function PreferenceToggle({
  label,
  description,
  active,
  onChange,
}: PreferenceToggleProps) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-sm font-medium text-slate-900">{label}</p>
        <p className="text-sm text-slate-500">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={active}
        onClick={onChange}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault()
            onChange()
          }
        }}
        className={`inline-flex h-6 w-11 items-center rounded-full border border-slate-300 px-0.5 transition ${
          active ? "bg-slate-900" : "bg-white"
        }`}
      >
        <span
          className={`inline-block h-5 w-5 rounded-full bg-white transition ${
            active ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  )
}

