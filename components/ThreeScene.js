'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { OrbitControls, Stars } from '@react-three/drei';
import FloatingHearts3D from './FloatingHearts3D';
import StarShield from './StarShield';

export default function ThreeScene() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 75 }}
                gl={{ antialias: true, alpha: true }}
            >
                <Suspense fallback={null}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1} color="#FFC1E3" />
                    <pointLight position={[-10, -10, -10]} intensity={0.5} color="#C8A2C8" />

                    <StarShield />
                    <FloatingHearts3D />

                    <Stars
                        radius={100}
                        depth={50}
                        count={5000}
                        factor={4}
                        saturation={0}
                        fade
                        speed={1}
                    />
                </Suspense>
            </Canvas>
        </div>
    );
}
