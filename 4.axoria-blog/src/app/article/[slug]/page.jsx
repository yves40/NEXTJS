
import { getPost } from "@/lib/serverMethods/blog/postMethods"
import Image from "next/image";
import Link from "next/link"
import "./article-styles.css"
import 'prism-themes/themes/prism-vsc-dark-plus.css'

export default async function page({params}) {

    const {slug} = await params;
    const post = await getPost(slug);
    let imagePath = '';
    if(post.imageFile.length !== 0 ) {
        imagePath = `/blogimages/${post.imageFile}`;
    }

    return (
    <div>
        <main className="u-main-container u-padding-content-container">
            <h1 className=" text-4xl mb-3">{post.title}</h1>
            <Link href={`/categories/author/${post.author.normalizedUserName}`} className="text-2xl italic">
                By, {post.author.userName}
            </Link>
            { (imagePath !== '') &&  
                    <Image src={imagePath} alt="Article image"
                        width={1280}
                        height={720}
                        className="border-none rounded-2xl  my-2"/>
            }
            <p className=" mb-6">
                {post.tags.map( tag => (
                    <Link key={tag.slug} className=" mr-4 underline" href={`/categories/tag/${tag.slug}`}>#{tag.name}</Link>
                )) }
            </p>
            {/* <p>{post.markdownArticle}</p> */}
            <div className="article-styles" dangerouslySetInnerHTML={{ __html: post.markdownHTMLResult}}></div>
        </main>
    </div>
    )
}
