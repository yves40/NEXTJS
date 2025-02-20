import React from 'react'
import Link from 'next/link';

async function blog() {

  const resp = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = await resp.json();

  return (
    <main className=' mt-12 ml-10'>
      <h1 className=' text-3xl font-bold mb-4'>Blog</h1>
      <p className=' text-lg mb-8'>Post récents</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        { posts.map( post => ( 
          <Link href={`/blog/${post.id}`} key={post.id} className="block p-4 bg-white shadow-lg rounded-lg
                       hover:bg-gray-200 transition duration-200">
            <h2 className=' text-xl mb-2 font-semibold'>{post.title}</h2>
            <p className=' text-gray-600'>{post.body.slice(0, 100)}</p>
          </Link>
        ))}
      </div>
    </main>
  )
}
export default blog;
