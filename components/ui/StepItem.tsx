'use client';

import React from 'react';
import { COLORS } from '@/lib/constants';

interface StepItemProps {
  num: string;
  text: string;
}

const StepItemComponent = ({ num, text }: StepItemProps) => {
  return (
    <div className="relative flex flex-col items-center text-center z-10 flex-1">
      {/* Circle/Number visual marker */}
      <div
        className="flex items-center justify-center w-10 h-10 rounded-full font-bold text-xs mb-4 shadow-[0_0_10px_rgba(240,243,189,0.15)] border"
        style={{
          color: COLORS.gold,
          borderColor: 'rgba(240, 243, 189, 0.4)',
          backgroundColor: COLORS.surface,
          letterSpacing: '0.15em',
          fontFamily: 'var(--font-inter), sans-serif',
        }}
      >
        {num}
      </div>

      {/* Description text */}
      <p
        className="text-textPrimary text-[15px] sm:text-base font-medium max-w-[240px] leading-snug"
        style={{
          fontFamily: 'var(--font-inter), sans-serif',
        }}
      >
        {text}
      </p>
    </div>
  );
};

export const StepItem = React.memo(StepItemComponent);
StepItem.displayName = 'StepItem';
