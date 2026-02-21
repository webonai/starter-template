import { getPosts, getCategories } from '@/lib/blog';
import BlogIndexClient from './BlogIndexClient';
import config from '../../data/config.json';

export default function BlogIndex() {
  const posts = getPosts();
  const categories = getCategories();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const safeConfig = config as any;
  const sections = safeConfig?.sections || {};
  const blogIndex = sections.blogIndex || {};

  return (
    <BlogIndexClient
      posts={posts}
      categories={categories}
      blogIndex={blogIndex}
      header={sections.header || {}}
      footer={sections.footer || {}}
    />
  );
}
