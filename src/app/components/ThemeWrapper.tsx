'use client';

import { useConfig } from '@/context/ConfigContext';

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const config = useConfig();
  
  // 1. SAFETY CHECK: If config is missing, just render children without styles
  // This prevents the "White Screen of Death" during loading
  if (!config || !config.theme) {
     return <>{children}</>;
  }

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
        // --- 1. CONFIG DRIVEN VALUES (With Optional Chaining ?.) ---
        '--primary': theme.primary || '#000000',     // Fallback to black
        '--secondary': theme.secondary || '#000000',
        '--accent': theme.accent || '#000000',
        '--neutral': theme.neutral || '#f3f4f6',
        '--radius': theme.radius || '4px',
        '--font-heading': getFontVar(theme.fontHeading),
        '--font-body': getFontVar(theme.fontBody),

        // --- 2. SHADCN DEFAULTS ---
        '--background': '#ffffff',
        '--foreground': '#020817',
        '--muted': '#f1f5f9',
        '--muted-foreground': '#64748b',
        '--card': '#ffffff',
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
        '--ring': theme.primary || '#000000',
      } as React.CSSProperties}
      className="min-h-screen bg-background font-body text-foreground"
    >
      {children}
    </div>
  );
}