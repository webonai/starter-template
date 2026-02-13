'use client';

import { editable } from '@/lib/editable';
import Image from 'next/image';
import { TestimonialsProps } from './types';

export default function Testimonials({ data }: TestimonialsProps) {
  if (!data) return null;

  return (
    <section data-section="testimonials" {...editable(data.container, "sections.testimonials.container", "section", "relative py-20 sm:py-24 lg:py-32 bg-muted/30")}>
      <div {...editable(data.innerWrapper, "sections.testimonials.innerWrapper", "container", "container mx-auto px-4 sm:px-6 lg:px-8")}>
        
        {/* Header */}
        <div {...editable(data.header, "sections.testimonials.header", "container", "mx-auto max-w-3xl text-center mb-16 sm:mb-20")}>
          {data.eyebrow?.enabled && (
            <div {...editable(data.eyebrow, "sections.testimonials.eyebrow", "badge", "inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-4")}>
              {data.eyebrow.text}
            </div>
          )}
          
          {data.headline?.enabled && (
            <h2 {...editable(data.headline, "sections.testimonials.headline", "headline", "text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl mb-4")}>
              {data.headline.text}
            </h2>
          )}
          
          {data.subtext?.enabled && (
            <p {...editable(data.subtext, "sections.testimonials.subtext", "text", "text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto")}>
              {data.subtext.text}
            </p>
          )}
        </div>

        {/* Testimonials Grid */}
        <div {...editable(data.grid, "sections.testimonials.grid", "container", "grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3")}>
          {data.items?.filter(item => item.enabled).map((item, index) => (
            <article key={index} {...editable(item, `sections.testimonials.items.${index}`, "container", "relative rounded-xl border border-border bg-card p-6 sm:p-8 shadow-sm transition-all hover:shadow-md")}>
              
              {/* Quote Icon */}
              {data.showQuoteIcon && (
                <div {...editable(item.quoteIcon, `sections.testimonials.items.${index}.quoteIcon`, "icon", "absolute top-6 right-6 h-8 w-8 text-primary/10")}>
                  <svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
              )}

              {/* Quote */}
              {item.quote?.enabled && (
                <blockquote {...editable(item.quote, `sections.testimonials.items.${index}.quote`, "text", "text-base text-foreground leading-relaxed mb-6")}>
                  "{item.quote.text}"
                </blockquote>
              )}

              {/* Author Info */}
              <div {...editable(item.authorWrapper, `sections.testimonials.items.${index}.authorWrapper`, "container", "flex items-center gap-4")}>
                {/* Avatar */}
                {item.avatar?.enabled && item.avatar.src && (
                  <div {...editable(item.avatarWrapper, `sections.testimonials.items.${index}.avatarWrapper`, "container", "relative h-12 w-12 shrink-0 rounded-full overflow-hidden bg-muted ring-2 ring-border")}>
                    <Image src={item.avatar.src} alt={item.avatar.alt || item.author?.text || 'Testimonial author'} fill className="object-cover" {...editable(item.avatar, `sections.testimonials.items.${index}.avatar`, "image")} />
                  </div>
                )}

                <div {...editable(item.authorDetails, `sections.testimonials.items.${index}.authorDetails`, "container", "flex-1 min-w-0")}>
                  {/* Name */}
                  {item.author?.enabled && (
                    <p {...editable(item.author, `sections.testimonials.items.${index}.author`, "text", "font-semibold text-foreground truncate")}>
                      {item.author.text}
                    </p>
                  )}
                  
                  {/* Role & Company */}
                  {(item.role?.enabled || item.company?.enabled) && (
                    <p {...editable(item.roleCompany, `sections.testimonials.items.${index}.roleCompany`, "text", "text-sm text-muted-foreground truncate")}>
                      {item.role?.enabled && item.role.text}
                      {item.role?.enabled && item.company?.enabled && ', '}
                      {item.company?.enabled && item.company.text}
                    </p>
                  )}
                </div>
              </div>

              {/* Optional Rating */}
              {item.rating?.enabled && item.rating.value && (
                <div {...editable(item.ratingWrapper, `sections.testimonials.items.${index}.ratingWrapper`, "container", "mt-4 flex items-center gap-1")} role="img" aria-label={`${item.rating.value} out of 5 stars`}>
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className={`h-4 w-4 ${i < (item.rating?.value || 0) ? 'text-yellow-400 fill-current' : 'text-muted stroke-current fill-none'}`} viewBox="0 0 24 24" strokeWidth="1.5" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                    </svg>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}