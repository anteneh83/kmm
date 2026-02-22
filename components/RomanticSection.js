'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import MezmurPlayer from './MezmurPlayer';

const romanticLines = [
    { text: "Even when I'm with you, Tsi, I'm longing for you.", delay: 0 },
    { text: "I can't pass a single day without seeing you.", delay: 1000 },
    { text: "", delay: 1500 },
    { text: "I love how you only leave your dorm when I call,", delay: 2000 },
    { text: "how you wait for me to be the one to bring you out.", delay: 3200 },
    { text: "", delay: 4200 },
    { text: "Your soft dark skin, your lovely face...", delay: 4800 },
    { text: "And the way we embrace together in deep feeling,", delay: 6000 },
    { text: "it's the most beautiful part of us, Kimem.", delay: 7200 },
    { text: "", delay: 8200 },
    { text: "Your voice... when you sing a mezmur for me,", delay: 8800 },
    { text: "it's unforgettable. It's my peace, Enate.", delay: 10000 },
];

function AnimatedLine({ text, delay, nicknames }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setVisible(true), delay);
        return () => clearTimeout(timer);
    }, [delay]);

    if (!text) return <br />;

    // Highlight nicknames
    const parts = text.split(/(Tsi|Nene|Enate|Kimem)/g);
    return (
        <p
            className="text-lg md:text-2xl leading-relaxed font-light"
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(15px)',
                transition: 'opacity 0.8s ease, transform 0.8s ease',
            }}
        >
            {parts.map((part, i) =>
                ['Tsi', 'Nene', 'Enate', 'Kimem'].includes(part) ? (
                    <span
                        key={i}
                        className="nickname"
                        style={{ textShadow: '0 0 15px rgba(255,193,227,0.8)' }}
                    >
                        {part}
                    </span>
                ) : (
                    <span key={i} style={{ color: 'rgba(255,255,255,0.85)' }}>{part}</span>
                )
            )}
        </p>
    );
}

export default function RomanticSection() {
    const [isRevealed, setIsRevealed] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const secRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
            { threshold: 0.2 }
        );
        if (secRef.current) observer.observe(secRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section
            id="romantic"
            ref={secRef}
            className="relative py-24 px-6 md:px-12 overflow-hidden"
            style={{ background: 'linear-gradient(180deg, #0d0122 0%, #1e003a 50%, #0d0122 100%)' }}
        >
            {/* Ambient glows */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-10 blur-3xl"
                style={{ background: 'radial-gradient(circle, #E91E8C, transparent)' }}
            />
            <div className="absolute top-0 left-0 w-full h-px" style={{ background: 'linear-gradient(90deg, transparent, #a855f7, transparent)' }} />
            <div className="absolute bottom-0 left-0 w-full h-px" style={{ background: 'linear-gradient(90deg, transparent, #FFC1E3, transparent)' }} />

            <div className="max-w-3xl mx-auto">
                {/* Section header */}
                <div
                    className="text-center mb-12"
                    style={{
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                        transition: 'opacity 0.8s ease, transform 0.8s ease',
                    }}
                >
                    <div className="section-divider" style={{ background: 'linear-gradient(90deg, #a855f7, #E91E8C, #FFC1E3)' }} />
                    <p className="text-sm tracking-widest uppercase mb-3" style={{ color: '#C8A2C8', letterSpacing: '0.3em' }}>
                        💌 Something Personal
                    </p>
                </div>

                {/* Hidden trigger button */}
                <div
                    className="text-center mb-10"
                    style={{
                        opacity: isVisible ? 1 : 0,
                        transition: 'opacity 1s ease 0.4s',
                    }}
                >
                    {!isRevealed ? (
                        <button
                            onClick={() => setIsRevealed(true)}
                            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-base font-medium transition-all duration-500"
                            style={{
                                background: 'rgba(232,30,140,0.1)',
                                border: '1px solid rgba(232,30,140,0.4)',
                                color: '#FFC1E3',
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.background = 'rgba(232,30,140,0.2)';
                                e.currentTarget.style.borderColor = 'rgba(232,30,140,0.7)';
                                e.currentTarget.style.boxShadow = '0 0 30px rgba(232,30,140,0.3)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.background = 'rgba(232,30,140,0.1)';
                                e.currentTarget.style.borderColor = 'rgba(232,30,140,0.4)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            <span className="text-xl">🔒</span>
                            <span>Open only if you promise not to smile too much 😌</span>
                            <span className="text-xl group-hover:rotate-12 transition-transform">🌸</span>
                        </button>
                    ) : (
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm"
                            style={{ background: 'rgba(232,30,140,0.2)', border: '1px solid rgba(232,30,140,0.5)', color: '#FFC1E3' }}>
                            <span>🔓</span>
                            <span>You promised… 😌</span>
                        </div>
                    )}
                </div>

                {/* Revealed romantic content */}
                <div
                    className={`reveal-section ${isRevealed ? 'open' : ''}`}
                >
                    <div className="gradient-border mx-auto max-w-2xl">
                        <div className="gradient-border-inner text-center">
                            {/* Decorative top */}
                            <div className="flex justify-center gap-4 mb-8 text-2xl">
                                <span className="animate-float">🌸</span>
                                <span className="animate-float" style={{ animationDelay: '0.5s' }}>💜</span>
                                <span className="animate-float" style={{ animationDelay: '1s' }}>✨</span>
                            </div>

                            {/* Romantic text and photos */}
                            <div className="flex flex-col lg:flex-row gap-8 items-center">
                                <div className="space-y-3 text-left flex-1 w-full">
                                    {romanticLines.map((line, i) => (
                                        <AnimatedLine key={i} text={line.text} delay={line.delay} />
                                    ))}
                                </div>

                                {/* Secondary Photos & Voice Gallery */}
                                <div className="flex flex-col gap-4 flex-shrink-0 w-full lg:w-auto">
                                    <div className="flex gap-4 justify-center">
                                        <motion.img
                                            initial={{ opacity: 0, x: 20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            src="/images/photo_9_2026-02-05_23-02-47.jpg"
                                            className="w-32 h-40 md:w-36 md:h-48 object-cover rounded-2xl border border-white/20 shadow-xl rotate-3 hover:rotate-0 transition-transform"
                                        />
                                        <motion.img
                                            initial={{ opacity: 0, x: 20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.3 }}
                                            src="/images/photo_10_2026-02-05_23-02-47.jpg"
                                            className="w-32 h-40 md:w-36 md:h-48 object-cover rounded-2xl border border-white/20 shadow-xl -rotate-3 hover:rotate-0 transition-transform"
                                        />
                                    </div>

                                    {/* Tsi's Mezmur Voice */}
                                    <MezmurPlayer />
                                </div>
                            </div>

                            {/* Bottom signature */}
                            <div className="mt-10 pt-6 border-t border-pink-900">
                                <p className="text-sm" style={{ color: 'rgba(255,193,227,0.5)' }}>
                                    — with all the sincerity I have, for <span className="nickname">Tsion</span> 💜
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Floating hearts after reveal */}
                    {isRevealed && (
                        <div className="flex justify-center gap-6 mt-8">
                            {['💜', '🌸', '✨', '💫', '🌙'].map((emoji, i) => (
                                <span
                                    key={i}
                                    className="text-2xl"
                                    style={{
                                        animation: `float ${3 + i * 0.5}s ease-in-out infinite`,
                                        animationDelay: `${i * 0.3}s`,
                                    }}
                                >
                                    {emoji}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
