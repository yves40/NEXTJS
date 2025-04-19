import { getPosts } from "@/lib/serverMethods/blog/postMethods";
import { getUserPost } from "@/lib/serverMethods/blog/postMethods";
import Link from "next/link"

export default async function Dashboard({params}) {

  const modulename = 'DASHBOARD # '
  const {userId} = await params;

  console.log(`${modulename} Dashboard for user : ${userId}`);
  const allPosts = await getPosts();
  const userPosts = await getUserPost(userId);

  return (
    <main className=" u-main-container u-padding-content-container">
      <h1 className=" text-3xl mb-5">Dashboard - Your articles</h1>
      <ul>
        { userPosts.map( (post, index) => (
            <li className="flex items-center mb-2 bg-slate-50 py-2 pl-4" key={index}>
              <Link className=" mr-auto underline underline-offset-2 text-violet-600" rel="stylesheet" href={`/article/${post.slug}`}>
                {post.title}
              </Link>
              <button>Delete</button>
              <Link href={`/dashboard/edit/${post.slug}`} className=" bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded mr-2">
                Edit
              </Link>
            </li>
          ))
        }
      </ul>
    </main>
  )
}
