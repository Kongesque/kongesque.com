"use client";

import "../app/globals.css";
import dynamic from 'next/dynamic';
// import SnakeGame from "@/components/snake";

const SnakeGame = dynamic(() => import('@/components/snake'), { ssr: false });

export function Header() {
    return (
        <header className="mb-16 space-y-4">
            <SnakeGame text={false} aspectRatio="4/1"/>
            <h1 className="text-4xl font-bold mb-4 animate-fade-in text-primary">
                <span className="inline-block">
                    Kongesque
                </span>
            </h1>

            <p className="leading-relaxed animate-fade-in-up text-secondary">
            is a developer who builds intelligent systems, solving games and complex problems through Deep Reinforcement Learning, Computer Games Theory, and proven AI algorithms.
            </p>
        </header>
    )
}
