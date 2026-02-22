'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Heart({ position, speed, size, color }) {
    const mesh = useRef();

    const shape = useMemo(() => {
        const s = new THREE.Shape();
        s.moveTo(0, 0);
        s.bezierCurveTo(0, -0.3, -0.6, -0.3, -0.6, 0);
        s.bezierCurveTo(-0.6, 0.3, 0, 0.6, 0, 1);
        s.bezierCurveTo(0, 0.6, 0.6, 0.3, 0.6, 0);
        s.bezierCurveTo(0.6, -0.3, 0, -0.3, 0, 0);
        return s;
    }, []);

    const extrudeSettings = { depth: 0.2, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 0.1, bevelThickness: 0.1 };

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        mesh.current.position.y += Math.sin(time * speed) * 0.005;
        mesh.current.rotation.y += 0.01;
        mesh.current.rotation.x = Math.sin(time * 0.5) * 0.2;
    });

    return (
        <mesh ref={mesh} position={position} scale={size} rotation={[Math.PI, 0, 0]}>
            <extrudeGeometry args={[shape, extrudeSettings]} />
            <meshStandardMaterial color={color} roughness={0.3} metalness={0.8} emissive={color} emissiveIntensity={0.2} />
        </mesh>
    );
}

export default function FloatingHearts3D() {
    const hearts = useMemo(() => {
        return Array.from({ length: 15 }).map((_, i) => ({
            position: [
                (Math.random() - 0.5) * 15,
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 5
            ],
            speed: 0.5 + Math.random(),
            size: 0.2 + Math.random() * 0.3,
            color: i % 2 === 0 ? '#FFC1E3' : '#C8A2C8'
        }));
    }, []);

    return (
        <group>
            {hearts.map((props, i) => (
                <Heart key={i} {...props} />
            ))}
        </group>
    );
}
