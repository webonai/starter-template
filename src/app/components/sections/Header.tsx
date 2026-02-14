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
        <header data-section="header" {...editable(data.container, "sections.header.container", "section", "")}>
            <div {...editable(data.innerWrapper, "sections.header.innerWrapper", "container", "")}>
                <div {...editable(data.wrapper, "sections.header.wrapper", "container", "")}>
                    
                    {/* Logo */}
                    <div {...editable(data.logoWrapper, "sections.header.logoWrapper", "container", "")}>
                        <Link {...editable(data.logo, "sections.header.logo", "link", "")} aria-label={data.logoImage?.alt || data.logo?.alt || 'Home'}>
                            {data.logoImage?.src?.endsWith('.svg') && svgContent ? (
                                <span
                                    dangerouslySetInnerHTML={{ __html: svgContent }}
                                    {...editable(data.logoImage, "sections.header.logoImage", "image")}
                                />
                            ) : data.logoImage?.src ? (
                                <img src={data.logoImage.src} alt={data.logoImage.alt || data.logo?.alt || 'Logo'} {...editable(data.logoImage, "sections.header.logoImage", "image")} />
                            ) : null}
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav {...editable(data.nav, "sections.header.nav", "container", "")} aria-label="Main navigation">
                        {data.nav?.links.map((link, index) => (
                            <Link key={index} {...editable(link, `sections.header.nav.links.${index}`, "link", "")}>
                                {link.text}
                            </Link>
                        ))}
                    </nav>

                    {/* Desktop CTA + Mobile Menu Button */}
                    <div {...editable(data.actions, "sections.header.actions", "container", "")}>
                        <Link {...editable(data.ctaButton, "sections.header.ctaButton", "button", "")}>
                            {data.ctaButton?.text}
                        </Link>

                        {/* Mobile menu button */}
                        <button type="button" {...editable(data.mobileMenuButton, "sections.header.mobileMenuButton", "button", "")} onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-expanded={mobileMenuOpen} aria-label="Toggle menu">
                            <span {...editable(data.srText, "sections.header.srText", "text", "")}>Open main menu</span>
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
                <div {...editable(data.mobileMenu, "sections.header.mobileMenu", "container", "")}>
                    <div {...editable(data.mobileMenuInner, "sections.header.mobileMenuInner", "container", "")}>
                        {data.nav?.links.map((link, index) => (
                            <Link key={index} {...editable(link, `sections.header.mobileMenu.links.${index}`, "link", "")} onClick={() => setMobileMenuOpen(false)}>
                                {link.text}
                            </Link>
                        ))}
                        <Link {...editable(data.mobileCTA, "sections.header.mobileCTA", "button", "")} onClick={() => setMobileMenuOpen(false)}>
                            {data.ctaButton?.text}
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}