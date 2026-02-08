import { ElementConfig } from '@/types/schema';
import { editable } from '@/lib/editable';

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
    items?: ReviewItem[];
  };
};

export default function Testimonials({ data }: TestimonialsProps) {
  if (!data) return null;
  const items = data.items || [];

  return (
    <section data-section="testimonials" {...editable(data.container, "sections.testimonials.container", "section", "py-24 sm:py-32 bg-background")}>
      <div className="container mx-auto px-6 lg:px-8">
        
        <div className="mx-auto max-w-xl text-center mb-16">
          <h2 {...editable(data.headline, "sections.testimonials.headline", "headline", "text-3xl font-bold tracking-tight text-foreground sm:text-4xl")}>
            {data.headline?.text}
          </h2>
          <p {...editable(data.subtext, "sections.testimonials.subtext", "subtext", "mt-4 text-lg leading-8 text-muted-foreground")}>
            {data.subtext?.text}
          </p>
        </div>

        <div {...editable(data.grid, "sections.testimonials.grid", "container", "mx-auto grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3")}>
          {items.map((testimonial: ReviewItem, index: number) => (
            <div 
              key={index} 
              {...editable(testimonial.container, `sections.testimonials.items.${index}.container`, "container", "flex flex-col justify-between bg-card p-8 shadow-sm ring-1 ring-border rounded-2xl")}
            >
              <div {...editable(testimonial.quote, `sections.testimonials.items.${index}.quote`, "text", "text-card-foreground")}>
                <p>{testimonial.quote?.text}</p>
              </div>
              
              <div className="mt-6 flex items-center gap-x-4">
                 <div className="text-sm leading-6">
                    <div {...editable(testimonial.author, `sections.testimonials.items.${index}.author`, "text", "font-semibold text-card-foreground")}>
                      {testimonial.author?.text}
                    </div>
                    <div {...editable(testimonial.role, `sections.testimonials.items.${index}.role`, "text", "text-muted-foreground")}>
                      {testimonial.role?.text}
                    </div>
                 </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}