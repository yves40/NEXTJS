"use client"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { logout } from "@/lib/serverActions/session/sessionServerAction"

export default function NavbarDropdown() {

    const [isOpen, setIsOpen ] = useState(false);
    const dropDownRef = useRef();

    // Close Dropdown
    function closeDropDown() {
        setIsOpen(false);
    }
    // Handle a click outside the dropdown
    useEffect( () => {
        function handleClickOutside(event) {
            if(!dropDownRef.current.contains(event.target)) {
                closeDropDown();
            }
        }
        return () => {
            document.removeEventListener("click", handleClickOutside);
        }
        document.addEventListener("click", handleClickOutside);
    }, [])
    // Switch dropdown status
    function toggleDropdown() {
        setIsOpen(!isOpen);
    }
    // Manage logout
    async function handleLogout() {
        await logout();
    }

    return (
        <div ref={dropDownRef} className=" relative">
            <button className="flex" onClick={toggleDropdown}>
                <Image src='/icons/user.svg' alt="" width={24} height={24}></Image>
            </button>
            { isOpen && (
                <ul className=" absolute right-0 top-10 w-[250px] border-b border-x border-zinc-300">
                    <li className=" bg-slate-50 hover:bg-slate-200 border-b border-slate-300" >
                        <Link href='/dashboard' className="block p-2" onClick={closeDropDown}>Dashboard</Link>
                    </li>
                    <li className=" bg-slate-50 hover:bg-slate-200">
                        <button className=" w-full p-2 text-left" onClick={handleLogout}>Sign out</button>
                    </li>
                </ul>
            )}
        </div>
    )
}
