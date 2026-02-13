'use client';

import { editable } from '@/lib/editable';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FooterProps } from './types';

export default function Footer({ data }: FooterProps) {
  const [svgContent, setSvgContent] = useState<string>('');

  useEffect(() => {
    if (data?.logo?.src?.endsWith('.svg')) {
      fetch(data.logo.src)
        .then(res => res.text())
        .then(svg => setSvgContent(svg))
        .catch(() => setSvgContent(''));
    } else {
      setSvgContent('');
    }
  }, [data?.logo?.src]);

  if (!data) return null;

  return (
    <footer data-section="footer" {...editable(data.container, "sections.footer.container", "section", "bg-background")}>
      <div {...editable(data.innerWrapper, "sections.footer.innerWrapper", "container", "container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16")}>
        <div {...editable(data.mainContent, "sections.footer.mainContent", "container", "grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-12")}>
          
          {/* Brand Column */}
          <div {...editable(data.brandColumn, "sections.footer.brandColumn", "container", "lg:col-span-4")}>
            {data.logo?.enabled && (
              <Link href={data.logo.href || '/'} className="inline-block mb-4">
                {data.logo.src?.endsWith('.svg') && svgContent ? (
                  <span
                    className="inline-flex h-6 [&>svg]:h-full [&>svg]:w-auto"
                    style={{ color: 'var(--foreground)' }}
                    dangerouslySetInnerHTML={{ __html: svgContent }}
                  />
                ) : (
                  <img src={data.logo.src} alt={data.logo.alt} className="h-6 w-auto" />
                )}
              </Link>
            )}
            {data.tagline?.enabled && (
              <p {...editable(data.tagline, "sections.footer.tagline", "text", "text-sm text-muted-foreground mb-6 max-w-xs")}>
                {data.tagline.text}
              </p>
            )}
            
            {/* Social Links */}
            {data.socialWrapper?.enabled && (
              <div {...editable(data.socialWrapper, "sections.footer.socialWrapper", "container", "flex items-center gap-3")}>
                {data.socialLinks?.map((social: any, index: number) => (
                  social.enabled && (
                    <a 
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors w-4 h-4"
                      aria-label={social.label}
                      dangerouslySetInnerHTML={{ __html: social.icon }}
                    />
                  )
                ))}
              </div>
            )}
          </div>

          {/* Link Columns */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {data.linkColumns?.map((column: any, colIndex: number) => (
              column.enabled && (
                <div key={colIndex}>
                  {column.title?.enabled && (
                    <h3 {...editable(column.title, `sections.footer.linkColumns.${colIndex}.title`, "text", "text-sm font-medium text-foreground mb-3")}>
                      {column.title.text}
                    </h3>
                  )}
                  <ul className="space-y-2.5">
                    {column.links?.map((link: any, linkIndex: number) => (
                      link.enabled && (
                        <li key={linkIndex}>
                          <Link 
                            href={link.href} 
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                          >
                            {link.text}
                          </Link>
                        </li>
                      )
                    ))}
                  </ul>
                </div>
              )
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        {data.bottomBar?.enabled && (
          <div {...editable(data.bottomBar, "sections.footer.bottomBar", "container", "pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4")}>
            {data.copyright?.enabled && (
              <p {...editable(data.copyright, "sections.footer.copyright", "text", "text-xs text-muted-foreground")}>
                {data.copyright.text}
              </p>
            )}
            
            {data.bottomLinksWrapper?.enabled && (
              <div {...editable(data.bottomLinksWrapper, "sections.footer.bottomLinksWrapper", "container", "flex flex-wrap justify-center gap-x-6 gap-y-2")}>
                {data.bottomLinks?.map((link: any, index: number) => (
                  link.enabled && (
                    <Link 
                      key={index}
                      href={link.href}
                      className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.text}
                    </Link>
                  )
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </footer>
  );
}