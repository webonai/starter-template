'use client';

import { editable } from '@/lib/editable';
import Link from 'next/link';
import Image from 'next/image';
import { HeaderProps } from './types';


export default function Header({ data }: { data: HeaderProps }) {   
    if (!data) return null;

    return (
        <header data-section="header" {...editable(data.container, "sections.header.container", "header")}>
            <div className="container mx-auto flex items-center justify-between">
                {/* Logo */}
                <Link href={data.logo?.href || '/'} {...editable(data.logo, "sections.header.logo", "image")}>
                    {data.logo?.src && (
                        <Image 
                            src={data.logo.src} 
                            alt={data.logo.alt || 'Logo'} 
                            width={60} 
                            height={20}
                            priority
                        />
                    )}
                </Link>

                {/* Nav & CTA */}
                <div className="flex items-center gap-x-8">
                    <nav {...editable(data.nav, "sections.header.nav", "container")}>
                        {data.nav?.links.map((link, index) => (
                            <Link 
                                {...editable(link, `sections.header.nav.links.${index}`, "link")} 
                                key={index} 
                                href={link.href}
                            >
                                {link.text}
                            </Link>
                        ))}
                    </nav>
                    <Link href={data.ctaButton?.href || '#'} {...editable(data.ctaButton, "sections.header.ctaButton", "button")}>
                        {data.ctaButton?.text}
                    </Link>
                </div>
            </div>
        </header>
    );
}