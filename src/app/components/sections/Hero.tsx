import Link from 'next/link';
type HeroProps = {
  data: {
    headline: string;
    subtext: string;
    buttonText: string;
    buttonLink: string;
    image?: string;
    variant?: 'center' | 'split';
  };
};

export default function Hero({ data }: HeroProps) {
  const { headline, subtext, buttonText, buttonLink } = data;
  

  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-32">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          {headline}
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          {subtext}
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href={buttonLink}
            className={`rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600`}
          >
            {buttonText}
          </Link>
          <Link href="/about" className="text-sm font-semibold leading-6 text-gray-900">
            Learn more <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}