import BlogCard from "@/components/BlogCard";
import { getPostsByTag } from "@/lib/serverMethods/blog/postMethods"

export default async function page({params}) {
  const {tag} = await params;
  const posts = await getPostsByTag(tag);
  console.log(posts);
  
  return (
    <main className=" u-main-container u-padding-content-container">
      <h1 className=" t-main-title">Posts with tag #{tag}</h1>
      <ul className=" u-articles-grid">
        {posts.length > 0 ? (
          posts.map(post => (
            <BlogCard key={post._id} post={post}></BlogCard>
          ))
        ) : ( <li>No articles found with this tag</li> )
        }
      </ul>
    </main>
  )
}
