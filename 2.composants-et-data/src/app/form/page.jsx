"use client"  // Must be specified to use WEB apis on client

import { useState } from "react"

function page() {

  const [inputValue, setInputValue] = useState("")

  return (
    <div className=" m-10">
      <input type="text" className="border border-gray-600 mb-2 p-2" 
          value={inputValue}
          onChange={ e => setInputValue(e.target.value)}
          placeholder="Entrez du texte"/>
      <p>Tu as écrit ! {inputValue}</p>
    </div>
  )
}

export default page