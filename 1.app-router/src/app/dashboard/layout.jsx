import React from 'react'

function layout({children}) {
  return (
    <div>
      <nav className=' flex gap-x-2 justify-center items-center my-8'>
        <a className=' underline'href="/dashboard/entreprise">Dashboard Entreprise</a>
        <a className=' underline'href="/dashboard/rh">Dashboard RH</a>
      </nav>
      {children}
    </div>
  )
}

export default layout