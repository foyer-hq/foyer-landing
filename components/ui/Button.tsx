'use client';

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  loading?: boolean;
  children: React.ReactNode;
}

export default function Button({
  variant = 'primary',
  loading = false,
  children,
  className = '',
  ...props
}: ButtonProps) {
  if (variant === 'primary') {
    return (
      <button
        className={`relative flex items-center justify-center font-bold text-[#01151f] btn-gradient border-none shadow-lg hover:shadow-[0_0_15px_rgba(2,195,154,0.4)] active:translate-y-0 transition-all duration-300 ease-out outline-none disabled:opacity-70 disabled:cursor-not-allowed ${className}`}
        style={{
          fontFamily: 'var(--font-inter), sans-serif',
        }}
        disabled={loading}
        {...props}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg
              className="animate-spin h-5 w-5 text-background"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Joining...</span>
          </span>
        ) : (
          children
        )}
      </button>
    );
  }

  // Secondary Button / Unterminated Link Action
  return (
    <button
      className={`text-textMuted hover:text-textPrimary transition-colors duration-300 font-medium relative group flex items-center justify-center cursor-pointer outline-none bg-transparent border-none ${className}`}
      {...props}
    >
      <span className="relative">
        {children}
        <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-textMuted group-hover:w-full transition-all duration-300" />
      </span>
    </button>
  );
}
