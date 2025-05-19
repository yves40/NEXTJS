import BlogCard from "@/components/BlogCard";
import { getPostsByAuthor } from "@/lib/serverMethods/blog/postMethods";


export const revalidate = 60;   // Check nextJS cache every minute

export default async function page({params}) {
  const {author} = await params;
  const postsData = await getPostsByAuthor(author);
  
  return (
    <main className=" u-main-container u-padding-content-container">
      <h1 className=" t-main-title">Posts created by {postsData.author.userName}</h1>
      <ul className=" u-articles-grid">
        {postsData.posts.length > 0 ? (
          postsData.posts.map(post => (
            <BlogCard key={post._id} post={post}></BlogCard>
          ))
        ) : ( <li>No articles written by this author</li> )
        }
      </ul>
    </main>
  )
}
