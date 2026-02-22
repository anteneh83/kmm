'use client';

import { motion } from 'framer-motion';

const names = ['Tsion', 'Kimem', 'Nene', 'Enate', 'Tsi', 'Tsion', 'Kimem', 'Nene', 'Enate', 'Tsi'];

export default function FloatingNames() {
    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-10 select-none">
            {names.map((name, i) => (
                <motion.div
                    key={i}
                    initial={{
                        x: Math.random() * 100 + '%',
                        y: Math.random() * 100 + '%',
                        opacity: 0
                    }}
                    animate={{
                        x: [
                            `${Math.random() * 100}%`,
                            `${Math.random() * 100}%`,
                            `${Math.random() * 100}%`
                        ],
                        y: [
                            `${Math.random() * 100}%`,
                            `${Math.random() * 100}%`,
                            `${Math.random() * 100}%`
                        ],
                        opacity: [0.2, 0.5, 0.2]
                    }}
                    transition={{
                        duration: 20 + Math.random() * 30,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute text-2xl md:text-5xl font-bold whitespace-nowrap"
                    style={{
                        color: i % 2 === 0 ? '#FFC1E3' : '#C8A2C8',
                        fontFamily: "'Dancing Script', cursive",
                        filter: 'blur(1px)'
                    }}
                >
                    {name}
                </motion.div>
            ))}
        </div>
    );
}
