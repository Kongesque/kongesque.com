import { notFound } from "next/navigation";
import { MDX } from "./mdx";
import { getPostBySlug } from "@/lib/blog";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const slug = (await params).slug;
  const post = getPostBySlug(slug);
  if (!post) {
    return;
  }

  const publishedTime = formatDate(post.metadata.date);

  return {
    title: post.metadata.title,
    description: post.metadata.description,
    openGraph: {
      title: post.metadata.title,
      description: post.metadata.description,
      publishedTime,
      type: "article",
      url: `https://www.kongesque.com/blog/${post.slug}`,
      images: [
        {
          url: `https://www.kongesque.com/og/blog?title=${post.metadata.title}`,
        },
      ],
    },
    twitter: {
      title: post.metadata.title,
      description: post.metadata.description,
      card: "summary_large_image",
      creator: "@kongesque",
      images: [
        `https://www.kongesque.com/og/blog?title=${post.metadata.title}&top=${publishedTime}`,
      ],
    },
  };
}

export default async function Post({ params }: PageProps) {
  const slug = (await params).slug;
  const post = getPostBySlug(slug);
  if (!post) {
    notFound();
  }

  return (
    <section className="animate-fade-in-up rounded-lg">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.metadata.title,
            datePublished: post.metadata.date,
            dateModified: post.metadata.date,
            description: post.metadata.description,
            image: `https://kongesque.com/og/blog?title=${post.metadata.title}&top=${formatDate(post.metadata.date)}`,
            url: `https://kongesque.com/blog/${post.slug}`,
            author: {
              "@type": "Person",
              name: "Kongesque",
            },
          }),
        }}
      />

      <img
        src={`https://www.kongesque.com/cover/${slug}.jpg`}
        className="w-full h-72 object-cover mb-8 rounded-lg"
      />
      <div className="px-4">
        <h1 className="text-4xl font-bold mb-6 text-primary">
          <span className="text-accent mr-2">*</span>
          {post.metadata.title}
        </h1>

        <div className="mb-6 flex items-center justify-between text-sm text-secondary">
          <span>{formatDate(post.metadata.date)}</span>
        </div>

        <article className="prose prose-invert max-w-none prose-headings:text-primary prose-a:text-primary hover:prose-a:underline">
          <MDX source={post.content} />
        </article>
      </div>
    </section>
  );
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}