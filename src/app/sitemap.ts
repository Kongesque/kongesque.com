import { getPosts } from "@/lib/blog"
import { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
    const posts = getPosts()
    const baseUrl = "https://www.kongesque.com"

    const postUrls = posts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: post.metadata.date,
        changeFrequency: "monthly" as const,
        priority: 0.8,
    }))

    const routes = ["", "/blog", "/projects"].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date().toISOString().split("T")[0],
        changeFrequency: "weekly" as const,
        priority: route === "" ? 1 : 0.8,
    }))

    return [...routes, ...postUrls]
}
