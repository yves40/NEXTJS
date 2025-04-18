
import Link from "next/link"
import { sessionInfo } from "@/lib/serverMethods/session/sessionMethods"
import NavbarDropdown from "./NavbarDropdown";

const modulename = 'UIX # ';

export default async function Navbar() {

  const sessionStatus = await sessionInfo();

  return (
    // u-main-container is defined in globals.css 
    <nav className=" fixed w-full bg-slate-50 border-b border-b-zinc-300">
      <div className="u-main-container flex py-4">
          <Link href="/" className=" mr-2 text-zinc-900">AXORIA</Link>
          <Link href="/categories" className=" mx-2 text-zinc-900 mr-auto">Categories</Link>
          { sessionStatus.success ? (
            <>
              <Link href="/dashboard/create" className=" mx-2 text-zinc-900">Add an article</Link>
              <h2 className=" mx-2 text-blue-800">{sessionStatus.userName}</h2>
              <NavbarDropdown userId={sessionStatus.userId}></NavbarDropdown>
            </>
          ) : ( 
            <>
              <Link href="/signin" className=" mx-2 text-zinc-900">Sign In</Link>
              <Link href="/signup" className=" mx-2 text-zinc-900">Sign Up</Link>
            </>
          )}
        </div>
    </nav>
  )
}
