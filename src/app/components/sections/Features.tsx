import { ElementConfig } from '@/types/schema';
import { editable } from '@/lib/editable';
import { Zap, Shield, MousePointer, Star } from 'lucide-react';

const ICON_MAP: Record<string, any> = {
  zap: Zap,
  shield: Shield,
  'mouse-pointer': MousePointer,
  star: Star,
};

type FeatureItem = {
  container: ElementConfig;
  icon?: ElementConfig; 
  title: ElementConfig;
  description: ElementConfig;
  [key: string]: any;
};

type FeaturesProps = {
  data: {
    container: ElementConfig;
    header: ElementConfig;
    headline: ElementConfig; // Added this (it was in your config)
    subtext: ElementConfig;
    grid: ElementConfig;
    items: FeatureItem[];
  };
};


export default function Features({ data }: FeaturesProps) {
  if (!data) return null;
  const items = data.items || [];

  return (
    <section data-section="features"
      {...editable(data.container, "sections.features.container", "section", "py-24 bg-gray-50")}
    >
      <div className="container mx-auto px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 {...editable(data.headline, "sections.features.headline", "headline", "text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl")}>
            {data.headline?.text || data.header?.text}
          </h2>
          <p {...editable(data.subtext, "sections.features.subtext", "subtext", "mt-4 text-lg text-gray-600")}>
            {data.subtext?.text}
          </p>
        </div>

        {/* THE GRID LOOP */}
        <div {...editable(data.grid, "sections.features.grid", "grid", "mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3")}>
          {items.map((feature: FeatureItem, index: number) => {
            
            // @ts-expect-error
            const iconName = feature.icon?.icon || 'star';
            const IconComponent = ICON_MAP[iconName] || Star;
            const iconData = typeof feature.icon === 'object' ? feature.icon : null;

            return (
              <div 
                key={index} 
                {...editable(data.items[index].container, `sections.features.items.${index}.container`, "container", "flex flex-col items-start bg-white p-6 rounded-2xl shadow-sm")}
              >
                <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                  <IconComponent {...editable(iconData, `sections.features.items.${index}.icon`, "icon", "h-6 w-6 text-white")} />
                </div>
                
                {/* C. RENDER SAFELY 
                   We pass 'titleData' to editable(), ensuring it always receives an object with styles.
                */}
                <h3 {...editable(data.items[index].title, `sections.features.items.${index}.title`, "text", "text-lg font-semibold leading-8 text-gray-900")}>
                  {feature.title?.text}
                </h3>
                
                <p {...editable(data.items[index].description, `sections.features.items.${index}.description`, "text", "mt-1 flex-auto text-base leading-7 text-gray-600")}>
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