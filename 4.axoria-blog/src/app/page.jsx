import Link from "next/link"

const fakeposts = [
  {
    author: 'John Doe',
    title: '5 CSS tricks'
  },
  {
    author: 'Victor Wallas',
    title: 'How to code a Navbar'
  },
  {
    author: 'Jean Dupont',
    title: 'How to setup TS'
  },
  {
    author: 'Isabelle Sodernous',
    title: 'Launching satellites is not a small business'
  },
  {
    author: 'Yves Oracleous',
    title: 'Proprietary software cannot be as good as open source software'
  },
]

export default async function Home() {

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
            fakeposts.map( (post, id) => (
              <li key={id} className=" rounded-sm shadow-md hover:shadow-xl border hover:border-zinc-300">
                <div className=" pt-5 px-5 pb-7">
                  <div className="flex items-baseline gap-x-4 text-xs">
                    <time dateTime={new Date().toISOString()} className=" text-gray-500 text-sm">
                      {new Date().toLocaleDateString("en-EN", {
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                      })}
                    </time>
                    <Link href={`/categories/author/${post.author}`} className=" ml-auto text-base text-gray-70
                      hover:text-gray-600 whitespace-nowrap truncate">
                      {post.author}
                    </Link>
                  </div>
                  <Link href={`/article/${post.title}`} className=" inline-block mt-6 font-semibold text-zinc-800
                    hover:text-zinc-600">{post.title}</Link>
                </div>
              </li>
            ))
          }
      </ul>
    </div>
  )
}
