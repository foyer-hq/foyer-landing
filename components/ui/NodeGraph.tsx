'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const NodeGraph: React.FC = () => {
  const tl = useRef<gsap.core.Timeline | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const goldDotRef = useRef<SVGCircleElement | null>(null);
  const tealDotRef = useRef<SVGCircleElement | null>(null);
  const platformRingRef = useRef<SVGCircleElement | null>(null);
  const buyerRingRef = useRef<SVGCircleElement | null>(null);

  // Refs for node outer rings to highlight active nodes
  const sellerOuterRingRef = useRef<SVGCircleElement | null>(null);
  const platformOuterRingRef = useRef<SVGCircleElement | null>(null);
  const buyerOuterRingRef = useRef<SVGCircleElement | null>(null);

  // Escrow journey content panel states
  const [activeState, setActiveState] = useState<{
    title: string;
    titleColor: string;
    body: string;
  }>({
    title: "Ticket listed",
    titleColor: "#C9A84C",
    body: "Seller uploads the ticket. Foyer takes custody immediately."
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    const triggerEl = document.getElementById('security-section');
    if (!triggerEl) return;

    // Create a timeline that is scrub-driven by the parent section container scroll bounds
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: triggerEl,
        start: 'top top',
        end: '+=100%',
        scrub: 0.5,
        onUpdate: (self) => {
          const p = self.progress;
          
          // Snappily update state content based on the scroll position
          let stateIdx = 1;
          if (p >= 0.70) {
            stateIdx = 3;
          } else if (p >= 0.35) {
            stateIdx = 2;
          }
          
          if (stateIdx === 1) {
            setActiveState({
              title: "Ticket listed",
              titleColor: "#C9A84C",
              body: "Seller uploads the ticket. Foyer takes custody immediately."
            });
          } else if (stateIdx === 2) {
            setActiveState({
              title: "Held in escrow",
              titleColor: "#7B5CF0",
              body: "Sits with Foyer until payment clears. Neither party can touch it."
            });
          } else if (stateIdx === 3) {
            setActiveState({
              title: "Ticket released",
              titleColor: "#00c896",
              body: "Payment confirmed. Buyer receives access. Seller gets paid."
            });
          }
        }
      }
    });

    // Set initial states
    gsap.set(goldDotRef.current, { cx: 118, cy: 160, fill: '#C9A84C', opacity: 1 });
    gsap.set(tealDotRef.current, { cx: 390, cy: 160, opacity: 0 });
    gsap.set(platformRingRef.current, { scale: 1, opacity: 0 });
    gsap.set(buyerRingRef.current, { scale: 1, opacity: 0 });
    
    gsap.set(sellerOuterRingRef.current, { opacity: 0.7 });
    gsap.set(platformOuterRingRef.current, { opacity: 0.3 });
    gsap.set(buyerOuterRingRef.current, { opacity: 0.3 });

    const platformInner = document.getElementById('platform-inner-ring');

    // Journey sequence scrubbed across 0 -> 10 duration:
    
    // --- Step 1: Gold dot travels Seller -> Platform (0 to 3.5) ---
    timeline.to(goldDotRef.current, {
      cx: 206,
      duration: 3.5,
      ease: 'none'
    }, 0)
    .to(goldDotRef.current, {
      cx: 240,
      duration: 0.5,
      ease: 'none'
    }, 3.5);

    // Dynamic Ring Highlights on Scroll:
    // Transition Seller -> Platform ring highlights at 3.5
    timeline.to(sellerOuterRingRef.current, { opacity: 0.3, duration: 0.5 }, 3.5);
    timeline.to(platformOuterRingRef.current, { opacity: 0.7, duration: 0.5 }, 3.5);

    // --- Step 2: Escrow pulses at Center (4.0 to 6.0) ---
    if (platformInner) {
      timeline.to(platformInner, {
        strokeOpacity: 0.2,
        duration: 0.5,
        yoyo: true,
        repeat: 3,
        ease: 'none'
      }, 4.0);
    }

    // --- Step 3: Payment confirmation: Teal dot travels LEFT from Buyer to Platform (5.0 to 6.5) ---
    timeline.to(tealDotRef.current, { opacity: 1, duration: 0.1 }, 4.9);
    timeline.to(tealDotRef.current, {
      cx: 240,
      duration: 1.5,
      ease: 'none'
    }, 5.0);

    // --- Step 4: Shockwave ring pulse at center (6.5 to 7.0) ---
    timeline.to(tealDotRef.current, { opacity: 0, duration: 0.1 }, 6.5);
    timeline.fromTo(platformRingRef.current,
      { scale: 1, opacity: 0.6 },
      { scale: 1.8, opacity: 0, duration: 0.5, ease: 'none', svgOrigin: '240 160' },
      6.5
    );
    timeline.fromTo(buyerRingRef.current,
      { scale: 1, opacity: 0.6 },
      { scale: 1.8, opacity: 0, duration: 0.5, ease: 'none', svgOrigin: '390 160' },
      6.5
    );

    // --- Step 5: Original gold dot resumes travel from Platform to Buyer (7.0 to 9.5) ---
    timeline.set(goldDotRef.current, { cx: 274 }, 6.9);
    
    // Transition Platform -> Buyer ring highlights at 6.9
    timeline.to(platformOuterRingRef.current, { opacity: 0.3, duration: 0.5 }, 6.9);
    timeline.to(buyerOuterRingRef.current, { opacity: 0.7, duration: 0.5 }, 6.9);

    timeline.to(goldDotRef.current, {
      cx: 362,
      duration: 2.5,
      ease: 'none'
    }, 7.0);
    // Color transitions from gold (#C9A84C) to teal (#00c896)
    timeline.to(goldDotRef.current, {
      fill: '#00c896',
      duration: 2.5,
      ease: 'none'
    }, 7.0);

    // --- Step 6: Dot fades out at Buyer position (9.5 to 10) ---
    timeline.to(goldDotRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: 'none'
    }, 9.5);

    tl.current = timeline;

    return () => {
      timeline.kill();
    };
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      {/* SVG Node Graph */}
      <svg
        viewBox="0 0 480 320"
        width="100%"
        height="100%"
        style={{ display: 'block' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Glow Filters for travelling nodes */}
          <filter id="glowGold" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <filter id="glowTeal" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          {/* Faint Fintech Grid Pattern */}
          <pattern id="grid" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="12" cy="12" r="0.8" fill="#ffffff" opacity="0.04"/>
          </pattern>

          {/* CSS Embedded Animation Styling */}
          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes sellerPulse {
              0% {
                transform: scale(1);
                opacity: 0.4;
              }
              100% {
                transform: scale(1.6);
                opacity: 0;
              }
            }
            .seller-pulse-circle {
              transform-origin: 90px 160px;
              animation: sellerPulse 2.5s infinite linear;
            }

            @keyframes diamondPulse {
              0%, 100% { opacity: 0.2; }
              50% { opacity: 0.6; }
            }
            .d-pulse-0 { animation: diamondPulse 2s infinite ease-in-out; animation-delay: 0s; }
            .d-pulse-1 { animation: diamondPulse 2s infinite ease-in-out; animation-delay: 0.3s; }
            .d-pulse-2 { animation: diamondPulse 2s infinite ease-in-out; animation-delay: 0.6s; }
          `}} />
        </defs>

        {/* Background grid */}
        <rect width="480" height="320" fill="url(#grid)" rx="16"/>

        {/* EDGES */}
        {/* Left Edge (Seller -> Platform) */}
        <g>
          <line x1="118" y1="160" x2="206" y2="160" stroke="#C9A84C" strokeWidth="0.5" opacity="0.15" />
          <line x1="118" y1="160" x2="206" y2="160" stroke="#C9A84C" strokeWidth="1" strokeDasharray="4 4" opacity="0.25" />
        </g>

        {/* Right Edge (Platform -> Buyer) */}
        <g>
          <line x1="274" y1="160" x2="362" y2="160" stroke="#00c896" strokeWidth="0.5" opacity="0.15" />
          <line x1="274" y1="160" x2="362" y2="160" stroke="#00c896" strokeWidth="1" strokeDasharray="4 4" opacity="0.25" />
        </g>

        {/* EDGE DIAMONDS */}
        {/* Left diamonds */}
        <rect className="d-pulse-0" x="143" y="158" width="4" height="4" fill="#C9A84C" transform="rotate(45 145 160)" />
        <rect className="d-pulse-1" x="160" y="158" width="4" height="4" fill="#C9A84C" transform="rotate(45 162 160)" />
        <rect className="d-pulse-2" x="177" y="158" width="4" height="4" fill="#C9A84C" transform="rotate(45 179 160)" />

        {/* Right diamonds */}
        <rect className="d-pulse-0" x="297" y="158" width="4" height="4" fill="#00c896" transform="rotate(45 299 160)" />
        <rect className="d-pulse-1" x="314" y="158" width="4" height="4" fill="#00c896" transform="rotate(45 316 160)" />
        <rect className="d-pulse-2" x="331" y="158" width="4" height="4" fill="#00c896" transform="rotate(45 333 160)" />

        {/* NODES */}
        {/* SELLER NODE */}
        <g>
          {/* Outer static ring */}
          <circle ref={sellerOuterRingRef} cx="90" cy="160" r="36" fill="none" stroke="#C9A84C" strokeWidth="1" opacity="0.3" />
          {/* Pulsing ring */}
          <circle className="seller-pulse-circle" cx="90" cy="160" r="36" fill="none" stroke="#C9A84C" strokeWidth="1" />
          {/* Inner circle container */}
          <circle cx="90" cy="160" r="28" fill="#0f1a0f" stroke="#C9A84C" strokeWidth="1.5" />
          {/* Ticket icon path */}
          <path d="M80,156 h20 M80,156 v8 h20 v-8" stroke="#C9A84C" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          {/* Label */}
          <text x="90" y="208" fill="#9A9A94" fontSize="10" fontFamily="var(--font-inter), sans-serif" letterSpacing="2" textAnchor="middle">SELLER</text>
        </g>

        {/* PLATFORM NODE */}
        <g>
          {/* Outer static ring */}
          <circle ref={platformOuterRingRef} cx="240" cy="160" r="44" fill="none" stroke="#7B5CF0" strokeWidth="1" opacity="0.3" />
          {/* One shot pulse ring */}
          <circle ref={platformRingRef} cx="240" cy="160" r="44" fill="none" stroke="#7B5CF0" strokeWidth="1.5" />
          {/* Inner circle containers */}
          <circle cx="240" cy="160" r="34" fill="#0d0d1a" stroke="#7B5CF0" strokeWidth="2" />
          <circle id="platform-inner-ring" cx="240" cy="160" r="26" fill="none" stroke="#7B5CF0" strokeWidth="0.5" strokeOpacity="0.5" />
          {/* Shield icon path */}
          <path d="M240,146 l-10,4 v8 c0,5 10,10 10,10 c0,0 10,-5 10,-10 v-8 z" stroke="#7B5CF0" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          {/* Label */}
          <text x="240" y="216" fill="#9A9A94" fontSize="10" fontFamily="var(--font-inter), sans-serif" letterSpacing="2" textAnchor="middle">FOYER</text>
          <text x="240" y="228" fill="#7B5CF0" fontSize="8" fontFamily="var(--font-inter), sans-serif" letterSpacing="3" textAnchor="middle">ESCROW</text>
          
          {/* Secured status pill */}
          <rect x="210" y="238" width="60" height="14" rx="7" fill="#7B5CF0" opacity="0.15" stroke="#7B5CF0" strokeWidth="0.5" />
          <text x="240" y="248" fill="#7B5CF0" fontSize="7" fontFamily="var(--font-inter), sans-serif" letterSpacing="2" textAnchor="middle">SECURED</text>
        </g>

        {/* BUYER NODE */}
        <g>
          {/* Outer static ring */}
          <circle ref={buyerOuterRingRef} cx="390" cy="160" r="36" fill="none" stroke="#00c896" strokeWidth="1" opacity="0.3" />
          {/* One shot pulse ring */}
          <circle ref={buyerRingRef} cx="390" cy="160" r="36" fill="none" stroke="#00c896" strokeWidth="1.5" />
          {/* Inner circle container */}
          <circle cx="390" cy="160" r="28" fill="#0a1a16" stroke="#00c896" strokeWidth="1.5" />
          {/* User icon */}
          <circle cx="390" cy="150" r="5" fill="#00c896" />
          <path d="M382,164 c0,-6 16,-6 16,0" fill="#00c896" />
          {/* Label */}
          <text x="390" y="208" fill="#9A9A94" fontSize="10" fontFamily="var(--font-inter), sans-serif" letterSpacing="2" textAnchor="middle">BUYER</text>
        </g>

        {/* ANIMATED TRAVELLING DOTS */}
        {/* Seller -> Platform gold ticket dot */}
        <circle
          ref={goldDotRef}
          cx="118"
          cy="160"
          r="5"
          fill="#C9A84C"
          filter="url(#glowGold)"
        />

        {/* Buyer -> Platform confirmation payment dot (moves LEFT) */}
        <circle
          ref={tealDotRef}
          cx="390"
          cy="160"
          r="4"
          fill="#00c896"
          filter="url(#glowTeal)"
        />
      </svg>

      {/* Escrow Status Content Panel (Updates in sync with GSAP timeline steps) */}
      <div 
        ref={contentRef}
        style={{ 
          textAlign: "center", 
          height: 80, 
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
          marginTop: 24
        }}
      >
        <span style={{ 
          fontSize: 15, 
          fontWeight: 600, 
          color: activeState.titleColor,
          letterSpacing: "0.04em",
          transition: "color 0.2s ease"
        }}>
          {activeState.title}
        </span>
        <span style={{ 
          fontSize: 13, 
          color: "#9A9A94", 
          lineHeight: 1.6,
          maxWidth: 280,
          textAlign: "center"
        }}>
          {activeState.body}
        </span>
      </div>
    </div>
  );
};
export default NodeGraph;
