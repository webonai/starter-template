import { getPosts, getCategories } from '@/lib/blog';
import Link from 'next/link';
import Image from 'next/image';
import Header from '../components/sections/Header';
import Footer from '../components/sections/Footer';
import { editable } from '@/lib/editable';
import config from '../../data/config.json';
import { ArrowRight, Calendar, User } from 'lucide-react';

export default async function BlogIndex({ searchParams }: { searchParams: Promise<{ page?: string; category?: string }> }) {
  const safeConfig = config as any;
  const blogIndex = safeConfig.sections.blogIndex || {};

  const resolvedSearchParams = await searchParams;
  const currentPage = Number(resolvedSearchParams?.page) || 1;
  const category = resolvedSearchParams?.category;
  const postsPerPage = 6;
  const allPosts = getPosts(category);
  const categories = getCategories();
  const totalPages = Math.ceil(allPosts.length / postsPerPage);
  
  const posts = allPosts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);

  return (
    <main>
      <Header data={safeConfig.sections.header} />
      
      <div {...editable(blogIndex.container, "sections.blogIndex.container", "section", "")}>
        {/* Background gradient */}
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
            <Link 
              href="/blog"
              className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition-all ${
                !category 
                  ? 'bg-primary text-primary-foreground shadow-sm' 
                  : 'border border-border bg-card text-muted-foreground hover:border-primary/30 hover:text-primary hover:shadow-sm'
              }`}
            >
              {blogIndex.categoryAllLabel?.text || 'All'}
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/blog?category=${encodeURIComponent(cat)}`}
                className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  category === cat
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'border border-border bg-card text-muted-foreground hover:border-primary/30 hover:text-primary hover:shadow-sm'
                }`}
              >
                {cat}
              </Link>
            ))}
          </div>

          {/* Posts Grid */}
          <div {...editable(blogIndex.grid, "sections.blogIndex.grid", "container", "")}>
            {posts.map((post) => (
              <article key={post.slug} className="group relative flex flex-col rounded-xl border border-border bg-card shadow-sm transition-all hover:shadow-md hover:border-primary/30 overflow-hidden">
                
                {/* Image */}
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

                {/* Content */}
                <div className="flex flex-1 flex-col p-6">
                  {/* Meta */}
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                    <time dateTime={post.date} className="inline-flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(post.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
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

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>

                  {/* Excerpt */}
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4 flex-1">
                    {post.excerpt}
                  </p>

                  {/* Author & Read more */}
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
          {posts.length === 0 && (
            <div className="mx-auto max-w-md text-center py-16">
              <p {...editable(blogIndex.emptyState, "sections.blogIndex.emptyState", "text", "")}>
                {blogIndex.emptyState?.text || 'No posts found.'}
              </p>
              {category && (
                <Link {...editable(blogIndex.emptyStateLink, "sections.blogIndex.emptyStateLink", "link", "")}>
                  {blogIndex.emptyStateLink?.text || 'View all posts'}
                </Link>
              )}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div {...editable(blogIndex.pagination, "sections.blogIndex.pagination", "container", "")}>
              {currentPage > 1 && (
                <Link 
                  href={`/blog?page=${currentPage - 1}${category ? `&category=${category}` : ''}`} 
                  {...editable(blogIndex.prevButton, "sections.blogIndex.prevButton", "button", "")}
                >
                  {blogIndex.prevButton?.text || 'Previous'}
                </Link>
              )}
              <span className="px-4 py-2 text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </span>
              {currentPage < totalPages && (
                <Link 
                  href={`/blog?page=${currentPage + 1}${category ? `&category=${category}` : ''}`} 
                  {...editable(blogIndex.nextButton, "sections.blogIndex.nextButton", "button", "")}
                >
                  {blogIndex.nextButton?.text || 'Next'}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>

      <Footer data={safeConfig.sections.footer} />
    </main>
  );
}
