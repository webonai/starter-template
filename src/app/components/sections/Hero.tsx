import Link from 'next/link'; 
import { ElementConfig } from '@/types/schema';
import Image from 'next/image';
import { editable } from '@/lib/editable';

type HeroData = {
  container: ElementConfig;
  innerWrapper: ElementConfig;
  headline: ElementConfig;
  subtext: ElementConfig;
  heroImage?: ElementConfig;
  primaryButton: ElementConfig;
};

export default function Hero({ data }: { data: HeroData }) {
  if (!data) return null;

  return (
    <section data-section="hero" {...editable(data.container, "sections.hero.container", "section", "relative py-24 sm:py-32 bg-background")}>
      <div {...editable(data.innerWrapper, "sections.hero.innerWrapper", "container", "container mx-auto px-6 text-center")}>
        
        {/* HEADLINE */}
        <h1 {...editable(data.headline, "sections.hero.headline", "headline", "text-4xl font-bold tracking-tight text-foreground sm:text-6xl mb-6")}>
          {data.headline?.text}
        </h1>

        {/* SUBTEXT */}
        <p {...editable(data.subtext, "sections.hero.subtext", "text", "mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto")}>
          {data.subtext?.text}
        </p>

        {/* BUTTONS */}
        <div className="mt-10 flex items-center justify-center gap-x-6">
          {data.primaryButton && (
            <Link
              href={data.primaryButton.href || '#'}
              {...editable(data.primaryButton, "sections.hero.primaryButton", "button", "rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:opacity-90 transition-opacity")}
            >
              {data.primaryButton.text}
            </Link>
          )}
        </div>
        
        {/* HERO IMAGE */}
        {data.heroImage && data.heroImage.src && (
             <div className="mt-16 relative w-full max-w-5xl mx-auto">
               <Image 
                 src={data.heroImage.src}
                 alt={data.heroImage.alt || 'Hero Image'}
                 width={1200}
                 height={600}
                 priority
                 {...editable(data.heroImage, "sections.hero.heroImage", "image", "rounded-xl shadow-2xl border border-border")}
               />
             </div>
        )}

      </div>
    </section>
  );
}