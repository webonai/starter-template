'use client';

import { editable } from '@/lib/editable';
import Link from 'next/link';
import { ctaProps } from './types';

export default function CTA({ data }: ctaProps ) {
  if (!data) return null;

  return (
    <section data-section="cta" {...editable(data.container, "sections.cta.container", "section", "")}>
      {/* Background */}
      {data.background?.enabled && (
        <div {...editable(data.background, "sections.cta.background", "container", "")} />
      )}

      {/* Pattern Overlay */}
      {data.pattern?.enabled && (
        <div {...editable(data.pattern, "sections.cta.pattern", "container", "")} />
      )}

      <div {...editable(data.innerWrapper, "sections.cta.innerWrapper", "container", "")}>
        <div {...editable(data.content, "sections.cta.content", "container", "")}>
          
          {/* Eyebrow */}
          {data.eyebrow?.enabled && (
            <div {...editable(data.eyebrow, "sections.cta.eyebrow", "badge", "")}>
              {data.eyebrow.text}
            </div>
          )}

          {/* Headline */}
          {data.headline?.enabled && (
            <h2 {...editable(data.headline, "sections.cta.headline", "headline", "")}>
              {data.headline.text}
            </h2>
          )}

          {/* Subtext */}
          {data.subtext?.enabled && (
            <p {...editable(data.subtext, "sections.cta.subtext", "text", "")}>
              {data.subtext.text}
            </p>
          )}

          {/* Buttons */}
          <div {...editable(data.buttonWrapper, "sections.cta.buttonWrapper", "container", "")}>
            {data.primaryButton?.enabled && (
              <Link {...editable(data.primaryButton, "sections.cta.primaryButton", "button", "")}>
                {data.primaryButton.text}
              </Link>
            )}

            {data.secondaryButton?.enabled && (
              <Link {...editable(data.secondaryButton, "sections.cta.secondaryButton", "button", "")}>
                {data.secondaryButton.text}
              </Link>
            )}
          </div>

          {/* Features */}
          {data.featuresWrapper?.enabled && (
            <div {...editable(data.featuresWrapper, "sections.cta.featuresWrapper", "container", "")}>
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