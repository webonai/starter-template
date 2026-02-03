type TestimonialsProps = {
  data: {
    title: string;
    reviews: {
        name: string;
        role: string;
        quote: string;
    }[];
  };
};

export default function Testimonials({ data }: TestimonialsProps) {
  return (
    <section className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
                <h2 className={`text-base font-semibold leading-7 text-primary`}>
                    What Our Customers Say
                </h2>
                <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    {data.title}
                </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                <div className="space-y-16">
                    {data.reviews.map((testimonial, index) => (   
                        <blockquote key={index} className="relative">
                            <div className="text-lg leading-8 text-gray-600">
                                “{testimonial.quote}”
                            </div>

                            <footer className="mt-6">
                                <div className="text-base font-semibold text-gray-900">
                                    {testimonial.name}        
                                </div>
                                <div className="text-sm text-gray-600">
                                    {testimonial.role}
                                </div>
                            </footer>
                        </blockquote>
                    ))}
                </div>
            </div>
        </div>
    </section>
  );
}