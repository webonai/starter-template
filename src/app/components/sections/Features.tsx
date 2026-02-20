'use client';

import { editable } from '@/lib/editable';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { FeaturesProps } from './types';

export default function Features({ data }: FeaturesProps ) {
  const [activeIndex, setActiveIndex] = useState(0);
  const isPortfolioVariant = data?.variant === 'portfolio' || !!data?.contentLayout;
  const enabledItems = useMemo(
    () => (data?.items || []).map((item, index) => ({ item, index })).filter(({ item }) => item.enabled),
    [data?.items]
  );

  useEffect(() => {
    if (!isPortfolioVariant || enabledItems.length < 2) return;

    const interval = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % enabledItems.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, [enabledItems.length, isPortfolioVariant]);

  useEffect(() => {
    if (activeIndex >= enabledItems.length) {
      setActiveIndex(0);
    }
  }, [activeIndex, enabledItems.length]);

  if (!data) return null;

  const activeProject = enabledItems[activeIndex];
  const sectionBackgroundClass = isPortfolioVariant
    ? "absolute inset-0 -z-10 bg-gradient-to-br from-[#1f1f1f] via-[#2f2f2f] to-[#c8a24a] dark:from-[#d7d7d7] dark:via-[#ececec] dark:to-[#d4af37]"
    : "absolute inset-0 -z-10 bg-gradient-to-b from-background via-muted/30 to-background";

  return (
    <section id='features' data-section="features" {...editable(data.container, "sections.features.container", "section", "")}>
      {/* Background */}
      {data.background?.enabled && (
        <div
          {...editable(
            data.background,
            "sections.features.background",
            "container",
            sectionBackgroundClass
          )}
        />
      )}

      <div {...editable(data.innerWrapper, "sections.features.innerWrapper", "container", "")}>
        {!isPortfolioVariant && (
          <>
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

            <div {...editable(data.grid, "sections.features.grid", "container", "")}>
              {enabledItems.map(({ item, index }) => (
                <div key={index} {...editable(item, `sections.features.items.${index}`, "container", "")}>
                  {item.image?.enabled && item.image.src && (
                    <div
                      {...editable(
                        item.image,
                        `sections.features.items.${index}.image`,
                        "image",
                        "relative mb-5 aspect-[16/10] w-full overflow-hidden rounded-lg border border-border bg-muted"
                      )}
                    >
                      <Image
                        src={item.image.src}
                        alt={item.image.alt || item.title?.text || 'Feature preview'}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}

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

                  {item.title?.enabled && (
                    <h3 {...editable(item.title, `sections.features.items.${index}.title`, "headline", "")}>
                      {item.title.text}
                    </h3>
                  )}

                  {item.description?.enabled && (
                    <p {...editable(item.description, `sections.features.items.${index}.description`, "text", "")}>
                      {item.description.text}
                    </p>
                  )}

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
          </>
        )}

        {isPortfolioVariant && (
          <div {...editable(data.contentLayout, "sections.features.contentLayout", "container", "grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16 items-start")}>
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

              {enabledItems.length > 0 && (
                <nav className="mt-8" aria-label="Project list">
                  <ul className="space-y-2">
                    {enabledItems.map(({ item, index: itemIndex }, listIndex) => {
                      const isActive = listIndex === activeIndex;

                      return (
                        <li key={itemIndex}>
                          <button
                            type="button"
                            onClick={() => setActiveIndex(listIndex)}
                            className={`w-full rounded-lg border px-4 py-3 text-left text-sm transition-colors ${
                              isActive
                                ? 'border-primary bg-primary/10 text-foreground'
                                : 'border-border bg-background text-muted-foreground hover:border-primary/30 hover:text-foreground'
                            }`}
                            aria-current={isActive ? 'true' : undefined}
                          >
                            <span {...editable(item.title, `sections.features.items.${itemIndex}.title`, "text", "font-medium")}>
                              {item.title?.text || `Project ${listIndex + 1}`}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              )}
            </div>

            {/* Active Project */}
            <div {...editable(data.grid, "sections.features.grid", "container", "")}>
              {activeProject && (
                <div
                  key={activeProject.index}
                  {...editable(
                    activeProject.item,
                    `sections.features.items.${activeProject.index}`,
                    "container",
                    "group relative rounded-xl border border-border bg-card p-6 sm:p-8 shadow-sm"
                  )}
                >
                  {activeProject.item.image?.enabled && activeProject.item.image.src && (
                    <div
                      {...editable(
                        activeProject.item.image,
                        `sections.features.items.${activeProject.index}.image`,
                        "image",
                        "relative mb-5 aspect-[16/10] w-full overflow-hidden rounded-lg border border-border bg-muted"
                      )}
                    >
                      <Image
                        src={activeProject.item.image.src}
                        alt={activeProject.item.image.alt || activeProject.item.title?.text || 'Project preview'}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}

                  {activeProject.item.title?.enabled && (
                    <h3 {...editable(activeProject.item.title, `sections.features.items.${activeProject.index}.title`, "headline", "")}>
                      {activeProject.item.title.text}
                    </h3>
                  )}

                  {activeProject.item.description?.enabled && (
                    <p {...editable(activeProject.item.description, `sections.features.items.${activeProject.index}.description`, "text", "")}>
                      {activeProject.item.description.text}
                    </p>
                  )}

                  {activeProject.item.link?.enabled && activeProject.item.link.href && (
                    <a
                      {...editable(
                        activeProject.item.link,
                        `sections.features.items.${activeProject.index}.link`,
                        "link",
                        "mt-4 inline-flex items-center text-sm font-medium text-primary hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
                      )}
                      aria-label={`Learn more about ${activeProject.item.title?.text || 'this project'}`}
                    >
                      {activeProject.item.link.text || 'Learn more'}
                      <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

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
