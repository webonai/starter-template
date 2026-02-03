import React from 'react';

// 1. Define the Shape of your "Styled Text" object
export type StyledTextData = {
  text: string;
  styles?: {
    fontSize?: string;   // e.g., "text-4xl"
    fontWeight?: string; // e.g., "font-bold"
    color?: string;      // e.g., "#ff0000"
    align?: string;      // e.g., "text-center"
  };
};

interface RichTextProps {
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'; // Allow changing the HTML tag
  data: StyledTextData;
  dataPath?: string; // For the visual editor
  className?: string; // Allow merging extra classes
}

export function RichText({ as: Tag = 'p', data, dataPath, className = '' }: RichTextProps) {
  const { text, styles } = data;
  
  // Default fallbacks to prevent crashes
  const fontSize = styles?.fontSize || 'text-base';
  const fontWeight = styles?.fontWeight || 'font-normal';
  const color = styles?.color || 'currentColor';
  const align = styles?.align || 'text-left';

  return (
    <Tag
      // 2. The Identity Tags for your Editor
      data-path={dataPath}
      data-type="rich-text"
      
      // 3. The "Tailwind-Native" way to handle dynamic colors
      // We set a CSS variable locally, then tell Tailwind to use it.
      style={{ '--dynamic-color': color } as React.CSSProperties}
      
      // 4. Construct the class string
      // text-[var(--dynamic-color)] is valid Tailwind JIT syntax!
      className={`
        ${fontSize} 
        ${fontWeight} 
        ${align} 
        text-[var(--dynamic-color)] 
        ${className}
      `}
    >
      {text}
    </Tag>
  );
}