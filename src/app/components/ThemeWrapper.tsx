'use client';

import { useConfig } from '@/context/ConfigContext';

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const config = useConfig(); // <--- This updates live!

  // Your existing font logic, moved here
  const getFontVar = (fontName: string) => {
    switch (fontName) {
      case 'Playfair': return 'var(--font-playfair)';
      case 'Roboto': return 'var(--font-roboto)';
      default: return 'var(--font-inter)';
    }
  };

  return (
    <div
      // We apply the styles to this wrapper div instead of the <body>
      // This allows it to update instantly without a page reload.
      style={{
        '--font-heading': getFontVar(config.theme.fontHeading),
        '--font-body': getFontVar(config.theme.fontBody),
        '--primary': config.theme.primaryColor,
        '--secondary': config.theme.secondaryColor,
        '--accent': config.theme.accentColor,
        '--radius': `${config.theme.borderRadius}px`,
      } as React.CSSProperties}
      className="min-h-screen font-body text-gray-900" 
    >
      {children}
    </div>
  );
}