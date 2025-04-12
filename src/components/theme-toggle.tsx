"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 relative"
      aria-label="Toggle theme"
    >
      <Sun className="h-4 w-4 absolute transition-all dark:opacity-0" />
      <Moon className="h-4 w-4 absolute opacity-0 transition-all dark:opacity-100" />
    </button>
  )
}