'use client';

import { useConfig } from '@/context/ConfigContext';

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const config = useConfig();
  const theme = config.theme;

  const getFontVar = (fontName: string) => {
    switch (fontName) {
      case 'Playfair': return 'var(--font-playfair)';
      case 'Roboto': return 'var(--font-roboto)';
      default: return 'var(--font-inter)';
    }
  };

  return (
    <div
      style={{
        // --- 1. CONFIG DRIVEN VALUES ---
        '--primary': theme.primary,
        '--secondary': theme.secondary,
        '--accent': theme.accent,
        '--neutral': theme.neutral,
        '--radius': theme.radius, // e.g. "0.5rem"
        '--font-heading': getFontVar(theme.fontHeading),
        '--font-body': getFontVar(theme.fontBody),

        // --- 2. SHADCN DEFAULTS (Hardcoded Fallbacks for now) ---
        // You can eventually move these into config.json if you want users to edit them
        '--background': '#f3f3f3',
        '--foreground': '#020817',
        '--muted': '#b1b1b1',
        '--muted-foreground': '#64748b',
        '--card': '#d5d2d2',
        '--card-foreground': '#020817',
        '--popover': '#ffffff',
        '--popover-foreground': '#020817',
        '--border': '#e2e8f0',
        '--input': '#e2e8f0',
        '--primary-foreground': '#ffffff',
        '--secondary-foreground': '#1e293b',
        '--accent-foreground': '#1e293b',
        '--destructive': '#ef4444',
        '--destructive-foreground': '#f8fafc',
        '--ring': theme.primary, // Ring usually matches primary
      } as React.CSSProperties}
      className="min-h-screen bg-background font-body text-foreground"
    >
      {children}
    </div>
  );
}