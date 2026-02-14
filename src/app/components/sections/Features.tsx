'use client';

import { editable } from '@/lib/editable';
import { FeaturesProps } from './types';

export default function Features({ data }: FeaturesProps ) {
  if (!data) return null;

  return (
    <section id='features' data-section="features" {...editable(data.container, "sections.features.container", "section", "")}>
      {/* Background */}
      {data.background?.enabled && (
        <div {...editable(data.background, "sections.features.background", "container", "")} />
      )}

      <div {...editable(data.innerWrapper, "sections.features.innerWrapper", "container", "")}>
        
        {/* Header */}
        <div {...editable(data.header, "sections.features.header", "container", "")}>
          {data.eyebrow?.enabled && (
            <div {...editable(data.eyebrow, "sections.features.eyebrow", "badge", "")}>
              {data.eyebrow.text}
            </div>
          )}
          
          {data.headline?.enabled && (
            <h2 {...editable(data.headline, "sections.features.headline", "headline", "")}>
              {data.headline.text}
            </h2>
          )}
          
          {data.subtext?.enabled && (
            <p {...editable(data.subtext, "sections.features.subtext", "text", "")}>
              {data.subtext.text}
            </p>
          )}
        </div>

        {/* Features Grid */}
        <div {...editable(data.grid, "sections.features.grid", "container", "")}>
          {data.items?.filter(item => item.enabled).map((item, index) => (
            <div key={index} {...editable(item, `sections.features.items.${index}`, "container", "")}>
              
              {/* Icon */}
              {item.icon?.enabled && (
                <div {...editable(item.icon, `sections.features.items.${index}.icon`, "container", "")}>
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
                <h3 {...editable(item.title, `sections.features.items.${index}.title`, "headline", "")}>
                  {item.title.text}
                </h3>
              )}

              {/* Description */}
              {item.description?.enabled && (
                <p {...editable(item.description, `sections.features.items.${index}.description`, "text", "")}>
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
          <div {...editable(data.ctaWrapper, "sections.features.ctaWrapper", "container", "")}>
            <a {...editable(data.cta, "sections.features.cta", "button", "")}>
              {data.cta.text || 'View All Features'}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}