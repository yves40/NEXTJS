"use client"

import { useContext } from "react"
import { DarkModeContext } from "@/context/DarkModeContext"

function SwitchThemeBtn() {

  const {theme, toggleTheme} = useContext(DarkModeContext)

  return (
    <button className='top-5 fixed right-5 p-5 border rounded-2xl border-violet-500'
      onClick={toggleTheme}>
      Mode: {theme}
    </button>
  )
}

export default SwitchThemeBtn