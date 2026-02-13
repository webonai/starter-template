'use client';

import { useConfig } from '@/context/ConfigContext';
import { useEffect } from 'react';

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const config = useConfig();
  const safeConfig = config as any;
  
  useEffect(() => {
    if (!safeConfig || !safeConfig.theme) return;

    const theme = safeConfig.theme;
    const mode = theme.mode || 'light'; // light or dark
    const themeName = theme.name || 'modern'; // modern, retro, minimalist, luxury, etc.
    const root = document.documentElement;

    // Set theme attributes
    root.setAttribute('data-theme', mode);
    root.setAttribute('data-theme-name', themeName);

    const mapFont = (fontName?: string) => {
      if (!fontName) return 'sans-serif';
      const lower = fontName.toLowerCase();
      
      // Handle retro fonts
      if (lower.includes('press start')) return "'Press Start 2P', cursive";
      if (lower.includes('vt323')) return "'VT323', monospace";
      if (lower.includes('courier')) return "'Courier Prime', monospace";
      
      // Handle editorial/magazine fonts
      if (lower.includes('lora')) return 'var(--font-lora), serif';
      
      // Handle modern fonts
      if (lower.includes('inter')) return 'var(--font-inter)';
      if (lower.includes('playfair')) return 'var(--font-playfair)';
      if (lower.includes('roboto')) return 'var(--font-roboto)';
      
      return fontName;
    };

    // Get colors based on mode
    const colors = theme.colors?.[mode] || {};

    // Set Color variables
    Object.entries(colors).forEach(([key, value]) => {
      const cssVar = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      root.style.setProperty(`--${cssVar}`, value as string);
    });

    // Set Typography variables
    if (theme.typography?.fontFamily) {
      root.style.setProperty('--font-heading-family', mapFont(theme.typography.fontFamily.heading));
      root.style.setProperty('--font-body-family', mapFont(theme.typography.fontFamily.body));
      root.style.setProperty('--font-mono-family', mapFont(theme.typography.fontFamily.mono));
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
        root.style.setProperty(`--radius-${key}`, value as string);
      });
    }

    // Set Shadow variables (mode specific)
    if (theme.shadows?.[mode]) {
      Object.entries(theme.shadows[mode]).forEach(([key, value]) => {
        root.style.setProperty(`--shadow-${key}`, value as string);
      });
    }

    // Set Border Width
    if (theme.borderWidth) {
      Object.entries(theme.borderWidth).forEach(([key, value]) => {
        root.style.setProperty(`--border-width-${key}`, value as string);
      });
      // Set default border width
      root.style.setProperty('--border-width', theme.borderWidth['1'] as string || '1px');
    }

    // Set Theme Effects
    if (theme.effects) {
      root.style.setProperty('--text-shadow', theme.effects.textShadow || 'none');
      root.style.setProperty('--button-transform', theme.effects.buttonTransform || 'none');
    } else {
      root.style.setProperty('--text-shadow', 'none');
      root.style.setProperty('--button-transform', 'none');
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