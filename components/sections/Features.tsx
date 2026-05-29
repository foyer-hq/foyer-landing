'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { COPY, ANIMATION } from '@/lib/constants';
import { FeatureCard } from '@/components/ui/FeatureCard';

export default function Features() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      rotateX: 8,
    },
    show: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        ease: ANIMATION.easing,
        duration: 0.6,
      },
    },
  };

  return (
    <section className="relative w-full py-[120px] px-4 flex flex-col items-center bg-background z-10 overflow-hidden">
      <div className="max-w-[1100px] w-full flex flex-col items-center">
        
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: ANIMATION.easing }}
          className="text-3xl sm:text-4xl md:text-[48px] font-bold text-textPrimary tracking-tight leading-tight select-none mb-16"
          style={{
            fontFamily: 'var(--font-inter), sans-serif',
          }}
        >
          {COPY.features.headline}
        </motion.h2>

        {/* Feature Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="flex flex-col md:flex-row justify-center items-center gap-6 w-full"
        >
          {COPY.features.cards.map((card, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              className="w-full md:w-auto"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <FeatureCard
                icon={card.icon}
                title={card.title}
                body={card.body}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
