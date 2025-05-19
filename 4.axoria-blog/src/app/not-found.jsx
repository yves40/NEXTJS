import Link from "next/link"

export default function notfound() {
  return (
    <div className="flex flex-col grow pt-44 text-center bg-gray-700">
        <h1 className=" text-white text-4xl mb-4">404 - Not found</h1>
        <p className=" mb-2 text-red-500 underline">Could not find requested resource</p>
        <p className=" my-4 text-red-400 px-8">Please contact the site admin on 06.88.33.55.66<br/>
          You'll see he's very nice and will solve the problem in the best delay.
          Despite the fact that he's currently developing the next version of this outstanding application. 
          Anyway, if the 12 hours resolution engagement is not met, feel free to send an email 
          to y.t@gmol.eu to start a contract rule violation procedure, which will trigger a thorough examination 
          of all facts and most probably trigger a lawsuit.
        </p>
        <Link href="/" className="underline text-red-400 mb-10">Return Home</Link>
    </div>
  )
}
