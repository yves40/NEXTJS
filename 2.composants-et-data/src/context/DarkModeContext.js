"use client"

import { createContext, useEffect, useState } from "react"

export const DarkModeContext = createContext()

export function DarkModeProvider({children}) {

  const [theme, setTheme] = useState("light");
  // Monitor theme : useEffect called when theme is modified
  useEffect(() => {
    const root = window.document.documentElement;
    if(theme === 'dark')
      root.classList.add("dark");
    else
      root.classList.remove("dark");
  }, [theme])
  // Theme switch  
  function toggleTheme() {
    setTheme((prevTheme) => ( prevTheme === 'light' ? "dark" : "light"))
  }

  return (
    <DarkModeContext.Provider value={{theme, toggleTheme}}>
      {children}
    </DarkModeContext.Provider>
  )
}

