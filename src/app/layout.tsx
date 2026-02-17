import type { Metadata } from "next";
import { Inter, Playfair_Display, Roboto, Lora, Pacifico, Caveat } from "next/font/google";
import "./globals.css";
import { ConfigProvider } from '@/context/ConfigContext';
import ThemeWrapper from './ThemeWrapper';
import ConfigListener from './ConfigListener';
import { getPosts } from '@/lib/blog';

export const metadata: Metadata = {
  icons: { icon: '/favicon.ico' },
};

// Keep font loaders here (Server Side)
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const roboto = Roboto({ weight: "400", subsets: ["latin"], variable: "--font-roboto" });
const lora = Lora({ subsets: ["latin"], variable: "--font-lora" });
const pacifico = Pacifico({ weight: "400", subsets: ["latin"], variable: "--font-pacifico" });
const caveat = Caveat({ subsets: ["latin"], variable: "--font-caveat" });

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const posts = getPosts();

  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} ${roboto.variable} ${lora.variable} ${pacifico.variable} ${caveat.variable}`}>
        {/* 1. Wrap in Provider to share data */}
        <ConfigProvider initialPosts={posts}>
          <ConfigListener />
          {/* 2. Wrap in ThemeWrapper to apply dynamic styles */}
          <ThemeWrapper>
            {children}
          </ThemeWrapper>
        </ConfigProvider>
      </body>
    </html>
  );
}