 "use client"
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

function Navbar() {

  const pathname = usePathname(); // Track the URL content

  return (
    <nav className=' flex gap-x-2 justify-center items-center my-8'>
      <Link className=' text-green-700' href="/">Accueil</Link>
      <Link className={` ${pathname === "/blog" && "bg-red-700 text-white p-2 rounded-md"}`} href="/blog">Blog</Link>
      <Link className={` ${pathname === "/dashboard" && "bg-red-700 text-white p-2 rounded-md"}`} href="/dashboard">Dashboard</Link>
      <Link className={` ${pathname === "/contact" && "bg-red-700 text-white p-2 rounded-md"}`}  href="/contact">Contact</Link>
      <Link className={` ${pathname === "/users" && "bg-red-700 text-white p-2 rounded-md"}`}  href="/users">Utilisateurs</Link>
      <Link className={` ${pathname === "/discover" && "bg-red-700 text-white p-2 rounded-md"}`}  href="/discover">Infos</Link>
    </nav>
  )
}

export default Navbar