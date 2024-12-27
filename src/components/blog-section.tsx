import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { getPosts } from "@/lib/blog"
import Image from "next/image";


const posts = getPosts()
  .sort(
    (a, b) =>
      new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
  )
  .slice(0, 4)

  export function BlogSection() {
    return (
      <section className="mb-16 animate-fade-in-up">
        <h2 className="text-2xl font-bold flex items-center text-primary">
          <span className="text-accent mr-2">*</span>
          blog
        </h2>
  
        <div>
          {posts.map((post, index) => (
            <div key={index}>
              <Link
                href={`/blog/${post.slug}`}
                className="flex flex-row items-start gap-4 py-6 group"
              >
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl font-bold tracking-tight mb-2 mt-2 text-primary group-hover:text-accent leading-tight transition-colors duration-300">
                    {post.metadata.title}
                  </h2>
                  <p className="text-secondary line-clamp-2 text-base mb-4">
                    {post.metadata.description}
                  </p>
                  <time className="text-sm text-secondary">
                    {new Date(post.metadata.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </time>
                </div>
                <div className="w-24 sm:w-48 h-16 sm:h-32 relative rounded-md group-hover:rounded-lg transition-all duration-300 overflow-hidden shrink-0">
                  <Image
                    alt=""
                    fill
                    src={`https://www.kongesque.com/cover/${post.slug}.jpg`}
                    sizes="(max-width: 640px) 100vw, 192px"
                    className="group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </Link>
              {index < posts.length - 1 && <hr className="border-t border-line" />}
            </div>
          ))}
        </div>
  
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-secondary hover:underline hover:decoration-secondaryHover group"
        >
          all posts{" "}
          <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </Link>
      </section>
    );
  }
  