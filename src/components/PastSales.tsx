import { motion } from 'motion/react';
import { PAST_SALES } from '../constants';
import { Home, Maximize, MapPin, ArrowRight } from 'lucide-react';

interface PastSalesProps {
  limit?: number;
  onViewMore?: () => void;
  hideSubheading?: boolean;
}

export default function PastSales({ limit, onViewMore, hideSubheading }: PastSalesProps) {
  const displayedSales = limit ? PAST_SALES.slice(0, limit) : PAST_SALES;

  return (
    <section id="sales" className="py-24 px-6 bg-cream">
      <div className="max-w-7xl mx-auto">
        <div className={`flex flex-col md:flex-row justify-between items-end gap-6 ${hideSubheading ? 'mb-6' : 'mb-12'}`}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className={`text-4xl font-serif ${hideSubheading ? 'mb-0' : 'mb-4'}`}>Past Sales</h2>
            {!hideSubheading && (
              <p className="text-luxury-text/70 max-w-xl">
                Real results, driven by strategy and local insight.
              </p>
            )}
          </motion.div>
          
          {onViewMore && (
            <motion.button
              whileHover={{ x: 5 }}
              onClick={onViewMore}
              className="flex items-center gap-2 text-muted-gold luxury-label group"
            >
              View More Sales <ArrowRight className="w-4 h-4" />
            </motion.button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedSales.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-sand/30 rounded-[2rem] overflow-hidden border border-muted-gold/5 hover:border-muted-gold/20 transition-all hover:shadow-xl hover:shadow-muted-gold/5"
            >
              {property.imageUrl && (
                <div className="aspect-[16/9] overflow-hidden">
                  <img 
                    src={property.imageUrl} 
                    alt={property.address}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                </div>
              )}
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-xl font-serif mb-1">{property.address}</h3>
                    <div className="flex items-center gap-1 text-sm text-luxury-text/60">
                      <MapPin className="w-3 h-3" /> {property.city}
                    </div>
                  </div>
                  <div className="text-lg font-medium text-muted-gold">
                    {property.price}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 py-6 border-y border-muted-gold/10">
                  <div className="flex flex-col items-center">
                    <span className="luxury-label opacity-40 mb-1">Beds</span>
                    <span className="font-light">{property.beds}</span>
                  </div>
                  <div className="flex flex-col items-center border-x border-muted-gold/10">
                    <span className="luxury-label opacity-40 mb-1">Baths</span>
                    <span className="font-light">{property.baths}</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="luxury-label opacity-40 mb-1">Sqft</span>
                    <span className="font-light">{property.sqft.toLocaleString()}</span>
                  </div>
                </div>

                {property.lotSize && (
                  <div className="mt-6 flex items-center gap-2 text-sm text-luxury-text/60">
                    <Maximize className="w-4 h-4 opacity-40" />
                    <span>{property.lotSize}</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
