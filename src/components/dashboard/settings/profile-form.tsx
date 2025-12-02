"use client"

import { FormEvent, useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { userAccount } from "@/content/user"
import { validateEmail, validateRequired } from "@/lib/validators"

type FormState = {
  name: string
  email: string
  title: string
}

type FormErrors = Partial<Record<keyof FormState, string>>

export function ProfileForm() {
  const [form, setForm] = useState<FormState>({
    name: userAccount.profile.name,
    email: userAccount.profile.email,
    title: userAccount.profile.title,
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">(
    "idle",
  )

  function handleChange(
    field: keyof FormState,
    value: string,
  ): void {
    setForm((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  function validate(): boolean {
    const nextErrors: FormErrors = {}
    if (!validateRequired(form.name)) {
      nextErrors.name = "Name is required."
    }
    if (!validateEmail(form.email)) {
      nextErrors.email = "Enter a valid email address."
    }
    if (!validateRequired(form.title)) {
      nextErrors.title = "Role/title is required."
    }
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    if (!validate()) return
    setStatus("saving")
    setTimeout(() => {
      const shouldFail = form.email.endsWith("@invalid.com")
      setStatus(shouldFail ? "error" : "success")
    }, 900)
  }

  const avatarInitials = userAccount.profile.avatarInitials

  return (
    <section className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Profile</h2>
          <p className="text-sm text-slate-500">
            Update basic account information for teammates to recognize you.
          </p>
        </div>
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-900 text-lg font-semibold text-white">
          {avatarInitials}
        </div>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700" htmlFor="name">
            Full name
          </label>
          <Input
            id="name"
            name="name"
            value={form.name}
            onChange={(event) => handleChange("name", event.target.value)}
            aria-invalid={Boolean(errors.name)}
          />
          {errors.name ? (
            <p className="text-sm text-rose-600">{errors.name}</p>
          ) : null}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700" htmlFor="email">
            Email address
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={(event) => handleChange("email", event.target.value)}
            aria-invalid={Boolean(errors.email)}
          />
          {errors.email ? (
            <p className="text-sm text-rose-600">{errors.email}</p>
          ) : null}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700" htmlFor="title">
            Role / Title
          </label>
          <Input
            id="title"
            name="title"
            value={form.title}
            onChange={(event) => handleChange("title", event.target.value)}
            aria-invalid={Boolean(errors.title)}
          />
          {errors.title ? (
            <p className="text-sm text-rose-600">{errors.title}</p>
          ) : null}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            type="submit"
            disabled={status === "saving"}
          >
            {status === "saving" ? "Saving…" : "Save changes"}
          </Button>
          {status === "success" ? (
            <span className="text-sm font-medium text-emerald-700">
              Profile updated
            </span>
          ) : null}
          {status === "error" ? (
            <span className="text-sm font-medium text-rose-600">
              Something went wrong — try again.
            </span>
          ) : null}
        </div>
      </form>
    </section>
  )
}

