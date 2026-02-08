'use client';

import { useConfig } from '@/context/ConfigContext';
import { useEffect } from 'react';

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const config = useConfig();
  const safeConfig = config as any;
  
  useEffect(() => {
    if (!safeConfig || !safeConfig.theme) return;

    const theme = safeConfig.theme;
    const root = document.documentElement;

    const mapFont = (fontName?: string) => {
      if (!fontName) return 'sans-serif';
      const lower = fontName.toLowerCase();
      if (lower.includes('inter')) return 'var(--font-inter)';
      if (lower.includes('playfair')) return 'var(--font-playfair)';
      if (lower.includes('roboto')) return 'var(--font-roboto)';
      return fontName;
    };

    // Set CSS variables directly on :root
    root.style.setProperty('--primary', theme.primary || '#000000');
    root.style.setProperty('--secondary', theme.secondary || '#1e293b');
    root.style.setProperty('--accent', theme.accent || '#10b981');
    root.style.setProperty('--neutral', theme.neutral || '#f3f4f6');
    root.style.setProperty('--destructive', theme.destructive || '#ef4444');
    root.style.setProperty('--muted', theme.muted || '#f1f5f9');
    root.style.setProperty('--popover', theme.popover || '#ffffff');
    root.style.setProperty('--card', theme.card || '#ffffff');
    root.style.setProperty('--border', theme.border || '#e2e8f0');
    root.style.setProperty('--input', theme.input || '#e2e8f0');
    root.style.setProperty('--ring', theme.ring || '#4f46e5');
    root.style.setProperty('--background', theme.background || '#ffffff');
    root.style.setProperty('--foreground', theme.foreground || '#020817');
    root.style.setProperty('--primary-foreground', theme.primaryForeground || '#ffffff');
    root.style.setProperty('--secondary-foreground', theme.secondaryForeground || '#f8fafc');
    root.style.setProperty('--accent-foreground', theme.accentForeground || '#1e293b');
    root.style.setProperty('--destructive-foreground', theme.destructiveForeground || '#f8fafc');
    root.style.setProperty('--muted-foreground', theme.mutedForeground || '#64748b');
    root.style.setProperty('--card-foreground', theme.cardForeground || '#020817');
    root.style.setProperty('--popover-foreground', theme.popoverForeground || '#020817');
    root.style.setProperty('--font-heading-family', mapFont(theme.fontHeading));
    root.style.setProperty('--font-body-family', mapFont(theme.fontBody));
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