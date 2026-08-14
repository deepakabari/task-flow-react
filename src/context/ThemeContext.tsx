import { createContext, useContext, useState, type ReactNode } from "react"

type Theme = "light" | "dark"

type ThemeContextType = { theme: Theme; toggleTheme: () => void }

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

type ThemeProviderProps = {
  children: ReactNode
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>("light")

  function toggleTheme() {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within ThemeProvider")
  }
  return context
}