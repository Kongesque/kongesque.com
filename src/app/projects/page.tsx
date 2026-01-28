import { ProjectCard } from "@/components/project-card"
import { Metadata } from "next"

const projects = [
  {
    title: "locus",
    description:
      "A self-hosted intelligence layer that transforms video streams into queryable data. Built with YOLO11 to run 100% offline—delivering privacy-first spatial insights for the private edge.",
    role: "creator",
    period: "dec 2025",
    technologies: [
      "next.js 15",
      "fastapi",
      "yolo11",
      "bytetrack",
      "opencv",
      "docker",
      "tailwind",
    ],
    href: "https://github.com/Kongesque/locus",
  },
  {
    title: "lemon & herbs",
    description:
      "Web branding website for a local business. Features bilingual support (Thai/English) and a product showcase.",
    role: "creator",
    period: "nov 2025",
    technologies: [
      "next.js",
      "tailwind",
      "i18n",
    ],
    href: "https://www.lemonnherbs.com/",
  },
  {
    title: "custom-region-object-counter-YOLOV8",
    description:
      "A web app for detecting and counting objects in videos using YOLOv8 for detection and ByteTrack for tracking, with customizable regions of interest (ROIs) function.",
    role: "creator",
    period: "mar 2024 - may 2024",
    technologies: [
      "flask",
      "opencv",
      "supervision",
      "ultralytics",
      "bytetrack",
      "yolov8",
    ],
    href: "https://github.com/Kongesque/custom-region-object-counter-YOLOV8",
  },
]

export default function ProjectsPage() {
  return (
    <main className="animate-fade-in-up">
      <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-primary">
        Projects
      </h1>

      <div className="space-y-10">
        {projects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </main>
  )
}

export const metadata: Metadata = {
  title: "Projects",
  description: "Some of the projects I've worked on.",
  openGraph: {
    images: [
      {
        url: "https://www.kongesque.com/og/home?title=projects",
      },
    ],
  },
}