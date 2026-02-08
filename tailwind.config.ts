import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/data/config.json"
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(214.3 31.8% 91.4%)",  // HARDCODED TEST
        input: "hsl(214.3 31.8% 91.4%)",
        ring: "hsl(222.2 84% 4.9%)",
        background: "hsl(0 0% 100%)",
        foreground: "hsl(222.2 84% 4.9%)",
        
        primary: {
          DEFAULT: "hsl(222.2 47.4% 11.2%)",  // HARDCODED TEST
          foreground: "hsl(210 40% 98%)",
        },
        secondary: {
          DEFAULT: "hsl(210 40% 96.1%)",  // HARDCODED TEST
          foreground: "hsl(222.2 47.4% 11.2%)",
        },
        destructive: {
          DEFAULT: "hsl(0 84.2% 60.2%)",  // HARDCODED TEST - THIS IS RED
          foreground: "hsl(210 40% 98%)",
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  safelist: [
    {
      pattern: /^(bg|text|border)-(primary|secondary|accent|background|card|muted|destructive|popover|neutral|foreground|border)$/,
      variants: ['hover', 'focus'],
    },
    {
      pattern: /^text-(primary|secondary|accent|card|muted|destructive|popover)-foreground$/,
    },
    'font-heading','font-body','text-left', 'text-center', 'text-right', 'text-justify',
    'text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl', 'text-4xl', 'text-5xl', 'text-6xl',
    'font-light', 'font-normal', 'font-medium', 'font-semibold', 'font-bold', 'font-extrabold',
    { pattern: /^(p|m)(t|b|l|r|x|y)?-(0|1|2|4|6|8|12|16|20|24|32)$/ }
  ],
  plugins: [],
};
export default config;