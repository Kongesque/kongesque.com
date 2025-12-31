
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

const links = [
    {
        name: "email",
        href: "mailto:kongesque@gmail.com",
    },
    {
        name: "github",
        href: "https://github.com/Kongesque",
    },
    {
        name: "x.com",
        href: "https://x.com/kongesque",
    },
]

export function LinksSection() {
    return (
        <section className="mt-20 mb-8 animate-fade-in-up">
            <h2 className="w-fit rounded-md bg-blockBg px-1.5 py-1 text-sm text-secondary">
                Connect
            </h2>

            <div className="flex gap-4 py-5">
                {links.map((link) => (
                    <Link
                        key={link.name}
                        href={link.href}
                        target={link.href.startsWith("http") ? "_blank" : undefined}
                        className="group flex w-fit items-center text-secondary text-sm transition-colors hover:text-accent"
                    >
                        <span>{link.name}</span>
                    </Link>
                ))}
            </div>
        </section>
    )
}
