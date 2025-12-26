"use client";

import Link from "next/link"
// import SnakeGame from '@/components/snake';
import dynamic from 'next/dynamic';

const SnakeGame = dynamic(() => import('@/components/snake'), { ssr: false });

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center" style={{ height: `calc(100vh - 14rem)` }}>
            <div className="text-center">
                <SnakeGame text={true} height="14rem" />
                <p className="mt-8 mb-4">
                    Oops! Looks like you got lost. The snake couldn't find this page.
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