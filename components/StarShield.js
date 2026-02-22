'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function StarShield() {
    const points = useRef();

    const [coords, colors] = useMemo(() => {
        const coords = [];
        const colors = [];
        const colorPalette = [new THREE.Color('#FFC1E3'), new THREE.Color('#C8A2C8'), new THREE.Color('#FFFFFF')];

        for (let i = 0; i < 2000; i++) {
            const x = (Math.random() - 0.5) * 20;
            const y = (Math.random() - 0.5) * 20;
            const z = (Math.random() - 0.5) * 20;
            coords.push(x, y, z);

            const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
            colors.push(color.r, color.g, color.b);
        }
        return [new Float32Array(coords), new Float32Array(colors)];
    }, []);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        points.current.rotation.y = time * 0.05;
        points.current.rotation.x = Math.sin(time * 0.1) * 0.1;
    });

    return (
        <points ref={points}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={coords.length / 3}
                    array={coords}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={colors.length / 3}
                    array={colors}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.05}
                vertexColors
                transparent
                opacity={0.8}
                sizeAttenuation={true}
            />
        </points>
    );
}
