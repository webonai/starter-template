import { ElementConfig } from '@/types/schema';
import { editable } from '@/lib/editable';
import { MousePointer2, Shield, Star, Zap } from 'lucide-react';

// Update types to match the flat structure in config.json
type FeatureItem = {
  container: ElementConfig;
  icon?: ElementConfig['icon']; // icon is optional
  title: ElementConfig;
  description: ElementConfig;
};

type FeaturesProps = {
  data: {
    container: ElementConfig;
    header: ElementConfig;
    headline: ElementConfig;
    subtext: ElementConfig;
    items: FeatureItem[];
  };
};

const ICON_MAP: Record<string, React.ComponentType> = {
  zap: Zap,
  shield: Shield,
  'mouse-pointer': MousePointer2,
  star: Star
};

export default function Features({ data }: FeaturesProps) {
  if (!data) return null;
  const items = data.items || [];

  return (
    <section {...editable(data.container, "sections.features.container", "section", "py-24 bg-gray-50")}>
      <div className="container mx-auto px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 {...editable(data.header, "sections.features.header", "headline", "text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl")}>
            {data.header?.text}
          </h2>
          <h3 {...editable(data.subtext, "sections.features.subtext", "text", "text-lg text-gray-600")}>
            {data.subtext?.text}
          </h3>
        </div>

        {/* THE GRID LOOP */}
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
          {items.map((feature: FeatureItem, index: number) => {
            const Icon = ICON_MAP[feature.icon || 'star'] || Star;
            
            return (
              <div 
                key={index} 
                {...editable(feature.container, `sections.features.items[${index}].container`, "container", "flex flex-col items-start")}
              >
                <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                  <div {...editable(feature.icon, `sections.features.items[${index}].icon`, "icon", "h-6 w-6 text-white")}>
                    </div>
                </div>
                <h3 {...editable(feature.title, `sections.features.items[${index}].title`, "text", "text-lg font-semibold leading-8 text-gray-900")}>
                  {feature.title?.text}
                </h3>
                
                <p {...editable(feature.description, `sections.features.items[${index}].description`, "text", "mt-1 flex-auto text-base leading-7 text-gray-600")}>
                  {feature.description?.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}