'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

function StarField() {
    const stars = Array.from({ length: 200 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 0.5,
        delay: Math.random() * 4,
        duration: Math.random() * 3 + 2,
        opacity: Math.random() * 0.7 + 0.1,
    }));

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {stars.map((star) => (
                <div
                    key={star.id}
                    className="absolute rounded-full bg-white"
                    style={{
                        left: `${star.x}%`,
                        top: `${star.y}%`,
                        width: star.size + 'px',
                        height: star.size + 'px',
                        opacity: star.opacity,
                        animationDelay: `${star.delay}s`,
                        animationDuration: `${star.duration}s`,
                        animation: `twinkle ${star.duration}s ease-in-out infinite`,
                    }}
                />
            ))}

            {/* Shooting stars */}
            {[0, 1, 2].map((i) => (
                <div
                    key={`shoot-${i}`}
                    className="absolute h-px rounded-full"
                    style={{
                        width: '100px',
                        background: 'linear-gradient(90deg, transparent, #FFC1E3, transparent)',
                        left: `${20 + i * 30}%`,
                        top: `${15 + i * 20}%`,
                        transform: 'rotate(-30deg)',
                        animationDelay: `${i * 3}s`,
                        animationDuration: '4s',
                        opacity: 0,
                        animation: `shootingStar 4s ease-in ${i * 3}s infinite`,
                    }}
                />
            ))}
        </div>
    );
}

export default function FinalSurprise() {
    const [tsionClickCount, setTsionClickCount] = useState(0);
    const [showEasterEgg, setShowEasterEgg] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [glowText, setGlowText] = useState(false);
    const secRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    setTimeout(() => setGlowText(true), 1200);
                }
            },
            { threshold: 0.2 }
        );
        if (secRef.current) observer.observe(secRef.current);
        return () => observer.disconnect();
    }, []);

    const handleTsionClick = () => {
        const newCount = tsionClickCount + 1;
        setTsionClickCount(newCount);
        if (newCount >= 5) {
            setShowEasterEgg(true);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <section
            id="final"
            ref={secRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden py-24 px-6"
            style={{ background: 'linear-gradient(180deg, #020014 0%, #0d0d2b 30%, #1a0325 60%, #020014 100%)' }}
        >
            {/* Star field */}
            <StarField />

            {/* Galaxy blobs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
                style={{ background: 'radial-gradient(circle, #6b21a8, transparent)' }} />
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-10 blur-3xl"
                style={{ background: 'radial-gradient(circle, #E91E8C, transparent)' }} />

            {/* Border lines */}
            <div className="absolute top-0 left-0 w-full h-px" style={{ background: 'linear-gradient(90deg, transparent, #FFD700, transparent)' }} />

            <div
                className="relative z-10 max-w-3xl mx-auto text-center"
                style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                    transition: 'opacity 1s ease, transform 1s ease',
                }}
            >
                {/* Top decoration */}
                <div className="flex justify-center gap-6 mb-8 text-3xl">
                    {['🌙', '⭐', '✨', '⭐', '🌙'].map((e, i) => (
                        <span
                            key={i}
                            style={{
                                animation: `twinkle ${2 + i * 0.4}s ease-in-out infinite`,
                                animationDelay: `${i * 0.3}s`,
                            }}
                        >
                            {e}
                        </span>
                    ))}
                </div>

                {/* Main "Tsion ✨" glowing text */}
                <div className="mb-4">
                    <button
                        onClick={handleTsionClick}
                        className="text-7xl md:text-9xl font-bold cursor-pointer bg-transparent border-none select-none"
                        style={{
                            fontFamily: "'Dancing Script', cursive",
                            color: '#fff',
                            textShadow: glowText
                                ? '0 0 20px #FFC1E3, 0 0 40px #C8A2C8, 0 0 80px #E91E8C, 0 0 120px #a855f7'
                                : 'none',
                            transition: 'text-shadow 1s ease',
                            animation: glowText ? 'glowPulse 3s ease-in-out infinite' : 'none',
                            display: 'block',
                        }}
                        title="Click me 5 times 🌸"
                    >
                        Tsion ✨
                    </button>

                    {tsionClickCount > 0 && tsionClickCount < 5 && (
                        <p className="text-sm mt-2 opacity-60" style={{ color: '#FFC1E3' }}>
                            {5 - tsionClickCount} more click{5 - tsionClickCount !== 1 ? 's' : ''}… 😏
                        </p>
                    )}
                </div>

                {/* Easter egg */}
                {showEasterEgg && (
                    <div
                        className="mb-8 glass-card p-6 max-w-md mx-auto"
                        style={{
                            border: '1px solid rgba(255,215,0,0.4)',
                            boxShadow: '0 0 40px rgba(255,215,0,0.2)',
                        }}
                    >
                        <p className="text-2xl mb-2">🎉</p>
                        <p className="text-base font-medium" style={{ color: '#FFD700' }}>
                            You found it, <span className="nickname">Kimem</span>! 🌟
                        </p>
                        <p className="text-sm mt-2 text-gray-300">
                            Your curiosity is one of the things I love most about you, <span className="nickname">Nene</span>. Don&apos;t ever lose it. 💜
                        </p>
                    </div>
                )}

                {/* Message */}
                <div className="mt-8 max-w-2xl mx-auto">
                    <div
                        className="text-lg md:text-2xl leading-relaxed font-light"
                        style={{ color: 'rgba(255,255,255,0.85)' }}
                    >
                        <p className="mb-4">
                            No matter the distance,{' '}
                            <span className="nickname" style={{ textShadow: '0 0 15px rgba(255,193,227,0.8)' }}>Kimem</span>,
                        </p>
                        <p className="mb-4">
                            you&apos;ll always be one of the most beautiful parts of my story,{' '}
                            <span className="nickname" style={{ textShadow: '0 0 15px rgba(255,193,227,0.8)' }}>Tsi</span>. ✨
                        </p>
                    </div>

                    {/* Stars divider */}
                    <div className="flex items-center justify-center gap-4 my-8">
                        <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,215,0,0.4))' }} />
                        <span className="text-2xl" style={{ color: '#FFD700' }}>★</span>
                        <span className="text-3xl" style={{ color: '#FFD700', textShadow: '0 0 10px #FFD700' }}>⭐</span>
                        <span className="text-2xl" style={{ color: '#FFD700' }}>★</span>
                        <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, rgba(255,215,0,0.4), transparent)' }} />
                    </div>

                    <p className="text-base md:text-lg" style={{ color: 'rgba(200,162,200,0.8)', fontStyle: 'italic' }}>
                        — <span className="nickname">Enate</span> wrote this, for <span className="nickname">Nene</span>, always 🌙
                    </p>

                    {/* Final Gallery */}
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                        <motion.div
                            whileHover={{ y: -10, rotate: -2 }}
                            className="glass-card p-2 transform -rotate-1 shadow-2xl"
                        >
                            <img src="/images/am with her.jpg" alt="Us" className="rounded-lg w-full h-64 object-cover" />
                            <p className="mt-3 font-dancing text-xl text-pink-200" style={{ fontFamily: "'Dancing Script', cursive" }}>Our Together Moments 💜</p>
                        </motion.div>
                        <motion.div
                            whileHover={{ y: -10, rotate: 2 }}
                            className="glass-card p-2 transform rotate-1 shadow-2xl"
                        >
                            <img src="/images/am with her2.jpg" alt="Us Again" className="rounded-lg w-full h-64 object-cover" />
                            <p className="mt-3 font-dancing text-xl text-pink-200" style={{ fontFamily: "'Dancing Script', cursive" }}>Simply Us ✨</p>
                        </motion.div>
                    </div>
                </div>

                {/* Replay button */}
                <div className="mt-14">
                    <button
                        onClick={scrollToTop}
                        className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold transition-all duration-300"
                        style={{
                            background: 'linear-gradient(135deg, rgba(255,193,227,0.15), rgba(200,162,200,0.15))',
                            border: '1px solid rgba(255,193,227,0.4)',
                            color: '#FFC1E3',
                            fontSize: '1rem',
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255,193,227,0.25), rgba(200,162,200,0.25))';
                            e.currentTarget.style.borderColor = '#FFC1E3';
                            e.currentTarget.style.boxShadow = '0 0 30px rgba(255,193,227,0.4)';
                            e.currentTarget.style.transform = 'translateY(-3px)';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255,193,227,0.15), rgba(200,162,200,0.15))';
                            e.currentTarget.style.borderColor = 'rgba(255,193,227,0.4)';
                            e.currentTarget.style.boxShadow = 'none';
                            e.currentTarget.style.transform = 'translateY(0)';
                        }}
                    >
                        <span>🔄</span>
                        <span>Replay Our Chapter</span>
                        <span className="group-hover:rotate-45 transition-transform duration-300">💜</span>
                    </button>

                    <p className="mt-4 text-xs opacity-40" style={{ color: '#FFC1E3' }}>
                        made with love, just for <span className="nickname">Tsion</span> 🌸
                    </p>
                </div>
            </div>

            {/* Shooting star CSS */}
            <style jsx>{`
        @keyframes shootingStar {
          0% { transform: translateX(-100px) rotate(-30deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateX(calc(100vw + 100px)) rotate(-30deg); opacity: 0; }
        }
      `}</style>
        </section>
    );
}
