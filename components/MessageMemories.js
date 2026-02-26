'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

// Generate the 70 screenshot objects
const screenshots = Array.from({ length: 70 }, (_, i) => ({
    id: i + 1,
    src: `/images/${i + 1}.jpg`,
    alt: `Message Memory ${i + 1}`
}));

export default function MessageMemories() {
    const [selectedId, setSelectedId] = useState(null);
    const [isHovered, setIsHovered] = useState(false);
    const scrollContainerRef = useRef(null);
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    // Handle Keyboard Navigation for Lightbox
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (selectedId === null) return;
            if (e.key === 'Escape') setSelectedId(null);
            if (e.key === 'ArrowRight' && selectedId < 70) setSelectedId(selectedId + 1);
            if (e.key === 'ArrowLeft' && selectedId > 1) setSelectedId(selectedId - 1);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedId]);

    // Auto-scroll the filmstrip slowly
    useEffect(() => {
        let interval;
        if (scrollContainerRef.current && !isHovered && selectedId === null) {
            interval = setInterval(() => {
                if (scrollContainerRef.current) {
                    scrollContainerRef.current.scrollLeft += 1;
                }
            }, 30); // Adjust speed here
        }
        return () => clearInterval(interval);
    }, [isHovered, selectedId]);

    return (
        <section
            ref={sectionRef}
            id="message-memories"
            className="relative py-24 overflow-hidden"
            style={{ background: 'linear-gradient(180deg, #1a0325 0%, #0d0122 100%)' }}
        >
            {/* Background decorations */}
            <div className="absolute top-0 left-0 w-full h-px" style={{ background: 'linear-gradient(90deg, transparent, #e879f9, transparent)' }} />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-12 px-6"
            >
                <div className="section-divider mb-6" />
                <p className="text-sm tracking-widest uppercase mb-3 text-fuchsia-300" style={{ letterSpacing: '0.3em' }}>
                    💬 Words We Shared
                </p>
                <h2 className="text-4xl md:text-5xl font-bold leading-tight" style={{ fontFamily: "'Dancing Script', cursive", color: '#fff' }}>
                    Our <span className="nickname text-fuchsia-400">Digital Diary</span>
                </h2>
                <p className="mt-4 text-gray-400 text-base md:text-lg max-w-xl mx-auto">
                    From the late-night overthinking to the morning sweet texts. Here is how our story unfolded, one message at a time.
                </p>
                <p className="mt-2 text-fuchsia-300 text-sm animate-pulse">
                    (Click any message to read our story)
                </p>
            </motion.div>

            {/* Horizontal Filmstrip */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="w-full relative"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Fade edges */}
                <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#110219] to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#110219] to-transparent z-10 pointer-events-none" />

                <div
                    ref={scrollContainerRef}
                    className="flex gap-4 overflow-x-auto px-12 pb-8 pt-4 hide-scrollbar snap-x snap-mandatory"
                    style={{ scrollBehavior: 'smooth' }}
                >
                    {screenshots.map((item) => (
                        <motion.div
                            key={item.id}
                            whileHover={{ scale: 1.05, y: -10 }}
                            whileTap={{ scale: 0.95 }}
                            className="relative flex-shrink-0 w-48 h-80 md:w-60 md:h-96 rounded-2xl overflow-hidden cursor-pointer shadow-xl snap-center"
                            onClick={() => setSelectedId(item.id)}
                            style={{
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                            }}
                        >
                            <img
                                src={item.src}
                                alt={item.alt}
                                className="w-full h-full object-cover rounded-2xl"
                                loading="lazy"
                            />
                            {/* Number overlay */}
                            <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/20">
                                {item.id} / 70
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-fuchsia-900/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8 p-4 text-center">
                                <span className="text-white font-medium drop-shadow-lg">Read messages ✨</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedId !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-8"
                        onClick={() => setSelectedId(null)}
                    >
                        {/* Close button */}
                        <button
                            className="absolute top-6 right-6 text-white/50 hover:text-white bg-white/10 hover:bg-white/20 rounded-full w-12 h-12 flex items-center justify-center transition-all z-10"
                            onClick={(e) => { e.stopPropagation(); setSelectedId(null); }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Navigation Buttons */}
                        {selectedId > 1 && (
                            <button
                                className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 text-white/50 hover:text-whte bg-white/10 hover:bg-white/20 p-4 rounded-full transition-all z-10"
                                onClick={(e) => { e.stopPropagation(); setSelectedId(selectedId - 1); }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                        )}

                        {selectedId < 70 && (
                            <button
                                className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 text-white/50 hover:text-whte bg-white/10 hover:bg-white/20 p-4 rounded-full transition-all z-10"
                                onClick={(e) => { e.stopPropagation(); setSelectedId(selectedId + 1); }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        )}

                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="relative max-w-lg w-full max-h-[90vh] flex flex-col items-center"
                            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image
                        >
                            <img
                                src={`/images/${selectedId}.jpg`}
                                alt={`Screenshot ${selectedId}`}
                                className="w-auto h-auto max-w-full max-h-[85vh] rounded-xl shadow-2xl"
                                style={{ boxShadow: '0 20px 50px rgba(0,0,0,0.8)' }}
                            />

                            <div className="mt-6 flex flex-col items-center gap-2">
                                <div className="text-white/80 font-medium tracking-wide">
                                    Message <span className="text-fuchsia-400 font-bold">{selectedId}</span> of 70
                                </div>
                                <div className="flex gap-2">
                                    {Array.from({ length: 70 }).map((_, i) => (
                                        i + 1 === selectedId ? (
                                            <div key={i} className="w-2 h-2 rounded-full bg-fuchsia-400" />
                                        ) : (
                                            Math.abs(i + 1 - selectedId) <= 2 ? (
                                                <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/20 mt-0.5 cursor-pointer hover:bg-white/40" onClick={() => setSelectedId(i + 1)} />
                                            ) : null
                                        )
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style jsx>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </section>
    );
}
