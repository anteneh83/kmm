"use client";

import { useEffect, useRef, useState } from "react";

export default function BackgroundMusic() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [hasSource, setHasSource] = useState(false);
    const audioRef = useRef(null);

    // Check if /audio/background.mp3 exists in public folder
    useEffect(() => {
        let cancelled = false;
        fetch("/audio/background.mp3", { method: "HEAD" })
            .then((res) => {
                if (cancelled) return;
                setHasSource(res.ok);
                if (res.ok && !audioRef.current) {
                    audioRef.current = new Audio("/audio/background.mp3");
                    audioRef.current.loop = true;
                    audioRef.current.volume = 0.2;
                }
            })
            .catch(() => {
                if (!cancelled) setHasSource(false);
            });

        return () => {
            cancelled = true;
            if (audioRef.current) {
                try {
                    audioRef.current.pause();
                } catch {}
            }
        };
    }, []);

    const toggleMusic = () => {
        if (!hasSource || !audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play().catch(() => {});
            setIsPlaying(true);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <button
                onClick={toggleMusic}
                disabled={!hasSource}
                className={`glass-card w-12 h-12 flex items-center justify-center rounded-full hover:scale-110 transition-transform shadow-lg ${
                    !hasSource ? "opacity-60 cursor-not-allowed" : ""
                }`}
                style={{ borderColor: isPlaying ? "#FFC1E3" : "rgba(255,255,255,0.2)" }}
                title={hasSource ? (isPlaying ? "Pause Music" : "Play Music") : "Drop background.mp3 into public/audio to enable"}
            >
                <span className="text-xl">{isPlaying ? "🎵" : hasSource ? "🔊" : "🔇"}</span>
            </button>

            {isPlaying && (
                <div className="absolute -top-12 right-0 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-[10px] text-pink-200 whitespace-nowrap animate-pulse">
                    Listening with you... 💜
                </div>
            )}
        </div>
    );
}
