'use client';

import { useState, useRef, useEffect } from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

const questions = [
    {
        id: 1,
        emoji: '🗣️',
        question: 'Who talks more, Kimem? 😜',
        options: ['You do, obviously', 'He does... maybe', 'We both know the truth 😌'],
        correctIndex: -1, // No wrong answers
    },
    {
        id: 2,
        emoji: '😂',
        question: 'Who laughs first, Nene? 😂',
        options: ['You always laugh first', 'It depends on the joke', 'Always me, every time'],
        correctIndex: -1,
    },
    {
        id: 3,
        emoji: '😎',
        question: 'Who made the better first impression, Tsi? 😎',
        options: ['You did (obviously)', 'He did (barely)', 'Neither — we were both awkward ✨'],
        correctIndex: -1,
    },
    {
        id: 4,
        emoji: '🌸',
        question: 'Who\'s luckier, Enate? 💫',
        options: ['You are, definitely', 'He is, clearly', 'Impossible to say'],
        correctIndex: -1,
    },
];

export default function Quiz() {
    const [currentQ, setCurrentQ] = useState(0);
    const [selected, setSelected] = useState([]);
    const [finished, setFinished] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const { width, height } = useWindowSize();
    const secRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
            { threshold: 0.2 }
        );
        if (secRef.current) observer.observe(secRef.current);
        return () => observer.disconnect();
    }, []);

    const handleSelect = (answerIndex) => {
        const newSelected = [...selected];
        newSelected[currentQ] = answerIndex;
        setSelected(newSelected);

        if (currentQ < questions.length - 1) {
            setTimeout(() => setCurrentQ(currentQ + 1), 700);
        } else {
            setTimeout(() => {
                setFinished(true);
                setShowConfetti(true);
            }, 700);
        }
    };

    const handleReset = () => {
        setCurrentQ(0);
        setSelected([]);
        setFinished(false);
        setShowConfetti(false);
    };

    const progress = (currentQ / questions.length) * 100;

    return (
        <section
            id="quiz"
            ref={secRef}
            className="relative py-24 px-6 md:px-12 overflow-hidden"
            style={{ background: 'linear-gradient(180deg, #0d0122 0%, #120028 50%, #0d0122 100%)' }}
        >
            {showConfetti && (
                <Confetti
                    width={width}
                    height={height}
                    numberOfPieces={200}
                    recycle={false}
                    colors={['#FFC1E3', '#C8A2C8', '#E91E8C', '#FFFFFF']}
                />
            )}
            <div className="absolute top-0 left-0 w-full h-px" style={{ background: 'linear-gradient(90deg, transparent, #FFC1E3, transparent)' }} />
            <div className="absolute bottom-0 left-0 w-full h-px" style={{ background: 'linear-gradient(90deg, transparent, #a855f7, transparent)' }} />

            <div
                className="max-w-2xl mx-auto"
                style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                    transition: 'opacity 0.8s ease, transform 0.8s ease',
                }}
            >
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="section-divider" style={{ background: 'linear-gradient(90deg, #FFC1E3, #a855f7, #FFC1E3)' }} />
                    <p className="text-sm tracking-widest uppercase mb-3" style={{ color: '#FFC1E3', letterSpacing: '0.3em' }}>
                        🎮 Fun Corner
                    </p>
                    <h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: "'Dancing Script', cursive", color: '#fff' }}>
                        How well do you know{' '}
                        <span className="nickname">us?</span>
                    </h2>
                    <p className="mt-3 text-gray-400">
                        Be honest, <span className="nickname">Tsi</span>… 😏
                    </p>
                </div>

                {!finished ? (
                    <div className="glass-card p-8 md:p-10">
                        {/* Progress bar */}
                        <div className="mb-8">
                            <div className="flex justify-between text-xs mb-2" style={{ color: 'rgba(255,193,227,0.6)' }}>
                                <span>Question {currentQ + 1} of {questions.length}</span>
                                <span>{Math.round(progress)}%</span>
                            </div>
                            <div className="w-full h-2 rounded-full" style={{ background: 'rgba(255,193,227,0.1)' }}>
                                <div
                                    className="h-full rounded-full transition-all duration-500"
                                    style={{
                                        width: `${((currentQ) / questions.length) * 100}%`,
                                        background: 'linear-gradient(90deg, #FFC1E3, #a855f7)',
                                    }}
                                />
                            </div>
                        </div>

                        {/* Question */}
                        <div className="text-center mb-8">
                            <div className="text-5xl mb-4">{questions[currentQ].emoji}</div>
                            <h3 className="text-xl md:text-2xl font-semibold" style={{ color: '#fff', fontFamily: "'Montserrat', sans-serif" }}>
                                {questions[currentQ].question}
                            </h3>
                        </div>

                        {/* Options */}
                        <div className="space-y-3">
                            {questions[currentQ].options.map((option, i) => (
                                <button
                                    key={i}
                                    className="quiz-option w-full text-left"
                                    style={selected[currentQ] === i ? {
                                        background: 'rgba(255,193,227,0.25)',
                                        borderColor: '#FFC1E3',
                                        boxShadow: '0 0 25px rgba(255,193,227,0.5)',
                                    } : {}}
                                    onClick={() => handleSelect(i)}
                                >
                                    <span className="mr-3 opacity-60">{'ABCDEFGH'[i]}.</span>
                                    {option}
                                </button>
                            ))}
                        </div>

                        {/* Navigation dots */}
                        <div className="flex justify-center gap-2 mt-8">
                            {questions.map((_, i) => (
                                <div
                                    key={i}
                                    className="w-2 h-2 rounded-full transition-all duration-300"
                                    style={{
                                        background: i <= currentQ ? '#FFC1E3' : 'rgba(255,193,227,0.2)',
                                        transform: i === currentQ ? 'scale(1.5)' : 'scale(1)',
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                ) : (
                    /* Final result */
                    <div className="text-center">
                        {/* Confetti hearts */}
                        <div className="flex justify-center gap-4 mb-8 text-4xl">
                            {['💜', '🌸', '✨', '💫', '💜', '🌸', '✨'].map((e, i) => (
                                <span
                                    key={i}
                                    style={{
                                        animation: `float ${2 + i * 0.3}s ease-in-out infinite`,
                                        animationDelay: `${i * 0.2}s`,
                                        display: 'inline-block'
                                    }}
                                >
                                    {e}
                                </span>
                            ))}
                        </div>

                        <div className="gradient-border max-w-xl mx-auto">
                            <div className="gradient-border-inner text-center py-10">
                                <div className="text-6xl mb-6 heart">💜</div>
                                <p
                                    className="text-xl md:text-2xl font-light leading-relaxed"
                                    style={{ color: 'rgba(255,255,255,0.9)' }}
                                >
                                    Correct answers don&apos;t matter,{' '}
                                    <span className="nickname">Enate</span>.
                                </p>
                                <p className="mt-4 text-xl md:text-2xl font-light" style={{ color: 'rgba(255,255,255,0.9)' }}>
                                    The real answer is…
                                </p>
                                <p className="mt-4 text-2xl md:text-3xl font-semibold" style={{ color: '#FFC1E3', textShadow: '0 0 20px rgba(255,193,227,0.6)' }}>
                                    I&apos;m lucky I met you, <span className="nickname">Nene</span>. ✨
                                </p>

                                <button
                                    onClick={handleReset}
                                    className="mt-10 px-6 py-3 rounded-full text-sm transition-all duration-300"
                                    style={{
                                        background: 'rgba(255,193,227,0.1)',
                                        border: '1px solid rgba(255,193,227,0.3)',
                                        color: '#FFC1E3',
                                    }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.background = 'rgba(255,193,227,0.2)';
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.background = 'rgba(255,193,227,0.1)';
                                    }}
                                >
                                    Play again? 😊
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
