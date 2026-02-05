'use client';

import { ElementConfig } from '@/types/schema';
import { editable } from '@/lib/editable';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

type FaqProps = {
    data: { 
        container: ElementConfig;
        header: ElementConfig;
        questions: {
            q: string;
            a: string;
        }[]
    }
}

export default function FAQ({ data }: FaqProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    if (!data) return null;
    
    const basePath = "sections.faq";

    return (
        <section {...editable(data.container, `${basePath}.container`, "section", "bg-gray-50 py-24 sm:py-32")}>
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div {...editable(data.header, `${basePath}.header`, "container", "mx-auto max-w-2xl lg:text-center mb-16")}>
                    <h2 {...editable(data.header, `${basePath}.header`, "headline", "text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl")} >
                        {data.header?.text || "Common Questions"}
                    </h2>    
                </div>  
                <div className="mx-auto max-w-3xl divide-y divide-gray-900/10">
                    {data.questions.map((faq, index) => (
                        <div key={index} className="py-6">
                            <button 
                                onClick={() => toggleFAQ(index)}
                                className="flex w-full cursor-pointer items-start justify-between text-left text-gray-900 hover:text-indigo-600 transition-colors group"
                            >
                                <span className="text-base font-semibold leading-7">{faq.q}</span>
                                <span className="ml-6 flex h-7 items-center">
                                    <ChevronDown className={`h-6 w-6 transition-transform duration-200 ${openIndex === index ? '-rotate-180' : 'rotate-0'}`} />
                                </span>
                            </button>
                            {openIndex === index && (
                                <div className="mt-2 pr-12">
                                    <p className="text-base leading-7 text-gray-600">{faq.a}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>  
        </section>
    );
}
