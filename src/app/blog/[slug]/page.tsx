import { getPostBySlug } from '@/lib/blog';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../../components/sections/Header';
import Footer from '../../components/sections/Footer';
import { editable } from '@/lib/editable';
import config from '../../../data/config.json';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft, Calendar, User, Tag, Clock } from 'lucide-react';

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const safeConfig = config as any;
  const blogPost = safeConfig.sections.blogPost || {};

  if (!post) {
    notFound();
  }

  // Estimate reading time
  const wordCount = post.content?.split(/\s+/).length || 0;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <main>
      <Header data={safeConfig.sections.header} />
      
      <article {...editable(blogPost.container, "sections.blogPost.container", "section", "relative py-20 sm:py-24 lg:py-32")}>
        {/* Background gradient */}
        <div className="absolute inset-0 -z-10 bg-linear-to-b from-primary/5 via-background to-background" />
        
        <div {...editable(blogPost.innerWrapper, "sections.blogPost.innerWrapper", "container", "container mx-auto px-4 sm:px-6 lg:px-8")}>
          <div {...editable(blogPost.contentWrapper, "sections.blogPost.contentWrapper", "container", "mx-auto max-w-3xl")}>
            
            {/* Back navigation */}
            <Link 
              {...editable(blogPost.backLink, "sections.blogPost.backLink", "link", "group mb-10 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-muted-foreground shadow-sm transition-all hover:border-primary/30 hover:text-primary hover:shadow-md")}
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              {blogPost.backLink?.text || 'Back to Blog'}
            </Link>

            {/* Category badge */}
            {post.category && (
              <div {...editable(blogPost.category, "sections.blogPost.category", "container", "mb-4")}>
                <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  <Tag className="mr-1.5 h-3 w-3" />
                  {post.category}
                </span>
              </div>
            )}

            {/* Title */}
            <h1 {...editable(blogPost.title, "sections.blogPost.title", "headline", "text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl mb-6")}>
              {post.title}
            </h1>

            {/* Meta row */}
            <div {...editable(blogPost.meta, "sections.blogPost.meta", "container", "flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-10")}>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {new Date(post.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
              <span className="h-1 w-1 rounded-full bg-border" />
              <span className="inline-flex items-center gap-1.5">
                <User className="h-4 w-4" />
                {post.author}
              </span>
              <span className="h-1 w-1 rounded-full bg-border" />
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {readingTime} min read
              </span>
            </div>
          </div>

          {/* Hero image */}
          {post.image && (
            <div {...editable(blogPost.imageWrapper, "sections.blogPost.imageWrapper", "container", "mx-auto max-w-4xl mb-12 sm:mb-16")}>
              <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border shadow-lg ring-1 ring-border/50">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          )}

          {/* Content */}
          <div className="mx-auto max-w-3xl">
            <div {...editable(blogPost.content, "sections.blogPost.content", "container", "prose prose-lg max-w-none text-muted-foreground prose-headings:text-foreground prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-blockquote:border-primary/30 prose-blockquote:text-muted-foreground prose-code:text-primary prose-code:bg-muted prose-code:rounded prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm prose-code:before:content-none prose-code:after:content-none prose-img:rounded-xl prose-img:border prose-img:border-border prose-img:shadow-md")}>
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>

            {/* Bottom divider and navigation */}
            <div {...editable(blogPost.bottomNav, "sections.blogPost.bottomNav", "container", "mt-16 border-t border-border pt-8")}>
              <Link 
                {...editable(blogPost.backToAllLink, "sections.blogPost.backToAllLink", "link", "group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary")}
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                {blogPost.backToAllLink?.text || 'Back to all posts'}
              </Link>
            </div>
          </div>
        </div>
      </article>

      <Footer data={safeConfig.sections.footer} />
    </main>
  );
}
