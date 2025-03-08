import React from 'react'
import Link from 'next/link';
import { getPost } from '@/lib/serveraction';

async function page({params}) {

  const {id} = await params;
  const post = await getPost(id);

  return (
    <div className=' text-4xl text-red-600 m-20'>
      <p className=' font-bold mb-4'>{post.title}</p>
      <p className=' text-sm font-normal  mb-4'>{post.body}</p>
      <Link href="/blog" className=' text-gray-600 text-[1.3rem] hover:underline'>&#8592; Retour aux blogs</Link>
    </div>
  )
}

export default page