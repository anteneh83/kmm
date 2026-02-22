'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';

const memories = [
    {
        week: 'The Beginning',
        emoji: '🌯',
        color: '#FFC1E3',
        title: 'Meeting over እርጥብ',
        text: 'The journey started when I met you to buy እርጥብ. We talked while the food was being prepared, and I felt something special even then. Accompanying you back to your dorm... I didn\'t want that walk to end, Tsi.',
        image: '/images/photo_1_2026-02-05_23-02-47.jpg'
    },
    {
        week: 'Morning Tradition',
        emoji: '⛪',
        color: '#C8A2C8',
        title: 'Church in the Morning',
        text: 'Those mornings when we go to church together... it\'s one of my favorite things. Doing life with you, starting the day in peace, it just feels right, Kimem.',
        image: '/images/photo_5_2026-02-05_23-02-47.jpg'
    },
    {
        week: 'Under the Moon',
        emoji: '🌙',
        color: '#a855f7',
        title: 'Moon Walks & Games',
        text: 'Walking under the stars, finding that perfect spot to sit and play truth or dare. The world stops for a bit, and it\'s just us, Nene.',
        image: '/images/photo_6_2026-02-18_00-28-03.jpg'
    },
    {
        week: 'Playful Teasing',
        emoji: '🪨',
        color: '#e879f9',
        title: 'Kicking the Stones',
        text: 'I used to tell you how I didn\'t like it when people kick stones while walking... so of course, you started doing it just to tease me! Turning my "weak side" into our favorite joke, Enate.',
        image: '/images/photo_7_2026-02-18_00-28-03.jpg'
    },
    {
        week: 'The Adventure',
        emoji: '🚪',
        color: '#FFC1E3',
        title: 'The Great Exit Hunt',
        text: 'Exploring that new place with courage... even when you were a little scared. But the best part? Getting completely lost trying to find the same door we entered! A "worst" moment that became an unforgettable laugh. hhh',
        image: '/images/photo_8_2026-02-18_00-28-03.jpg'
    },
];

function MemoryCard({ memory, index }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const isLeft = index % 2 === 0;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? -100 : 100 }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
            className="flex items-center gap-6 md:gap-10 mb-24"
            style={{
                flexDirection: isLeft ? 'row' : 'row-reverse',
            }}
        >
            {/* Card */}
            <motion.div
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                className="flex-1 glass-card p-6 md:p-10 relative overflow-hidden max-w-lg shadow-2xl"
            >
                {/* Background glow */}
                <div
                    className="absolute inset-0 opacity-10 rounded-2xl"
                    style={{ background: `radial-gradient(circle at center, ${memory.color}, transparent)` }}
                />

                {/* Week badge */}
                <div
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-5 uppercase tracking-wider"
                    style={{ background: `${memory.color}22`, border: `1px solid ${memory.color}44`, color: memory.color }}
                >
                    <span className="text-sm">{memory.emoji}</span>
                    <span>{memory.week}</span>
                </div>

                <h3 className="text-2xl md:text-3xl font-extrabold mb-4" style={{ color: memory.color, fontFamily: "'Montserrat', sans-serif" }}>
                    {memory.title}
                </h3>

                {memory.image && (
                    <div className="mb-6 overflow-hidden rounded-xl border border-white/10 shadow-lg">
                        <motion.img
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.6 }}
                            src={memory.image}
                            alt={memory.title}
                            className="w-full h-48 md:h-64 object-cover"
                        />
                    </div>
                )}

                <p className="text-gray-200 leading-relaxed text-base md:text-lg font-light italic">
                    {memory.text}
                </p>

                {/* Bottom accent line */}
                <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: "40%" } : { width: 0 }}
                    transition={{ duration: 1, delay: index * 0.2 + 0.5 }}
                    className="mt-6 h-1 rounded-full"
                    style={{ background: `linear-gradient(90deg, ${memory.color}, transparent)` }}
                />
            </motion.div>

            {/* Timeline dot */}
            <div className="hidden md:flex flex-col items-center flex-shrink-0 relative">
                <motion.div
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-2xl relative z-10 cursor-pointer"
                    style={{
                        background: `linear-gradient(135deg, ${memory.color}44, ${memory.color}22)`,
                        border: `3px solid ${memory.color}`,
                        boxShadow: `0 0 30px ${memory.color}66`,
                    }}
                >
                    {memory.emoji}
                </motion.div>
                {/* Vertical line */}
                {index < memories.length - 1 && (
                    <motion.div
                        initial={{ height: 0 }}
                        animate={isInView ? { height: 120 } : { height: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="w-1 mt-4"
                        style={{ background: `linear-gradient(to bottom, ${memory.color}88, transparent)` }}
                    />
                )}
            </div>

            {/* Spacer for alternating layout */}
            <div className="flex-1 hidden md:block" />
        </motion.div>
    );
}

export default function MemoriesTimeline() {
    const [titleVisible, setTitleVisible] = useState(false);
    const titleRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setTitleVisible(true); },
            { threshold: 0.3 }
        );
        if (titleRef.current) observer.observe(titleRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section
            id="memories"
            className="relative py-24 px-6 md:px-12 overflow-hidden"
            style={{ background: 'linear-gradient(180deg, #0d0122 0%, #1a0325 50%, #0d0122 100%)' }}
        >
            {/* Background decorations */}
            <div className="absolute top-0 left-0 w-full h-px" style={{ background: 'linear-gradient(90deg, transparent, #FFC1E3, transparent)' }} />
            <div className="absolute bottom-0 left-0 w-full h-px" style={{ background: 'linear-gradient(90deg, transparent, #C8A2C8, transparent)' }} />

            <div className="max-w-4xl mx-auto">
                {/* Section header */}
                <div
                    ref={titleRef}
                    className="text-center mb-16"
                    style={{
                        opacity: titleVisible ? 1 : 0,
                        transform: titleVisible ? 'translateY(0)' : 'translateY(30px)',
                        transition: 'opacity 0.8s ease, transform 0.8s ease',
                    }}
                >
                    <div className="section-divider" />
                    <p className="text-sm tracking-widest uppercase mb-3" style={{ color: '#FFC1E3', letterSpacing: '0.3em' }}>
                        📖 Our Journey
                    </p>
                    <h2
                        className="text-4xl md:text-5xl font-bold leading-tight"
                        style={{ fontFamily: "'Dancing Script', cursive", color: '#fff' }}
                    >
                        From Strangers to My{' '}
                        <span className="nickname">Favorite Person</span>
                    </h2>
                    <p className="mt-4 text-gray-400 text-base md:text-lg max-w-xl mx-auto">
                        Every memory, every laugh, every accidental moment — they all led here, <span className="nickname">Tsi</span>. ✨
                    </p>
                </div>

                {/* Timeline */}
                <div className="relative">
                    {/* Center line (desktop) */}
                    <div
                        className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 hidden md:block opacity-20"
                        style={{ background: 'linear-gradient(to bottom, transparent, #FFC1E3 20%, #C8A2C8 80%, transparent)' }}
                    />

                    {memories.map((memory, idx) => (
                        <MemoryCard key={idx} memory={memory} index={idx} />
                    ))}
                </div>
            </div>
        </section>
    );
}
