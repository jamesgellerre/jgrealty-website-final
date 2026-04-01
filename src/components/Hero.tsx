import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown } from 'lucide-react';

export default function Hero({ onNavigate }: { onNavigate?: (view: string) => void }) {
  const handleNavClick = (e: React.MouseEvent, view: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(view);
    }
  };

  return (
    <section className="relative h-screen min-h-[700px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/skyline-background.png" 
          alt="Skyline of Los Angeles"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent via-80% to-cream" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 h-full flex flex-col md:flex-row items-start pt-[8rem] md:pt-[6.5rem]">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="max-w-2xl text-left"
        >
          <img 
            src="/james-signature.png" 
            alt="James Geller Signature" 
            className="h-24 md:h-36 w-auto mb-0 object-contain"
            referrerPolicy="no-referrer"
          />
          
          <div className="space-y-2">
            <p className="font-serif italic text-lg md:text-xl text-luxury-text max-w-md leading-tight">
              Local Knowledge. Modern Representation.
            </p>
            <p className="luxury-label text-luxury-text max-w-sm">
              Servicing the Conejo Valley & San Fernando Valley
            </p>
          </div>
        </motion.div>

        {/* Mobile CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="md:hidden absolute bottom-[17.5%] left-0 right-0 px-6 flex justify-center"
        >
          <a 
            href="#contact" 
            onClick={(e) => handleNavClick(e, 'contact')}
            className="bg-sand text-luxury-text border border-luxury-text/10 px-6 py-2.5 rounded-full luxury-label text-[10px] text-center hover:bg-muted-gold hover:text-white transition-all shadow-lg"
          >
            Connect with Me
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowDown className="w-6 h-6 text-muted-gold/40" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
