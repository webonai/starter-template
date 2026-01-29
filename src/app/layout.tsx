import { Inter, Playfair_Display, Roboto } from "next/font/google";
import "./globals.css";
import config from '@/data/config.json';

// 1. Load the fonts you want to support
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const roboto = Roboto({ weight: "400", subsets: ["latin"], variable: "--font-roboto" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  
  // 2. Logic to pick the font variable based on JSON
  // If config says "Inter", use var(--font-inter)
  const getFontVar = (fontName: string) => {
    switch (fontName) {
      case 'Playfair': return 'var(--font-playfair)';
      case 'Roboto': return 'var(--font-roboto)';
      default: return 'var(--font-inter)';
    }
  };

  return (
    <html lang="en">
      <body
        // 3. Inject all font loaders so the files are available
        className={`${inter.variable} ${playfair.variable} ${roboto.variable}`}
        style={{
          // 4. Map your generic Token to the specific Font
          '--font-heading': getFontVar(config.theme.fontHeading),
          '--font-body': getFontVar(config.theme.fontBody),

          // 5. Colors & Radius
          '--primary': config.theme.primaryColor,
          '--secondary': config.theme.secondaryColor,
          '--accent': config.theme.accentColor,
          '--radius': config.theme.borderRadius + 'px',
        } as React.CSSProperties}
      >
        {children}
      </body>
    </html>
  );
}