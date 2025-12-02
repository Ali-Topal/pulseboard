"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"

export function DangerZone() {
  const [message, setMessage] = useState<string | null>(null)

  function handleAction(action: "signout" | "delete") {
    setMessage(
      action === "signout"
        ? "Sign out triggered (placeholder)."
        : "Account deletion flow coming soon.",
    )
  }

  return (
    <section className="space-y-4 rounded-2xl border border-rose-200 bg-rose-50 p-6 text-rose-900 shadow-sm">
      <div>
        <h2 className="text-lg font-semibold">Danger zone</h2>
        <p className="text-sm text-rose-700">
          These actions are permanent. Double check before continuing.
        </p>
      </div>

      <div className="space-y-3">
        <Button
          variant="ghost"
          className="w-full justify-between border border-rose-200 bg-white/70 text-rose-900 hover:bg-white"
          onClick={() => handleAction("signout")}
        >
          Sign out of Pulseboard
          <span aria-hidden>→</span>
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-between border border-rose-300 bg-white/70 text-rose-900 hover:bg-white"
          onClick={() => handleAction("delete")}
        >
          Delete account
          <span aria-hidden>→</span>
        </Button>
        {message ? (
          <p className="text-sm font-medium text-rose-800">{message}</p>
        ) : null}
      </div>
    </section>
  )
}

