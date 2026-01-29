import config from '@/data/config.json';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* 1. HERO SECTION */}
      {config.hero.show && (
        <section className="bg-gray-50 py-20 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl font-bold text-gray-900">
              {config.hero.headline}
            </h1>
            <p className="mt-4 text-xl text-gray-600">
              {config.hero.subheadline}
            </p>
            <div className="mt-8">
              <Link 
                href={config.hero.ctaLink}
                className={`rounded-lg px-8 py-3 text-white font-semibold bg-${config.theme.primaryColor}-600 hover:bg-${config.theme.primaryColor}-700 transition`}
              >
                {config.hero.ctaText}
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* 2. FEATURES SECTION */}
      {config.features.show && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              {config.features.title}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {config.features.items.map((item, index) => (
                <div key={index} className="p-6 border rounded-xl shadow-sm hover:shadow-md transition">
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}