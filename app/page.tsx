'use client';

import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useFoyerStore } from '@/lib/store';

// Foreground HTML Section components
import Hero from '@/components/sections/Hero';
import TrustBar from '@/components/sections/TrustBar';
import HowItWorks from '@/components/sections/HowItWorks';
import Features from '@/components/sections/Features';
import Security from '@/components/sections/Security';
import Waitlist from '@/components/sections/Waitlist';
import Footer from '@/components/sections/Footer';

// Load R3F Canvas dynamically with SSR disabled to prevent client-server hydration mismatch
const Scene = dynamic(() => import('@/components/three/Scene'), {
  ssr: false,
});

// Register GSAP plugins in a safe environment check
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const setScrollProgress = useFoyerStore((state) => state.setScrollProgress);

  useEffect(() => {
    // Ensure the document has loaded before setting up scroll trigger bounds
    let scrollTriggerInstance: ScrollTrigger | null = null;

    const setupScrollTrigger = () => {
      scrollTriggerInstance = ScrollTrigger.create({
        trigger: document.documentElement,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5,
        onUpdate: (self) => {
          // self.progress is a normalized float between 0.0 and 1.0
          setScrollProgress(self.progress);
        },
      });
    };

    // Initialize tracking
    setupScrollTrigger();

    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    // Recalculate ScrollTrigger parameters on window resize
    window.addEventListener('resize', handleResize);

    return () => {
      if (scrollTriggerInstance) {
        scrollTriggerInstance.kill();
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [setScrollProgress]);

  return (
    <div className="relative w-full overflow-x-hidden bg-transparent">
      {/* 3D WebGL Canvas Layer (Fixed Background) */}
      <Scene />

      {/* Foreground Sections Layer */}
      <div className="relative w-full flex flex-col z-10 pointer-events-none">
        {/* Pointer-events auto on children allows scrolling/clicking inside buttons */}
        <div className="pointer-events-auto">
          <Hero />
        </div>
        <div className="pointer-events-auto">
          <TrustBar />
        </div>
        <div className="pointer-events-auto">
          <HowItWorks />
        </div>
        <div className="pointer-events-auto">
          <Features />
        </div>
        <div className="pointer-events-auto">
          <Security />
        </div>
        <div className="pointer-events-auto">
          <Waitlist />
        </div>
        <div className="pointer-events-auto">
          <Footer />
        </div>
      </div>
    </div>
  );
}
