'use client';
import { editable } from '@/lib/editable';
import Link from 'next/link';
import Image from 'next/image';
import { BlogProps } from './types';
import { Post } from '@/types/dataTypes';

export default function Blog({ data }: BlogProps) {
  if (!data) return null;
  const topPosts = data.posts?.slice(0, 3) || [];
  
  return (
    <section data-section="blog" {...editable(data.container, "sections.blog.container", "section", "bg-background py-24 sm:py-32")}>
      <div {...editable(data.innerWrapper, "sections.blog.innerWrapper", "container", "container mx-auto px-6 lg:px-8")}>
        
        {/* HEADER */}
        <div {...editable(data.headerWrapper, "sections.blog.headerWrapper", "container", "mx-auto max-w-2xl text-center mb-16")}>
          <h2 {...editable(data.header, "sections.blog.header", "headline", "text-3xl font-bold tracking-tight text-foreground sm:text-4xl")}>
            {data.header?.text}
          </h2>
          <p {...editable(data.subtext, "sections.blog.subtext", "text", "mt-4 text-lg leading-8 text-muted-foreground")}>
            {data.subtext?.text}
          </p>
        </div>

        {/* POSTS GRID */}
        <div {...editable(data.grid, "sections.blog.grid", "container", "mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-3")}>
          {topPosts?.map((post: Post, index: number) => (
            <article 
              key={index} 
              {...editable(data.posts[index], `sections.blog.posts.${index}`, "container", "flex flex-col items-start justify-between group")}
            >
              
              {/* IMAGE */}
              <div className="relative w-full aspect-[16/9] sm:aspect-[3/2] rounded-2xl overflow-hidden bg-muted">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  {...editable(null, `sections.blog.posts.${index}.image`, "image", "object-cover")}
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-border/10 pointer-events-none" />
              </div>

              {/* CONTENT */}
              <div className="max-w-xl w-full">
                <div className="mt-8 flex items-center gap-x-4 text-xs">
                  <time dateTime={post.date} className="text-muted-foreground">
                    {post.date}
                  </time>
                  <span className="relative z-10 rounded-full bg-muted px-3 py-1.5 font-medium text-muted-foreground hover:bg-accent">
                    {post.category}
                  </span>
                </div>
                
                <div className="group relative">
                  <h3 {...editable(null, `sections.blog.posts.${index}.title`, "text", "mt-3 text-lg font-semibold leading-6 text-foreground group-hover:text-muted-foreground")}>
                    <Link href={post.href || '#'}>
                      <span className="absolute inset-0" />
                      {post.title}
                    </Link>
                  </h3>
                  <p {...editable(null, `sections.blog.posts.${index}.excerpt`, "text", "mt-5 line-clamp-3 text-sm leading-6 text-muted-foreground")}>
                    {post.excerpt}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}