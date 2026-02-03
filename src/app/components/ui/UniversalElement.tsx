import React from 'react';
import Link from 'next/link';
import { ElementConfig, UniversalStyles } from '@/types/schema';

interface Props {
  as?: React.ElementType; // The HTML tag (h1, div, section, a, etc.)
  data: ElementConfig;    // The config object
  dataPath?: string;      // For the Click-to-Edit selector
  className?: string;     // Extra hardcoded classes if needed
  children?: React.ReactNode; // Nested content (for containers)
}

export function UniversalElement({ 
  as: Tag = 'div', 
  data, 
  dataPath, 
  className = '',
  children 
}: Props) {
  const { text, href, src, alt, styles = {} } = data;

  // 1. Construct Tailwind Classes
  // We combine all style properties into one long string.
  // Note: We assume the config values are valid Tailwind classes (e.g. "text-4xl")
  // For raw CSS values (like hex colors), we handle them in the style={} prop.
  const classes = [
    styles.fontSize,
    styles.fontWeight,
    styles.textAlign,
    styles.fontFamily,
    styles.padding,
    styles.margin,
    styles.width,
    styles.height,
    styles.borderRadius,
    styles.border,
    styles.shadow,
    styles.display,
    styles.justifyContent,
    styles.alignItems,
    styles.gap,
    className // Merge external classes
  ].filter(Boolean).join(' ');

  // 2. Handle Dynamic Raw Values (Colors, Backgrounds)
  // If the value starts with '#', 'rgb', or 'var', put it in inline styles.
  // Otherwise, assume it's a Tailwind class (e.g. "bg-white")
  const inlineStyles: React.CSSProperties = {};
  
  if (styles.color?.startsWith('#') || styles.color?.startsWith('var')) {
    inlineStyles.color = styles.color;
  }
  if (styles.backgroundColor?.startsWith('#') || styles.backgroundColor?.startsWith('var')) {
    inlineStyles.backgroundColor = styles.backgroundColor;
  }

  // 3. Render Logic based on Type
  
  // A. Link / Button
  if (href) {
    return (
      <Link 
        href={href}
        className={classes} // Add "hover:opacity-90" etc manually if needed
        style={inlineStyles}
        data-path={dataPath}
        data-type="link"
      >
        {text}
        {children}
      </Link>
    );
  }

  // B. Image
  if (Tag === 'img' || src) {
    return (
      <img 
        src={src} 
        alt={alt || 'Image'} 
        className={classes}
        style={inlineStyles}
        data-path={dataPath}
        data-type="image"
      />
    );
  }

  // C. Standard Element (h1, p, div, section)
  return (
    <Tag 
      className={classes}
      style={inlineStyles}
      data-path={dataPath}
      data-type={text ? 'text' : 'container'}
    >
      {text}
      {children}
    </Tag>
  );
}