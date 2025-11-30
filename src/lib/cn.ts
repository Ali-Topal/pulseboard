type ClassValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | ClassDictionary
  | ClassArray
type ClassDictionary = Record<string, boolean | undefined | null>
type ClassArray = ClassValue[]

/**
 * Lightweight utility that mimics clsx/twMerge behavior without extra deps.
 */
export function cn(...inputs: ClassValue[]): string {
  const classes: string[] = []

  for (const input of inputs) {
    if (!input) continue

    if (typeof input === "string" || typeof input === "number") {
      classes.push(String(input))
      continue
    }

    if (Array.isArray(input)) {
      if (input.length) {
        const inner = cn(...input)
        if (inner) classes.push(inner)
      }
      continue
    }

    if (typeof input === "object") {
      for (const [key, value] of Object.entries(input)) {
        if (value) classes.push(key)
      }
    }
  }

  return Array.from(new Set(classes)).join(" ")
}

