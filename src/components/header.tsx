"use client";

import "../app/globals.css";
import dynamic from 'next/dynamic';
import Image from "next/image";
import { Github } from 'lucide-react';

// import SnakeGame from "@/components/snake";

const SnakeGame = dynamic(() => import('@/components/snake'), { ssr: false });

export function Header() {
    return (
        <header className="mb-16 space-y-4">
            <SnakeGame text={false} aspectRatio="4/1" />

            <div className="px-5">
                <div className="flex justify-between items-start">
                    <div className="relative -mt-20 mb-4">
                        <div className="w-32 h-32 rounded-xl border-[4px] border-background overflow-hidden">
                            <Image
                                src="/kongesque.jpg"
                                alt="Profile photo"
                                width={128}
                                height={128}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2 items-end">
                        <a 
                            href="https://github.com/Kongesque" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="flex items-center justify-center w-10 h-10 border-[1px] border-blockBorder text-secondary rounded hover:text-primary transition duration-300"
                        >
                            <Github className="w-5 h-5" />
                        </a>
                        <a 
                            href="mailto:kongesque@gmail.com" 
                            className="px-4 py-2 bg-accent text-background rounded hover:bg-accentHover transition duration-300"
                        >
                            Contact
                        </a>
                    </div>
                </div>

                <h1 className="text-2xl font-bold mb-4 animate-fade-in text-primary">
                    <span className="inline-block">
                        Kongesque
                    </span>
                </h1>

                <p className="leading-relaxed animate-fade-in-up text-secondary">
                    is a developer who builds intelligent systems, solving games and complex problems through Deep Reinforcement Learning, Computer Games Theory, and proven AI algorithms.
                </p>
            </div>
        </header>
    );
}
