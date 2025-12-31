import { notFound } from "next/navigation";
import { MDX } from "./mdx";
import { getPostBySlug } from "@/lib/blog";
import CopyLinkButton from '@/components/share-button';
import { Footer } from '@/components/footer';
import Image from "next/image";
import type { Metadata } from "next";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const baseUrl = "https://www.kongesque.com";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const slug = (await params).slug;
  const post = getPostBySlug(slug);
  if (!post) {
    return {};
  }

  const publishedTime = post.metadata.date;
  const ogImageUrl = `${baseUrl}/og/blog?title=${encodeURIComponent(post.metadata.title)}&top=${encodeURIComponent(formatDate(publishedTime))}`;

  return {
    title: post.metadata.title,
    description: post.metadata.description,
    keywords: ["blog", "kongesque", post.metadata.title.toLowerCase()],
    authors: [{ name: "Kongesque", url: baseUrl }],
    alternates: {
      canonical: `${baseUrl}/blog/${post.slug}`,
    },
    robots: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
    openGraph: {
      title: post.metadata.title,
      description: post.metadata.description,
      publishedTime,
      modifiedTime: publishedTime,
      type: "article",
      url: `${baseUrl}/blog/${post.slug}`,
      siteName: "kongesque",
      locale: "en_US",
      authors: ["Kongesque"],
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: post.metadata.title,
        },
      ],
    },
    twitter: {
      title: post.metadata.title,
      description: post.metadata.description,
      card: "summary_large_image",
      creator: "@kongesque",
      site: "@kongesque",
      images: [ogImageUrl],
    },
  };
}

// Word count helper for schema
function getWordCount(content: string): number {
  return content.split(/\s+/).filter(Boolean).length;
}

export default async function Post({ params }: PageProps) {
  const slug = (await params).slug;
  const post = getPostBySlug(slug);
  if (!post) {
    notFound();
  }

  const wordCount = getWordCount(post.content);
  const ogImageUrl = `${baseUrl}/og/blog?title=${encodeURIComponent(post.metadata.title)}&top=${encodeURIComponent(formatDate(post.metadata.date))}`;

  // BlogPosting JSON-LD
  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/blog/${post.slug}`,
    },
    headline: post.metadata.title,
    description: post.metadata.description,
    image: ogImageUrl,
    url: `${baseUrl}/blog/${post.slug}`,
    datePublished: post.metadata.date,
    dateModified: post.metadata.date,
    wordCount,
    articleSection: "Blog",
    inLanguage: "en-US",
    author: {
      "@type": "Person",
      name: "Kongesque",
      url: baseUrl,
      sameAs: [
        "https://github.com/Kongesque",
        "https://twitter.com/kongesque",
        "https://x.com/kongesque",
        "https://www.youtube.com/@Kongesque",
        "https://www.reddit.com/user/kongesque"
      ],
      jobTitle: "Developer, Cardist, Maker"
    },
    publisher: {
      "@type": "Person",
      name: "Kongesque",
      url: baseUrl,
    },
  };

  // Breadcrumb JSON-LD
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${baseUrl}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.metadata.title,
      },
    ],
  };

  return (
    <section className="animate-fade-in-up rounded-lg">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogPostingSchema),
        }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
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
        <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-primary">
          {post.metadata.title}
        </h1>

        <article className="prose prose-invert max-w-none prose-headings:text-primary mb-8">
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
