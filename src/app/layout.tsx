import { Inter, Playfair_Display, Roboto } from "next/font/google";
import "./globals.css";
import { ConfigProvider } from '@/context/ConfigContext';
import ThemeWrapper from './ThemeWrapper';
import ConfigListener from './ConfigListener';

// Keep font loaders here (Server Side)
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const roboto = Roboto({ weight: "400", subsets: ["latin"], variable: "--font-roboto" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} ${roboto.variable}`}>
        {/* 1. Wrap in Provider to share data */}
        <ConfigProvider>
          {/* <ConfigListener /> */}
          {/* 2. Wrap in ThemeWrapper to apply dynamic styles */}
          <ThemeWrapper>
            {children}
          </ThemeWrapper>
        </ConfigProvider>
      </body>
    </html>
  );
}