import { ElementConfig } from '@/types/schema';
import { editable } from '@/lib/editable';

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
    <section {...editable(data.container, `${basePath}.container`, "section")}>
      <div {...editable(data.innerWrapper, `${basePath}.innerWrapper`, "container")}>
        
        {/* Header Area */}
        <div {...editable(data.header, `${basePath}.header`, "container")}>
          <h2 {...editable(data.headline, `${basePath}.headline`, "headline")}>
            {data.headline?.text}
          </h2>
          <p {...editable(data.subtext, `${basePath}.subtext`, "text")}>
            {data.subtext?.text}
          </p>
        </div>

        {/* Grid Area */}
        <div {...editable(data.grid, `${basePath}.grid`, "container")}>
          
          {/* 3. SAFETY MAP: Only map if we have reviews */}
          {reviews.length > 0 ? (
            reviews.map((item, index) => (
              <blockquote 
                key={index} 
                {...editable(item.container, `${basePath}.items.${index}.container`, "container")}
              >
                <p {...editable(item.quote, `${basePath}.items.${index}.quote`, "text")}>
                  {item.quote?.text}
                </p>
                <footer className="mt-6">
                  <div {...editable(item.author, `${basePath}.items.${index}.author`, "text")}>
                    {item.author?.text}
                  </div>
                  <div {...editable(item.role, `${basePath}.items.${index}.role`, "text")}>
                    {item.role?.text}
                  </div>
                </footer>
              </blockquote>
            ))
          ) : (
             // Optional: Show a placeholder if no reviews exist (helps debugging)
             <div className="p-4 text-center text-gray-400 border border-dashed rounded">
               No testimonials found in config.
             </div>
          )}

        </div>

      </div>
    </section>
  );
}
