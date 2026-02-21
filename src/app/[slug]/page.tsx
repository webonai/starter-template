import DynamicPageContent from './DynamicPageContent';
import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import config from '../../data/config.json';

function getStaticSlugs(): string[] {
  const pageSlugs = (
    (config as { layout?: { pages?: { slug?: string }[] } }).layout?.pages || []
  )
    .map((p) => p.slug?.trim())
    .filter((slug): slug is string => !!slug);

  const templatesDir = path.join(process.cwd(), 'public', 'templates');
  const templateSlugs = fs.existsSync(templatesDir)
    ? fs
        .readdirSync(templatesDir)
        .filter((name) => name.endsWith('.json'))
        .map((name) => name.replace(/\.json$/i, '').trim())
        .filter((slug) => slug.length > 0)
    : [];

  return Array.from(new Set([...pageSlugs, ...templateSlugs])).filter(
    (slug) => slug !== 'blog'
  );
}

const STATIC_SLUGS = getStaticSlugs();

export async function generateStaticParams() {
  return STATIC_SLUGS.map((slug) => ({ slug }));
}

export default async function DynamicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!STATIC_SLUGS.includes(slug)) {
    notFound();
  }
  return <DynamicPageContent slug={slug} />;
}
