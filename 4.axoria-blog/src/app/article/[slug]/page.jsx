
import { getPost } from "@/lib/serverMethods/blog/postMethods"
import Image from "next/image";
import Link from "next/link"
import "./article-styles.css"
import 'prism-themes/themes/prism-vsc-dark-plus.css'

export default async function page({params}) {

    const {slug} = await params;
    const post = await getPost(slug);
    const imagePath = `/blogimages/${post.imageFile}`;

    return (
    <div>
        <main className="u-main-container u-padding-content-container">
            <h1 className=" text-4xl mb-3">{post.title}</h1>
            <h2 className=" mx-2  mb-2 font-semibold italic text-2xl">By..., {post.author}</h2>
            <Image src={imagePath} alt="The speed"
                width={500}
                height={250}
                className=" border-none rounded-2xl  object-cover"/>
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
