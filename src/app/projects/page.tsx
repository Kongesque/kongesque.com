import { ProjectCard } from "@/components/project-card"
import { Metadata } from "next"

const projects = [
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

export const metadata: Metadata = {
    title: "Projects",
    description: "Some of the projects I've worked on.",
    openGraph: {
      images: [
        {
          url: "",
        },
      ],
    },
  }

export default function ProjectsPage() {
  return (
    <>
      <main className="animate-fade-in-up">
        <h1 className="text-4xl font-bold mb-8 text-paleSilver">
          <span className="text-accent mr-2">*</span>
          projects
        </h1>

        <div className="space-y-8">
          {projects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </main>
    </>
  )
}