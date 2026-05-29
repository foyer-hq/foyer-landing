'use client';

import React, { useRef, useState } from 'react';
import { COLORS } from '@/lib/constants';

interface FeatureCardProps {
  icon: 'ticket' | 'arrows-exchange' | 'shield-check';
  title: string;
  body: string;
}

const FeatureCardComponent = ({ icon, title, body }: FeatureCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Computes the rotation matrix angles based on mouse position relative to card center
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Coordinates relative to card center
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    // Normalize coordinates to range [-1, 1]
    const percentX = mouseX / (width / 2);
    const percentY = mouseY / (height / 2);
    
    // Max ±6 degrees of tilt
    setTilt({
      x: -percentY * 6,
      y: percentX * 6,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 }); // reset rotation
  };

  // Render correct SVG icon based on prop
  const renderIcon = () => {
    const commonProps = {
      width: 24,
      height: 24,
      stroke: COLORS.gold,
      strokeWidth: 2,
      strokeLinecap: 'round' as const,
      strokeLinejoin: 'round' as const,
      fill: 'none',
    };

    switch (icon) {
      case 'ticket':
        return (
          <svg {...commonProps} viewBox="0 0 24 24">
            <path d="M15 5l-10 10a2.2 2.2 0 0 0 0 3l3 3a2.2 2.2 0 0 0 3 0l10 -10a2.2 2.2 0 0 0 0 -3l-3 -3a2.2 2.2 0 0 0 -3 0z" />
            <path d="M9 12l2 2" />
            <path d="M13 8l2 2" />
          </svg>
        );
      case 'arrows-exchange':
        return (
          <svg {...commonProps} viewBox="0 0 24 24">
            <path d="M7 10h14l-4 -4" />
            <path d="M17 14h-14l4 4" />
          </svg>
        );
      case 'shield-check':
        return (
          <svg {...commonProps} viewBox="0 0 24 24">
            <path d="M12 3a12 12 0 0 0 8.5 3a12 12 0 0 1 -9 11a12 12 0 0 1 -9 -11a12 12 0 0 0 8.5 -3z" />
            <path d="M9 11l2 2l4 -4" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="w-full sm:w-[320px] rounded-[16px] px-8 py-10 transition-all duration-200 ease-out select-none"
      style={{
        background: 'rgba(2, 33, 48, 0.8)',
        border: `1px solid ${isHovered ? 'rgba(2, 195, 154, 0.5)' : 'rgba(2, 195, 154, 0.2)'}`,
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
      }}
    >
      {/* 48x48 Centered Square Icon Container */}
      <div
        className="flex items-center justify-center w-12 h-12 rounded-lg border transition-colors duration-200"
        style={{
          borderColor: isHovered ? 'rgba(2, 195, 154, 0.6)' : 'rgba(2, 195, 154, 0.3)',
          background: 'rgba(1, 21, 31, 0.5)',
        }}
      >
        {renderIcon()}
      </div>

      {/* Feature Title */}
      <h3
        className="text-textPrimary font-bold text-xl mt-6 transition-colors duration-200"
        style={{
          fontFamily: 'var(--font-inter), sans-serif',
        }}
      >
        {title}
      </h3>

      {/* Feature Body */}
      <p
        className="text-textMuted text-[15px] leading-relaxed mt-3"
        style={{
          fontFamily: 'var(--font-inter), sans-serif',
        }}
      >
        {body}
      </p>
    </div>
  );
};

export const FeatureCard = React.memo(FeatureCardComponent);
FeatureCard.displayName = 'FeatureCard';
