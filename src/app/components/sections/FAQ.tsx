'use client';
import { FaqProps } from './types';
import { editable } from '@/lib/editable';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function FAQ({ data }: FaqProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    if (!data) return null;
    
    const basePath = "sections.faq";

    return (
        <section data-section="faq" {...editable(data.container, `${basePath}.container`, "section", "bg-muted/30 py-24 sm:py-32")}>
            <div {...editable(data.innerWrapper, `${basePath}.innerWrapper`, "container", "mx-auto max-w-7xl px-6 lg:px-8")}>
                <div {...editable(data.headerWrapper, `${basePath}.headerWrapper`, "container", "mx-auto max-w-2xl lg:text-center mb-16")}>
                    <h2 {...editable(data.header, `${basePath}.header`, "headline", "text-3xl font-bold tracking-tight text-foreground sm:text-4xl")} >
                        {data.header?.text || "Common Questions"}
                    </h2>
                    <p {...editable(data.subtext, `${basePath}.subtext`, "text", "mt-4 text-lg leading-8 text-muted-foreground")}>
                        {data.subtext?.text}
                    </p>
                </div>  
                <div {...editable(data.list, `${basePath}.list`, "container", "mx-auto max-w-3xl divide-y divide-border")}>
                    {data.questions.map((faq, index) => (
                        <div key={index} {...editable(faq, `${basePath}.questions.${index}`, "container", "py-6")}>
                            <button 
                                onClick={() => toggleFAQ(index)}
                                className="flex w-full cursor-pointer items-start justify-between text-left text-foreground hover:text-primary transition-colors group"
                                aria-expanded={openIndex === index}
                                aria-controls={`faq-answer-${index}`}
                            >
                                <span {...editable(faq.q, `${basePath}.questions.${index}.q`, "text", "text-base font-semibold leading-7")}>
                                    {faq.q?.text}
                                </span>
                                <span className="ml-6 flex h-7 items-center">
                                    <ChevronDown className={`h-6 w-6 transition-transform duration-200 ${openIndex === index ? '-rotate-180' : 'rotate-0'}`} />
                                </span>
                            </button>
                            {openIndex === index && (
                                <div className="mt-2 pr-12">
                                    <p {...editable(faq.a, `${basePath}.questions.${index}.a`, "text", "text-base leading-7 text-muted-foreground")}>{faq.a?.text}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>  
        </section>
    );
}
