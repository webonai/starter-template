'use client';

import React, { useEffect, useState } from 'react';
import { ElementConfig } from '@/types/schema';
import { editable } from '@/lib/editable';
import Link from 'next/link';

// Define the shape of the post data from our API
type PostData = {
  slug: string;
  title: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  coverImage: string;
  content: string;
};

type BlogProps = {
  data: {
    container: ElementConfig;
    header: ElementConfig;
    headline: ElementConfig;
    subtext: ElementConfig;
    grid: ElementConfig;
    card: ElementConfig;
    cardImage: ElementConfig;
    cardContent: ElementConfig;
    cardCategory: ElementConfig;
    cardTitle: ElementConfig;
    cardDate: ElementConfig;
  };
};

export default function Blog({ data }: BlogProps) {
  const [posts, setPosts] = useState<PostData[]>([]);
  const basePath = "sections.blog";

  useEffect(() => {
    // Fetch posts from our API route
    fetch('/api/posts')
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Failed to fetch posts:", err));
  }, []);

  if (!data) return null;

  return (
    <section {...editable(data.container, `${basePath}.container`, "section")}>
      
      {/* Header */}
      <div {...editable(data.header, `${basePath}.header`, "container")}>
        <h2 {...editable(data.headline, `${basePath}.headline`, "headline")}>
          {data.headline?.text}
        </h2>
        <p {...editable(data.subtext, `${basePath}.subtext`, "text")}>
          {data.subtext?.text}
        </p>
      </div>

      {/* Grid */}
      <div {...editable(data.grid, `${basePath}.grid`, "container")}>
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
            <article 
              {...editable(data.card, `${basePath}.card`, "container", "h-full transition-transform duration-300 group-hover:-translate-y-1")}
            >
              {/* Cover Image */}
              {post.coverImage && (
                <img 
                  {...editable(data.cardImage, `${basePath}.cardImage`, "image")}
                  src={post.coverImage} 
                  alt={post.title} 
                />
              )}

              <div {...editable(data.cardContent, `${basePath}.cardContent`, "container")}>
                
                {/* Category */}
                <span {...editable(data.cardCategory, `${basePath}.cardCategory`, "text")}>
                  {post.category}
                </span>

                {/* Title */}
                <h3 {...editable(data.cardTitle, `${basePath}.cardTitle`, "headline")}>
                  {post.title}
                </h3>

                {/* Date */}
                <time {...editable(data.cardDate, `${basePath}.cardDate`, "text")}>
                  {post.date}
                </time>

              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}
