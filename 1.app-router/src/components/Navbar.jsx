import React from 'react'

function Navbar() {
  return (
    <nav className=' flex gap-x-2 justify-center items-center my-8'>
      <a className=' underline text-2xl text-green-700' href="/">Accueil</a>
      <a className=' underline' href="/blog">Blog</a>
      <a className=' underline'href="/dashboard">Dashboard</a>
      <a className=' underline'href="/contact">Contact</a>
    </nav>
  )
}

export default Navbar