"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

// Suppress the React 19 false positive warning caused by next-themes inline script
if (process.env.NODE_ENV === "development") {
  const currentError = console.error as unknown as {
    (...args: unknown[]): void
    __nextThemesPatched?: boolean
  }

  if (!currentError.__nextThemesPatched) {
    const origError = console.error
    const patchedError = (...args: unknown[]) => {
      if (typeof args[0] === "string" && args[0].includes("Encountered a script tag")) {
        return
      }
      origError(...args)
    }
    patchedError.__nextThemesPatched = true
    console.error = patchedError
  }
}

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

