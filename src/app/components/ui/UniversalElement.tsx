import React from 'react';
import Link from 'next/link';
import { ElementConfig } from '@/types/schema';

interface Props {
  as?: React.ElementType;
  data?: ElementConfig; // Make data optional ?
  dataPath?: string;
  className?: string;
  children?: React.ReactNode;
}

export function UniversalElement({ 
  as: Tag = 'div', 
  data, // Remove the type assertion here to handle undefined
  dataPath, 
  className = '',
  children 
}: Props) {
  
  // 1. SAFETY CHECK: If data is missing, render nothing or children only
  if (!data) {
    if (children) return <>{children}</>;
    return null;
  }

  // 2. Now it is safe to destructure
  const { text, href, src, alt, styles = {} } = data;

  // ... (Rest of your component logic remains the same) ...
  
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
    className
  ].filter(Boolean).join(' ');

  const inlineStyles: React.CSSProperties = {};
  if (styles.color?.startsWith('#') || styles.color?.startsWith('var')) inlineStyles.color = styles.color;
  if (styles.backgroundColor?.startsWith('#') || styles.backgroundColor?.startsWith('var')) inlineStyles.backgroundColor = styles.backgroundColor;

  // A. Link / Button
  if (href) {
    return (
      <Link 
        href={href}
        className={classes}
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

  // C. Standard Element
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