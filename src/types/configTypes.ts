import { ElementConfig } from '@/types/schema';

// ColorScheme for theme.colors.light and theme.colors.dark
export interface ColorScheme {
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  destructiveForeground: string;
  muted: string;
  mutedForeground: string;
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;
  background: string;
  foreground: string;
  border: string;
  input: string;
  ring: string;
  neutral: string;
}

// Typography for theme.typography
export interface TypographyConfig {
  fontFamily: {
    heading: string;
    body: string;
    mono: string;
  };
  fontSize: Record<string, string>;
  fontWeight: Record<string, string>;
  lineHeight: Record<string, string>;
  letterSpacing: Record<string, string>;
}

// Animation for theme.animation
export interface AnimationConfig {
  duration: Record<string, string>;
  easing: Record<string, string>;
}

// ThemeConfig for theme
export interface ThemeConfig {
  mode: 'light' | 'dark';
  colors: {
    light: ColorScheme;
    dark: ColorScheme;
  };
  typography: TypographyConfig;
  spacing: Record<string, string>;
  borderRadius: Record<string, string>;
  shadows: Record<string, string>;
  borderWidth: Record<string, string>;
  opacity: Record<string, string>;
  transitions: Record<string, string>;
  animation: AnimationConfig;
  breakpoints: Record<string, string>;
  container: {
    padding: string;
    maxWidth: string;
  };
  zIndex: Record<string, string>;
}

// For layout.pages
export interface PageItem {
  title: ElementConfig;
  description: ElementConfig;
}

export interface Social {
  platform: string;
  href: string;
  icon: string;
}

export interface Page {
  slug: string;
  title: string;
  href: string;
  headline?: ElementConfig;
  subtext?: ElementConfig;
  body?: ElementConfig;
  grid?: ElementConfig;
  items?: PageItem[];
  heading?: ElementConfig;
  socials?: Social[];
  [key: string]: unknown;
}

// LayoutConfig for layout
export interface LayoutConfig {
  order: string[];
  hiddenSections?: string[];
  pages?: Page[];
}

export interface SiteConfig {
  meta: {
    siteName: string;
    description?: string;
    favicon?: string;
  };
  theme: ThemeConfig;
  layout: LayoutConfig;
  sections: Record<string, unknown>;
  [key: string]: unknown;
}