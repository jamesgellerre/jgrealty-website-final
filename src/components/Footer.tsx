import React from 'react';
import { Mail, Phone, Instagram } from 'lucide-react';

export default function Footer({ onNavigate }: { onNavigate?: (view: string) => void }) {
  const handleNavClick = (e: React.MouseEvent, view: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(view);
    }
  };

  return (
    <footer className="bg-sand text-luxury-text py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16">
          <div className="space-y-8">
            <div className="flex items-center justify-center md:justify-start gap-1.5 cursor-pointer -ml-2 md:ml-0" onClick={(e) => handleNavClick(e, 'home')}>
              <div 
                className="h-[64px] w-[120px] bg-luxury-text opacity-80 -mr-2.5" 
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
              <div className="h-10 w-px bg-luxury-text/10" />
              <div 
                className="h-12 w-[120px] bg-luxury-text opacity-80" 
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
            <p className="opacity-60 max-w-xs italic">
              Modern strategy. Local expertise. The right approach to every move.
            </p>
          </div>
          
          <div className="space-y-6">
            <h4 className="luxury-label opacity-40">Navigation</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" onClick={(e) => handleNavClick(e, 'home')} className="hover:text-muted-gold transition-colors">Home</a></li>
              <li><a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="hover:text-muted-gold transition-colors">About James</a></li>
              <li><a href="#sales" onClick={(e) => handleNavClick(e, 'sales')} className="hover:text-muted-gold transition-colors">Past Sales</a></li>
              <li><a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className="hover:text-muted-gold transition-colors">Contact</a></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="luxury-label opacity-40">Contact</h4>
            <ul className="space-y-4 text-sm">
              <li className="opacity-60 italic">Servicing the Conejo Valley, San Fernando Valley, and the greater Los Angeles area.</li>
              <li>
                <a href="mailto:jamesgellerRE@gmail.com" className="flex items-center gap-2 hover:text-muted-gold transition-colors">
                  <Mail className="w-4 h-4 opacity-60" />
                  jamesgellerRE@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:8185158391" className="flex items-center gap-2 hover:text-muted-gold transition-colors">
                  <Phone className="w-4 h-4 opacity-60" />
                  818-515-8391
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/jamesgeller.realty" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-muted-gold transition-colors">
                  <Instagram className="w-4 h-4 opacity-60" />
                  @jamesgeller.realty
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-luxury-text/10 flex flex-col md:flex-row justify-between items-center gap-4 luxury-label opacity-40">
          <p>© 2026 James Geller. All Rights Reserved.</p>
          <p>Licensed Broker-Associate. The ONE Luxury Properties | DRE# 02154616</p>
        </div>
      </div>
    </footer>
  );
}
