import { getPosts, getCategories } from '@/lib/blog';
import Link from 'next/link';
import Image from 'next/image';
import Header from '../components/sections/Header';
import Footer from '../components/sections/Footer';
import { editable } from '@/lib/editable';
import config from '../../data/config.json';

export default async function BlogIndex({ searchParams }: { searchParams: Promise<{ page?: string; category?: string }> }) {
  const safeConfig = config as any;

  const resolvedSearchParams = await searchParams;
  const currentPage = Number(resolvedSearchParams?.page) || 1;
  const category = resolvedSearchParams?.category;
  const postsPerPage = 5;
  const allPosts = getPosts(category);
  const categories = getCategories();
  const totalPages = Math.ceil(allPosts.length / postsPerPage);
  
  const posts = allPosts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);

  return (
    <main>
      <Header data={safeConfig.sections.header} />
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 {...editable(safeConfig.sections.blogIndex?.headline, "sections.blogIndex.headline", "headline", "text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl")}>
              {safeConfig.sections.blogIndex?.headline?.text}
            </h2>
            <p {...editable(safeConfig.sections.blogIndex?.subtext, "sections.blogIndex.subtext", "subtext", "mt-2 text-lg leading-8 text-gray-600")}>
              {safeConfig.sections.blogIndex?.subtext?.text}
            </p>
          </div>
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Link 
                href="/blog"
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    !category 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
                All
            </Link>
            {categories.map((cat) => (
                <Link
                    key={cat}
                    href={`/blog?category=${encodeURIComponent(cat)}`}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        category === cat
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                    {cat}
                </Link>
            ))}
          </div>

          <div className="mx-auto max-w-3xl flex flex-col gap-16">
            {posts.map((post) => (
              <article key={post.slug} className="flex flex-col items-start justify-between border-b border-gray-100 pb-16 last:border-0">
                <div className="relative w-full mb-8">
                  <div className="aspect-[16/9] w-full rounded-2xl bg-gray-100 overflow-hidden relative">
                      <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover"
                      />
                  </div>
                </div>
                <div className="max-w-xl">
                  <div className="flex items-center gap-x-4 text-xs">
                    <time dateTime={post.date} className="text-gray-500">
                      {new Date(post.date).toLocaleDateString()}
                    </time>
                    <span className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
                      {post.category}
                    </span>
                  </div>
                  <div className="group relative">
                    <h3 className="mt-3 text-2xl font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                      <Link href={`/blog/${post.slug}`}>
                        <span className="absolute inset-0" />
                        {post.title}
                      </Link>
                    </h3>
                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{post.excerpt}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center gap-4 mt-12">
            {currentPage > 1 && (
                <Link href={`/blog?page=${currentPage - 1}${category ? `&category=${category}` : ''}`} className="px-4 py-2 border rounded hover:bg-gray-50">
                    Previous
                </Link>
            )}
            <span className="px-4 py-2 text-gray-600">Page {currentPage} of {totalPages}</span>
            {currentPage < totalPages && (
                <Link href={`/blog?page=${currentPage + 1}${category ? `&category=${category}` : ''}`} className="px-4 py-2 border rounded hover:bg-gray-50">
                    Next
                </Link>
            )}
          </div>

        </div>
      </div>
      <Footer data={safeConfig.sections.footer} />
    </main>
  );
}
