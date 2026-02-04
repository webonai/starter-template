import { ElementConfig } from '@/types/schema';
import { editable } from '@/lib/editable';

// 1. Define the Expected Shape (Must match config.json!)
type HeroData = {
  container: ElementConfig;
  innerWrapper: ElementConfig;
  headline: ElementConfig;
  subtext: ElementConfig;
  primaryButton: ElementConfig; // Ensure this matches config!
  // secondaryLink: ElementConfig; // Only include if it exists in config
};

export default function Hero({ data }: { data: HeroData }) {
  return (
    <section {...editable(data.container, "sections.hero.container", "section", "py-24 relative")}>
      
      <h1 {...editable(
        data.headline, 
        "sections.hero.headline", 
        "headline", 
        "text-4xl font-bold tracking-tight text-gray-900"
      )}>
        {data.headline?.text}
      </h1>

    </section>
  );
}