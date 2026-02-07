import path from 'path';
import fs from 'fs';

export type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  image: string;
  author: string;
  category: string;
  tags: string[];
  content: string;
  href: string;
};

const postsFile = path.join(process.cwd(), 'content/posts/posts.json');

export function getPosts(category?: string): Post[] {
  if (!fs.existsSync(postsFile)) {
    return [];
  }
  
  const fileContents = fs.readFileSync(postsFile, 'utf8');
  const posts = JSON.parse(fileContents);
  
  let filteredPosts = posts;
  if (category) {
    filteredPosts = posts.filter((post: Post) => post.category === category);
  }

  return filteredPosts.map((post: Post) => ({
    ...post,
    content: post.content,
    href: `/blog/${post.slug}`,
  })).sort((a: Post, b: Post) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getCategories(): string[] {
  if (!fs.existsSync(postsFile)) {
    return [];
  }
  
  const fileContents = fs.readFileSync(postsFile, 'utf8');
  const posts = JSON.parse(fileContents);
  const categories = new Set(posts.map((post: Post) => post.category));
  return Array.from(categories) as string[];
}

export function getPostBySlug(slug: string): Post | undefined {
  const posts = getPosts();
  return posts.find((post) => post.slug === slug);
}

export function getTopPosts(count: number = 3): Post[] {
  const posts = getPosts();
  return posts.slice(0, count);
}

export function getPostsByTag(tag: string): Post[] {
  const posts = getPosts();
  return posts.filter((post) => post.tags.includes(tag));
}

export function getPostsByAuthor(author: string): Post[] {
  const posts = getPosts();
  return posts.filter((post) => post.author === author);
}
export function getPostsByDateRange(startDate: string, endDate: string): Post[] {
  const posts = getPosts();
  const start = new Date(startDate);
  const end = new Date(endDate);
  return posts.filter((post) => {
    const postDate = new Date(post.date);
    return postDate >= start && postDate <= end;
  });
}
export function getPostsByCategory(category: string): Post[] {
  const posts = getPosts();
  return posts.filter((post) => post.category === category);
}


export function getRelatedPosts(post: Post, count: number = 3): Post[] {
  const posts = getPosts();
  const related = posts.filter((p) => 
    p.slug !== post.slug && 
    (p.category === post.category || p.tags.some(tag => post.tags.includes(tag)))
  );
  return related.slice(0, count);
}