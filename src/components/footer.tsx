import Link from "next/link"
import { Globe } from 'lucide-react';

export function Footer() {
  return (
    <section className="animate-fade-in-up">
      <hr className="border-t-2 border-line w-[calc(100%+2rem)] -mx-[1rem]" />
      <div className="flex flex-col sm:flex-row items-center justify-between gap-5 text-xs sm:text-sm text-primary pt-6">
        <div className="flex space-x-4">
          <Link
            href="/"
            aria-label="Home"
            className="flex items-center space-x-1 hover:text-accent transition-colors duration-300"
          >
            <Globe size={32} />
          </Link>
        </div>
        © 2024 Kongesque - Stay curious, keep learning
      </div>
    </section>
  )
}