"use client"

import Link from "next/link"
import NavbarDropdown from "./NavbarDropdown";
import { useAuth } from "@/app/AuthContext";
import Image from "next/image";

const modulename = 'Navbar.jsx # ';

export default function Navbar() {

  const {isAuthenticated} = useAuth();
  console.log(`${modulename} ${isAuthenticated.isConnected}` );
  

  return (
    // u-main-container is defined in globals.css 
    <nav className=" fixed w-full bg-slate-50 border-b border-b-zinc-300">
      <div className="u-main-container flex py-4">
          <Link href="/" className=" mr-2 text-zinc-900">AXORIA</Link>
          <Link href="/categories" className=" mx-2 text-zinc-900 mr-auto">Categories</Link>
          {isAuthenticated.loading && (
            <div>
              <Image src="/icons/loader.svg" width={24} height={24} alt=""></Image>
            </div>
          )}
          {isAuthenticated.isConnected && (
            <>
              <Link href="/dashboard/create" className=" mx-2 text-zinc-900">Add an article</Link>
              {/* <h2 className=" mx-2 text-blue-800">{sessionStatus.userName}</h2> */}
              <NavbarDropdown userId={isAuthenticated.userId}></NavbarDropdown>
            </>
          )}
          {!isAuthenticated.isConnected && !isAuthenticated.loading && (
            <>
              <Link href="/signin" className=" mx-2 text-zinc-900">Sign In</Link>
              <Link href="/signup" className=" mx-2 text-zinc-900">Sign Up</Link>
            </>
          )}
        </div>
    </nav>
  )
}
