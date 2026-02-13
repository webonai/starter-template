'use client';

import { editable } from '@/lib/editable';
import { FeaturesProps } from './types';

export default function Features({ data }: FeaturesProps ) {
  if (!data) return null;

  return (
    <section id='features' data-section="features" {...editable(data.container, "sections.features.container", "section", "relative py-20 sm:py-24 lg:py-32")}>
      {/* Background */}
      {data.background?.enabled && (
        <div {...editable(data.background, "sections.features.background", "container", "absolute inset-0 -z-10 bg-gradient-to-b from-background via-muted/30 to-background")} />
      )}

      <div {...editable(data.innerWrapper, "sections.features.innerWrapper", "container", "container mx-auto px-4 sm:px-6 lg:px-8")}>
        
        {/* Header */}
        <div {...editable(data.header, "sections.features.header", "container", "mx-auto max-w-3xl text-center mb-16 sm:mb-20")}>
          {data.eyebrow?.enabled && (
            <div {...editable(data.eyebrow, "sections.features.eyebrow", "badge", "inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-4")}>
              {data.eyebrow.text}
            </div>
          )}
          
          {data.headline?.enabled && (
            <h2 {...editable(data.headline, "sections.features.headline", "headline", "text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl mb-4")}>
              {data.headline.text}
            </h2>
          )}
          
          {data.subtext?.enabled && (
            <p {...editable(data.subtext, "sections.features.subtext", "text", "text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto")}>
              {data.subtext.text}
            </p>
          )}
        </div>

        {/* Features Grid */}
        <div {...editable(data.grid, "sections.features.grid", "container", "grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3")}>
          {data.items?.filter(item => item.enabled).map((item, index) => (
            <div key={index} {...editable(item, `sections.features.items.${index}`, "container", "group relative rounded-xl border border-border bg-card p-6 sm:p-8 shadow-sm transition-all hover:shadow-md hover:border-primary/50")}>
              
              {/* Icon */}
              {item.icon?.enabled && (
                <div {...editable(item.icon, `sections.features.items.${index}.icon`, "container", "mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground")}>
                  {item.icon.emoji ? (
                    <span {...editable(item.iconEmoji, `sections.features.items.${index}.iconEmoji`, "text", "text-2xl")} role="img" aria-label={item.icon.alt || 'Feature icon'}>
                      {item.icon.emoji}
                    </span>
                  ) : item.icon.svg ? (
                    <div {...editable(item.iconSvg, `sections.features.items.${index}.iconSvg`, "icon", "h-6 w-6")} dangerouslySetInnerHTML={{ __html: item.icon.svg }} />
                  ) : null}
                </div>
              )}

              {/* Title */}
              {item.title?.enabled && (
                <h3 {...editable(item.title, `sections.features.items.${index}.title`, "headline", "text-xl font-semibold text-foreground mb-2")}>
                  {item.title.text}
                </h3>
              )}

              {/* Description */}
              {item.description?.enabled && (
                <p {...editable(item.description, `sections.features.items.${index}.description`, "text", "text-sm text-muted-foreground leading-relaxed")}>
                  {item.description.text}
                </p>
              )}

              {/* Optional Link */}
              {item.link?.enabled && item.link.href && (
                <a {...editable(item.link, `sections.features.items.${index}.link`, "link", "mt-4 inline-flex items-center text-sm font-medium text-primary hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm")} aria-label={`Learn more about ${item.title?.text || 'this feature'}`}>
                  {item.link.text || 'Learn more'}
                  <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Optional CTA */}
        {data.cta?.enabled && data.cta.href && (
          <div {...editable(data.ctaWrapper, "sections.features.ctaWrapper", "container", "mt-16 text-center")}>
            <a {...editable(data.cta, "sections.features.cta", "button", "inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2")}>
              {data.cta.text || 'View All Features'}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}