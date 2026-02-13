'use client';

import { editable } from '@/lib/editable';
import Link from 'next/link';
import { ctaProps } from './types';

export default function CTA({ data }: ctaProps ) {
  if (!data) return null;

  return (
    <section data-section="cta" {...editable(data.container, "sections.cta.container", "section", "relative py-24 sm:py-32")}>
      {/* Background */}
      {data.background?.enabled && (
        <div {...editable(data.background, "sections.cta.background", "container", "absolute inset-0 -z-10 bg-muted/50")} />
      )}

      <div {...editable(data.innerWrapper, "sections.cta.innerWrapper", "container", "container mx-auto px-4 sm:px-6 lg:px-8")}>
        <div {...editable(data.content, "sections.cta.content", "container", "mx-auto max-w-2xl text-center")}>
          
          {/* Eyebrow */}
          {data.eyebrow?.enabled && (
            <p {...editable(data.eyebrow, "sections.cta.eyebrow", "badge", "text-sm text-muted-foreground mb-3")}>
              {data.eyebrow.text}
            </p>
          )}

          {/* Headline */}
          {data.headline?.enabled && (
            <h2 {...editable(data.headline, "sections.cta.headline", "headline", "text-3xl font-semibold tracking-tight text-foreground sm:text-4xl")}>
              {data.headline.text}
            </h2>
          )}

          {/* Subtext */}
          {data.subtext?.enabled && (
            <p {...editable(data.subtext, "sections.cta.subtext", "text", "mt-4 text-base text-muted-foreground max-w-lg mx-auto")}>
              {data.subtext.text}
            </p>
          )}

          {/* Buttons */}
          <div {...editable(data.buttonWrapper, "sections.cta.buttonWrapper", "container", "mt-8 flex flex-col sm:flex-row items-center justify-center gap-3")}>
            {data.primaryButton?.enabled && (
              <Link {...editable(data.primaryButton, "sections.cta.primaryButton", "button", "inline-flex items-center justify-center rounded-md bg-foreground px-5 py-2.5 text-sm font-medium text-background hover:bg-foreground/90 transition-colors")}>
                {data.primaryButton.text}
              </Link>
            )}

            {data.secondaryButton?.enabled && (
              <Link {...editable(data.secondaryButton, "sections.cta.secondaryButton", "button", "inline-flex items-center justify-center rounded-md px-5 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors")}>
                {data.secondaryButton.text}
                <span className="ml-1" aria-hidden="true">&rarr;</span>
              </Link>
            )}
          </div>

          {/* Features */}
          {data.featuresWrapper?.enabled && (
            <div {...editable(data.featuresWrapper, "sections.cta.featuresWrapper", "container", "mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2")}>
              {data.features?.map((feature: any, index: number) => (
                feature.enabled && (
                  <div key={index} className="flex items-center gap-1.5 text-muted-foreground">
                    <span className="text-xs">{feature.icon}</span>
                    <span className="text-sm">{feature.text}</span>
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