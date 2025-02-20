import React from 'react'
import Link from 'next/link';

async function page({params}) {

  const {id} = await params;

  const resp = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  const post = await resp.json();

  return (
    <div className=' text-4xl text-red-600 m-20'>
      <p className=' font-bold mb-4'>{post.title}</p>
      <p className=' text-sm font-normal  mb-4'>{post.body}</p>
      <Link href="/blog" className=' text-gray-600 text-[1.3rem] hover:underline'>&#8592; Retour aux blogs</Link>
    </div>
  )
}

export default page