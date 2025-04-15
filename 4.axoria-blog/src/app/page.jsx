import Link from "next/link"
import { getPosts } from "@/lib/serverMethods/blog/postMethods";
import { connectToDB } from "@/lib/utils/db/connectToDB";
import BlogCard from "@/components/BlogCard";

export default async function Home() {

  connectToDB();
  const posts = await getPosts(); // Display current posts

  return (
    // u-main-container is defined in globals.css 
    <div className="u-main-container u-padding-content-container">
      <h1 className="t-main-title">Stay up to date with AXORIA</h1>
      <p className="t-main-subtitle">Tech news and useful knowledge about the web best practices.
        This is the mandatory basic knowledge you must have to pretend being a nextJS developer!
      </p>
      <p className=" mr-4 text-md text-zinc-900">Latest articles</p>
      <ul className="u-articles-grid">
          {
            posts.map( (post, id) => (
              <BlogCard post={post} key={id}></BlogCard>
            ))
          }
      </ul>
    </div>
  )
}
