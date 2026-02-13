'use client';

import { editable } from '@/lib/editable';
import Link from 'next/link';
import { ctaProps } from './types';

export default function CTA({ data }: ctaProps ) {
  if (!data) return null;

  return (
    <section data-section="cta" {...editable(data.container, "sections.cta.container", "section", "relative isolate py-20 sm:py-24 lg:py-32")}>
      {/* Background */}
      {data.background?.enabled && (
        <div {...editable(data.background, "sections.cta.background", "container", "absolute inset-0 -z-10 bg-gradient-to-br from-primary/90 via-primary to-primary/80")} />
      )}

      {/* Pattern Overlay */}
      {data.pattern?.enabled && (
        <div {...editable(data.pattern, "sections.cta.pattern", "container", "absolute inset-0 -z-10 bg-[url('/grid-pattern.svg')] opacity-10")} />
      )}

      <div {...editable(data.innerWrapper, "sections.cta.innerWrapper", "container", "container mx-auto px-4 sm:px-6 lg:px-8")}>
        <div {...editable(data.content, "sections.cta.content", "container", "mx-auto max-w-4xl text-center")}>
          
          {/* Eyebrow */}
          {data.eyebrow?.enabled && (
            <div {...editable(data.eyebrow, "sections.cta.eyebrow", "badge", "inline-flex items-center rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-3 py-1 text-xs font-medium text-primary-foreground mb-6")}>
              {data.eyebrow.text}
            </div>
          )}

          {/* Headline */}
          {data.headline?.enabled && (
            <h2 {...editable(data.headline, "sections.cta.headline", "headline", "text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl lg:text-5xl mb-6")}>
              {data.headline.text}
            </h2>
          )}

          {/* Subtext */}
          {data.subtext?.enabled && (
            <p {...editable(data.subtext, "sections.cta.subtext", "text", "text-lg sm:text-xl text-primary-foreground/90 max-w-2xl mx-auto mb-10")}>
              {data.subtext.text}
            </p>
          )}

          {/* Buttons */}
          <div {...editable(data.buttonWrapper, "sections.cta.buttonWrapper", "container", "flex flex-col sm:flex-row items-center justify-center gap-4")}>
            {data.primaryButton?.enabled && (
              <Link {...editable(data.primaryButton, "sections.cta.primaryButton", "button", "inline-flex items-center justify-center rounded-lg bg-primary-foreground px-6 py-3 text-base font-semibold text-primary shadow-lg hover:bg-primary-foreground/90 transition-all hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-primary")}>
                {data.primaryButton.text}
              </Link>
            )}

            {data.secondaryButton?.enabled && (
              <Link {...editable(data.secondaryButton, "sections.cta.secondaryButton", "button", "inline-flex items-center justify-center rounded-lg border-2 border-primary-foreground/30 px-6 py-3 text-base font-semibold text-primary-foreground hover:bg-primary-foreground/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground")}>
                {data.secondaryButton.text}
              </Link>
            )}
          </div>

          {/* Features */}
          {data.featuresWrapper?.enabled && (
            <div {...editable(data.featuresWrapper, "sections.cta.featuresWrapper", "container", "mt-10 flex flex-wrap justify-center gap-x-8 gap-y-4")}>
              {data.features?.map((feature: any, index: number) => (
                feature.enabled && (
                  <div key={index} className="flex items-center gap-2 text-primary-foreground/90">
                    <span className="font-bold">{feature.icon}</span>
                    <span className="text-sm font-medium">{feature.text}</span>
                  </div>
                )
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}