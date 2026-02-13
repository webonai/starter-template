// src/types/schema.ts

export type UniversalStyles = {
  // Typography
  fontSize?: string;       // e.g. "text-4xl"
  fontWeight?: string;     // e.g. "font-bold"
  color?: string;          // e.g. "#111827" or "text-primary"
  textAlign?: string;      // e.g. "text-center"
  fontFamily?: string;     // e.g. "font-heading"
  
  // Box Model (Spacing & Sizing)
  padding?: string;        // e.g. "py-20 px-4"
  margin?: string;         // e.g. "mb-6"
  width?: string;          // e.g. "w-full" or "max-w-2xl"
  height?: string;         // e.g. "h-full"
  
  // Visuals
  backgroundColor?: string; // e.g. "#ffffff" or "bg-white"
  borderRadius?: string;    // e.g. "rounded-md"
  border?: string;          // e.g. "border border-gray-200"
  shadow?: string;          // e.g. "shadow-lg"
  
  // Flex/Grid (For Containers)
  display?: string;        // e.g. "flex"
  justifyContent?: string; // e.g. "justify-center"
  alignItems?: string;     // e.g. "items-center"
  gap?: string;            // e.g. "gap-x-6"
};

export type ElementConfig = {
  enabled?: boolean; // For conditional rendering
  // Content
  text?: string;
  src?: string;     // For images
  alt?: string;     // For images
  href?: string;    // For links/buttons
  icon?: string;    // For icon names
  className?: string; // Tailwind classes
  
  // The Universal Styles
  styles?: UniversalStyles;
  
  // Interactive States (Hover) - Optional advanced feature
  hoverStyles?: UniversalStyles; 
};