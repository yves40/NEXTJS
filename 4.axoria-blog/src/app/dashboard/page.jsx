import Link from "next/link"

export default async function Dashboard() {

  const modulename = 'DASHBOARD # '

  return (
    <main>
        <h1 className='u-main-container u-padding-content-container text-2xl text-blue-400'>Dashboard</h1>
        <p className='u-main-container u-padding-content-container'>Log in to access dashboard features</p>
    </main>
  )
}
