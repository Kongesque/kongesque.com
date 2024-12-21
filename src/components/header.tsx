"use client";

import "../app/globals.css";
import dynamic from 'next/dynamic';
import Image from "next/image";
import { Github, Send, MapPin } from 'lucide-react';

// import SnakeGame from "@/components/snake";

const SnakeGame = dynamic(() => import('@/components/snake'), { ssr: false });

export function Header() {
    return (
        <header className="mb-16 space-y-4">
            <SnakeGame text={false} height="10rem" />

            <div className="px-4">
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
                            className="flex items-center justify-center w-9 h-9 border-[1px] border-blockBorder text-secondary rounded hover:text-primary transition duration-300"
                        >
                            <Github className="w-4 h-4" />
                        </a>
                        <a 
                            href="mailto:kongesque@gmail.com" 
                            className="w-9 h-9 flex items-center justify-center bg-accent text-background rounded hover:bg-accentHover transition duration-300 text-sm sm:px-4 sm:py-2 sm:w-auto sm:h-auto"
                        >
                            <span className="hidden sm:inline">Contact</span>
                            <Send className="w-4 h-4 sm:hidden" />
                        </a>
                    </div>
                </div>

                <h1 className="text-2xl font-bold mb-4 animate-fade-in text-primary">
                    <span className="inline-block">
                        Kongesque
                    </span>
                </h1>

                <p className="leading-relaxed animate-fade-in-up text-primary mb-2">
                is a creative problem solver who tackles complex challenges and games by designing solutions through proven AI algorithms, Deep Reinforcement Learning, and Computer Games Theory.
                </p>

                <div className="flex items-center gap-2 text-secondary text-sm">
                    <MapPin className="w-4 h-4" />
                    everywhere
                </div>
            </div>
        </header>
    );
}
