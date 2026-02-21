import { getPosts, getCategories } from '@/lib/blog';
import BlogIndexClient from './BlogIndexClient';
import config from '../../data/config.json';

function getSectionConfig(sectionName: string) {
  const maybeSections = (config as any)?.sections;
  if (!maybeSections || typeof maybeSections !== 'object') {
    return {};
  }

  const section = (maybeSections as Record<string, unknown>)[sectionName];
  return section && typeof section === 'object' ? section : {};
}

export default function BlogIndex() {
  const posts = getPosts();
  const categories = getCategories();
  const blogIndex = getSectionConfig('blogIndex');
  const header = getSectionConfig('header');
  const footer = getSectionConfig('footer');

  return (
    <BlogIndexClient
      posts={posts}
      categories={categories}
      blogIndex={blogIndex}
      header={header}
      footer={footer}
    />
  );
}
