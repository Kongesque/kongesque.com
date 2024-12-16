import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type ProjectCardProps = {
  title: string;
  description: string;
  role: string | null;
  period?: string;
  technologies: string[];
  href: string;
};

export function ProjectCard({
  title,
  description,
  role,
  period,
  technologies,
  href,
}: ProjectCardProps) {
  return (
    <div className="group p-6 transition-colors hover:border-accent/50 hover:bg-[#1f2020] bg-[#202222] rounded-lg">
      <Link href={href} target="_blank">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-2xl font-bold text-paleSilver group-hover:text-accent transition-colors">
        {title}
        </h2>
        <ArrowUpRight className="w-5 h-5 text-foreground group-hover:text-accent transition-colors" />
      </div>
      </Link>

      <p className="text-sm mb-4">
      {role} {period && `(${period})`}
      </p>

      <p className="text-paleSilver mb-6">{description}</p>

      <div className="space-y-6">

      <div>
        <h3 className="text-paleSilver font-semibold mb-2">Technologies</h3>
        <div className="flex flex-wrap gap-2">
        {technologies.map((tech) => (
          <span
          key={tech}
          className="px-2 py-1 text-sm text-paleSilver bg-[#2d2f2f] rounded"
          >
          {tech.toLowerCase()}
          </span>
        ))}
        </div>
      </div>
      </div>
    </div>
  );
}