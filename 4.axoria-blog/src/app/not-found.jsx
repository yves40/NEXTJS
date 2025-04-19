import Link from "next/link"

export default function notfound() {
  return (
    <div className=" pt-44 text-center bg-gray-700">
        <h1 className=" text-white text-4xl mb-4">404 - Not found</h1>
        <p className=" mb-2 text-red-500">Could not find requested resource</p>
        <p className=" my-4 text-red-400">Please contact the site admin on 06.88.33.55.66</p>
        <Link href="/" className="underline text-red-400 mb-10">Return Home</Link>
    </div>
  )
}
