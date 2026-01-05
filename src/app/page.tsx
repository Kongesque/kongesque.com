import { Header } from "@/components/header"
import { SectionList } from "@/components/section-list"
import { BlogSection } from "@/components/blog-section"
import { LinksSection } from "@/components/links-section"
import { Footer } from "@/components/footer"

const projectItems = [
  {
    title: "locus",
    role: "creator",
    period: "dec 2025",
    description:
      "A self-hosted intelligence layer that transforms video streams into queryable data. Built with YOLO11 to run 100% offline—delivering privacy-first spatial insights for the private edge.",
    href: "https://github.com/Kongesque/locus",
  },
  {
    title: "custom-region-object-counter-YOLOV8",
    role: "creator",
    period: "mar 2024 - may 2024",
    description:
      "A web app for detecting and counting objects in videos using YOLOv8 for detection and ByteTrack for tracking, with customizable regions of interest (ROIs) function.",
    href: "https://github.com/Kongesque/custom-region-object-counter-YOLOV8",
  },
]

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "kongesque",
            url: "https://www.kongesque.com",
            author: {
              "@type": "Person",
              name: "Kongesque",
              url: "https://www.kongesque.com",
              sameAs: [
                "https://github.com/Kongesque",
                "https://twitter.com/kongesque",
                "https://www.youtube.com/@Kongesque"
              ],
              jobTitle: "Developer, Cardist, Maker"
            }
          }),
        }}
      />
      <Header />

      <SectionList
        title="Projects"
        items={projectItems}
        viewAllHref="/projects"
        viewAllText="More projects"
      />
      <BlogSection />
      <LinksSection />
      <Footer />
    </>
  )
}