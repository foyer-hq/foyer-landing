'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COPY, COLORS, ANIMATION } from '@/lib/constants';
import Button from '@/components/ui/Button';

export default function Waitlist() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  // Client-side regex verification for standard emails
  const validateEmail = (val: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(val);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email) {
      setStatus('error');
      setErrorMsg('Please enter an email address.');
      return;
    }

    if (!validateEmail(email)) {
      setStatus('error');
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setStatus('loading');

    // Simulate API delay (placeholder endpoint mock)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Wire to a placeholder console.log for tracking inside development builds
      // But avoid raw console.log in production (we can wrap it in an environment flag check)
      if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.log(`Waitlist submission from: ${email}`);
      }
      
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
      setErrorMsg('Something went wrong. Please try again.');
    }
  };

  return (
    <section
      id="waitlist"
      className="relative w-full py-[140px] px-4 flex flex-col items-center z-10 overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, #01151f 0%, rgba(5, 102, 141, 0.15) 100%)',
      }}
    >
      <div className="max-w-[560px] w-full flex flex-col items-center text-center">
        
        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ease: ANIMATION.easing, duration: 0.6 }}
          className="text-4xl sm:text-5xl md:text-[56px] font-bold text-textPrimary tracking-tight leading-none select-none"
          style={{
            fontFamily: 'var(--font-inter), sans-serif',
          }}
        >
          {COPY.waitlist.headline}
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ease: ANIMATION.easing, duration: 0.6, delay: 0.1 }}
          className="text-textMuted text-[15px] sm:text-base mt-4 max-w-[440px] leading-relaxed"
          style={{
            fontFamily: 'var(--font-inter), sans-serif',
          }}
        >
          {COPY.waitlist.subtext}
        </motion.p>

        {/* Dynamic Form Assembly */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ease: ANIMATION.easing, duration: 0.6, delay: 0.2 }}
          className="w-full mt-10"
        >
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              /* Success Message Overlay */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="py-6 px-8 rounded-xl border flex flex-col items-center justify-center bg-surface"
                style={{
                  borderColor: 'rgba(240, 243, 189, 0.3)',
                }}
              >
                {/* Gold Success Text */}
                <span
                  className="font-bold text-lg text-center"
                  style={{
                    color: COLORS.gold,
                    fontFamily: 'var(--font-inter), sans-serif',
                  }}
                >
                  ✓ {COPY.waitlist.success}
                </span>
              </motion.div>
            ) : (
              /* Input Form Container */
              <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-3 w-full"
              >
                <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
                  {/* Email Input Field */}
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === 'error') setStatus('idle');
                    }}
                    placeholder={COPY.waitlist.placeholder}
                    disabled={status === 'loading'}
                    className="w-full sm:flex-1 h-[52px] bg-surface text-white px-5 rounded-lg border text-[15px] transition-all duration-300 ease-out outline-none placeholder-textMuted disabled:opacity-75 disabled:cursor-not-allowed"
                    style={{
                      borderColor: status === 'error' ? '#EF4444' : 'rgba(240, 243, 189, 0.3)',
                      fontFamily: 'var(--font-inter), sans-serif',
                    }}
                    onFocus={(e) => {
                      if (status !== 'error') {
                        e.target.style.borderColor = COLORS.gold;
                      }
                    }}
                    onBlur={(e) => {
                      if (status !== 'error') {
                        e.target.style.borderColor = 'rgba(240, 243, 189, 0.3)';
                      }
                    }}
                  />

                  {/* Submission Button */}
                  <Button
                    type="submit"
                    variant="primary"
                    loading={status === 'loading'}
                    className="w-full sm:w-auto h-[52px] px-7 rounded-lg text-sm cursor-pointer select-none font-bold"
                  >
                    {COPY.waitlist.cta}
                  </Button>
                </div>

                {/* Local Error feedback overlay */}
                {status === 'error' && (
                  <motion.span
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-xs font-semibold text-left self-start mt-1"
                    style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                  >
                    {errorMsg}
                  </motion.span>
                )}
              </motion.form>
            )}
          </AnimatePresence>

          {/* Under-form Guarantee notice */}
          <span
            className="block text-center text-xs mt-4"
            style={{
              color: COLORS.textMuted,
              fontFamily: 'var(--font-inter), sans-serif',
            }}
          >
            {COPY.waitlist.footer}
          </span>
        </motion.div>
      </div>
    </section>
  );
}
