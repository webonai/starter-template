'use client';
import {editable } from '@/lib/editable';
import Link from 'next/link';
import { FooterProps } from './types';


export default function Footer({ data }: FooterProps) {
  if (!data) return null;

  return (
    <footer data-section="footer" {...editable(data.container, "sections.footer.container", "footer", "bg-background border-t border-border py-12 sm:py-16")}>
      <div {...editable(data.innerWrapper, "sections.footer.innerWrapper", "container", "container mx-auto px-6 lg:px-8")}>
          <div className="flex flex-col items-center text-center mb-12">
             <h3 {...editable(data.text, "sections.footer.text", "text", "text-2xl font-bold text-background")}>{data.text?.text}</h3>
          </div>
          
          <div {...editable(data.grid, "sections.footer.grid", "container", "grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-4 justify-items-center")}>
              {data.items.map((item, index) => (
                  <div key={index} {...editable(item, `sections.footer.items.${index}`, "container", "flex flex-col items-start")}>
                      <h4 {...editable(item.title, `sections.footer.items.${index}.title`, "text", "text-sm font-semibold leading-6 text-background mb-4")}>{item.title}</h4>
                      <ul role="list" className="space-y-3">
                          {item.links.map((link, linkIndex) => (
                              <li key={linkIndex}>
                                  <Link {...editable(link, `sections.footer.items.${index}.links.${linkIndex}`, "link", "text-sm leading-6 text-muted-foreground hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm") } href={link.href}>
                                      {link.text}
                                  </Link>
                              </li>
                          ))}
                      </ul>
                  </div>
              ))}
          </div>

        <div className="mt-12 border-t border-border pt-8 text-center">
            <p {...editable(data.text, "sections.footer.copyright", "text", "text-xs leading-5 text-muted-foreground")}>
            &copy; {new Date().getFullYear()} Your Company. All rights reserved.
            </p>
        </div>
      </div>
    </footer>
  );
}