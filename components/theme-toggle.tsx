"use client"

import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        <h3 className="text-sm font-medium text-foreground">Theme</h3>
        <p className="text-xs text-muted-foreground">Choose your preferred theme</p>
      </div>
      <div className="flex gap-1">
        <Button
          size="sm"
          variant={theme === "dark" ? "default" : "outline"}
          onClick={() => setTheme("dark")}
          className={`w-10 h-10 p-0 ${
            theme === "dark" ? "bg-orange-500 hover:bg-orange-600 text-white" : "hover:bg-muted"
          }`}
        >
          <Moon className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          variant={theme === "light" ? "default" : "outline"}
          onClick={() => setTheme("light")}
          className={`w-10 h-10 p-0 ${
            theme === "light" ? "bg-orange-500 hover:bg-orange-600 text-white" : "hover:bg-muted"
          }`}
        >
          <Sun className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
