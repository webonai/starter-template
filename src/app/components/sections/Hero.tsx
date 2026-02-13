'use client';

import Link from 'next/link'; 
import Image from 'next/image';
import { editable } from '@/lib/editable';
import { HeroData } from './types';

export default function Hero({ data }: { data: HeroData }) {
  if (!data) return null;

  return (
    <section data-section="hero" {...editable(data.container, "sections.hero.container", "section", "relative py-24 sm:py-32 lg:py-40")}>
      <div {...editable(data.innerWrapper, "sections.hero.innerWrapper", "container", "container mx-auto px-6")}>
        <div {...editable(data.contentWrapper, "sections.hero.contentWrapper", "container", "mx-auto max-w-3xl text-center")}>
          
          {/* Eyebrow */}
          {data.eyebrow?.enabled && (
            <p {...editable(data.eyebrow, "sections.hero.eyebrow", "badge", "mb-6 text-sm text-muted-foreground")}>
              {data.eyebrow.text}
            </p>
          )}

          {/* HEADLINE */}
          <h1 {...editable(data.headline, "sections.hero.headline", "headline", "text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl leading-[1.1]")}>
            {data.headline?.text}
          </h1>

          {/* SUBTEXT */}
          <p {...editable(data.subtext, "sections.hero.subtext", "text", "mt-6 text-lg leading-relaxed text-muted-foreground max-w-xl mx-auto")}>
            {data.subtext?.text}
          </p>

          {/* BUTTONS */}
          <div {...editable(data.buttonWrapper, "sections.hero.buttonWrapper", "container", "mt-10 flex flex-col sm:flex-row items-center justify-center gap-3")}>
            {data.primaryButton?.enabled && (
              <Link {...editable(data.primaryButton, "sections.hero.primaryButton", "button", "rounded-lg bg-foreground px-5 py-2.5 text-sm font-medium text-background hover:bg-foreground/90 transition-colors")}>
                {data.primaryButton.text}
              </Link>
            )}
            
            {data.secondaryButton?.enabled && (
              <Link {...editable(data.secondaryButton, "sections.hero.secondaryButton", "button", "rounded-lg px-5 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors")}>
                {data.secondaryButton.text}
                <span className="ml-1" aria-hidden="true">&rarr;</span>
              </Link>
            )}
          </div>

          {/* Stats */}
          {data.stats && data.stats.length > 0 && data.stats.some(stat => stat.enabled) && (
            <div {...editable(data.statsContainer, "sections.hero.statsContainer", "container", "mt-16 flex flex-wrap justify-center gap-x-12 gap-y-4")}>
              {data.stats.filter(stat => stat.enabled).map((stat, index) => (
                <div key={index} {...editable(stat, `sections.hero.stats.${index}`, "text", "text-center")}>
                  <div {...editable(stat.valueWrapper, `sections.hero.stats.${index}.value`, "text", "text-2xl font-semibold text-foreground tabular-nums")}>{stat.value}</div>
                  <div {...editable(stat.labelWrapper, `sections.hero.stats.${index}.label`, "text", "text-sm text-muted-foreground mt-1")}>{stat.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* HERO IMAGE */}
        {data.heroImage?.enabled && data.heroImage.src && (
          <div {...editable(data.imageWrapper, "sections.hero.imageWrapper", "container", "mt-20")}>
            <div {...editable(data.imageInner, "sections.hero.imageInner", "container", "relative mx-auto max-w-5xl")}>
              <Image {...editable(data.heroImage, "sections.hero.heroImage", "image", "rounded-lg border border-border w-full h-auto")} width={1200} height={600} priority />
            </div>
          </div>
        )}

      </div>
    </section>
  );
}