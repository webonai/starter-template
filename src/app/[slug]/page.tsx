'use client';

import { useConfig } from '@/context/ConfigContext';
import { useParams, notFound } from 'next/navigation';
import Header from '../components/sections/Header';
import Footer from '../components/sections/Footer';
import { editable } from '@/lib/editable';
import { Twitter, Github, Linkedin, Facebook, Instagram, Mail } from 'lucide-react';

const SOCIAL_ICONS: Record<string, any> = {
  twitter: Twitter,
  github: Github,
  linkedin: Linkedin,
  facebook: Facebook,
  instagram: Instagram,
  mail: Mail
};

export default function DynamicPage() {
  const params = useParams();
  const config = useConfig();
  const safeConfig = config as any;
  const slug = params?.slug;

  if (!safeConfig || !safeConfig.layout) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
      </div>
    );
  }

  const pageIndex = safeConfig.layout.pages.findIndex((p: any) => p.slug === slug);
  const page = safeConfig.layout.pages[pageIndex];
  const dynamicPage = safeConfig.sections?.dynamicPage || {};

  if (!page) {
    return notFound();
  }

  return (
    <main>
      {safeConfig.sections.header && <Header data={safeConfig.sections.header} />}
      
      <div {...editable(dynamicPage.container, "sections.dynamicPage.container", "section", "")}>
        <div {...editable(dynamicPage.innerWrapper, "sections.dynamicPage.innerWrapper", "container", "")}>
          <div {...editable(dynamicPage.contentWrapper, "sections.dynamicPage.contentWrapper", "container", "")}>
            <h1 {...editable(page.headline, `layout.pages.${pageIndex}.headline`, "headline", "text-4xl font-bold tracking-tight text-foreground sm:text-6xl")}>
              {page.headline?.text || page.title}
            </h1>
            <p {...editable(page.subtext, `layout.pages.${pageIndex}.subtext`, "text", "mt-6 text-lg leading-8 text-muted-foreground")}>
              {page.subtext?.text || `This is the ${page.title} page.`}
            </p>

            {page.socials && page.socials.length > 0 && (
              <div className="mt-10 flex justify-center gap-x-6">
                {page.socials.map((social: any, index: number) => {
                  const Icon = SOCIAL_ICONS[social.icon?.toLowerCase()] || Mail;
                  return (
                    <a key={index} href={social.href} target="_blank" rel="noreferrer" {...editable(social, `layout.pages.${pageIndex}.socials.${index}`, "link", "text-muted-foreground hover:text-foreground")}>
                      <span className="sr-only">{social.platform}</span>
                      <Icon className="h-6 w-6" />
                    </a>
                  );
                })}
              </div>
            )}

            {page.body && (
              <div className="mt-10 max-w-2xl mx-auto">
                <div {...editable(page.body, `layout.pages.${pageIndex}.body`, "text", "text-lg leading-8 text-muted-foreground")}>
                  {page.body.text}
                </div>
              </div>
            )}

            {page.items && (
              <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                <dl {...editable(page.grid, `layout.pages.${pageIndex}.grid`, "grid", "grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16")}>
                  {page.items.map((item: any, index: number) => (
                    <div key={index} className="flex flex-col">
                      <dt {...editable(item.title, `layout.pages.${pageIndex}.items.${index}.title`, "text", "text-base font-semibold leading-7 text-foreground")}>
                        {item.title?.text}
                      </dt>
                      <dd {...editable(item.description, `layout.pages.${pageIndex}.items.${index}.description`, "text", "mt-1 flex-auto text-base leading-7 text-muted-foreground")}>
                        {item.description?.text}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </div>
        </div>
      </div>

      {safeConfig.sections.footer && <Footer data={safeConfig.sections.footer} />}
    </main>
  );
}
