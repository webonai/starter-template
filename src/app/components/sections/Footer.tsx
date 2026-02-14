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
    <footer data-section="footer" {...editable(data.container, "sections.footer.container", "section", "")}>
      <div {...editable(data.innerWrapper, "sections.footer.innerWrapper", "container", "")}>
        <div {...editable(data.mainContent, "sections.footer.mainContent", "container", "")}>
          
          {/* Brand Column */}
          <div {...editable(data.brandColumn, "sections.footer.brandColumn", "container", "")}>
            {data.logo?.enabled && (
              <Link href={data.logo.href || '/'} className="inline-block mb-6">
                {data.logo.src?.endsWith('.svg') && svgContent ? (
                  <span
                    className="inline-flex h-8 text-primary [&>svg]:h-full [&>svg]:w-auto"
                    dangerouslySetInnerHTML={{ __html: svgContent }}
                  />
                ) : (
                  <img src={data.logo.src} alt={data.logo.alt} className="h-8 w-auto text-primary" />
                )}
              </Link>
            )}
            {data.tagline?.enabled && (
              <p {...editable(data.tagline, "sections.footer.tagline", "text", "")}>
                {data.tagline.text}
              </p>
            )}
            
            {/* Social Links */}
            {data.socialWrapper?.enabled && (
              <div {...editable(data.socialWrapper, "sections.footer.socialWrapper", "container", "")}>
                {data.socialLinks?.map((social: any, index: number) => (
                  social.enabled && (
                    <a 
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors w-5 h-5"
                      aria-label={social.label}
                      dangerouslySetInnerHTML={{ __html: social.icon }}
                    />
                  )
                ))}
              </div>
            )}
          </div>

          {/* Link Columns */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {data.linkColumns?.map((column: any, colIndex: number) => (
              column.enabled && (
                <div key={colIndex}>
                  {column.title?.enabled && (
                    <h3 {...editable(column.title, `sections.footer.linkColumns.${colIndex}.title`, "text", "font-semibold text-foreground mb-4")}>
                      {column.title.text}
                    </h3>
                  )}
                  <ul className="space-y-3">
                    {column.links?.map((link: any, linkIndex: number) => (
                      link.enabled && (
                        <li key={linkIndex}>
                          <Link 
                            href={link.href} 
                            className="text-muted-foreground hover:text-primary transition-colors text-sm"
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
          <div {...editable(data.bottomBar, "sections.footer.bottomBar", "container", "")}>
            {data.copyright?.enabled && (
              <p {...editable(data.copyright, "sections.footer.copyright", "text", "")}>
                {data.copyright.text}
              </p>
            )}
            
            {data.bottomLinksWrapper?.enabled && (
              <div {...editable(data.bottomLinksWrapper, "sections.footer.bottomLinksWrapper", "container", "")}>
                {data.bottomLinks?.map((link: any, index: number) => (
                  link.enabled && (
                    <Link 
                      key={index}
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
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