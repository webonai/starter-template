'use client';

import { editable } from '@/lib/editable';
import { FeaturesProps } from './types';

export default function Features({ data }: FeaturesProps ) {
  if (!data) return null;

  return (
    <section id='features' data-section="features" {...editable(data.container, "sections.features.container", "section", "relative py-24 sm:py-32")}>
      <div {...editable(data.innerWrapper, "sections.features.innerWrapper", "container", "container mx-auto px-4 sm:px-6 lg:px-8")}>
        
        {/* Header */}
        <div {...editable(data.header, "sections.features.header", "container", "mx-auto max-w-2xl text-center mb-16 sm:mb-20")}>
          {data.eyebrow?.enabled && (
            <p {...editable(data.eyebrow, "sections.features.eyebrow", "badge", "text-sm text-muted-foreground mb-3")}>
              {data.eyebrow.text}
            </p>
          )}
          
          {data.headline?.enabled && (
            <h2 {...editable(data.headline, "sections.features.headline", "headline", "text-3xl font-semibold tracking-tight text-foreground sm:text-4xl")}>
              {data.headline.text}
            </h2>
          )}
          
          {data.subtext?.enabled && (
            <p {...editable(data.subtext, "sections.features.subtext", "text", "mt-4 text-base text-muted-foreground max-w-lg mx-auto")}>
              {data.subtext.text}
            </p>
          )}
        </div>

        {/* Features Grid */}
        <div {...editable(data.grid, "sections.features.grid", "container", "grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto")}>
          {data.items?.filter(item => item.enabled).map((item, index) => (
            <div key={index} {...editable(item, `sections.features.items.${index}`, "container", "group")}>
              
              {/* Icon */}
              {item.icon?.enabled && (
                <div {...editable(item.icon, `sections.features.items.${index}.icon`, "container", "mb-3 inline-flex h-10 w-10 items-center justify-center rounded-md bg-muted text-foreground")}>
                  {item.icon.emoji ? (
                    <span {...editable(item.iconEmoji, `sections.features.items.${index}.iconEmoji`, "text", "text-lg")} role="img" aria-label={item.icon.alt || 'Feature icon'}>
                      {item.icon.emoji}
                    </span>
                  ) : item.icon.svg ? (
                    <div {...editable(item.iconSvg, `sections.features.items.${index}.iconSvg`, "icon", "h-5 w-5")} dangerouslySetInnerHTML={{ __html: item.icon.svg }} />
                  ) : null}
                </div>
              )}

              {/* Title */}
              {item.title?.enabled && (
                <h3 {...editable(item.title, `sections.features.items.${index}.title`, "headline", "text-base font-semibold text-foreground mb-2")}>
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
                <a {...editable(item.link, `sections.features.items.${index}.link`, "link", "mt-3 inline-flex items-center text-sm text-foreground hover:text-muted-foreground transition-colors")} aria-label={`Learn more about ${item.title?.text || 'this feature'}`}>
                  {item.link.text || 'Learn more'}
                  <svg className="ml-1 h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
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
            <a {...editable(data.cta, "sections.features.cta", "button", "inline-flex items-center justify-center rounded-md bg-foreground px-5 py-2.5 text-sm font-medium text-background hover:bg-foreground/90 transition-colors")}>
              {data.cta.text || 'View All Features'}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}