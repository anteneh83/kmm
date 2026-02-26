"use client";

import { useEffect, useRef, useState } from "react";

export default function BackgroundMusic() {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);
    // Using direct IA link to avoid 302 redirects, and a reliable romantic classical track
    const AUDIO_URL = "https://ia600203.us.archive.org/4/items/GymnopedieNo.1/gymnopedie_no_1.mp3";

    useEffect(() => {
        audioRef.current = new Audio(AUDIO_URL);
        audioRef.current.loop = true;
        audioRef.current.volume = 1.0; // Increased to max volume

        return () => {
            if (audioRef.current) {
                try {
                    audioRef.current.pause();
                } catch { }
            }
        };
    }, []);

    const toggleMusic = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play().then(() => {
                setIsPlaying(true);
            }).catch((err) => {
                console.error("Audio playback failed:", err);
                alert("Could not play audio. Please ensure external media is allowed in your browser.");
            });
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-[100]">
            <button
                onClick={toggleMusic}
                className="glass-card w-12 h-12 flex items-center justify-center rounded-full hover:scale-110 transition-transform shadow-lg"
                style={{ borderColor: isPlaying ? "#FFC1E3" : "rgba(255,255,255,0.2)" }}
                title={isPlaying ? "Pause Music" : "Play Romantic Classical"}
            >
                <span className="text-xl">{isPlaying ? "🎵" : "🔊"}</span>
            </button>

            {isPlaying && (
                <div className="absolute -top-12 right-0 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-[10px] text-pink-200 whitespace-nowrap animate-pulse">
                    Listening with you... 💜
                </div>
            )}
        </div>
    );
}
