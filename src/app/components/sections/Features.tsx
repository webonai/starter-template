import { UniversalElement } from '../ui/UniversalElement';
import { ElementConfig } from '@/types/schema';

type FeatureItem = {
  container: ElementConfig;
  icon?: ElementConfig;
  title: ElementConfig;
  text: ElementConfig;
};

type FeaturesProps = {
  data: {
    container: ElementConfig;
    innerWrapper: ElementConfig;
    header: ElementConfig;
    headline: ElementConfig;
    subtext: ElementConfig;
    grid: ElementConfig;
    items: FeatureItem[];
  };
};

export default function Features({ data }: FeaturesProps) {
  const basePath = "sections.features";

  return (
    <UniversalElement as="section" data={data.container} dataPath={`${basePath}.container`}>
      <UniversalElement as="div" data={data.innerWrapper} dataPath={`${basePath}.innerWrapper`}>
        
        <UniversalElement as="div" data={data.header} dataPath={`${basePath}.header`}>
          <UniversalElement as="h2" data={data.headline} dataPath={`${basePath}.headline`} />
          <UniversalElement as="p" data={data.subtext} dataPath={`${basePath}.subtext`} />
        </UniversalElement>

        <UniversalElement as="dl" data={data.grid} dataPath={`${basePath}.grid`}>
          {data.items.map((item, index) => (
            <UniversalElement 
              key={index} 
              as="div" 
              data={item.container} 
              dataPath={`${basePath}.items.${index}.container`}
            >
              {item.icon && (
                <UniversalElement data={item.icon} dataPath={`${basePath}.items.${index}.icon`} />
              )}
              <UniversalElement as="dt" data={item.title} dataPath={`${basePath}.items.${index}.title`} />
              <UniversalElement as="dd" data={item.text} dataPath={`${basePath}.items.${index}.text`} />
            </UniversalElement>
          ))}
        </UniversalElement>

      </UniversalElement>
    </UniversalElement>
  );
}