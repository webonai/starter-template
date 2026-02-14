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
        <section data-section="faq" {...editable(data.container, `${basePath}.container`, "section", "")}>
            <div {...editable(data.innerWrapper, `${basePath}.innerWrapper`, "container", "")}>
                
                {/* Header */}
                <div {...editable(data.headerWrapper, `${basePath}.headerWrapper`, "container", "")}>
                    {data.eyebrow?.enabled && (
                        <div {...editable(data.eyebrow, `${basePath}.eyebrow`, "badge", "")}>
                            {data.eyebrow.text}
                        </div>
                    )}
                    
                    <h2 {...editable(data.header, `${basePath}.header`, "headline", "")}>
                        {data.header?.text || "Common Questions"}
                    </h2>
                    
                    {data.subtext?.text && (
                        <p {...editable(data.subtext, `${basePath}.subtext`, "text", "")}>
                            {data.subtext.text}
                        </p>
                    )}
                </div>

                {/* FAQ Items */}
                <div {...editable(data.list, `${basePath}.list`, "container", "")}>
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
        <div {...editable(faq, `${basePath}.questions.${index}`, "container", "rounded-xl border border-border bg-card shadow-sm transition-all hover:shadow-md hover:border-primary/30")}>
            <button 
                onClick={onToggle}
                className="flex w-full cursor-pointer items-center justify-between text-left p-6 group"
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${index}`}
            >
                <span {...editable(faq.q, `${basePath}.questions.${index}.q`, "text", "text-base font-semibold leading-7 text-foreground group-hover:text-primary transition-colors")}>
                    {faq.q?.text}
                </span>
                <span className="ml-6 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground transition-all group-hover:bg-primary/10 group-hover:text-primary">
                    <ChevronDown className={`h-4 w-4 transition-transform duration-300 ease-in-out ${isOpen ? '-rotate-180' : 'rotate-0'}`} />
                </span>
            </button>
            <div 
                id={`faq-answer-${index}`}
                className="overflow-hidden transition-[height] duration-300 ease-in-out"
                style={{ height }}
            >
                <div ref={contentRef}>
                    <div className="px-6 pb-6">
                        <p {...editable(faq.a, `${basePath}.questions.${index}.a`, "text", "text-base leading-7 text-muted-foreground")}>
                            {faq.a?.text}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
