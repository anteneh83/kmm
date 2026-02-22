"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

const recordings = [
    {
        title: "Dengel Hoy (ድንግል ሆይ)",
        file: "/audio/ድንግል ሆይ (1).m4a",
        emoji: "⛪",
    },
    {
        title: "Voice Recording",
        file: "/audio/Voice 260207_031913.m4a",
        emoji: "🎙️",
    },
];

export default function MezmurPlayer() {
    const [playingIndex, setPlayingIndex] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.9);
    const audioRef = useRef(null);

    const togglePlay = (index) => {
        if (!audioRef.current) return;

        // If clicking the currently playing track -> toggle pause/play
        if (playingIndex === index) {
            if (!audioRef.current.paused) {
                audioRef.current.pause();
                setPlayingIndex(null);
            } else {
                audioRef.current.play();
                setPlayingIndex(index);
            }
            return;
        }

        // Start new track: stop previous, set src and play
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setProgress(0);
        setDuration(0);
        setIsLoading(true);
        const file = recordings[index].file;
        audioRef.current.src = file;
        audioRef.current.load();
        audioRef.current.volume = volume;
        audioRef.current
            .play()
            .then(() => {
                setPlayingIndex(index);
            })
            .catch(() => {
                // play may be blocked until user interacts; still set index so UI reflects intent
                setPlayingIndex(index);
            })
            .finally(() => setIsLoading(false));
    };

    useEffect(() => {
        const a = audioRef.current;
        if (!a) return;

        const onTime = () => setProgress(a.currentTime);
        const onDuration = () => setDuration(a.duration || 0);
        const onEnded = () => setPlayingIndex(null);
        const onError = () => {
            setPlayingIndex(null);
            setIsLoading(false);
        };

        a.addEventListener("timeupdate", onTime);
        a.addEventListener("loadedmetadata", onDuration);
        a.addEventListener("ended", onEnded);
        a.addEventListener("error", onError);

        return () => {
            a.removeEventListener("timeupdate", onTime);
            a.removeEventListener("loadedmetadata", onDuration);
            a.removeEventListener("ended", onEnded);
            a.removeEventListener("error", onError);
        };
    }, []);

    useEffect(() => {
        if (audioRef.current) audioRef.current.volume = volume;
    }, [volume]);

    return (
        <div className="mt-8 space-y-4 w-full">
            <h4 className="text-pink-200 font-dancing text-xl mb-4 italic">
                "Your voice is a gift from God, Tsi... even if you can't see it yet. I love
                listening to you sing." 💜
            </h4>

            <div className="space-y-3">
                {recordings.map((rec, idx) => (
                    <motion.div
                        key={idx}
                        whileHover={{ x: 5 }}
                        className={`flex items-center gap-4 p-3 rounded-xl border transition-all cursor-pointer ${
                            playingIndex === idx
                                ? "bg-pink-500/20 border-pink-500/50 shadow-[0_0_15px_rgba(236,72,153,0.3)]"
                                : "bg-white/5 border-white/10 hover:bg-white/10"
                        }`}
                        onClick={() => togglePlay(idx)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") togglePlay(idx);
                        }}
                        role="button"
                        tabIndex={0}
                    >
                        <div className="text-2xl">{rec.emoji}</div>
                        <div className="flex-1 text-left">
                            <p className="text-sm font-medium text-white/90">{rec.title}</p>
                            <p className="text-xs text-white/50">{playingIndex === idx ? "Playing..." : "Click to listen"}</p>
                        </div>
                        <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center bg-white/10 ${
                                playingIndex === idx ? "animate-pulse" : ""
                            }`}
                        >
                            {isLoading && playingIndex === idx ? "⏳" : playingIndex === idx ? "⏸️" : "▶️"}
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="flex items-center gap-4 mt-4">
                <audio ref={audioRef} className="hidden" />

                <div className="flex-1">
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-pink-400" style={{ width: duration ? `${(progress / duration) * 100}%` : "0%" }} />
                    </div>
                    <div className="flex justify-between text-[11px] text-white/60 mt-1">
                        <span>{formatTime(progress)}</span>
                        <span>{formatTime(duration)}</span>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <label className="text-xs text-white/70">Vol</label>
                    <input
                        aria-label="volume"
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={(e) => setVolume(parseFloat(e.target.value))}
                        className="w-28"
                    />
                </div>
            </div>
        </div>
    );
}

function formatTime(t) {
    if (!t || !isFinite(t)) return "0:00";
    const s = Math.floor(t % 60)
        .toString()
        .padStart(2, "0");
    const m = Math.floor(t / 60);
    return `${m}:${s}`;
}
