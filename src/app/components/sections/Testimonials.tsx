import { UniversalElement } from '../ui/UniversalElement';
import { ElementConfig } from '@/types/schema';

// Define the shape of a single review item
type ReviewItem = {
  container: ElementConfig;
  quote: ElementConfig;
  author: ElementConfig;
  role: ElementConfig;
};

// Define the shape of the main data prop
type TestimonialsProps = {
  data: {
    container: ElementConfig;
    innerWrapper: ElementConfig;
    header: ElementConfig;
    headline: ElementConfig;
    subtext: ElementConfig;
    grid: ElementConfig;
    items?: ReviewItem[]; // Mark as optional (?) to prevent type errors
  };
};

export default function Testimonials({ data }: TestimonialsProps) {
  // 1. SAFETY CHECK: If the whole section data is missing, stop.
  if (!data) return null;

  const basePath = "sections.testimonials";

  // 2. DEFINE ITEMS SAFELY: Fallback to empty array if missing
  const reviews = data.items || [];

  return (
    <UniversalElement as="section" data={data.container} dataPath={`${basePath}.container`}>
      <UniversalElement as="div" data={data.innerWrapper} dataPath={`${basePath}.innerWrapper`}>
        
        {/* Header Area */}
        <UniversalElement as="div" data={data.header} dataPath={`${basePath}.header`}>
          <UniversalElement as="h2" data={data.headline} dataPath={`${basePath}.headline`} />
          <UniversalElement as="p" data={data.subtext} dataPath={`${basePath}.subtext`} />
        </UniversalElement>

        {/* Grid Area */}
        <UniversalElement as="div" data={data.grid} dataPath={`${basePath}.grid`}>
          
          {/* 3. SAFETY MAP: Only map if we have reviews */}
          {reviews.length > 0 ? (
            reviews.map((item, index) => (
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
            ))
          ) : (
             // Optional: Show a placeholder if no reviews exist (helps debugging)
             <div className="p-4 text-center text-gray-400 border border-dashed rounded">
               No testimonials found in config.
             </div>
          )}

        </UniversalElement>

      </UniversalElement>
    </UniversalElement>
  );
}