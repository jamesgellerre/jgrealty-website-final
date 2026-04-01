/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import PastSales from './components/PastSales';
import LeadForm from './components/LeadForm';
import Footer from './components/Footer';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [showAllSales, setShowAllSales] = useState(false);

  return (
    <div className="min-h-screen selection:bg-warm-brown/20">
      <Navbar onNavigate={(view) => {
        if (view === 'home') {
          setShowAllSales(false);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (view === 'about' || view === 'sales' || view === 'contact') {
          setShowAllSales(false);
          // Wait for the home view to render before scrolling
          setTimeout(() => {
            const id = view === 'sales' ? 'sales' : (view === 'contact' ? 'contact' : 'about');
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
      }} />
      
      <AnimatePresence mode="wait">
        {!showAllSales ? (
          <motion.main
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Hero onNavigate={(view) => {
              if (view === 'contact') {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }
            }} />
            <About />
            <PastSales 
              limit={6} 
              onViewMore={() => {
                setShowAllSales(true);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }} 
            />
            <LeadForm />
          </motion.main>
        ) : (
          <motion.main
            key="all-sales"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pt-32 pb-24"
          >
            <div className="max-w-7xl mx-auto px-6 mb-12">
              <button 
                onClick={() => setShowAllSales(false)}
                className="text-warm-brown font-medium flex items-center gap-2 mb-8 hover:opacity-70 transition-opacity"
              >
                ← Back to Home
              </button>
              <h1 className="text-6xl font-serif mb-4">Complete Sales History</h1>
              <p className="text-luxury-text/60 max-w-2xl">
                A complete record of results across Southern California.
              </p>
            </div>
            <PastSales hideSubheading />
            <div className="max-w-7xl mx-auto px-6 mt-12 text-center">
              <button 
                onClick={() => {
                  setShowAllSales(false);
                  setTimeout(() => {
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className="bg-sand text-luxury-text border border-luxury-text/10 px-12 py-5 rounded-full luxury-label hover:bg-muted-gold hover:text-white transition-all shadow-lg shadow-muted-gold/10"
              >
                Work With James
              </button>
            </div>
          </motion.main>
        )}
      </AnimatePresence>

      <Footer onNavigate={(view) => {
        if (view === 'home') {
          setShowAllSales(false);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (view === 'about' || view === 'sales' || view === 'contact') {
          setShowAllSales(false);
          setTimeout(() => {
            const id = view === 'sales' ? 'sales' : (view === 'contact' ? 'contact' : 'about');
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
      }} />
    </div>
  );
}
