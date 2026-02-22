'use client';

import { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';

export default function ParticleBackground() {
    const particlesInit = useCallback(async (engine) => {
        await loadSlim(engine);
    }, []);

    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            options={{
                fullScreen: { enable: true, zIndex: 0 },
                background: { color: { value: 'transparent' } },
                fpsLimit: 60,
                interactivity: {
                    events: {
                        onHover: { enable: true, mode: 'repulse' },
                        resize: true,
                    },
                    modes: {
                        repulse: { distance: 80, duration: 0.4 },
                    },
                },
                particles: {
                    color: { value: ['#FFC1E3', '#C8A2C8', '#a855f7', '#ffffff', '#FFD700'] },
                    links: {
                        enable: true,
                        color: '#FFC1E3',
                        distance: 120,
                        opacity: 0.15,
                        width: 1,
                    },
                    move: {
                        enable: true,
                        speed: 0.6,
                        direction: 'none',
                        random: true,
                        straight: false,
                        outModes: { default: 'bounce' },
                    },
                    number: { value: 80, density: { enable: true, area: 800 } },
                    opacity: {
                        value: { min: 0.1, max: 0.6 },
                        animation: { enable: true, speed: 1, minimumValue: 0.1 },
                    },
                    shape: {
                        type: ['circle', 'heart'],
                    },
                    size: {
                        value: { min: 1, max: 4 },
                        animation: { enable: true, speed: 3, minimumValue: 0.5 },
                    },
                },
                detectRetina: true,
            }}
        />
    );
}
