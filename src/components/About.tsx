import { motion } from 'motion/react';

export default function About() {
  return (
    <section id="about" className="py-24 px-6 bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-12 lg:gap-24 items-center">
          {/* Image Container */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative flex justify-center"
          >
            <div className="w-full max-w-[400px] aspect-[4/5] rounded-t-[200px] rounded-b-[40px] overflow-hidden shadow-[0_46px_92px_-18px_rgba(69,54,43,0.4)] relative z-10">
              <img 
                src="/james-headshot.jpg" 
                alt="James Geller - Real Estate Broker"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              {/* Subtle overlay for depth and a more premium feel - increased by 15% */}
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-text/25 via-transparent to-transparent pointer-events-none" />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/15 pointer-events-none" />
            </div>
            {/* Decorative Elements */}
            <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-sand/30 rounded-full -z-0 blur-2xl" />
            <div className="absolute top-12 -left-8 w-32 h-[120%] border border-muted-gold/20 rounded-t-full -z-10" />
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <span className="luxury-label text-muted-gold opacity-80">Meet James</span>
              <h2 className="text-5xl font-serif leading-tight">James Geller</h2>
            </div>

            <div className="space-y-6 text-luxury-text/80 leading-relaxed text-lg">
              <p>
                Born and raised in the heart of the San Fernando Valley, James has a deep understanding of the Los Angeles real estate market. He proudly serves clients throughout the San Fernando Valley, Conejo Valley, and the greater Los Angeles area.
              </p>
              <p>
                Since becoming a licensed broker in 2022, James has worked closely with investors across Southern California, honing his ability to identify opportunities that maximize value—whether it's a first-time home purchase or a strategic investment.
              </p>
              <p>
                James is committed to providing a seamless experience with clear, transparent communication, ensuring his clients feel confident and informed every step of the way.
              </p>
              <p className="font-serif italic text-2xl text-luxury-text/90 border-l-2 border-muted-gold/20 pl-6 py-2">
                Whether you're searching for your next home, investment property, or a free home evaluation, get in touch with James today.
              </p>
            </div>

            <div className="pt-4">
              <a 
                href="#contact" 
                className="inline-block bg-sand text-luxury-text border border-luxury-text/10 px-10 py-4 rounded-full luxury-label hover:bg-muted-gold hover:text-white transition-all shadow-lg shadow-muted-gold/10"
              >
                Connect With James
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
