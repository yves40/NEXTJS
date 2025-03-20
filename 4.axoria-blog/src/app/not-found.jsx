import Link from "next/link"

export default function notfound() {
  return (
    <div className=" pt-44 text-center">
        <h1 className=" text-4xl mb-4">404 - Not found</h1>
        <p className=" mb-2">Could not find requested resource</p>
        <Link href="/" className="underline">Return Home</Link>
    </div>
  )
}
