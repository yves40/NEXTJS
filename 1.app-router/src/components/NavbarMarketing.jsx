 "use client"
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

function NavbarMarketing() {

  const pathname = usePathname(); // Track the URL content

  return (
    <nav className=' flex gap-x-2 justify-center items-center my-8'>
      <Link className=' text-green-700' href="/">Accueil</Link>
    </nav>
  )
}

export default NavbarMarketing