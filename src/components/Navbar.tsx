import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar({ onNavigate }: { onNavigate?: (view: string) => void }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent, view: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(view);
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-cream/90 backdrop-blur-md py-4 shadow-sm border-b border-luxury-text/5' 
            : 'bg-transparent py-8'
        } px-6`}
      >
        <div className="max-w-7xl mx-auto flex justify-center md:justify-between items-center relative">
          <div className="flex items-center justify-center md:justify-start gap-1.5 cursor-pointer -ml-2 md:ml-0 w-full md:w-auto" onClick={(e) => handleNavClick(e, 'home')}>
            <div 
              className={`bg-luxury-text transition-all duration-500 -mr-2.5 ${
                isScrolled ? 'h-10 md:h-12 w-[80px] md:w-[100px]' : 'h-14 md:h-[64px] w-[100px] md:w-[120px]'
              }`}
              style={{
                maskImage: 'url(/james-logo.png)',
                maskSize: 'contain',
                maskRepeat: 'no-repeat',
                maskPosition: 'center',
                WebkitMaskImage: 'url(/james-logo.png)',
                WebkitMaskSize: 'contain',
                WebkitMaskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center'
              }}
            />
            <div className="h-6 md:h-8 w-px bg-luxury-text/10" />
            <div 
              className={`bg-luxury-text transition-all duration-500 ${
                isScrolled ? 'h-8 md:h-10 w-[80px] md:w-[100px]' : 'h-10 md:h-12 w-[100px] md:w-[120px]'
              }`}
              style={{
                maskImage: 'url(/company-logo.png)',
                maskSize: 'contain',
                maskRepeat: 'no-repeat',
                maskPosition: 'center',
                WebkitMaskImage: 'url(/company-logo.png)',
                WebkitMaskSize: 'contain',
                WebkitMaskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center'
              }}
            />
          </div>
          
          <div className="hidden md:flex items-center gap-12 luxury-label">
            <a href="#" onClick={(e) => handleNavClick(e, 'home')} className="hover:text-muted-gold transition-colors">Home</a>
            <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="hover:text-muted-gold transition-colors">About</a>
            <a href="#sales" onClick={(e) => handleNavClick(e, 'sales')} className="hover:text-muted-gold transition-colors">Sales</a>
            <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className="bg-sand text-luxury-text border border-luxury-text/10 px-8 py-3 rounded-full hover:bg-muted-gold hover:text-white transition-all">Connect with Me</a>
          </div>

          <button 
            className="md:hidden text-luxury-text absolute right-0"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-40 bg-cream flex flex-col items-center justify-center gap-8 luxury-label text-2xl"
          >
            <a href="#" onClick={(e) => handleNavClick(e, 'home')} className="hover:text-muted-gold transition-colors">Home</a>
            <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="hover:text-muted-gold transition-colors">About</a>
            <a href="#sales" onClick={(e) => handleNavClick(e, 'sales')} className="hover:text-muted-gold transition-colors">Sales</a>
            <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className="bg-sand text-luxury-text border border-luxury-text/10 px-12 py-4 rounded-full hover:bg-muted-gold hover:text-white transition-all">Connect with Me</a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
