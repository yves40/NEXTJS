"use client"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function NavbarDropdown() {

    const [isOpen, setIsOpen ] = useState(false);
    const dropDownRef = useRef();

    function toggleDropdown() {
        setIsOpen(!isOpen);
    }
    function handleLogout() {

    }

    return (
        <div ref={dropDownRef} className=" relative">
            <button className="flex" onClick={toggleDropdown}>
                <Image src='/icons/user.svg' alt="" width={24} height={24}></Image>
            </button>
            { isOpen && (
                <ul className=" absolute right-0 top-10 w-[250px] border-b border-x border-zinc-300">
                    <li className=" bg-slate-50 hover:bg-slate-200 border-b border-slate-300">
                        <Link href='/dashboard' className="block p-2">Dashboard</Link>
                    </li>
                    <li className=" bg-slate-50 hover:bg-slate-200">
                        <button className=" w-full p-2 text-left" onClick={handleLogout}>Sign out</button>
                    </li>
                </ul>
            )}
        </div>
    )
}
