"use client";

import "../app/globals.css";
import { useCallback, useState } from "react";
import dynamic from 'next/dynamic';
import { MapPin, Landmark } from 'lucide-react';

// import SnakeGame from "@/components/snake";

const SnakeGame = dynamic(() => import('@/components/snake'), { ssr: false });

export function Header() {
    const [snakeReady, setSnakeReady] = useState(false);

    const handleSnakeReady = useCallback(() => {
        setSnakeReady(true);
    }, []);

    return (
        <header className="space-y-4">
            <div className="relative w-full" style={{ height: "12rem" }}>
                <div
                    className={`absolute inset-0 transition-opacity duration-200 ease-out ${snakeReady ? "opacity-0 pointer-events-none" : "opacity-100"}`}
                    aria-hidden="true"
                >
                    <div className="w-full h-full bg-blockBg rounded-md border border-transparent" />
                </div>
                <div className={`h-full transition-opacity duration-200 ease-out ${snakeReady ? "opacity-100" : "opacity-0"}`}>
                    <SnakeGame text={false} height="12rem" onReady={handleSnakeReady} />
                </div>
            </div>

            <div>


                <h1 className="text-2xl sm:text-3xl font-bold mb-4 animate-fade-in text-primary">
                    <span className="inline-block">
                        Kongesque
                    </span>
                </h1>

                <p className="leading-relaxed animate-fade-in-up text-primary mb-2">
                    is a software engineer, creative thinker, and lifelong learner. Currently crafting <a href="https://github.com/Kongesque/zonenet" target="_blank" rel="noopener noreferrer" className="underline hover:text-accent transition-colors">ZoneNet</a>.
                </p>

                <div className="flex gap-1 sm:gap-4 text-secondary text-sm flex-col sm:flex-row">
                    <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        BKK, Thailand
                    </div>
                </div>
            </div>
        </header>
    );
}
