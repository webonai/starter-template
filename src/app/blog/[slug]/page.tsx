import { getPostBySlug, getPosts } from '@/lib/blog';

export async function generateStaticParams() {
  const posts = getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../../components/sections/Header';
import Footer from '../../components/sections/Footer';
import { FooterProps, HeaderProps } from '../../components/sections/types';
import { editable } from '@/lib/editable';
import config from '../../../data/config.json';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft, Calendar, User, Tag, Clock } from 'lucide-react';

function getSectionConfig<T>(sectionName: string): T | null {
  const maybeSections = (config as any)?.sections;
  if (!maybeSections || typeof maybeSections !== 'object') {
    return null;
  }

  const section = (maybeSections as Record<string, unknown>)[sectionName];
  return section && typeof section === 'object' ? (section as T) : null;
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const blogPost = (getSectionConfig<Record<string, unknown>>('blogPost') || {}) as any;
  const header = getSectionConfig<HeaderProps>('header');
  const footer = getSectionConfig<FooterProps['data']>('footer');

  if (!post) {
    notFound();
  }

  // Estimate reading time
  const wordCount = post.content?.split(/\s+/).length || 0;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <main>
      {header ? <Header data={header} /> : null}
      
      <article {...editable(blogPost.container, "sections.blogPost.container", "section", "")}>
        {/* Background gradient */}
        <div className="absolute inset-0 -z-10 bg-linear-to-b from-primary/5 via-background to-background" />
        
        <div {...editable(blogPost.innerWrapper, "sections.blogPost.innerWrapper", "container", "")}>
          <div {...editable(blogPost.contentWrapper, "sections.blogPost.contentWrapper", "container", "")}>
            
            {/* Back navigation */}
            <Link 
              {...editable(blogPost.backLink, "sections.blogPost.backLink", "link", "")}
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              {blogPost.backLink?.text || 'Back to Blog'}
            </Link>

            {/* Category badge */}
            {post.category && (
              <div {...editable(blogPost.category, "sections.blogPost.category", "container", "")}>
                <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  <Tag className="mr-1.5 h-3 w-3" />
                  {post.category}
                </span>
              </div>
            )}

            {/* Title */}
            <h1 {...editable(blogPost.title, "sections.blogPost.title", "headline", "")}>
              {post.title}
            </h1>

            {/* Meta row */}
            <div {...editable(blogPost.meta, "sections.blogPost.meta", "container", "")}>
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
            <div {...editable(blogPost.imageWrapper, "sections.blogPost.imageWrapper", "container", "")}>
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
            <div {...editable(blogPost.content, "sections.blogPost.content", "container", "")}>
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>

            {/* Bottom divider and navigation */}
            <div {...editable(blogPost.bottomNav, "sections.blogPost.bottomNav", "container", "")}>
              <Link 
                {...editable(blogPost.backToAllLink, "sections.blogPost.backToAllLink", "link", "")}
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                {blogPost.backToAllLink?.text || 'Back to all posts'}
              </Link>
            </div>
          </div>
        </div>
      </article>

      {footer ? <Footer data={footer} /> : null}
    </main>
  );
}
