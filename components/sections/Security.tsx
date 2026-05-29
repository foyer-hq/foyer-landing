'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { COPY, COLORS } from '@/lib/constants';
import NodeGraph from '@/components/ui/NodeGraph';

export default function Security() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const sectionElement = sectionRef.current;
    if (!sectionElement) return;

    // Register GSAP ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Create a pinning ScrollTrigger on the section container.
    // The left column copy remains completely static and visible on load.
    // Pinned scroll journey drives the right-column NodeGraph escrow animation on scroll scrub.
    const scrollTriggerInstance = ScrollTrigger.create({
      trigger: sectionElement,
      start: 'top top',
      end: '+=100%', // Pinned scroll journey height (shortened for snappier transitions)
      pin: true,     // Exclusive pinning handled entirely by GSAP ScrollTrigger
      anticipatePin: 1,
    });

    return () => {
      // Clean up ScrollTrigger instance when component unmounts
      scrollTriggerInstance.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === sectionElement) {
          st.kill();
        }
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="security-section" // Crucial trigger ID targeted by NodeGraph's scroll scrub
      className="relative w-full h-screen flex justify-center items-center z-10 overflow-hidden bg-transparent"
    >
      {/* Foreground copy content grid: STRICT TWO-COLUMN CSS GRID (left = static text, right = node graph, never overlap) */}
      <div className="max-w-[1000px] w-full px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full relative pointer-events-none">
        
        {/* Left Column: Fully Static Text (z-index 10) */}
        <div 
          className="flex flex-col text-left justify-center select-none py-12 md:py-0 pointer-events-auto relative"
          style={{ zIndex: 10 }}
        >
          {/* Label */}
          <span
            className="text-xs font-bold uppercase tracking-[0.2em] mb-4 block"
            style={{
              color: COLORS.violet,
              fontFamily: 'var(--font-inter), sans-serif',
            }}
          >
            {COPY.security.label}
          </span>

          {/* Headline */}
          <h2
            className="text-3xl sm:text-4xl md:text-[44px] font-bold text-textPrimary tracking-tight leading-[1.15] whitespace-pre-line"
            style={{
              fontFamily: 'var(--font-inter), sans-serif',
            }}
          >
            {COPY.security.headline}
          </h2>

          {/* Body Paragraph */}
          <p
            className="text-textMuted text-base leading-relaxed mt-6 max-w-[440px]"
            style={{
              fontFamily: 'var(--font-inter), sans-serif',
            }}
          >
            {COPY.security.body}
          </p>

          {/* Bullet Points with Gold Checkmarks */}
          <ul className="flex flex-col gap-4 mt-8">
            {COPY.security.bullets.map((bullet, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 text-sm text-textPrimary font-medium"
                style={{
                  fontFamily: 'var(--font-inter), sans-serif',
                }}
              >
                {/* Gold Checkmark */}
                <span
                  className="font-bold select-none text-[16px] leading-none"
                  style={{ color: '#D4AF37' }}
                >
                  ✓
                </span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Column: 2D Blockchain Node Graph SVG & Escrow Status Panel */}
        <div className="flex items-center justify-center w-full h-full pointer-events-auto">
          <div 
            className="w-full max-w-[480px] flex flex-col items-center justify-center p-4"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(123, 92, 240, 0.06) 0%, transparent 70%)',
              borderRadius: '16px'
            }}
          >
            <NodeGraph />
          </div>
        </div>
        
      </div>
    </section>
  );
}
