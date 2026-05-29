'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useFoyerStore } from '@/lib/store';
import FloatingTicket from './FloatingTicket';
import Particles from './Particles';
import StadiumBg from './StadiumBg';

export default function Scene() {
  const scrollProgress = useFoyerStore((state) => state.scrollProgress);

  // Canvas is active only in the hero scroll phase (scrollProgress <= 0.5)
  const isCanvasActive = scrollProgress <= 0.5;

  return (
    <div className="fixed inset-0 w-full h-full z-0 pointer-events-none overflow-hidden bg-background">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        frameloop={isCanvasActive ? 'always' : 'demand'}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          {/* Ambient space background environment */}
          <StadiumBg />

          {/* Background particle system */}
          <Particles />

          {/* Render ticket in the hero scroll phase (scrolled less than 50%) */}
          {scrollProgress <= 0.5 && <FloatingTicket />}
        </Suspense>
      </Canvas>
    </div>
  );
}
