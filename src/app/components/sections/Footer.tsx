'use client';
import {editable } from '@/lib/editable';
import { ElementConfig } from '@/types/schema';
import Link from 'next/link';

type FooterLinks = {
    text: string;
    href: string;
};

type FooterProps = {
    data: {
        container: {
          className?: string;
        };
        text: ElementConfig;
        grid: ElementConfig;
        items: {
          title: string;
          links: FooterLinks[]
        }[];
    };
};

export default function Footer({ data }: FooterProps) {
  return (
    <footer data-section="footer" {...editable(data.container, "sections.footer.container", "footer", "bg-secondary py-6 text-secondary-foreground")}>
      <div className="container mx-auto text-center">
          <h3 {...editable(data.text, "sections.footer.text", "text", "text-secondary-foreground")}>{data.text?.text}</h3>
          <div {...editable(data.grid, "sections.footer.grid", "container", "mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6")}>
              {data.items.map((item, index) => (
                  <div key={index}>
                      <h4 {...editable(item.title, `sections.footer.items.${index}.title`, "text", "text-lg font-semibold text-secondary-foreground")}>{item.title}</h4>
                      <ul>
                          {item.links.map((link, linkIndex) => (
                              <li key={linkIndex} className="mb-2">
                                  <Link {...editable(link, `sections.footer.items.${index}.links.${linkIndex}`, "link", "text-secondary-foreground opacity-80 hover:opacity-100 transition-opacity") } href={link.href}>
                                      {link.text}
                                  </Link>
                              </li>
                          ))}
                      </ul>
                  </div>
              ))}
          </div>

        <p {...editable(data.text, "sections.footer.copyright", "text", "text-secondary-foreground opacity-70 pt-8 mt-4 text-sm")}>
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
      </div>
    </footer>
  );
}