'use client';

import { editable } from '@/lib/editable';
import type { ElementConfig } from '@/types/schema';
import Link from 'next/link';
import Image from 'next/image';
type NavLink = {
    text: string;
    href: string;
};

type HeaderProps = {
    container: ElementConfig;
    logo: {
        src: string;
        alt: string;
        href: string;
        styles?: Record<string, string>;
        className?: string;
    };
    nav: {
        links: NavLink[];
        className?: string;
        styles?: Record<string, string>;
    };
    ctaButton: {
        text: string;
        href: string;
        className?: string;
        styles?: Record<string, string>;
    };
};

export default function Header({ data }: { data: HeaderProps }) {   
    if (!data) return null;

    return (
        <header {...editable(data.container, "sections.header.container", "header")}>
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
                            <Link {...editable(link, `sections.header.nav.links.${index}`, "link", "text-sm font-semibold leading-6 text-gray-100 hover:text-indigo-600 transition-colors")} key={index} href={link.href}>
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