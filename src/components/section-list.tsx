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
    <section className="my-20 animate-fade-in-up">
      <h2 className="w-fit rounded-md bg-blockBg px-1.5 py-1 text-sm text-secondary">
        {title}
      </h2>
      <div className="space-y-10 py-5">
        {items.map((item, index) => (
          <div key={item.title} className="group">
            <Link href={item.href} target="_blank">
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-primary group-hover:text-accent transition-colors duration-200">
                {item.title} {item.period && <span className="text-secondary font-normal ml-2 text-sm">({item.period})</span>}
              </h3>
              <p className="text-secondary">{item.description}</p>
            </Link>
          </div>
        ))}
      </div>
      {viewAllHref && (
        <Link
          href={viewAllHref}
          className="text-sm inline-flex items-center gap-1 text-secondary hover:underline hover:text-accent group"
        >
          {viewAllText}{" "}
          <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </Link>
      )}
    </section>
  )
}