export interface ColorTokens {
  background: string;
  surface: string;
  gold: string;
  violet: string;
  textPrimary: string;
  textMuted: string;
  border: string;
}

export interface AnimationTokens {
  easing: [number, number, number, number];
  durationBase: number;
  durationSlow: number;
  signedUrlExpiry: number;
}

export interface StepItemCopy {
  num: string;
  text: string;
}

export interface FeatureCardCopy {
  icon: 'ticket' | 'arrows-exchange' | 'shield-check';
  title: string;
  body: string;
}

export interface CopyTokens {
  hero: {
    label: string;
    titlePart1: string;
    titlePart2: string;
    subheadline: string;
    cta: string;
    secondaryCta: string;
  };
  trustBar: {
    items: string[];
  };
  howItWorks: {
    headline: string;
    steps: StepItemCopy[];
  };
  features: {
    headline: string;
    cards: FeatureCardCopy[];
  };
  security: {
    label: string;
    headline: string;
    body: string;
    bullets: string[];
  };
  waitlist: {
    headline: string;
    subtext: string;
    placeholder: string;
    cta: string;
    loading: string;
    success: string;
    footer: string;
  };
  footer: {
    logo: string;
    tagline: string;
    links: {
      twitter: string;
      instagram: string;
    };
  };
}

export const COLORS: ColorTokens = {
  background: '#01151f',
  surface: '#022130',
  gold: '#F0F3BD',
  violet: '#02C39A',
  textPrimary: '#ffffff',
  textMuted: '#9abccf',
  border: 'rgba(2, 195, 154, 0.2)',
};

export const ANIMATION: AnimationTokens = {
  easing: [0.4, 0, 0.2, 1],
  durationBase: 0.5,
  durationSlow: 0.8,
  signedUrlExpiry: 900,
};

export const COPY: CopyTokens = {
  hero: {
    label: 'NOW IN EARLY ACCESS',
    titlePart1: 'Your ticket.',
    titlePart2: 'Secured.',
    subheadline: 'Buy, sell, and manage event tickets on a platform built around trust.',
    cta: 'Get Early Access',
    secondaryCta: 'How it works →',
  },
  trustBar: {
    items: [
      'Platform-controlled payments',
      'Watermarked previews',
      'Verified delivery',
    ],
  },
  howItWorks: {
    headline: 'Simple for buyers. Safe for sellers.',
    steps: [
      { num: '01', text: 'Browse or list a ticket in seconds' },
      { num: '02', text: 'Pay securely through the platform' },
      { num: '03', text: 'Receive your ticket instantly after confirmation' },
    ],
  },
  features: {
    headline: 'Built different.',
    cards: [
      {
        icon: 'ticket',
        title: 'Primary ticketing',
        body: 'Buy directly from organisers. QR tickets delivered instantly after payment.',
      },
      {
        icon: 'arrows-exchange',
        title: 'Resale marketplace',
        body: 'Sell your tickets safely. We hold custody until payment clears — no risk for either side.',
      },
      {
        icon: 'shield-check',
        title: 'Trust & security',
        body: 'Every seller tracked. Every ticket verified. Fraud has nowhere to hide.',
      },
    ],
  },
  security: {
    label: 'TRUST & CUSTODY',
    headline: 'We hold the ticket.\nYou hold the power.',
    body: 'Foyer takes custody of every resale ticket the moment it is listed. Buyers only receive access after payment is confirmed. Sellers cannot disappear with your money.',
    bullets: [
      'Ticket held by platform until payment clears',
      'Watermarked previews only — never the real file',
      'Manual review available for disputed transactions',
    ],
  },
  waitlist: {
    headline: 'Be first through the door.',
    subtext: 'Join the waitlist and get your invite when we launch.',
    placeholder: 'your@email.com',
    cta: 'Join Waitlist',
    loading: 'Joining...',
    success: "You're on the list. We'll be in touch.",
    footer: 'No spam. Just your invite when we launch.',
  },
  footer: {
    logo: 'Foyer',
    tagline: 'Events deserve better.',
    links: {
      twitter: '#',
      instagram: '#',
    },
  },
};
