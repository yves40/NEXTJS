import Image from "next/image";
import Link from "next/link";

export default function BlogCard({post, id}) {
  
  const fakeauthor = 'John Doe';  
  let imagePath = '';
  if(post.imageFile.length !== 0 ) {  // Possibly no image
      imagePath = `/blogimages/${post.imageFile}`;
  }

  return (
    <li key={id} className=" rounded-sm shadow-md hover:shadow-xl border hover:border-zinc-300">
            { (imagePath !== '') &&  
              <Link href={`/article/${post.slug}`}>
                    <Image src={imagePath} alt="Article image"
                        width={340}
                        height={190}
                        className="border-none w-full rounded-t-sm object-cover my-2"/>
            </Link>
            }
      <div className=" pt-5 px-5 pb-7">
        <div className="flex items-baseline gap-x-4 text-xs">
          <time dateTime={post.createdAt} className=" text-gray-500 text-sm">
            {new Date(post.createdAt).toLocaleDateString("en-EN", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit"
            })}
          </time> 
          <Link href={`/categories/author/${fakeauthor}`} className=" ml-auto text-base text-gray-70
            hover:text-gray-600 whitespace-nowrap truncate">
            {fakeauthor}
          </Link>
        </div>
        <Link href={`/article/${post.slug}`} className=" inline-block mt-6 font-semibold text-zinc-800
          hover:text-zinc-600">{post.title}</Link>
        {/* <p className="">{post.markdownArticle}</p> */}
    </div>
  </li>
)
}
