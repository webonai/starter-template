'use client';

import { useConfig } from '@/context/ConfigContext';
import { useEffect } from 'react';

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const config = useConfig();
  const safeConfig = config as any;
  
  useEffect(() => {
    if (!safeConfig || !safeConfig.theme) return;

    const theme = safeConfig.theme;
    const mode = theme.mode || 'light';
    const root = document.documentElement;

    // Set theme mode
    root.setAttribute('data-theme', mode);

    const mapFont = (fontName?: string) => {
      if (!fontName) return 'sans-serif';
      const lower = fontName.toLowerCase();
      if (lower.includes('inter')) return 'var(--font-inter)';
      if (lower.includes('playfair')) return 'var(--font-playfair)';
      if (lower.includes('roboto')) return 'var(--font-roboto)';
      return fontName;
    };

    // Get colors based on mode
    const colors = theme.colors?.[mode] || theme.colors?.light || {};

    // Set Color variables
    Object.entries(colors).forEach(([key, value]) => {
      const cssVar = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      root.style.setProperty(`--${cssVar}`, value as string);
    });

    // Set Typography variables
    if (theme.typography?.fontFamily) {
      root.style.setProperty('--font-heading-family', mapFont(theme.typography.fontFamily.heading));
      root.style.setProperty('--font-body-family', mapFont(theme.typography.fontFamily.body));
      root.style.setProperty('--font-mono-family', theme.typography.fontFamily.mono || 'monospace');
    }

    // Set Spacing variables
    if (theme.spacing) {
      Object.entries(theme.spacing).forEach(([key, value]) => {
        root.style.setProperty(`--space-${key}`, value as string);
      });
    }

    // Set Border Radius variables
    if (theme.borderRadius) {
      Object.entries(theme.borderRadius).forEach(([key, value]) => {
        root.style.setProperty(`--radius-${key}-val`, value as string);
      });
    }

    // Set Shadow variables
    if (theme.shadows) {
      Object.entries(theme.shadows).forEach(([key, value]) => {
        root.style.setProperty(`--shadow-${key}-val`, value as string);
      });
    }

  }, [safeConfig]);

  if (!safeConfig || !safeConfig.theme) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-background font-body text-foreground">
      {children}
    </div>
  );
}