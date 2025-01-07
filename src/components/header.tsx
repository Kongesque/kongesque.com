"use client";

import "../app/globals.css";
import dynamic from 'next/dynamic';
import Image from "next/image";
import { Github, Send, MapPin, Landmark, Crown } from 'lucide-react';

// import SnakeGame from "@/components/snake";

const SnakeGame = dynamic(() => import('@/components/snake'), { ssr: false });

export function Header() {
    return (
        <header className="space-y-4">
            <SnakeGame text={false} height="11rem" />

            <div className="px-4">
                <div className="flex justify-between items-start">
                    <div className="relative -mt-20 mb-4">
                        <div className="w-32 h-32 rounded-xl border-[5px] border-background overflow-hidden">
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
                            href="https://www.chess.com/member/kongesque" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="hidden items-center justify-center w-9 h-9 border-[1px] border-blockBorder text-secondary rounded hover:text-primary transition-colors duration-200"
                        >
                            <Crown className="w-4 h-4" />
                        </a>

                        <a 
                            href="https://github.com/Kongesque" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="flex items-center justify-center w-9 h-9 border-[1px] border-blockBorder text-secondary rounded hover:text-primary transition-colors duration-200"
                        >
                            <Github className="w-4 h-4" />
                        </a>
                        
                        <a 
                            href="mailto:kongesque@gmail.com" 
                            className="w-9 h-9 flex items-center justify-center bg-accent text-background rounded hover:bg-accentHover transition-colors duration-200 text-sm sm:px-4 sm:py-2 sm:w-auto sm:h-auto"
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
                is a problem solver, creative thinker, curious learner, builder, designer, developer, coder, runner, explorer, tinkerer, coder, maker, day and night dreamer.
                </p>

                <div className="flex gap-1 sm:gap-4 text-secondary text-sm flex-col sm:flex-row">
                    <div className="flex items-center gap-2">
                        <Landmark className="w-4 h-4" />
                        Computer Science @NDHU
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        Hualien, Taiwan
                    </div>
                </div>
            </div>
        </header>
    );
}
