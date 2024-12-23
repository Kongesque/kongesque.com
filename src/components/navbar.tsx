"use client"
import Link from "next/link"
import { Globe } from 'lucide-react';

export function Navbar() {
    return (
        <nav className="flex items-center justify-between mb-12 text-[16px] text-secondary">
            <div className="flex space-x-4">
                <Link
                    href="/"
                    className="hover:text-accent transition-colors duration-200"
                >
                    <Globe size={32} />
                </Link>
            </div>
            <div className="flex space-x-4">
                <Link
                    href="/blog"
                    prefetch={true}
                    className="hover:text-accent transition-colors duration-200"
                >
                    blog
                </Link>
                <Link
                    href="/projects"
                    className="hover:text-accent transition-colors duration-200"
                >
                    projects
                </Link>
            </div>
        </nav>
    )
}
