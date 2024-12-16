"use client";
import Link from "next/link"
// import SnakeGame from '@/components/snake';
import dynamic from 'next/dynamic';

const SnakeGame = dynamic(() => import('@/components/snake'), { ssr: false });

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center" style={{ height: `calc(100vh - 14rem)` }}>
            <div className="space-y-6 text-center">
                <SnakeGame text={true} aspectRatio="2.35/1"/>
                <p>
                    Oops! Looks like you got lost. The snake couldn't find this page.
                </p>
                <Link
                    href="/"
                    className="inline-block hover:text-accent transition-colors underline"
                >
                    return home
                </Link>
            </div>
        </div>
    )
}