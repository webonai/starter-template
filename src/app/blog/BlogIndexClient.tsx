'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '../components/sections/Header';
import Footer from '../components/sections/Footer';
import { editable } from '@/lib/editable';
import { ArrowRight, Calendar, User } from 'lucide-react';
import { Post } from '@/types/dataTypes';

interface BlogIndexClientProps {
  posts: Post[];
  categories: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  blogIndex: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  header: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  footer: any;
}

const POSTS_PER_PAGE = 6;

export default function BlogIndexClient({ posts, categories, blogIndex, header, footer }: BlogIndexClientProps) {
  const [category, setCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPosts = category ? posts.filter((p) => p.category === category) : posts;
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const pagePosts = filteredPosts.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE);

  function selectCategory(cat: string | null) {
    setCategory(cat);
    setCurrentPage(1);
  }

  return (
    <main>
      <Header data={header} />

      <div {...editable(blogIndex.container, "sections.blogIndex.container", "section", "")}>
        <div className="absolute inset-0 -z-10 bg-linear-to-b from-primary/5 via-background to-background" />

        <div {...editable(blogIndex.innerWrapper, "sections.blogIndex.innerWrapper", "container", "")}>

          {/* Header */}
          <div {...editable(blogIndex.header, "sections.blogIndex.header", "container", "")}>
            {blogIndex.eyebrow?.enabled && (
              <div {...editable(blogIndex.eyebrow, "sections.blogIndex.eyebrow", "badge", "")}>
                {blogIndex.eyebrow.text}
              </div>
            )}
            <h2 {...editable(blogIndex.headline, "sections.blogIndex.headline", "headline", "")}>
              {blogIndex.headline?.text || "Blog"}
            </h2>
            <p {...editable(blogIndex.subtext, "sections.blogIndex.subtext", "text", "")}>
              {blogIndex.subtext?.text || "Latest insights and updates from our team."}
            </p>
          </div>

          {/* Category Filter */}
          <div {...editable(blogIndex.categoryFilter, "sections.blogIndex.categoryFilter", "container", "")}>
            <button
              onClick={() => selectCategory(null)}
              className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition-all ${
                !category
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'border border-border bg-card text-muted-foreground hover:border-primary/30 hover:text-primary hover:shadow-sm'
              }`}
            >
              {blogIndex.categoryAllLabel?.text || 'All'}
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => selectCategory(cat)}
                className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  category === cat
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'border border-border bg-card text-muted-foreground hover:border-primary/30 hover:text-primary hover:shadow-sm'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Posts Grid */}
          <div {...editable(blogIndex.grid, "sections.blogIndex.grid", "container", "")}>
            {pagePosts.map((post) => (
              <article key={post.slug} className="group relative flex flex-col rounded-xl border border-border bg-card shadow-sm transition-all hover:shadow-md hover:border-primary/30 overflow-hidden">
                {post.image && (
                  <Link href={`/blog/${post.slug}`} className="relative aspect-16/10 w-full overflow-hidden bg-muted">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </Link>
                )}
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                    <time dateTime={post.date} className="inline-flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </time>
                    {post.category && (
                      <>
                        <span className="h-1 w-1 rounded-full bg-border" />
                        <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                          {post.category}
                        </span>
                      </>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4 flex-1">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                      <User className="h-3 w-3" />
                      {post.author}
                    </span>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                    >
                      Read more
                      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Empty state */}
          {pagePosts.length === 0 && (
            <div className="mx-auto max-w-md text-center py-16">
              <p {...editable(blogIndex.emptyState, "sections.blogIndex.emptyState", "text", "")}>
                {blogIndex.emptyState?.text || 'No posts found.'}
              </p>
              {category && (
                <button
                  onClick={() => selectCategory(null)}
                  {...editable(blogIndex.emptyStateLink, "sections.blogIndex.emptyStateLink", "link", "")}
                >
                  {blogIndex.emptyStateLink?.text || 'View all posts'}
                </button>
              )}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div {...editable(blogIndex.pagination, "sections.blogIndex.pagination", "container", "")}>
              {currentPage > 1 && (
                <button
                  onClick={() => setCurrentPage((p) => p - 1)}
                  {...editable(blogIndex.prevButton, "sections.blogIndex.prevButton", "button", "")}
                >
                  {blogIndex.prevButton?.text || 'Previous'}
                </button>
              )}
              <span className="px-4 py-2 text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </span>
              {currentPage < totalPages && (
                <button
                  onClick={() => setCurrentPage((p) => p + 1)}
                  {...editable(blogIndex.nextButton, "sections.blogIndex.nextButton", "button", "")}
                >
                  {blogIndex.nextButton?.text || 'Next'}
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <Footer data={footer} />
    </main>
  );
}
