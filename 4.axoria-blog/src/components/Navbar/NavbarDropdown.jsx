"use client"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { logout, isPrivatePage } from "@/lib/serverActions/session/sessionServerAction"
import { useAuth } from "@/app/AuthContext"

const modulename = "UIX # ";

export default function NavbarDropdown({userId}) {
    
    const [isOpen, setIsOpen ] = useState(false);
    const dropDownRef = useRef();
    const router = useRouter();
    const {setIsAuthenticated} = useAuth();

    // Close Dropdown
    function closeDropDown() {
        setIsOpen(false);
    }
    // Handle a click outside the dropdown
    useEffect( () => {
        document.addEventListener("click", handleClickOutside);
        function handleClickOutside(event) {
            if(!dropDownRef.current.contains(event.target)) {
                closeDropDown();
            }
        }
        return () => {
            document.removeEventListener("click", handleClickOutside);
        }
    }, [])
    // Switch dropdown status
    function toggleDropdown() {
        setIsOpen(!isOpen);
    }
    // Manage logout
    async function handleLogout() {
        const result = await logout();
        if(result.success) {
            setIsAuthenticated({loading: false, isConnected: false, userId: null });
            if(isPrivatePage(window.location.pathname)) {
                router.push('/signin');
            }
        }
    }    

    return (
        <div ref={dropDownRef} className=" relative">
            <button className="flex" onClick={toggleDropdown}>
                <Image src='/icons/user.svg' alt="" width={24} height={24}></Image>
            </button>
            { isOpen && (
                <ul className=" absolute right-0 top-10 w-[250px] border-b border-x border-zinc-300">
                    <li className=" bg-slate-50 hover:bg-slate-200 border-b border-slate-300" >
                        <Link href={`/dashboard/${userId}`} className="block p-2" onClick={closeDropDown}>Dashboard</Link>
                    </li>
                    <li className=" bg-slate-50 hover:bg-slate-200">
                        <button className=" w-full p-2 text-left" onClick={handleLogout}>Sign out</button>
                    </li>
                </ul>
            )}
        </div>
    )
}
