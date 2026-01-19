"use client";
import React, { useRef, useEffect, useState } from 'react';
import type p5 from 'p5';
import { Snake, HamiltonianCycle, HamiltonianContext } from '@/lib/snake-game';

// Cache CSS variables at module scope to avoid recomputing on every mount
let cachedColors: { bg: string; primary: string; secondary: string; accent: string } | null = null;

const getColors = () => {
    if (cachedColors) return cachedColors;
    const style = getComputedStyle(document.documentElement);
    cachedColors = {
        bg: style.getPropertyValue('--color-block-bg'),
        primary: style.getPropertyValue('--color-primary'),
        secondary: style.getPropertyValue('--color-secondary'),
        accent: style.getPropertyValue('--color-accent'),
    };
    return cachedColors;
};

// Cache Hamiltonian cycles by grid dimensions to avoid recomputing
const cycleCache = new Map<string, any[]>();

interface SnakeGameProps {
    text?: boolean;
    height?: string;
    onReady?: () => void;
}

export default function SnakeGame({ text = false, height = '12rem', onReady }: SnakeGameProps) {
    const canvasRef = useRef<HTMLDivElement>(null);
    const [isSpeedUp, setIsSpeedUp] = useState(false);

    useEffect(() => {
        const { bg, primary, secondary, accent } = getColors();

        let p5Instance: p5 | undefined;

        const initGame = async () => {
            if (typeof window === "undefined" || !canvasRef.current) return;

            const p5Module = await import('p5');
            const p5 = p5Module.default;
            let blocksX = 40, blocksY = 20;
            let maxBlocks = 1000,
                blockSize: number,
                xOffset = 0,
                yOffset = 0,
                s: Snake,
                pause = false,
                speedMultiplier = 1,
                hc: HamiltonianContext,
                outlineLength = 3,
                setup_i = 0;

            let readyNotified = false;

            const notifyReady = () => {
                if (!readyNotified) {
                    readyNotified = true;
                    onReady?.();
                }
            };

            const sketch = (p: p5) => {
                let previousWidth = typeof window !== 'undefined' ? window.innerWidth : 0;
                p.setup = () => {
                    setup_i++;
                    let a = canvasRef.current;
                    if (!a) return;

                    // Initial setup needs createCanvas.
                    if (setup_i === 1) { // First time setup
                        blockSize = Math.min(a.offsetWidth / blocksX, a.offsetHeight / blocksY);
                        p.createCanvas(a.offsetWidth, a.offsetHeight).parent(a);
                        // User requested to keep pixelDensity(10)
                        p.pixelDensity(10);
                        setBlocks();
                    }

                    // Recalculate everything based on current p.width/height (which might remain same or change)
                    blockSize = Math.min(p.width / blocksX, p.height / blocksY);
                    outlineLength = blockSize / 15;
                    xOffset = (p.width - blockSize * blocksX) / 2;
                    yOffset = (p.height - blockSize * blocksY) / 2;

                    // If this is a RESTART (game over or full resize reset):
                    s = new Snake(p, blocksX, blocksY, blockSize, outlineLength);

                    // Use cached cycle if available for these dimensions
                    const cacheKey = `${blocksX}x${blocksY}`;
                    if (cycleCache.has(cacheKey)) {
                        const cachedCycle = cycleCache.get(cacheKey)!;
                        hc = {
                            cycle: cachedCycle,
                            getNodeNo: (a: any, b: any) => {
                                for (let c = 0; c < cachedCycle.length; c++) if (cachedCycle[c].x === a && cachedCycle[c].y === b) return c;
                                return -1;
                            },
                            getPossiblePositionsFrom: (a: any, b: any) => {
                                const nodeNo = hc.getNodeNo(a, b);
                                const node = cachedCycle[nodeNo];
                                let positions: number[] = [];
                                for (let c of node.edges) positions.push(hc.getNodeNo(c.x, c.y));
                                return positions;
                            }
                        };
                    } else {
                        hc = new HamiltonianCycle(blocksX, blocksY, p);
                        cycleCache.set(cacheKey, hc.cycle);
                    }

                    s.resetOnHamiltonian(hc);
                    p.frameRate(30);

                    notifyReady();
                };

                // Moved out of setup
                let speedUp = false;

                const toggleSpeed = () => {
                    speedUp = !speedUp;
                    speedMultiplier = speedUp ? 10 : 1;
                    setIsSpeedUp(speedUp);
                };

                // Initialize listeners once
                let container = canvasRef.current;
                if (container) {
                    container.addEventListener('click', toggleSpeed);
                    container.style.cursor = 'pointer';
                }

                const setBlocks = () => {
                    let a = 1;
                    const isMobile = window.innerWidth < 768;
                    const responsiveMaxBlocks = isMobile ? 400 : 900;
                    for (; ;) {
                        if (Math.floor(p.width / a) * Math.floor(p.height / a) < responsiveMaxBlocks) {
                            blockSize = a;
                            blocksX = Math.floor(p.width / blockSize) - Math.floor(p.width / blockSize) % 2;
                            blocksY = Math.floor(p.height / blockSize) - Math.floor(p.height / blockSize) % 2;
                            break;
                        } else a++;
                    }
                };

                const handleResize = () => {
                    let a = canvasRef.current;
                    if (!a || typeof window === 'undefined') return;

                    if (window.innerWidth === previousWidth) return;
                    previousWidth = window.innerWidth;

                    const oldBlocksX = blocksX;
                    const oldBlocksY = blocksY;

                    p.resizeCanvas(a.offsetWidth, a.offsetHeight);
                    setBlocks();

                    blockSize = Math.min(p.width / blocksX, p.height / blocksY);
                    outlineLength = blockSize / 15;
                    xOffset = (p.width - blockSize * blocksX) / 2;
                    yOffset = (p.height - blockSize * blocksY) / 2;

                    if (blocksX !== oldBlocksX || blocksY !== oldBlocksY) {
                        p.setup();
                    }
                };

                let resizeDelay: any;
                p.windowResized = () => {
                    clearTimeout(resizeDelay);
                    resizeDelay = setTimeout(handleResize, 500);
                };
                p.draw = () => {
                    if (!pause) {
                        p.background(bg);
                        p.stroke(bg);
                        p.strokeWeight(1);
                        p.fill(bg);
                        p.rect(0, 0, p.width, yOffset);
                        p.rect(0, 0, xOffset, p.height);
                        p.rect(p.width, p.height, -p.width, -yOffset);
                        p.rect(p.width, p.height, -xOffset, -p.height);

                        if (text) {
                            p.fill(secondary);
                            p.textAlign(p.CENTER, p.CENTER);
                            p.textFont('JetBrains Mono');
                            p.textSize(64);
                            p.text("404", p.width / 2, p.height / 2 - 20);
                            p.textSize(32);
                            p.text("Page Not Found", p.width / 2, p.height / 2 + 30);
                        }

                        p.push();
                        p.translate(xOffset, yOffset);
                        p.fill(0);
                        s.show({ primary, accent });
                        for (let a = 0; a < speedMultiplier; a++) s.update();
                        // Reset game when snake wins (fills the entire grid)
                        if (s.weWin) p.setup();
                        p.pop();
                    }
                };
            };
            p5Instance = new p5(sketch, canvasRef.current);
        };

        initGame();

        return () => {
            p5Instance?.remove();
        };
    }, [text, onReady]);

    const heightStyle = {
        height,
    };

    return (
        <div className={`w-full group p-2 transition-all duration-300 border ${isSpeedUp ? 'border-accent' : 'border-blockBorder hover:border-accent'} bg-blockBg hover:bg-blockHover rounded-lg`} style={heightStyle} id="snake-game-container">
            <div className="flex justify-center items-center h-full" id="snake-game" ref={canvasRef} style={{ userSelect: 'none' }}></div>
        </div>
    );
}
