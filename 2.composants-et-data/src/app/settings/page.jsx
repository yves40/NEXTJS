"use client"

import { useContext } from "react"
import { DarkModeContext } from "@/context/DarkModeContext"

function page() {

  const {theme, toggleTheme} = useContext(DarkModeContext)

  return (
    <div>
      <h1 className=" mb-4">Paramètres</h1>
      <button className='top-5 right-5 p-5 border rounded-2xl border-violet-500'
      onClick={toggleTheme}>
      Mode: {theme}
    </button>
    </div>
  )
}

export default page