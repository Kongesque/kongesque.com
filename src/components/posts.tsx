"use client"

import type { MDXFileData } from "@/lib/blog"
import { PostItem } from "./post-item"

type PostsProps = {
  posts: MDXFileData[]
}

export function Posts({ posts }: PostsProps) {
  return (
    <div className="space-y-8 sm:space-y-4">
      {posts.map((item) => (
        <div key={item.slug}>
          <PostItem post={item} />
        </div>
      ))}
    </div>
  )
}
