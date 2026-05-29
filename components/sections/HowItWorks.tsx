'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { COPY, COLORS, ANIMATION } from '@/lib/constants';
import { StepItem } from '@/components/ui/StepItem';

// Register GSAP ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const lineContainerRef = useRef<HTMLDivElement>(null);

  // GSAP animation for the glowing dot along the horizontal connector line
  useGSAP(() => {
    if (!dotRef.current || !lineContainerRef.current) return;

    gsap.fromTo(
      dotRef.current,
      { left: '0%' },
      {
        left: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',  // Start when section top is 75% down the viewport
          end: 'bottom 40%', // End when section bottom is 40% down the viewport
          scrub: 0.5,        // Smooth scrub feel
        },
      }
    );
  }, { scope: sectionRef });

  // Framer Motion staggered grid animations
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        ease: ANIMATION.easing,
        duration: 0.5,
      },
    },
  };

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative w-full py-[120px] px-4 flex flex-col items-center bg-background z-10 overflow-hidden"
    >
      <div className="max-w-[900px] w-full flex flex-col items-center">
        
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: ANIMATION.easing }}
          className="text-3xl sm:text-4xl md:text-[48px] font-bold text-center text-textPrimary tracking-tight leading-tight select-none mb-16 sm:mb-24"
          style={{
            fontFamily: 'var(--font-inter), sans-serif',
          }}
        >
          {COPY.howItWorks.headline}
        </motion.h2>

        {/* Steps Grid container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="relative w-full flex flex-col sm:flex-row justify-between gap-y-12 sm:gap-x-12 mt-4"
        >
          
          {/* Connector Line Container - Hidden on mobile, visible on desktop */}
          <div
            ref={lineContainerRef}
            className="absolute hidden sm:block h-[1px] bg-rgba"
            style={{
              left: '16.66%',  // Starts from the center of the first item (1/6th)
              right: '16.66%', // Ends at the center of the last item (5/6th)
              top: '20px',     // Centered vertically relative to the 40px bubble
              backgroundColor: 'rgba(2, 195, 154, 0.15)',
              transform: 'translateY(-50%)',
            }}
          >
            <div
              ref={dotRef}
              className="absolute w-2 h-2 rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_#F0F3BD]"
              style={{
                top: '50%',
                backgroundColor: COLORS.gold,
              }}
            />
          </div>

          {/* Render steps list */}
          {COPY.howItWorks.steps.map((step, idx) => (
            <motion.div key={idx} variants={itemVariants} className="flex-1">
              <StepItem num={step.num} text={step.text} />
            </motion.div>
          ))}
          
        </motion.div>
      </div>
    </section>
  );
}
