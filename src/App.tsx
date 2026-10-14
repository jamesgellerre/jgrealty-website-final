/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import PastSales from './components/PastSales';
import LeadForm from './components/LeadForm';
import Footer from './components/Footer';
import JsonLd from './components/JsonLd';
import { BIO_PARAGRAPHS, isSalesPath } from './site';

export default function App({ pathname }: { pathname: string }) {
  const showAllSales = isSalesPath(pathname);

  const scrollTo = (view: string) => {
    if (view === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const id = view === 'sales' ? 'sales' : (view === 'contact' ? 'contact' : 'about');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen selection:bg-warm-brown/20">
      <JsonLd />
      <Navbar onNavigate={scrollTo} />

      {showAllSales ? (
        <main className="pt-32 pb-24">
          <div className="max-w-7xl mx-auto px-6 mb-12">
            <a
              href="/"
              className="text-warm-brown font-medium flex items-center gap-2 mb-8 hover:opacity-70 transition-opacity"
            >
              ← Back to Home
            </a>
            <h1 className="text-6xl font-serif mb-4">Complete Sales History</h1>
            <p className="text-luxury-text/60 max-w-2xl">
              A complete record of results across Southern California.
            </p>
            <div className="max-w-3xl space-y-6 text-luxury-text/80 leading-relaxed text-lg mt-8">
              {BIO_PARAGRAPHS.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <PastSales hideSubheading />
          <div className="max-w-7xl mx-auto px-6 mt-12 text-center">
            <a
              href="/#contact"
              className="inline-block bg-sand text-luxury-text border border-luxury-text/10 px-12 py-5 rounded-full luxury-label hover:bg-muted-gold hover:text-white transition-all shadow-lg shadow-muted-gold/10"
            >
              Work With James
            </a>
          </div>
        </main>
      ) : (
        <main>
          <Hero onNavigate={scrollTo} />
          <About />
          <PastSales limit={6} viewMoreHref="/sales" />
          <LeadForm />
        </main>
      )}

      <Footer onNavigate={scrollTo} />
    </div>
  );
}
