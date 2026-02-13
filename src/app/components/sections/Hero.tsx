'use client';

import Link from 'next/link'; 
import Image from 'next/image';
import { editable } from '@/lib/editable';
import { HeroData } from './types';

export default function Hero({ data }: { data: HeroData }) {
  if (!data) return null;

  return (
    <section data-section="hero" {...editable(data.container, "sections.hero.container", "section", "relative overflow-hidden py-20 sm:py-32 lg:py-40")}>
      {/* Background gradient */}
      <div {...editable(data.backgroundGradient, "sections.hero.backgroundGradient", "container", "absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 via-background to-background")} />
      
      <div {...editable(data.innerWrapper, "sections.hero.innerWrapper", "container", "container mx-auto px-6")}>
        <div {...editable(data.contentWrapper, "sections.hero.contentWrapper", "container", "mx-auto max-w-4xl text-center")}>
          
          {/* Eyebrow/Badge */}
          {data.eyebrow?.enabled && (
            <div {...editable(data.eyebrow, "sections.hero.eyebrow", "badge", "mb-8 inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary")}>
              {data.eyebrow.text}
            </div>
          )}

          {/* HEADLINE */}
          <h1 {...editable(data.headline, "sections.hero.headline", "headline", "text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl mb-6")}>
            {data.headline?.text}
          </h1>

          {/* SUBTEXT */}
          <p {...editable(data.subtext, "sections.hero.subtext", "text", "mt-6 text-lg sm:text-xl leading-8 text-muted-foreground max-w-2xl mx-auto")}>
            {data.subtext?.text}
          </p>

          {/* BUTTONS */}
          <div {...editable(data.buttonWrapper, "sections.hero.buttonWrapper", "container", "mt-10 flex flex-col sm:flex-row items-center justify-center gap-4")}>
            {data.primaryButton?.enabled && (
              <Link {...editable(data.primaryButton, "sections.hero.primaryButton", "button", "rounded-lg bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-lg hover:opacity-90 transition-all hover:scale-105")}>
                {data.primaryButton.text}
              </Link>
            )}
            
            {data.secondaryButton?.enabled && (
              <Link {...editable(data.secondaryButton, "sections.hero.secondaryButton", "button", "rounded-lg border-2 border-border px-6 py-3 text-base font-semibold text-foreground hover:bg-accent transition-colors")}>
                {data.secondaryButton.text}
              </Link>
            )}
          </div>

          {/* Social proof / Stats */}
          {data.stats && data.stats.length > 0 && data.stats.some(stat => stat.enabled) && (
            <div {...editable(data.statsContainer, "sections.hero.statsContainer", "container", "mt-12 flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm")}>
              {data.stats.filter(stat => stat.enabled).map((stat, index) => (
                <div key={index} {...editable(stat, `sections.hero.stats.${index}`, "text", "flex items-center gap-x-2 text-muted-foreground")}>
                  {stat.icon && <span {...editable(stat.iconWrapper, `sections.hero.stats.${index}.icon`, "text", "")}>{stat.icon}</span>}
                  <span {...editable(stat.valueWrapper, `sections.hero.stats.${index}.value`, "text", "font-semibold text-foreground")}>{stat.value}</span>
                  <span {...editable(stat.labelWrapper, `sections.hero.stats.${index}.label`, "text", "")}>{stat.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* HERO IMAGE */}
        {data.heroImage?.enabled && data.heroImage.src && (
          <div {...editable(data.imageWrapper, "sections.hero.imageWrapper", "container", "mt-16 sm:mt-20 lg:mt-24")}>
            <div {...editable(data.imageInner, "sections.hero.imageInner", "container", "relative mx-auto max-w-6xl")}>
              {/* Glow effect */}
              <div {...editable(data.imageGlow, "sections.hero.imageGlow", "container", "absolute inset-0 -z-10 bg-gradient-to-tr from-primary/20 via-primary/5 to-transparent blur-3xl")} />
              
              <Image {...editable(data.heroImage, "sections.hero.heroImage", "image", "rounded-xl shadow-2xl border border-border ring-1 ring-border/50 w-full h-auto")} width={1200} height={600} priority />
            </div>
          </div>
        )}

      </div>
    </section>
  );
}