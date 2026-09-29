"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = (e: React.MouseEvent) => {
    const isDark = resolvedTheme === "dark"
    const nextTheme = isDark ? "light" : "dark"

    // Fallback for browsers that don't support View Transitions
    if (!document.startViewTransition) {
      setTheme(nextTheme)
      return
    }

    // Get the exact position of the button regardless of what page we are on
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    )

    const transition = document.startViewTransition(() => { setTheme(nextTheme) })

    // Provide dynamic coordinates to pure CSS
    document.documentElement.style.setProperty('--vt-x', `${x}px`);
    document.documentElement.style.setProperty('--vt-y', `${y}px`);
    document.documentElement.style.setProperty('--vt-r', `${endRadius}px`);
  }

  if (!mounted) {
    return (
      <button className="relative p-2 rounded-xl bg-secondary text-muted-foreground border border-border">
        <Sun className="h-4 w-4 opacity-0" />
      </button>
    )
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-xl bg-secondary text-muted-foreground hover:text-foreground transition-colors border border-border overflow-hidden"
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 top-2 left-2" />
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
