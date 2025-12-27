import { PostsList } from "@/components/posts-list"
import { getPosts } from "@/lib/blog"
import { Metadata } from "next"

export default async function BlogPage() {
  const posts = getPosts().sort(
    (a, b) =>
      new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
  )

  return (
    <main className="animate-fade-in-up">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-primary">
        Blog
      </h1>

      <PostsList posts={posts} />
    </main>
  )
}

export const metadata: Metadata = {
  title: "Blog",
  description: "Writings on programming, computer science, and more.",
  openGraph: {
    images: [
      {
        url: "https://www.kongesque.com/og/home?title=blog",
      },
    ],
  },
}
