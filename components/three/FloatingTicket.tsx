'use client';

import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { COLORS } from '@/lib/constants';
import { useFoyerStore } from '@/lib/store';

export default function FloatingTicket() {
  const groupRef = useRef<THREE.Group>(null);
  const mainMeshRef = useRef<THREE.Mesh>(null);
  const wireframeMeshRef = useRef<THREE.Mesh>(null);
  const mainMaterialRef = useRef<THREE.MeshStandardMaterial>(null);
  const wireframeMaterialRef = useRef<THREE.MeshBasicMaterial>(null);

  // Retrieve scrollProgress from Zustand
  const scrollProgress = useFoyerStore((state) => state.scrollProgress);

  // Entry animation parameters
  const entryOffset = useRef({ y: -3 });
  const continuousRotation = useRef(0);

  // Accumulate frame delta time to bypass THREE.Clock deprecation warnings
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
    const targetScale = isDesktop ? 1.15 : 0.8;

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
    // Slow continuous accumulation for Y rotation
    continuousRotation.current += 0.003;

    // Sinusoidal vertical bobbing
    const floatY = Math.sin(elapsedTime.current * 0.5) * 0.08;
    const finalTargetY = entryOffset.current.y + targetY + floatY;
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      finalTargetY,
      0.08
    );

    // --- MOUSE PARALLAX TILT ---
    // state.pointer ranges from -1 to 1 across viewport
    const targetTiltX = -state.pointer.y * 0.15; // Max tilt X (pitch)
    const targetTiltY = state.pointer.x * 0.15;  // Max tilt Y (yaw)

    // Lerp the rotations for fluid lag effect
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetTiltX,
      0.08
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      continuousRotation.current + targetTiltY,
      0.08
    );

    // --- SCROLL TRANSFORMATIONS (0 to 0.3 progress) ---
    // Normalize scrollProgress to [0, 0.3] interval
    const normalizedScroll = Math.min(1, Math.max(0, scrollProgress / 0.3));

    // Interpolate depth (Z: 0 to -8)
    groupRef.current.position.z = -8 * normalizedScroll;

    // Interpolate opacity (1 to 0)
    const targetOpacity = 1 - normalizedScroll;
    
    if (mainMaterialRef.current) {
      mainMaterialRef.current.opacity = targetOpacity;
    }
    if (wireframeMaterialRef.current) {
      wireframeMaterialRef.current.opacity = targetOpacity;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main Ticket Mesh */}
      <mesh ref={mainMeshRef} castShadow receiveShadow>
        <boxGeometry args={[2.4, 1.1, 0.04]} />
        <meshStandardMaterial
          ref={mainMaterialRef}
          color="#1a1a1a"
          metalness={0.6}
          roughness={0.3}
          emissive={COLORS.gold}
          emissiveIntensity={0.08}
          transparent
          opacity={1}
        />
      </mesh>

      {/* Wireframe Gold Border Mesh (slightly larger box) */}
      <mesh ref={wireframeMeshRef}>
        <boxGeometry args={[2.42, 1.12, 0.042]} />
        <meshBasicMaterial
          ref={wireframeMaterialRef}
          color={COLORS.gold}
          wireframe
          transparent
          opacity={1}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
