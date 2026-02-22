'use client';

import dynamic from 'next/dynamic';
import LandingPage from '@/components/LandingPage';
import MemoriesTimeline from '@/components/MemoriesTimeline';
import RomanticSection from '@/components/RomanticSection';
import Quiz from '@/components/Quiz';
import FinalSurprise from '@/components/FinalSurprise';
import BackgroundMusic from '@/components/BackgroundMusic';
import FloatingNames from '@/components/FloatingNames';

// Dynamically load Three.js scene (client-only)
const ThreeScene = dynamic(() => import('@/components/ThreeScene'), {
    ssr: false,
});

export default function Home() {
    return (
        <main className="relative">
            {/* Premium 3D Background */}
            <ThreeScene />

            {/* Subtle Name Background */}
            <FloatingNames />

            {/* Sections */}
            <LandingPage />
            <MemoriesTimeline />
            <RomanticSection />
            <Quiz />
            <FinalSurprise />

            {/* Music Control */}
            <BackgroundMusic />
        </main>
    );
}
