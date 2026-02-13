'use client';

import { editable } from '@/lib/editable';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { HeaderProps } from './types';

export default function Header({ data }: { data: HeaderProps }) {   
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [svgContent, setSvgContent] = useState<string>('');

    useEffect(() => {
        if (data?.logoImage?.src?.endsWith('.svg')) {
            fetch(data.logoImage.src)
                .then(res => res.text())
                .then(svg => setSvgContent(svg))
                .catch(() => setSvgContent(''));
        } else {
            setSvgContent('');
        }
    }, [data?.logoImage?.src]);
    
    if (!data) return null;

    return (
        <header data-section="header" {...editable(data.container, "sections.header.container", "section", "sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60")}>
            <div {...editable(data.innerWrapper, "sections.header.innerWrapper", "container", "container mx-auto px-4 sm:px-6 lg:px-8")}>
                <div {...editable(data.wrapper, "sections.header.wrapper", "container", "flex h-16 items-center justify-between")}>
                    
                    {/* Logo */}
                    <div {...editable(data.logoWrapper, "sections.header.logoWrapper", "container", "flex items-center")}>
                        <Link {...editable(data.logo, "sections.header.logo", "link", "flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm")} aria-label={data.logoImage?.alt || data.logo?.alt || 'Home'}>
                            {data.logoImage?.src?.endsWith('.svg') && svgContent ? (
                                <span
                                    className="inline-flex h-8 [&>svg]:h-full [&>svg]:w-auto"
                                    style={{ color: 'var(--primary)' }}
                                    dangerouslySetInnerHTML={{ __html: svgContent }}
                                    {...editable(data.logoImage, "sections.header.logoImage", "image")}
                                />
                            ) : data.logoImage?.src ? (
                                <img src={data.logoImage.src} alt={data.logoImage.alt || data.logo?.alt || 'Logo'} className="h-8 w-auto" {...editable(data.logoImage, "sections.header.logoImage", "image")} />
                            ) : null}
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav {...editable(data.nav, "sections.header.nav", "container", "hidden lg:flex lg:items-center lg:gap-x-8")} aria-label="Main navigation">
                        {data.nav?.links.map((link, index) => (
                            <Link key={index} {...editable(link, `sections.header.nav.links.${index}`, "link", "text-sm font-medium text-foreground/70 hover:text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm px-1 py-0.5")}>
                                {link.text}
                            </Link>
                        ))}
                    </nav>

                    {/* Desktop CTA + Mobile Menu Button */}
                    <div {...editable(data.actions, "sections.header.actions", "container", "flex items-center gap-x-4")}>
                        <Link {...editable(data.ctaButton, "sections.header.ctaButton", "button", "hidden sm:inline-flex rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2")}>
                            {data.ctaButton?.text}
                        </Link>

                        {/* Mobile menu button */}
                        <button type="button" {...editable(data.mobileMenuButton, "sections.header.mobileMenuButton", "button", "lg:hidden inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-accent hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary")} onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-expanded={mobileMenuOpen} aria-label="Toggle menu">
                            <span {...editable(data.srText, "sections.header.srText", "text", "sr-only")}>Open main menu</span>
                            {!mobileMenuOpen ? (
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                </svg>
                            ) : (
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {mobileMenuOpen && (
                <div {...editable(data.mobileMenu, "sections.header.mobileMenu", "container", "lg:hidden border-t border-border bg-background")}>
                    <div {...editable(data.mobileMenuInner, "sections.header.mobileMenuInner", "container", "container mx-auto px-4 py-4 space-y-1")}>
                        {data.nav?.links.map((link, index) => (
                            <Link key={index} {...editable(link, `sections.header.mobileMenu.links.${index}`, "link", "block rounded-lg px-3 py-2 text-base font-medium text-foreground/70 hover:bg-accent hover:text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary")} onClick={() => setMobileMenuOpen(false)}>
                                {link.text}
                            </Link>
                        ))}
                        <Link {...editable(data.mobileCTA, "sections.header.mobileCTA", "button", "mt-4 block w-full rounded-lg bg-primary px-4 py-2.5 text-center text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary")} onClick={() => setMobileMenuOpen(false)}>
                            {data.ctaButton?.text}
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}