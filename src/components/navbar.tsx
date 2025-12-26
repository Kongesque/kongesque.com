"use client"
import Link from "next/link"
import { Globe } from 'lucide-react';

export function Navbar() {
    return (
        <nav className="flex items-center justify-between mb-8 text-[16px] text-secondary ">
            <div className="flex space-x-4">
                <Link
                    href="/"
                    aria-label="Home"
                    className="text-accent flex items-center space-x-1 hover:text-accentHover group transition-colors duration-300"
                >
                    <Globe size={32} />
                    <span className="font-bold text-xl text-primary hidden sm:inline group-hover:text-accentHover transition-colors duration-300">kongesque</span>
                </Link>
            </div>
            <div className="flex space-x-4">
                <Link
                    href="/blog"
                    prefetch={true}
                    className="hover:text-accent transition-colors duration-200"
                >
                    Blog
                </Link>
                <Link
                    href="/projects"
                    className="hover:text-accent transition-colors duration-200"
                >
                    Projects
                </Link>
            </div>
        </nav>
    )
}
