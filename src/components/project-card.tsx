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
    <div className="group p-6 transition-colors hover:border-accent/50 bg-blockBg hover:bg-blockHover rounded-lg">
      <Link href={href} target="_blank">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-2xl font-bold text-primary group-hover:text-accent transition-colors">
        {title}
        </h2>
        <ArrowUpRight className="w-5 h-5 text-secondary group-hover:text-accent transition-colors" />
      </div>
      </Link>

      <p className="text-sm mb-4 text-secondary">
      {role} {period && `(${period})`}
      </p>

      <p className="text-secondary mb-6">{description}</p>

      <div className="space-y-6">

      <div>
        <h3 className="text-primary font-semibold mb-2">Technologies</h3>
        <div className="flex flex-wrap gap-2">
        {technologies.map((tech) => (
            <span
            key={tech}
            className="px-2 py-1 text-sm text-secondary border-[1px] border-inblockBorder rounded"
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