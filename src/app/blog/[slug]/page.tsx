import { getPostBySlug } from '@/lib/blog';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../../components/sections/Header';
import Footer from '../../components/sections/Footer';
import config from '../../../../src/data/config.json';
import ReactMarkdown from 'react-markdown';

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const safeConfig = config as any;

  if (!post) {
    notFound();
  }

  return (
    <main>
      <Header data={safeConfig.sections.header} />
      <article className="container mx-auto py-24 px-4 max-w-4xl">
        <div className="mb-8">
          <Link href="/blog" className="text-indigo-600 hover:text-indigo-800 mb-4 inline-block">
            &larr; Back to Blog
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
          <div className="flex items-center gap-4 text-gray-600 text-sm mb-6">
            <span>{new Date(post.date).toLocaleDateString()}</span>
            <span>•</span>
            <span>{post.author}</span>
            <span>•</span>
            <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-xs">
              {post.category}
            </span>
          </div>
        </div>

        {post.image && (
          <div className="relative w-full h-96 mb-8 rounded-xl overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="prose prose-lg max-w-none text-gray-700 whitespace-pre-wrap">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </article>
      <Footer data={safeConfig.sections.footer} />
    </main>
  );
}
