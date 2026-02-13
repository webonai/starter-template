'use client';
import { FaqProps } from './types';
import { editable } from '@/lib/editable';
import { ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export default function FAQ({ data }: FaqProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    if (!data) return null;
    
    const basePath = "sections.faq";

    return (
        <section data-section="faq" {...editable(data.container, `${basePath}.container`, "section", "relative py-24 sm:py-32")}>
            <div {...editable(data.innerWrapper, `${basePath}.innerWrapper`, "container", "container mx-auto px-4 sm:px-6 lg:px-8")}>
                
                {/* Header */}
                <div {...editable(data.headerWrapper, `${basePath}.headerWrapper`, "container", "mx-auto max-w-2xl text-center mb-16")}>
                    {data.eyebrow?.enabled && (
                        <p {...editable(data.eyebrow, `${basePath}.eyebrow`, "badge", "text-sm text-muted-foreground mb-3")}>
                            {data.eyebrow.text}
                        </p>
                    )}
                    
                    <h2 {...editable(data.header, `${basePath}.header`, "headline", "text-3xl font-semibold tracking-tight text-foreground sm:text-4xl")}>
                        {data.header?.text || "Common Questions"}
                    </h2>
                    
                    {data.subtext?.text && (
                        <p {...editable(data.subtext, `${basePath}.subtext`, "text", "mt-4 text-base text-muted-foreground max-w-lg mx-auto")}>
                            {data.subtext.text}
                        </p>
                    )}
                </div>

                {/* FAQ Items */}
                <div {...editable(data.list, `${basePath}.list`, "container", "mx-auto max-w-2xl divide-y divide-border")}>
                    {data.questions.map((faq, index) => (
                        <AccordionItem
                            key={index}
                            faq={faq}
                            index={index}
                            basePath={basePath}
                            isOpen={openIndex === index}
                            onToggle={() => toggleFAQ(index)}
                        />
                    ))}
                </div>
            </div>  
        </section>
    );
}

function AccordionItem({ faq, index, basePath, isOpen, onToggle }: {
    faq: FaqProps['data']['questions'][number];
    index: number;
    basePath: string;
    isOpen: boolean;
    onToggle: () => void;
}) {
    const contentRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (contentRef.current) {
            setHeight(isOpen ? contentRef.current.scrollHeight : 0);
        }
    }, [isOpen]);

    return (
        <div {...editable(faq, `${basePath}.questions.${index}`, "container", "")}>
            <button 
                onClick={onToggle}
                className="flex w-full cursor-pointer items-center justify-between text-left py-5 group"
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${index}`}
            >
                <span {...editable(faq.q, `${basePath}.questions.${index}.q`, "text", "text-sm font-medium text-foreground")}>
                    {faq.q?.text}
                </span>
                <span className="ml-6 flex shrink-0 items-center text-muted-foreground">
                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? '-rotate-180' : 'rotate-0'}`} />
                </span>
            </button>
            <div 
                id={`faq-answer-${index}`}
                className="overflow-hidden transition-[height] duration-200 ease-in-out"
                style={{ height }}
            >
                <div ref={contentRef}>
                    <div className="pb-5">
                        <p {...editable(faq.a, `${basePath}.questions.${index}.a`, "text", "text-sm leading-relaxed text-muted-foreground")}>
                            {faq.a?.text}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}