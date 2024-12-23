import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

export type Item = {
  title: string
  href: string
  role: string | null
  period?: string
  description: string
}

type SectionListProps = {
  title: string
  items: Item[]
  viewAllHref?: string
  viewAllText?: string
}

export function SectionList({
  title,
  items,
  viewAllHref,
  viewAllText,
}: SectionListProps) {
  return (
    <section className="mb-16 animate-fade-in-up">
      <h2 className="text-2xl font-bold mb-6 flex items-center text-primary">
        <span className="text-accent mr-2">*</span> {title}
      </h2>
      <div className="space-y-8">
        {items.map((item, index) => (
          <div key={item.title} className="group">
            <Link href={item.href} target="_blank">
              <h3 className="text-xl font-semibold mb-1 text-primary group-hover:text-accent transition-colors duration-200">
                {item.title}
              </h3>
              <p className="text-sm mb-2 text-secondary"> {item.role} {item.period && `(${item.period})`} </p>
              <p className="text-secondary">{item.description}</p>
            </Link>
          </div>
        ))}
      </div>
      {viewAllHref && (
        <Link
          href={viewAllHref}
          className="inline-flex items-center gap-1 mt-6 text-secondary hover:underline hover:decoration-secondaryHover group"
        >
          {viewAllText}{" "}
          <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </Link>
      )}
    </section>
  )
}