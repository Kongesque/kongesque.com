import { Header } from "@/components/header"
import { SectionList } from "@/components/section-list"
import { BlogSection } from "@/components/blog-section"
import { Footer } from "@/components/footer"

const projectItems = [
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
      <Header />
      <SectionList
        title="projects"
        items={projectItems}
        viewAllHref="/projects"
        viewAllText="all projects"
      />
      <BlogSection />
      <Footer />
    </>
  )
}