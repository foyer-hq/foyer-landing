'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { COPY, COLORS } from '@/lib/constants';

export default function TrustBar() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="w-full h-14 bg-surface border-t border-b flex items-center justify-center px-4 relative z-10"
      style={{
        borderColor: 'rgba(2, 195, 154, 0.15)',
      }}
    >
      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center">
        {COPY.trustBar.items.map((item, idx) => (
          <React.Fragment key={idx}>
            <span
              className="text-[11px] sm:text-[13px] text-textMuted uppercase tracking-[0.05em] font-medium"
              style={{
                fontFamily: 'var(--font-inter), sans-serif',
              }}
            >
              {item}
            </span>
            {idx < COPY.trustBar.items.length - 1 && (
              <span
                className="font-bold select-none text-[11px] sm:text-[13px]"
                style={{ color: COLORS.gold }}
              >
                ·
              </span>
            )}
          </React.Fragment>
        ))}
      </div>
    </motion.section>
  );
}
