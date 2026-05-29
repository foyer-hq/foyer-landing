'use client';

import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';

interface FloatingTicketProps {
  scrollProgress: number;
}

export default function FloatingTicket({ scrollProgress }: FloatingTicketProps) {
  const groupRef = useRef<THREE.Group>(null);
  
  // Entry animation parameters
  const entryOffset = useRef({ y: -3 });
  
  // Accumulate frame delta time for smooth sinusoidal animation functions
  const elapsedTime = useRef(0);

  // Trigger GSAP entry float-in on mount
  useEffect(() => {
    gsap.to(entryOffset.current, {
      y: 0,
      duration: 1.2,
      ease: 'power3.out',
    });
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Accumulate time step
    elapsedTime.current += delta;

    // --- RESPONSIVE ALIGNMENT & POSITIONING ---
    // state.viewport contains exact responsive layout dimensions in Three.js units
    const isDesktop = state.viewport.width > 7;
    const targetX = isDesktop ? Math.min(1.7, state.viewport.width * 0.18) : 0;
    const targetY = isDesktop ? 0.2 : -1.2; // Shift ticket down on mobile so it sits beautifully below centered text
    const targetScale = isDesktop ? 1.15 * 0.75 : 0.8 * 0.75;

    // Lerp positions and scale smoothly for responsive screen transitions
    groupRef.current.position.x = THREE.MathUtils.lerp(
      groupRef.current.position.x,
      targetX,
      0.08
    );

    const scale = THREE.MathUtils.lerp(
      groupRef.current.scale.x,
      targetScale,
      0.08
    );
    groupRef.current.scale.set(scale, scale, scale);

    // --- IDLE FLOAT AND ROTATION ---
    const floatY = Math.sin(elapsedTime.current * 0.5) * 0.08;
    const finalTargetY = entryOffset.current.y + targetY + floatY;
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      finalTargetY,
      0.08
    );

    // --- IDLE ROTATION + MOUSE PARALLAX TILT ---
    const idleRotY = Math.sin(elapsedTime.current * 0.3) * 0.18;
    const idleRotX = Math.sin(elapsedTime.current * 0.4) * 0.05;

    // Mouse parallax: Max tilt ±0.12 radians, Lerp factor 0.04, Initial rotation.y 0.15
    const targetTiltX = idleRotX + (-state.pointer.y * 0.12);
    const targetTiltY = 0.15 + idleRotY + (state.pointer.x * 0.12);

    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetTiltX,
      0.04
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetTiltY,
      0.04
    );

    // --- SCROLL TRANSFORMATIONS (0 to 0.3 progress for depth, up to 0.45 for fade) ---
    // Interpolate depth (Z: 0 to -8)
    const normalizedScrollZ = Math.min(1, Math.max(0, scrollProgress / 0.3));
    groupRef.current.position.z = -8 * normalizedScrollZ;

    // Compute target opacity with the specific formula:
    // targetOpacity is 1 before progress 0.3, and fades to 0 between 0.3 and 0.45
    const targetOpacity = Math.max(
      0,
      Math.min(1, scrollProgress < 0.3 ? 1 : 1 - (scrollProgress - 0.3) / 0.15)
    );

    // Dynamically traverse all children in useFrame to multiply original base opacity
    groupRef.current.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        const baseOpacity =
          child.userData && child.userData.baseOpacity !== undefined
            ? child.userData.baseOpacity
            : 1.0;
        const materials = Array.isArray(child.material) ? child.material : [child.material];
        materials.forEach((mat) => {
          mat.transparent = true;
          mat.opacity = baseOpacity * targetOpacity;
        });
      }
    });
  });

  return (
    <>
      {/* Light rigs targeted to highlight the premium ticket layers and metallic stripes */}
      <spotLight
        position={[2, 3, 4]}
        angle={0.5}
        intensity={1.4}
        color="#ffffff"
        penumbra={0.6}
        castShadow
      />
      <pointLight
        position={[-3, 1, 2]}
        color="#02C39A"
        intensity={0.6}
        distance={8}
      />

      <group ref={groupRef}>
        {/* 1. TICKET BODY - main face */}
        <mesh castShadow receiveShadow userData={{ baseOpacity: 1.0 }}>
          <boxGeometry args={[3.2, 1.4, 0.04]} />
          <meshStandardMaterial
            color="#05668D"
            metalness={0.2}
            roughness={0.6}
            emissive="#028090"
            emissiveIntensity={0.12}
          />
        </mesh>

        {/* 2. TICKET BODY - back face (slightly darker seafoam, pushed further back to avoid z-fighting) */}
        <mesh position={[0, 0, -0.06]} userData={{ baseOpacity: 1.0 }}>
          <boxGeometry args={[3.2, 1.4, 0.04]} />
          <meshStandardMaterial
            color="#022130"
            metalness={0.2}
            roughness={0.6}
          />
        </mesh>

        {/* 3. LEFT SECTION - stub area (the tear-off part) */}
        <mesh position={[-1.175, 0, 0]} userData={{ baseOpacity: 1.0 }}>
          <boxGeometry args={[0.85, 1.4, 0.045]} />
          <meshStandardMaterial
            color="#028090"
            emissive="#05668D"
            emissiveIntensity={0.1}
            metalness={0.15}
            roughness={0.7}
          />
        </mesh>

        {/* 4. PERFORATED DIVIDER LINE (10 cylinders oriented along Z) */}
        {Array.from({ length: 10 }).map((_, i) => {
          const y = -0.56 + (i * 1.12) / 9;
          return (
            <mesh
              key={i}
              position={[-0.78, y, 0]}
              rotation={[Math.PI / 2, 0, 0]}
              userData={{ baseOpacity: 0.5 }}
            >
              <cylinderGeometry args={[0.018, 0.018, 0.1, 8]} />
              <meshStandardMaterial
                color="#02C39A"
                emissive="#02C39A"
                emissiveIntensity={0.5}
              />
            </mesh>
          );
        })}

        {/* 5. TOP GOLD STRIPE */}
        <mesh position={[0, 0.67, 0]} userData={{ baseOpacity: 1.0 }}>
          <boxGeometry args={[3.2, 0.06, 0.046]} />
          <meshStandardMaterial
            color="#02C39A"
            metalness={0.8}
            roughness={0.1}
            emissive="#02C39A"
            emissiveIntensity={0.6}
          />
        </mesh>

        {/* 6. BOTTOM GOLD STRIPE */}
        <mesh position={[0, -0.67, 0]} userData={{ baseOpacity: 1.0 }}>
          <boxGeometry args={[3.2, 0.06, 0.046]} />
          <meshStandardMaterial
            color="#02C39A"
            metalness={0.8}
            roughness={0.1}
            emissive="#02C39A"
            emissiveIntensity={0.6}
          />
        </mesh>

        {/* 7. QR CODE AREA - on the stub */}
        <mesh position={[-1.175, 0.1, 0]} userData={{ baseOpacity: 1.0 }}>
          <boxGeometry args={[0.48, 0.48, 0.046]} />
          <meshStandardMaterial
            color="#05668D"
            metalness={0}
            roughness={1}
          />
        </mesh>

        {/* 8. QR CODE CORNER MARKERS (3 gold corner squares) */}
        <mesh position={[-1.37, 0.29, 0]} userData={{ baseOpacity: 1.0 }}>
          <boxGeometry args={[0.1, 0.1, 0.047]} />
          <meshStandardMaterial
            color="#F0F3BD"
            emissive="#F0F3BD"
            emissiveIntensity={0.4}
          />
        </mesh>
        <mesh position={[-0.985, 0.29, 0]} userData={{ baseOpacity: 1.0 }}>
          <boxGeometry args={[0.1, 0.1, 0.047]} />
          <meshStandardMaterial
            color="#F0F3BD"
            emissive="#F0F3BD"
            emissiveIntensity={0.4}
          />
        </mesh>
        <mesh position={[-1.37, -0.09, 0]} userData={{ baseOpacity: 1.0 }}>
          <boxGeometry args={[0.1, 0.1, 0.047]} />
          <meshStandardMaterial
            color="#F0F3BD"
            emissive="#F0F3BD"
            emissiveIntensity={0.4}
          />
        </mesh>

        {/* 9. TEXT LINES - main body area (right of perforation) */}
        {/* Event name line (long, near top) */}
        <mesh position={[0.45, 0.42, 0]} userData={{ baseOpacity: 0.85 }}>
          <boxGeometry args={[1.6, 0.06, 0.046]} />
          <meshStandardMaterial color="#F0F3BD" />
        </mesh>

        {/* Subtitle line (shorter) */}
        <mesh position={[0.25, 0.28, 0]} userData={{ baseOpacity: 0.5 }}>
          <boxGeometry args={[1.0, 0.04, 0.046]} />
          <meshStandardMaterial color="#02C39A" />
        </mesh>

        {/* Date/time line */}
        <mesh position={[0.15, 0.1, 0]} userData={{ baseOpacity: 0.5 }}>
          <boxGeometry args={[0.8, 0.04, 0.046]} />
          <meshStandardMaterial color="#02C39A" />
        </mesh>

        {/* Detail lines */}
        <mesh position={[0.05, -0.05, 0]} userData={{ baseOpacity: 0.6 }}>
          <boxGeometry args={[0.6, 0.035, 0.046]} />
          <meshStandardMaterial color="#028090" />
        </mesh>
        <mesh position={[0.0, -0.18, 0]} userData={{ baseOpacity: 0.6 }}>
          <boxGeometry args={[0.5, 0.035, 0.046]} />
          <meshStandardMaterial color="#028090" />
        </mesh>

        {/* 10. FOYER LOGO MARK - bottom right of main body */}
        <mesh position={[1.1, -0.42, 0]} userData={{ baseOpacity: 1.0 }}>
          <boxGeometry args={[0.04, 0.22, 0.046]} />
          <meshStandardMaterial
            color="#F0F3BD"
            emissive="#F0F3BD"
            emissiveIntensity={0.3}
          />
        </mesh>
        <mesh position={[1.17, -0.32, 0]} userData={{ baseOpacity: 1.0 }}>
          <boxGeometry args={[0.14, 0.04, 0.046]} />
          <meshStandardMaterial
            color="#F0F3BD"
            emissive="#F0F3BD"
            emissiveIntensity={0.3}
          />
        </mesh>
        <mesh position={[1.15, -0.43, 0]} userData={{ baseOpacity: 1.0 }}>
          <boxGeometry args={[0.1, 0.03, 0.046]} />
          <meshStandardMaterial
            color="#F0F3BD"
            emissive="#F0F3BD"
            emissiveIntensity={0.3}
          />
        </mesh>

        {/* 11. SEAT/SECTION BADGE - bottom of stub */}
        <mesh position={[-1.175, -0.48, 0]} userData={{ baseOpacity: 1.0 }}>
          <boxGeometry args={[0.55, 0.18, 0.046]} />
          <meshStandardMaterial
            color="#02C39A"
            emissive="#02C39A"
            emissiveIntensity={0.25}
            metalness={0.6}
          />
        </mesh>

        {/* 12. HOLOGRAPHIC SHEEN LAYER (thin BoxGeometry at z: 0.022 to avoid PlaneGeometry diagonal lines) */}
        <mesh position={[0, 0, 0.022]} userData={{ baseOpacity: 0.04 }}>
          <boxGeometry args={[3.2, 1.4, 0.001]} />
          <meshStandardMaterial
            color="#00A896"
            metalness={1.0}
            roughness={0}
          />
        </mesh>
      </group>
    </>
  );
}
