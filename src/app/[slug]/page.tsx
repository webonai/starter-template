import DynamicPageContent from './DynamicPageContent';
import config from '../../data/config.json';

export async function generateStaticParams() {
  const pages = (config as { layout?: { pages?: { slug: string }[] } }).layout?.pages || [];
  return pages
    .filter((p) => p.slug && p.slug !== '')
    .map((p) => ({ slug: p.slug }));
}

export default async function DynamicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <DynamicPageContent slug={slug} />;
}
