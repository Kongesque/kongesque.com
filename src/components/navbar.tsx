"use client"
import Link from "next/link"
import { Globe } from 'lucide-react';

export function Navbar() {
    return (
        <nav className="flex items-center justify-between mb-12 text-[16px] text-secondary">
            <div className="flex space-x-4">
                <Link
                    href="/"
                    className="text-accent hover:text-accentHover transition-colors duration-200 flex items-center space-x-1"
                >
                    <Globe size={32} />
                    <span className="font-bold text-xl text-primary transition-colors duration-200 hover:text-accentHover hidden sm:inline">kongesque</span>
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
