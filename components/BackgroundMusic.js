'use client';

import { useEffect, useState } from 'react';
import useSound from 'use-sound';

export default function BackgroundMusic() {
    const [isPlaying, setIsPlaying] = useState(false);
    // Placeholder music path - user would need to provide a real file in public/audio
    const [play, { pause, stop }] = useSound('/audio/background.mp3', {
        volume: 0.2,
        loop: true,
    });

    const toggleMusic = () => {
        if (isPlaying) {
            pause();
        } else {
            play();
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <button
                onClick={toggleMusic}
                className="glass-card w-12 h-12 flex items-center justify-center rounded-full hover:scale-110 transition-transform shadow-lg"
                style={{ borderColor: isPlaying ? '#FFC1E3' : 'rgba(255,255,255,0.2)' }}
                title={isPlaying ? 'Pause Music' : 'Play Music'}
            >
                <span className="text-xl">{isPlaying ? '🎵' : '🔇'}</span>
            </button>

            {isPlaying && (
                <div className="absolute -top-12 right-0 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-[10px] text-pink-200 whitespace-nowrap animate-pulse">
                    Listening with you... 💜
                </div>
            )}
        </div>
    );
}
