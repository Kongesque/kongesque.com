"use client"

import type { MDXFileData } from "@/lib/blog"
import { PostItem } from "./post-item"

type PostsProps = {
  posts: MDXFileData[]
}

export function Posts({ posts }: PostsProps) {
  return (
    <div>
      {posts.map((item, index) => (
        <div key={item.slug}>
          <PostItem
            post={item}
            isSelected={false}
            className={index === 0 ? "pt-0" : ""}
          />
          {index < posts.length - 1 && <hr className="border-t border-line" />}
        </div>
      ))}
    </div>
  )
}
