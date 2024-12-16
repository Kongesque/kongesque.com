"use client";
import dynamic from 'next/dynamic';

const SnakeGame = dynamic(() => import('@/components/snake'));

export default function SnakeGameWrapper() {
    return <SnakeGame />;
}