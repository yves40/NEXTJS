
import Link from "next/link"

export default function Navbar() {
  return (
    // u-main-container is defined in globals.css 
    <nav className=" fixed w-full bg-slate-50 border-b border-b-zinc-300">
      <div className="u-main-container flex py-4">
          <Link href="/" className=" mr-2 text-zinc-900">AXORIA</Link>
          <Link href="/categories" className=" mx-2 text-zinc-900 mr-auto">Categories</Link>
          <Link href="/dashboard/create" className=" mx-2 text-zinc-900">Add an article</Link>
        </div>
    </nav>
  )
}
