import { notFound } from "next/navigation";
import { MDX } from "./mdx";
import { getPostBySlug } from "@/lib/blog";
import CopyLinkButton from '@/components/share-button';
import { Footer } from '@/components/footer';
import Image from "next/image";

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
              url: "https://www.kongesque.com",
              sameAs: [
                "https://github.com/Kongesque",
                "https://twitter.com/kongesque"
              ]
            },
          }),
        }}
      />

      <Image
        src={`/cover/${slug}.jpg`}
        alt={post.metadata.title}
        width={1200}
        height={630}
        priority
        className="w-full h-64 object-cover rounded-lg"
      />

      <div className="flex flex-row my-6 gap-4 items-start sm:items-center justify-between px-2">
        <div className="flex flex-row gap-10 sm:gap-20">
          <div className="flex flex-col items-start text-sm text-secondary gap-1">
            <span className="font-bold text-xs">Written by</span>
            <a href="/blog" className="text-secondary hover:underline">Kongesque</a>
          </div>
          <div className="flex flex-col items-start text-sm text-secondary gap-1">
            <span className="font-bold text-xs">Published on</span>
            <span>{formatDate(post.metadata.date)}</span>
          </div>
        </div>
        <div className="flex justify-center">
          <CopyLinkButton title={post.metadata.title} slug={post.slug} />
        </div>
      </div>


      <hr className="border-t-2 border-line mb-8" />

      <div className="px-2">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-primary">
          {post.metadata.title}
        </h1>

        <article className="prose prose-invert max-w-none prose-headings:text-primary prose-a:text-primary hover:prose-a:underline mb-8">
          <MDX source={post.content} />
        </article>
        <Footer />
      </div>

    </section>
  );
}


function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
