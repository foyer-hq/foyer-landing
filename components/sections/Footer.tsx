'use client';

import React from 'react';
import { COPY, COLORS } from '@/lib/constants';

export default function Footer() {
  return (
    <footer
      className="w-full bg-surface border-t relative z-10 flex items-center px-6 md:px-12 py-6 md:py-0 md:h-20"
      style={{
        borderColor: 'rgba(2, 195, 154, 0.12)',
      }}
    >
      <div className="max-w-[1200px] w-full mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left Column: Logotype */}
        <div className="flex items-center">
          <span
            className="text-white text-lg font-bold tracking-tight select-none cursor-pointer"
            style={{
              fontFamily: 'var(--font-inter), sans-serif',
            }}
          >
            {COPY.footer.logo}
          </span>
        </div>

        {/* Center Column: Tagline */}
        <div className="flex items-center text-center">
          <span
            className="text-[13px]"
            style={{
              color: COLORS.textMuted,
              fontFamily: 'var(--font-inter), sans-serif',
            }}
          >
            {COPY.footer.tagline}
          </span>
        </div>

        {/* Right Column: Social Links */}
        <div className="flex items-center gap-5">
          {/* Twitter / X */}
          <a
            href={COPY.footer.links.twitter}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter Link"
            className="text-textMuted hover:text-gold transition-colors duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
              <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
            </svg>
          </a>

          {/* Instagram */}
          <a
            href={COPY.footer.links.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram Link"
            className="text-textMuted hover:text-gold transition-colors duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>
        </div>
        
      </div>
    </footer>
  );
}
