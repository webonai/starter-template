'use client';

import Link from 'next/link'; 
import Image from 'next/image';
import { editable } from '@/lib/editable';
import { HeroData } from './types';

export default function Hero({ data }: { data: HeroData }) {
  if (!data) return null;

  return (
    <section data-section="hero" {...editable(data.container, "sections.hero.container", "section", "")}>
      {/* Background gradient */}
      <div {...editable(data.backgroundGradient, "sections.hero.backgroundGradient", "container", "")} />
      
      <div {...editable(data.innerWrapper, "sections.hero.innerWrapper", "container", "")}>
        <div {...editable(data.contentWrapper, "sections.hero.contentWrapper", "container", "")}>
          
          {/* Eyebrow/Badge */}
          {data.eyebrow?.enabled && (
            <div {...editable(data.eyebrow, "sections.hero.eyebrow", "badge", "")}>
              {data.eyebrow.text}
            </div>
          )}

          {/* HEADLINE */}
          <h1 {...editable(data.headline, "sections.hero.headline", "headline", "")}>
            {data.headline?.text}
          </h1>

          {/* SUBTEXT */}
          <p {...editable(data.subtext, "sections.hero.subtext", "text", "")}>
            {data.subtext?.text}
          </p>

          {/* BUTTONS */}
          <div {...editable(data.buttonWrapper, "sections.hero.buttonWrapper", "container", "")}>
            {data.primaryButton?.enabled && (
              <Link {...editable(data.primaryButton, "sections.hero.primaryButton", "button", "")}>
                {data.primaryButton.text}
              </Link>
            )}
            
            {data.secondaryButton?.enabled && (
              <Link {...editable(data.secondaryButton, "sections.hero.secondaryButton", "button", "")}>
                {data.secondaryButton.text}
              </Link>
            )}
          </div>

          {/* Social proof / Stats */}
          {data.stats && data.stats.length > 0 && data.stats.some(stat => stat.enabled) && (
            <div {...editable(data.statsContainer, "sections.hero.statsContainer", "container", "")}>
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
          <div {...editable(data.imageWrapper, "sections.hero.imageWrapper", "container", "")}>
            <div {...editable(data.imageInner, "sections.hero.imageInner", "container", "")}>
              {/* Glow effect */}
              <div {...editable(data.imageGlow, "sections.hero.imageGlow", "container", "")} />
              
              <Image {...editable(data.heroImage, "sections.hero.heroImage", "image", "")} width={1200} height={600} priority />
            </div>
          </div>
        )}

      </div>
    </section>
  );
}