"use client";

import Link from "next/link"
// import SnakeGame from '@/components/snake';
import { useCallback, useState } from "react";
import dynamic from 'next/dynamic';

const SnakeGame = dynamic(() => import('@/components/snake'), { ssr: false });

export default function NotFound() {
    const [snakeReady, setSnakeReady] = useState(false);

    const handleSnakeReady = useCallback(() => {
        setSnakeReady(true);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center w-full" style={{ height: `calc(100vh - 14rem)` }}>
            <div className="text-center w-full">
                <div className="relative w-full mb-8" style={{ height: "24rem" }}>
                    <div
                        className={`absolute inset-0 transition-opacity duration-200 ease-out ${snakeReady ? "opacity-0 pointer-events-none" : "opacity-100"}`}
                        aria-hidden="true"
                    >
                        <div className="w-full h-full bg-blockBg rounded-lg border border-blockBorder p-2" />
                    </div>
                    <div className={`h-full transition-opacity duration-200 ease-out ${snakeReady ? "opacity-100" : "opacity-0"}`}>
                        <SnakeGame text={true} height="24rem" onReady={handleSnakeReady} />
                    </div>
                </div>
                <p className="mt-8 mb-4">
                    Game over. You’ve hit a wall — this page is off the grid.
                </p>
                <Link
                    href="/"
                    className="inline-block text-secondary hover:underline hover:text-accent"
                >
                    return home
                </Link>
            </div>
        </div>
    )
}