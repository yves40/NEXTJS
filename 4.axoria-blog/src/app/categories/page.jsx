import { getTags } from "@/lib/serverMethods/blog/tagMethods"
import Link from "next/link";


export const revalidate = 60;   // Check nextJS cache every minute

export default async function page() {

  const tags = await getTags();  
  return (
    <div className="u-main-container u-padding-content-container">
      <h1 className="t-main-title">Categories</h1>
      <p className="t-main-subtitle">Find articles by categories</p>
      <ul className="u-articles-grid">
        {tags.length > 0 ? (
          tags.map(tag => (
            <li key={tag._id} className="  bg-gray-100 border rounded shadow-md">
              <Link href={`/categories/tag/${tag.slug}`} className=" flex items-baseline p-4 pb-6">
                <span className="text-lg font-semibold underline mr-4">#{tag.name}</span>
                <span className=" ml-auto">Articles count : </span>
                <span className=" font-bold">{tag.postCount}</span>
              </Link>
            </li>
          ))
        ) : ( <li>No categories found</li>) }
      </ul>
    </div>
  )
}
