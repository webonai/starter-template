'use client';

import { editable } from '@/lib/editable';
import Image from 'next/image';
import Link from 'next/link';
import { BlogProps } from './types';

/**
 * Normalize a post to the nested format the Blog component expects.
 * Handles both flat format (from content/posts/posts.json) and
 * nested format (from config.json inline posts).
 */
function normalizePost(post: any): any {
  // Already in nested format (title is an object with .text)
  if (post.title && typeof post.title === 'object') {
    return post;
  }

  // Transform flat format → nested format
  const slug = post.slug || '';
  const href = post.href || `/blog/${slug}`;

  return {
    enabled: true,
    image: post.image
      ? { enabled: true, src: post.image, alt: post.title || 'Blog post' }
      : undefined,
    imageLink: { href },
    category: post.category
      ? { enabled: true, text: post.category }
      : undefined,
    date: post.date
      ? {
          enabled: true,
          text: new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          }),
          datetime: post.date,
        }
      : undefined,
    title: { enabled: true, text: post.title || '' },
    titleLink: { href },
    excerpt: post.excerpt
      ? { enabled: true, text: post.excerpt }
      : undefined,
    author: post.author
      ? {
          enabled: true,
          name: typeof post.author === 'string' ? post.author : post.author.name,
          avatar: typeof post.author === 'object' ? post.author.avatar : undefined,
        }
      : undefined,
    readMore: { enabled: true, text: 'Read article', href },
  };
}

export default function Blog({ data }: BlogProps) {
  if (!data) return null;

  // Normalize posts so both flat (posts.json) and nested (config.json) formats work
  const normalizedPosts = (data.posts || []).map(normalizePost);
  
  return (
    <section data-section="blog-preview" {...editable(data.container, "sections.blog.container", "section", "relative py-24 sm:py-32")}>
      <div {...editable(data.innerWrapper, "sections.blog.innerWrapper", "container", "container mx-auto px-4 sm:px-6 lg:px-8")}>
        
        {/* Header */}
        <div {...editable(data.header, "sections.blog.header", "container", "flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12")}>
          <div {...editable(data.headerContent, "sections.blog.headerContent", "container", "flex-1")}>
            {data.eyebrow?.enabled && (
              <p {...editable(data.eyebrow, "sections.blog.eyebrow", "badge", "text-sm text-muted-foreground mb-3")}>
                {data.eyebrow.text}
              </p>
            )}
            
            {data.headline?.enabled && (
              <h2 {...editable(data.headline, "sections.blog.headline", "headline", "text-3xl font-semibold tracking-tight text-foreground sm:text-4xl")}>
                {data.headline.text}
              </h2>
            )}
            
            {data.subtext?.enabled && (
              <p {...editable(data.subtext, "sections.blog.subtext", "text", "mt-3 text-base text-muted-foreground max-w-lg")}>
                {data.subtext.text}
              </p>
            )}
          </div>

          {/* View All Button */}
          {data.viewAllButton?.enabled && (
            <Link {...editable(data.viewAllButton, "sections.blog.viewAllButton", "button", "inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap")}>
              {data.viewAllButton.text || 'View All Posts'}
              <svg className="ml-1 h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          )}
        </div>

        {/* Posts Grid */}
        <div {...editable(data.grid, "sections.blog.grid", "container", "mx-auto max-w-5xl grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3")}>
          {normalizedPosts.filter(post => post.enabled !== false).slice(0, data.maxPosts || 3).map((post, index) => (
            <article key={index} {...editable(post, `sections.blog.posts.${index}`, "container", "group flex flex-col")}>
              
              {/* Featured Image */}
              {post.image?.enabled && post.image.src && (
                <Link {...editable(post.imageLink, `sections.blog.posts.${index}.imageLink`, "link", "relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-muted mb-4")} aria-label={`Read ${post.title?.text || 'article'}`}>
                  <Image src={post.image.src} alt={post.image.alt || post.title?.text || 'Blog post'} fill className="object-cover transition-transform duration-300 group-hover:scale-[1.02]" {...editable(post.image, `sections.blog.posts.${index}.image`, "image")} />
                </Link>
              )}

              {/* Content */}
              <div className="flex flex-1 flex-col">
                
                {/* Meta */}
                <div {...editable(post.meta, `sections.blog.posts.${index}.meta`, "container", "flex items-center gap-x-3 text-xs text-muted-foreground mb-2")}>
                  {post.category?.enabled && (
                    <span {...editable(post.category, `sections.blog.posts.${index}.category`, "badge", "font-medium text-foreground")}>
                      {post.category.text}
                    </span>
                  )}
                  {post.date?.enabled && (
                    <time {...editable(post.date, `sections.blog.posts.${index}.date`, "text", "")} dateTime={post.date.datetime}>
                      {post.date.text}
                    </time>
                  )}
                </div>

                {/* Title */}
                {post.title?.enabled && (
                  <h3 {...editable(post.title, `sections.blog.posts.${index}.title`, "headline", "text-base font-semibold text-foreground mb-1.5 group-hover:text-muted-foreground transition-colors")}>
                    <Link {...editable(post.titleLink, `sections.blog.posts.${index}.titleLink`, "link", "")}>
                      {post.title.text}
                    </Link>
                  </h3>
                )}

                {/* Excerpt */}
                {post.excerpt?.enabled && (
                  <p {...editable(post.excerpt, `sections.blog.posts.${index}.excerpt`, "text", "text-sm text-muted-foreground leading-relaxed line-clamp-2")}>
                    {post.excerpt.text}
                  </p>
                )}

                {/* Read More Link */}
                {post.readMore?.enabled && (
                  <Link {...editable(post.readMore, `sections.blog.posts.${index}.readMore`, "link", "mt-3 inline-flex items-center text-sm text-foreground hover:text-muted-foreground transition-colors")}>
                    {post.readMore.text || 'Read more'}
                    <svg className="ml-1 h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}