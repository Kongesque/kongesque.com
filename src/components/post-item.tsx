import Image from "next/image";
import { type MDXFileData } from "@/lib/blog";
import Link from "next/link";

type PostItemProps = {
  post: MDXFileData;
  isSelected?: boolean;
};

export function PostItem({ post, isSelected }: PostItemProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="flex flex-row items-start gap-4 py-5 group"
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
          src={`/cover/${post.slug}.jpg`}
          sizes="(max-width: 640px) 100vw, 192px"
        />
      </div>
    </Link>
  );
}
