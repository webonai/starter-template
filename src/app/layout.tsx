import { Inter, Playfair_Display, Roboto, Lora } from "next/font/google";
import "./globals.css";
import { ConfigProvider } from '@/context/ConfigContext';
import ThemeWrapper from './ThemeWrapper';
import ConfigListener from './ConfigListener';
import { getPosts } from '@/lib/blog';

// Keep font loaders here (Server Side)
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const roboto = Roboto({ weight: "400", subsets: ["latin"], variable: "--font-roboto" });
const lora = Lora({ subsets: ["latin"], variable: "--font-lora" });

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const posts = getPosts();

  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} ${roboto.variable} ${lora.variable}`}>
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