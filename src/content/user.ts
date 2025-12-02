export type UserProfile = {
  name: string
  email: string
  title: string
  avatarInitials: string
}

export type UserPreferences = {
  weeklySummary: boolean
  productUpdates: boolean
  pushAlerts: boolean
  darkMode: boolean
}

export type UserAccount = {
  profile: UserProfile
  preferences: UserPreferences
}

export const userAccount: UserAccount = {
  profile: {
    name: "Jordan Avery",
    email: "jordan.avery@example.com",
    title: "Operations Lead",
    avatarInitials: "JA",
  },
  preferences: {
    weeklySummary: true,
    productUpdates: false,
    pushAlerts: true,
    darkMode: false,
  },
}

