
import { getPost } from "@/lib/serverMethods/blog/postMethods"
import Link from "next/link";

export default async function page({params}) {

    const {slug} = await params;
    const post = await getPost(slug);

    return (
    <div>
        <main className="u-main-container u-padding-content-container">
            <h1 className=" text-4xl mb-3">{post.title}</h1>
            <p className=" mb-6">
                {post.tags.map( tag => (
                    <Link key={tag.slug} className=" mr-4 underline" href={`categories/tag/${tag.slug}`}>#{tag.name}</Link>
                )) }
            </p>
            {/* <p>{post.markdownArticle}</p> */}
            <div className="article-styles" dangerouslySetInnerHTML={{ __html: post.markdownHTMLResult}}></div>
        </main>
    </div>
    )
}
