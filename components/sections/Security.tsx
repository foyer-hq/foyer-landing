'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { COPY, COLORS, ANIMATION } from '@/lib/constants';

export default function Security() {
  return (
    <section
      className="relative w-full py-[140px] px-4 flex justify-center items-center z-10 overflow-hidden bg-transparent"
    >
      <div className="max-w-[960px] w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Left Column: Trust and Custody Copy */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ ease: ANIMATION.easing, duration: 0.7 }}
          className="flex flex-col text-left"
        >
          {/* Label */}
          <span
            className="text-xs font-bold uppercase tracking-[0.2em] mb-4"
            style={{
              color: COLORS.violet,
              fontFamily: 'var(--font-inter), sans-serif',
            }}
          >
            {COPY.security.label}
          </span>

          {/* Headline */}
          <h2
            className="text-3xl sm:text-4xl md:text-[48px] font-bold text-textPrimary tracking-tight leading-[1.15] whitespace-pre-line"
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
                  style={{ color: COLORS.gold }}
                >
                  ✓
                </span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Right Column: Premium Glowing Vector Shield Illustration */}
        <div className="relative w-full h-[360px] flex items-center justify-center select-none">
          {/* Glowing background halo */}
          <motion.div
            animate={{
              scale: [1, 1.08, 1],
              opacity: [0.3, 0.45, 0.3],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute w-[280px] h-[280px] rounded-full blur-[50px] pointer-events-none"
            style={{
              background: `radial-gradient(circle, rgba(2, 195, 154, 0.2) 0%, rgba(240, 243, 189, 0.05) 70%, transparent 100%)`,
            }}
          />

          {/* Floating Illustration Group */}
          <motion.div
            animate={{
              y: [-8, 8, -8],
              rotate: [-1, 1, -1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="relative flex items-center justify-center z-10 w-[240px] h-[240px]"
          >
            {/* Outer concentric glowing dashed circle */}
            <svg className="absolute w-[240px] h-[240px] animate-[spin_50s_linear_infinite]" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="46"
                fill="none"
                stroke={COLORS.violet}
                strokeWidth="0.75"
                strokeDasharray="4 8"
                opacity="0.35"
              />
            </svg>

            {/* Inner solid thin accent circle */}
            <svg className="absolute w-[200px] h-[200px] opacity-25" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="47"
                fill="none"
                stroke={COLORS.gold}
                strokeWidth="0.5"
              />
            </svg>

            {/* Main Interactive Glassmorphic Shield */}
            <div
              className="absolute w-36 h-36 rounded-2xl flex items-center justify-center border backdrop-blur-md transition-all duration-300 hover:scale-105"
              style={{
                background: 'rgba(2, 33, 48, 0.65)',
                borderColor: 'rgba(2, 195, 154, 0.25)',
                boxShadow: '0 8px 32px 0 rgba(1, 21, 31, 0.5), inset 0 0 15px rgba(2, 195, 154, 0.05)',
              }}
            >
              {/* Premium Shield and Lock SVG Graphic */}
              <svg
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-300 hover:rotate-2"
              >
                {/* Shield Path */}
                <path
                  d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
                  stroke={COLORS.violet}
                  fill="rgba(2, 195, 154, 0.05)"
                  className="drop-shadow-[0_0_8px_rgba(2,195,154,0.3)]"
                />
                {/* Ticket Emblem inside shield */}
                <path
                  d="M9 10h6a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1H9a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1z"
                  stroke={COLORS.gold}
                  strokeWidth="1.25"
                />
                <circle cx="9" cy="12" r="0.75" fill={COLORS.gold} />
                <circle cx="15" cy="12" r="0.75" fill={COLORS.gold} />
              </svg>
            </div>
            
          </motion.div>
        </div>
        
      </div>
    </section>
  );
}
