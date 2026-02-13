'use client';

import { editable } from '@/lib/editable';
import Image from 'next/image';
import { TestimonialsProps } from './types';

export default function Testimonials({ data }: TestimonialsProps) {
  if (!data) return null;

  return (
    <section data-section="testimonials" {...editable(data.container, "sections.testimonials.container", "section", "relative py-24 sm:py-32 border-y border-border/50")}>
      <div {...editable(data.innerWrapper, "sections.testimonials.innerWrapper", "container", "container mx-auto px-4 sm:px-6 lg:px-8")}>
        
        {/* Header */}
        <div {...editable(data.header, "sections.testimonials.header", "container", "mx-auto max-w-2xl text-center mb-16")}>
          {data.eyebrow?.enabled && (
            <p {...editable(data.eyebrow, "sections.testimonials.eyebrow", "badge", "text-sm text-muted-foreground mb-3")}>
              {data.eyebrow.text}
            </p>
          )}
          
          {data.headline?.enabled && (
            <h2 {...editable(data.headline, "sections.testimonials.headline", "headline", "text-3xl font-semibold tracking-tight text-foreground sm:text-4xl")}>
              {data.headline.text}
            </h2>
          )}
          
          {data.subtext?.enabled && (
            <p {...editable(data.subtext, "sections.testimonials.subtext", "text", "mt-4 text-base text-muted-foreground max-w-lg mx-auto")}>
              {data.subtext.text}
            </p>
          )}
        </div>

        {/* Testimonials Grid */}
        <div {...editable(data.grid, "sections.testimonials.grid", "container", "grid grid-cols-1 gap-8 md:grid-cols-3 max-w-5xl mx-auto")}>
          {data.items?.filter(item => item.enabled).map((item, index) => (
            <article key={index} {...editable(item, `sections.testimonials.items.${index}`, "container", "relative")}>
              
              {/* Quote */}
              {item.quote?.enabled && (
                <blockquote {...editable(item.quote, `sections.testimonials.items.${index}.quote`, "text", "text-base text-foreground/80 leading-relaxed mb-6")}>
                  &ldquo;{item.quote.text}&rdquo;
                </blockquote>
              )}

              {/* Author Info */}
              <div {...editable(item.authorWrapper, `sections.testimonials.items.${index}.authorWrapper`, "container", "flex items-center gap-3")}>
                {/* Avatar */}
                {item.avatar?.enabled && item.avatar.src && (
                  <div {...editable(item.avatarWrapper, `sections.testimonials.items.${index}.avatarWrapper`, "container", "relative h-9 w-9 shrink-0 rounded-full overflow-hidden bg-muted")}>
                    <Image src={item.avatar.src} alt={item.avatar.alt || item.author?.text || 'Testimonial author'} fill className="object-cover" {...editable(item.avatar, `sections.testimonials.items.${index}.avatar`, "image")} />
                  </div>
                )}

                <div {...editable(item.authorDetails, `sections.testimonials.items.${index}.authorDetails`, "container", "flex-1 min-w-0")}>
                  {/* Name */}
                  {item.author?.enabled && (
                    <p {...editable(item.author, `sections.testimonials.items.${index}.author`, "text", "text-sm font-medium text-foreground")}>
                      {item.author.text}
                    </p>
                  )}
                  
                  {/* Role & Company */}
                  {(item.role?.enabled || item.company?.enabled) && (
                    <p {...editable(item.roleCompany, `sections.testimonials.items.${index}.roleCompany`, "text", "text-sm text-muted-foreground")}>
                      {item.role?.enabled && item.role.text}
                      {item.role?.enabled && item.company?.enabled && ', '}
                      {item.company?.enabled && item.company.text}
                    </p>
                  )}
                </div>
              </div>

              {/* Optional Rating */}
              {item.rating?.enabled && item.rating.value && (
                <div {...editable(item.ratingWrapper, `sections.testimonials.items.${index}.ratingWrapper`, "container", "mt-4 flex items-center gap-0.5")} role="img" aria-label={`${item.rating.value} out of 5 stars`}>
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className={`h-3.5 w-3.5 ${i < (item.rating?.value || 0) ? 'text-foreground fill-current' : 'text-border stroke-current fill-none'}`} viewBox="0 0 24 24" strokeWidth="1.5" aria-hidden="true">
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