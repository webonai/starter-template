import { UniversalElement } from '../ui/UniversalElement';
import { ElementConfig } from '@/types/schema';

type ReviewItem = {
  container: ElementConfig;
  quote: ElementConfig;
  author: ElementConfig;
  role: ElementConfig;
};

type TestimonialsProps = {
  data: {
    container: ElementConfig;
    innerWrapper: ElementConfig;
    header: ElementConfig;
    headline: ElementConfig;
    subtext: ElementConfig;
    grid: ElementConfig;
    items: ReviewItem[];
  };
};

export default function Testimonials({ data }: TestimonialsProps) {
  const basePath = "sections.testimonials";

  return (
    <UniversalElement as="section" data={data.container} dataPath={`${basePath}.container`}>
      <UniversalElement as="div" data={data.innerWrapper} dataPath={`${basePath}.innerWrapper`}>
        
        <UniversalElement as="div" data={data.header} dataPath={`${basePath}.header`}>
          <UniversalElement as="h2" data={data.headline} dataPath={`${basePath}.headline`} />
          <UniversalElement as="p" data={data.subtext} dataPath={`${basePath}.subtext`} />
        </UniversalElement>

        <UniversalElement as="div" data={data.grid} dataPath={`${basePath}.grid`}>
          {data.items.map((item, index) => (
            <UniversalElement 
              key={index} 
              as="blockquote" 
              data={item.container} 
              dataPath={`${basePath}.items.${index}.container`}
            >
              <UniversalElement as="p" data={item.quote} dataPath={`${basePath}.items.${index}.quote`} />
              <footer className="mt-6">
                <UniversalElement as="div" data={item.author} dataPath={`${basePath}.items.${index}.author`} />
                <UniversalElement as="div" data={item.role} dataPath={`${basePath}.items.${index}.role`} />
              </footer>
            </UniversalElement>
          ))}
        </UniversalElement>

      </UniversalElement>
    </UniversalElement>
  );
}