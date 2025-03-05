import React from 'react'
import Link from 'next/link'

function layout({children}) {
  return (
    <div>
      <nav className=' flex gap-x-2 justify-center items-center my-8'>
        <Link className=' underline'href="/dashboard/entreprise">Dashboard Entreprise</Link>
        <Link className=' underline'href="/dashboard/rh">Dashboard RH</Link>
      </nav>
      {children}
    </div>
  )
}

export default layout