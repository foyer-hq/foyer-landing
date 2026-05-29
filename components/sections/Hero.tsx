'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { COPY, COLORS, ANIMATION } from '@/lib/constants';
import Button from '@/components/ui/Button';

export default function Hero() {
  const transitionSettings = {
    ease: ANIMATION.easing,
    duration: 0.6,
  };

  const handleScrollToHowItWorks = () => {
    const section = document.getElementById('how-it-works');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToWaitlist = () => {
    const section = document.getElementById('waitlist');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center px-6 md:px-16 lg:px-24 z-10 pointer-events-none">
      <div className="max-w-[1200px] w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center pointer-events-auto text-center md:text-left">
        
        {/* Left Column: Hero Text Copy */}
        <div className="flex flex-col items-center md:items-start max-w-[580px] w-full mx-auto md:mx-0">
          {/* 1. Now in Early Access Label */}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transitionSettings, delay: 0.2 }}
            className="text-xs font-bold uppercase tracking-[0.2em] mb-4 select-none"
            style={{
              color: COLORS.violet,
              fontFamily: 'var(--font-inter), sans-serif',
            }}
          >
            {COPY.hero.label}
          </motion.span>

          {/* 2. Main Premium Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transitionSettings, delay: 0.4 }}
            className="text-5xl sm:text-6xl md:text-[68px] lg:text-[76px] font-bold tracking-tight leading-[1.05] whitespace-pre-line text-textPrimary"
            style={{
              fontFamily: 'var(--font-inter), sans-serif',
            }}
          >
            {COPY.hero.titlePart1}
            <br />
            <span className="text-gradient">{COPY.hero.titlePart2}</span>
          </motion.h1>

          {/* 3. Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transitionSettings, delay: 0.6 }}
            className="text-[15px] sm:text-lg text-textMuted mt-6 max-w-[480px] leading-relaxed"
            style={{
              fontFamily: 'var(--font-inter), sans-serif',
            }}
          >
            {COPY.hero.subheadline}
          </motion.p>

          {/* 4. Action Buttons (CTA and Secondary Link) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transitionSettings, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center gap-6 mt-10 w-full sm:w-auto"
          >
            {/* Get Early Access CTA */}
            <Button
              variant="primary"
              onClick={handleScrollToWaitlist}
              className="w-full sm:w-auto h-12 px-8 rounded-md text-sm cursor-pointer select-none transform hover:-translate-y-[2px]"
            >
              {COPY.hero.cta}
            </Button>

            {/* How It Works Link */}
            <Button
              variant="secondary"
              onClick={handleScrollToHowItWorks}
              className="text-sm select-none"
            >
              {COPY.hero.secondaryCta}
            </Button>
          </motion.div>
        </div>

        {/* Right Column: Empty space on desktop to give room for the 3D floating ticket */}
        <div className="hidden md:block w-full h-[360px] lg:h-[420px]" />
      </div>
    </section>
  );
}
