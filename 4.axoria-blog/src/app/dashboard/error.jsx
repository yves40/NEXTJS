"use client"

import Link from "next/link"

export default function error() {
  return (
    <div className=" pt-44 text-center">
        <h1 className=" text-4xl mb-4">Dashboard load error</h1>
        <Link href="/" className="underline">Return Home</Link>
    </div>
  )
}
