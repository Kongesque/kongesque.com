import Link from "next/link"

const links = [
  { title: "email", href: "mailto:kongesque@gmail.com" },
  { title: "github", href: "https://github.com/kongesque" },
  { title: "chess.com", href: "https://www.chess.com/member/kongesque" },
]

export function Footer() {
  return (
    <section className="animate-fade-in-up">
      <h2 className="text-2xl font-bold mb-6 flex items-center text-paleSilver">
        <span className="text-accent mr-2">*</span> links
      </h2>
      <div className="flex flex-wrap gap-4 text-sm">
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className=" hover:text-accent transition-colors duration-200"
          >
            {link.title}
          </Link>
        ))}
      </div>
    </section>
  )
}