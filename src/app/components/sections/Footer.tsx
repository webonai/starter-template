'use client';

import { editable } from '@/lib/editable';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FooterProps } from './types';

export default function Footer({ data }: FooterProps) {
  const [svgContent, setSvgContent] = useState<string>('');
  const enabledColumns = data.linkColumns?.filter((column: any) => column.enabled) || [];
  const useHorizontalLinks = enabledColumns.length === 1;

  useEffect(() => {
    if (data?.logo?.src?.endsWith('.svg')) {
      fetch(data.logo.src)
        .then((res) => res.text())
        .then((svg) => setSvgContent(svg))
        .catch(() => setSvgContent(''));
    } else {
      setSvgContent('');
    }
  }, [data?.logo?.src]);

  if (!data) return null;

  return (
    <footer
      data-section="footer"
      {...editable(
        data.container,
        'sections.footer.container',
        'section',
        'bg-stone-100 dark:bg-stone-800 py-10 text-stone-900 dark:text-lime-50 border-t border-stone-300 dark:border-stone-700'
      )}
    >
      <div {...editable(data.innerWrapper, 'sections.footer.innerWrapper', 'container', '')}>
        <div {...editable(data.mainContent, 'sections.footer.mainContent', 'container', '')}>
          <div {...editable(data.brandColumn, 'sections.footer.brandColumn', 'container', '')}>
            {data.logo?.enabled && (
              <Link href={data.logo.href || '/'} className="inline-block mb-6">
                {data.logo.src?.endsWith('.svg') && svgContent ? (
                  <span className="inline-flex h-8 text-primary [&>svg]:h-full [&>svg]:w-auto" dangerouslySetInnerHTML={{ __html: svgContent }} />
                ) : (
                  <img src={data.logo.src} alt={data.logo.alt} className="h-8 w-auto text-primary" />
                )}
              </Link>
            )}

            {data.tagline?.enabled && (
              <p
                {...editable(
                  data.tagline,
                  'sections.footer.tagline',
                  'text',
                  'text-stone-700 dark:text-lime-100/90 mb-6 max-w-sm'
                )}
              >
                {data.tagline.text}
              </p>
            )}

            {data.newsletter?.enabled && (
              <form
                {...editable(
                  data.newsletter,
                  'sections.footer.newsletter',
                  'container',
                  'mb-6 flex w-full max-w-md items-center gap-2'
                )}
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  {...editable(
                    data.newsletter.input,
                    'sections.footer.newsletter.input',
                    'input',
                    'h-10 flex-1 rounded-md border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground'
                  )}
                />
                <button
                  {...editable(
                    data.newsletter.button,
                    'sections.footer.newsletter.button',
                    'button',
                    'h-10 rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground hover:bg-primary/90'
                  )}
                >
                  {data.newsletter.button?.text || 'Join'}
                </button>
              </form>
            )}

            {data.socialWrapper?.enabled && (
              <div {...editable(data.socialWrapper, 'sections.footer.socialWrapper', 'container', '')}>
                {data.socialLinks?.map(
                  (social: any, index: number) =>
                    social.enabled && (
                      <a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-current/80 hover:text-lime-100 transition-colors w-5 h-5"
                        aria-label={social.label}
                        dangerouslySetInnerHTML={{ __html: social.icon }}
                      />
                    )
                )}
              </div>
            )}
          </div>

          <div className={useHorizontalLinks ? 'lg:col-span-8' : 'lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8'}>
            {enabledColumns.map(
              (column: any, colIndex: number) =>
                column.enabled && (
                  <div key={colIndex}>
                    {column.title?.enabled && (
                      <h3 {...editable(column.title, `sections.footer.linkColumns.${colIndex}.title`, 'text', 'font-semibold text-foreground mb-4')}>
                        {column.title.text}
                      </h3>
                    )}
                    <ul className={useHorizontalLinks ? 'flex flex-wrap items-center gap-x-6 gap-y-3' : 'space-y-3'}>
                      {column.links?.map(
                        (link: any, linkIndex: number) =>
                          link.enabled && (
                            <li key={linkIndex}>
                              <Link href={link.href} className="text-current/90 hover:text-lime-100 transition-colors text-sm">
                                {link.text}
                              </Link>
                            </li>
                          )
                      )}
                    </ul>
                  </div>
                )
            )}
          </div>
        </div>

        {data.bottomBar?.enabled && (
          <div
            {...editable(
              data.bottomBar,
              'sections.footer.bottomBar',
              'container',
              'pt-6 border-t border-stone-300 dark:border-stone-700 flex items-center justify-between gap-4'
            )}
          >
            {data.copyright?.enabled && (
              <p
                {...editable(
                  data.copyright,
                  'sections.footer.copyright',
                  'text',
                  'text-sm text-stone-700 dark:text-lime-100/80'
                )}
              >
                {data.copyright.text}
              </p>
            )}

            {data.bottomLinksWrapper?.enabled && (
              <div {...editable(data.bottomLinksWrapper, 'sections.footer.bottomLinksWrapper', 'container', '')}>
                {data.bottomLinks?.map(
                  (link: any, index: number) =>
                    link.enabled && (
                      <Link key={index} href={link.href} className="text-sm text-current/90 hover:text-lime-100 transition-colors">
                        {link.text}
                      </Link>
                    )
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </footer>
  );
}
