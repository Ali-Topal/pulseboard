import { DangerZone } from "@/components/dashboard/settings/danger-zone"
import { PreferencesForm } from "@/components/dashboard/settings/preferences-form"
import { ProfileForm } from "@/components/dashboard/settings/profile-form"

export default function DashboardSettingsPage() {
  return (
    <div className="space-y-10">
      <section className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
          Settings
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Manage your account
        </h1>
        <p className="text-base text-slate-600">
          Update personal details, adjust notification preferences, and handle
          sensitive account actions.
        </p>
      </section>

      <div className="space-y-10">
        <ProfileForm />
        <PreferencesForm />
        <DangerZone />
      </div>
    </div>
  )
}

