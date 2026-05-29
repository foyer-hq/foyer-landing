'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { COLORS } from '@/lib/constants';

interface ParticleData {
  pos: THREE.Vector3;
  speed: number;
}

export default function Particles() {
  const count = 120;
  const meshRef = useRef<THREE.InstancedMesh>(null);

  // Initialize random particle physics data
  const particles = useMemo<ParticleData[]>(() => {
    const data: ParticleData[] = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 12; // -6 to 6
      const y = Math.random() * 12 - 4;     // -4 to 8
      const z = Math.random() * 4 - 3;      // -3 to 1
      const speed = Math.random() * 0.004 + 0.002; // 0.002 to 0.006
      data.push({
        pos: new THREE.Vector3(x, y, z),
        speed,
      });
    }
    return data;
  }, []);

  // Shared reusable matrix and color objects to prevent GC thrashing
  const tempMatrix = useMemo(() => new THREE.Matrix4(), []);
  const tempColor = useMemo(() => new THREE.Color(), []);

  // Apply colors and initial positions once the mesh mounts
  React.useEffect(() => {
    if (!meshRef.current) return;

    for (let i = 0; i < count; i++) {
      const p = particles[i];
      // Alternating sunny yellow and seafoam
      const colorHex = Math.random() > 0.5 ? COLORS.gold : COLORS.violet;
      tempColor.set(colorHex);
      meshRef.current.setColorAt(i, tempColor);

      // Set matrix position
      tempMatrix.makeTranslation(p.pos.x, p.pos.y, p.pos.z);
      meshRef.current.setMatrixAt(i, tempMatrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  }, [particles, tempColor, tempMatrix]);

  // Frame-by-frame particle movement loop
  useFrame(() => {
    if (!meshRef.current) return;

    for (let i = 0; i < count; i++) {
      const p = particles[i];

      // Drift upward slowly
      p.pos.y += p.speed;

      // Wrap-around threshold check (exceeds y: 5)
      if (p.pos.y > 5) {
        p.pos.y = -4;
        p.pos.x = (Math.random() - 0.5) * 12;
      }

      // Update position matrix
      tempMatrix.makeTranslation(p.pos.x, p.pos.y, p.pos.z);
      meshRef.current.setMatrixAt(i, tempMatrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined as unknown as THREE.BufferGeometry, undefined as unknown as THREE.Material, count]} castShadow={false} receiveShadow={false}>
      <sphereGeometry args={[0.015, 8, 8]} />
      <meshBasicMaterial
        transparent
        opacity={0.4}
        depthWrite={false}
      />
    </instancedMesh>
  );
}
