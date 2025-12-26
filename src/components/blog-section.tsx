import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { getPosts } from "@/lib/blog"
import { PostItem } from "./post-item"


export function BlogSection() {
  const posts = getPosts()
    .sort(
      (a, b) =>
        new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
    )
    .slice(0, 4)

  return (
    <section className="my-20 animate-fade-in-up">
      <h2 className="w-fit rounded-md bg-blockBg px-1.5 py-1 text-sm text-secondary">
        Blog
      </h2>

      <div>
        {posts.map((post, index) => (
          <div key={index}>
            <PostItem post={post} />
            {index < posts.length - 1 && <hr className="border-t border-line" />}
          </div>
        ))}
      </div>

      <Link
        href="/blog"
        className="inline-flex items-center gap-1 text-sm text-secondary hover:underline hover:text-accent group"
      >
        More posts{" "}
        <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
      </Link>
    </section>
  );
}
