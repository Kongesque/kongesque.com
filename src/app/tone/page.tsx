"use client"

import { useCallback, useRef } from "react"
import * as Tone from "tone"

export default function TonePage() {
    const synthRef = useRef<Tone.Synth | null>(null)
    const reverbRef = useRef<Tone.Reverb | null>(null)

    const playDrop = useCallback(async () => {
        await Tone.start()
        Tone.Destination.volume.value = -30

        if (!synthRef.current) {
            reverbRef.current = new Tone.Reverb({
                decay: 2.5,
                wet: 0.6,
            }).toDestination()

            synthRef.current = new Tone.Synth({
                oscillator: { type: "sine" },
                envelope: { attack: 0.001, decay: 0.4, sustain: 0, release: 0.3 },
            }).connect(reverbRef.current)
        }

        synthRef.current.triggerAttackRelease("E5", "16n")
    }, [])

    return (
        <main className="flex items-center justify-center" style={{ height: `calc(100vh - 14rem)` }}>
            <button
                onClick={playDrop}
                className="rounded-md w-14 h-14 border border-blockBorder bg-blockBg text-primary font-mono text-lg hover:bg-blockHover hover:border-accent transition-all duration-200 active:scale-95"
            >
                滴
            </button>
        </main>
    )
}
