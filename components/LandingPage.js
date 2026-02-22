'use client';

import { useEffect, useState } from 'react';
import { TypeAnimation } from 'react-type-animation';

export default function LandingPage() {
    const [visible, setVisible] = useState(false);
    const [btnPulse, setBtnPulse] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setVisible(true), 300);
        const pulseTimer = setTimeout(() => setBtnPulse(true), 4000);
        return () => {
            clearTimeout(timer);
            clearTimeout(pulseTimer);
        };
    }, []);

    const handleScroll = () => {
        const memoriesSection = document.getElementById('memories');
        if (memoriesSection) {
            memoriesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <section
            id="landing"
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
            style={{
                background: 'linear-gradient(135deg, #0d0122 0%, #1a0538 30%, #2d0b5e 60%, #1a0538 100%)',
            }}
        >
            {/* Decorative blobs */}
            <div
                className="absolute top-20 left-10 w-64 h-64 rounded-full opacity-20 blur-3xl"
                style={{ background: 'radial-gradient(circle, #FFC1E3, transparent)' }}
            />
            <div
                className="absolute bottom-20 right-10 w-80 h-80 rounded-full opacity-15 blur-3xl"
                style={{ background: 'radial-gradient(circle, #C8A2C8, transparent)' }}
            />
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-10 blur-3xl"
                style={{ background: 'radial-gradient(circle, #a855f7, transparent)' }}
            />

            {/* Floating emoji decorations */}
            <div className="absolute top-16 right-20 text-4xl animate-float opacity-60">🌸</div>
            <div className="absolute top-32 left-16 text-3xl opacity-50" style={{ animation: 'float 4s ease-in-out infinite 1s' }}>✨</div>
            <div className="absolute bottom-32 left-24 text-3xl opacity-50" style={{ animation: 'float 5s ease-in-out infinite 0.5s' }}>💜</div>
            <div className="absolute bottom-20 right-32 text-3xl opacity-50" style={{ animation: 'float 3.5s ease-in-out infinite 2s' }}>🌙</div>
            <div className="absolute top-1/3 right-10 text-2xl opacity-40" style={{ animation: 'float 4.5s ease-in-out infinite 1.5s' }}>💫</div>

            {/* Main content */}
            <div
                className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-12 px-6 max-w-6xl mx-auto w-full"
                style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'translateY(0)' : 'translateY(40px)',
                    transition: 'opacity 1s ease, transform 1s ease',
                }}
            >
                {/* Image Section */}
                <div className="relative group flex-shrink-0">
                    <div className="absolute -inset-4 bg-gradient-to-tr from-pink-500 to-purple-500 rounded-3xl opacity-30 blur-xl group-hover:opacity-50 transition-opacity" />
                    <img
                        src="/images/photo_9_2026-02-18_00-28-03.jpg"
                        alt="Tsion"
                        className="relative w-64 h-80 md:w-80 md:h-[450px] object-cover rounded-3xl border-2 border-white/20 shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                    <div className="absolute top-4 right-4 text-2xl animate-pulse">✨</div>
                </div>

                {/* Text Content */}
                <div className="text-center md:text-left max-w-xl">
                    {/* Top badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-sm font-medium"
                        style={{ background: 'rgba(255,193,227,0.1)', border: '1px solid rgba(255,193,227,0.3)', color: '#FFC1E3' }}>
                        <span>✨</span>
                        <span>Something special, just for you</span>
                        <span>✨</span>
                    </div>

                    {/* Greeting heading */}
                    <h1 className="font-dancing text-5xl md:text-7xl lg:text-8xl font-bold mb-2 leading-tight"
                        style={{ fontFamily: "'Dancing Script', cursive", color: '#fff' }}>
                        Hi{' '}
                        <span className="nickname animate-glow-pulse" style={{ textShadow: '0 0 20px #FFC1E3, 0 0 40px #C8A2C8' }}>
                            Kimem
                        </span>{' '}
                        👋
                    </h1>

                    {/* Typing animation message */}
                    <div className="mt-6 mb-8 text-lg md:text-2xl leading-relaxed font-light"
                        style={{ color: 'rgba(255,255,255,0.85)', minHeight: '120px' }}>
                        <TypeAnimation
                            sequence={[
                                800,
                                'This is not just a website,',
                                600,
                                'This is not just a website,\nit\'s a small piece of my heart.',
                                800,
                                'This is not just a website,\nit\'s a small piece of my heart.\n\nClick if you\'re ready, Enate… 💜',
                                8000,
                            ]}
                            wrapper="span"
                            speed={55}
                            style={{ whiteSpace: 'pre-line', display: 'block' }}
                            repeat={Infinity}
                        />
                    </div>

                    {/* CTA button */}
                    <div className="mt-10 flex flex-col items-center md:items-start gap-4">
                        <button
                            onClick={handleScroll}
                            className="pulse-ring hero-btn text-white text-lg"
                            id="enter-btn"
                        >
                            Enter Our World 🌸
                        </button>

                        {/* Scroll indicator */}
                        <div className="mt-6 flex flex-col items-center md:items-start gap-1 opacity-50">
                            <span className="text-xs text-blush" style={{ color: '#FFC1E3' }}>scroll down</span>
                            <div className="flex flex-col gap-1 items-center">
                                <div className="w-px h-8 bg-gradient-to-b from-transparent via-pink-300 to-transparent animate-pulse" />
                                <div className="text-pink-300 text-lg animate-bounce">↓</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stars overlay */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {Array.from({ length: 50 }).map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full bg-white"
                        style={{
                            width: Math.random() * 3 + 1 + 'px',
                            height: Math.random() * 3 + 1 + 'px',
                            left: Math.random() * 100 + '%',
                            top: Math.random() * 100 + '%',
                            opacity: Math.random() * 0.6 + 0.1,
                            animationDelay: Math.random() * 3 + 's',
                            animationDuration: Math.random() * 3 + 2 + 's',
                            animation: 'twinkle 2s ease-in-out infinite',
                        }}
                    />
                ))}
            </div>
        </section>
    );
}
