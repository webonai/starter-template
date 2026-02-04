import { ElementConfig } from '@/types/schema';
import { editable } from '@/lib/editable';

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
    if (!data) return null;
    
    const basePath = "sections.faq";

    return (
        <section {...editable(data.container, `${basePath}.container`, "section", "bg-gray-50 py-24 sm:py-32")}>
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div {...editable(data.header, `${basePath}.header`, "container", "mx-auto max-w-2xl lg:text-center")}>
                    <h2 className="text-base font-semibold leading-7 text-primary">
                        Frequently Asked Questions
                    </h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        {data.header?.text || "Common Questions"}
                    </p>    
                </div>  
                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                        {data.questions.map((faq, index) => (
                            <div key={index} className="mb-8">
                                <dt className="text-base font-semibold leading-7 text-gray-900">
                                    {faq.q}
                                </dt>
                                <dd className="mt-2 text-base leading-7 text-gray-600">
                                    {faq.a}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>  
        </section>
    );
}
