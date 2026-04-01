import React, { useState } from 'react';
import { motion } from 'motion/react';

export default function LeadForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    intent: 'buy'
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const payload = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        phone: formData.phone,
        email: formData.email,
        property_address: formData.address || '',
        intent: formData.intent === 'buy' ? 'Buy' : 'Sell',
        source: "James Geller Website"
      };

      await fetch('https://services.leadconnectorhq.com/hooks/XAeN1WklwW8MkNzlvtgb/webhook-trigger/90ee1d63-87cd-4297-877c-4d07f56f0425', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <section id="contact" className="py-24 px-6 bg-cream">
      <div className="max-w-3xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-serif mb-4">Connect With James</h2>
          <div className="space-y-3">
            <p className="text-luxury-text/80 text-xl font-serif italic">Let’s make the right move.</p>
            <p className="text-luxury-text/40 text-xs uppercase tracking-[0.2em] font-medium">Buying • Selling • Investing</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-cream p-8 md:p-12 rounded-[2rem] border border-luxury-text/20"
        >
          {submitted ? (
            <div className="text-center py-12">
              <h3 className="text-2xl font-serif mb-2">Thank You</h3>
              <p>Your message has been sent. James will be in touch shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="luxury-label opacity-60 ml-2">First Name</label>
                <input
                  required
                  type="text"
                  className="w-full px-6 py-4 rounded-full bg-cream border border-luxury-text/10 focus:border-luxury-text/30 focus:ring-0 transition-all outline-none"
                  placeholder="Jane"
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="luxury-label opacity-60 ml-2">Last Name</label>
                <input
                  required
                  type="text"
                  className="w-full px-6 py-4 rounded-full bg-cream border border-luxury-text/10 focus:border-luxury-text/30 focus:ring-0 transition-all outline-none"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="luxury-label opacity-60 ml-2">Phone Number</label>
                <input
                  required
                  type="tel"
                  className="w-full px-6 py-4 rounded-full bg-cream border border-luxury-text/10 focus:border-luxury-text/30 focus:ring-0 transition-all outline-none"
                  placeholder="818-515-8391"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="luxury-label opacity-60 ml-2">Email Address</label>
                <input
                  required
                  type="email"
                  className="w-full px-6 py-4 rounded-full bg-cream border border-luxury-text/10 focus:border-luxury-text/30 focus:ring-0 transition-all outline-none"
                  placeholder="jane@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="luxury-label opacity-60 ml-2">Property Address (Optional)</label>
                <input
                  type="text"
                  className="w-full px-6 py-4 rounded-full bg-cream border border-luxury-text/10 focus:border-luxury-text/30 focus:ring-0 transition-all outline-none"
                  placeholder="123 Luxury Lane, Westlake Village"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                />
              </div>
              <div className="md:col-span-2 space-y-4">
                <label className="luxury-label opacity-60 ml-2">I am looking to</label>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, intent: 'buy'})}
                    className={`flex-1 py-4 rounded-full transition-all luxury-label border ${
                      formData.intent === 'buy' 
                        ? 'bg-muted-gold text-white border-muted-gold shadow-lg' 
                        : 'bg-sand text-luxury-text border-luxury-text/10 hover:border-luxury-text/20'
                    }`}
                  >
                    Buy
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, intent: 'sell'})}
                    className={`flex-1 py-4 rounded-full transition-all luxury-label border ${
                      formData.intent === 'sell' 
                        ? 'bg-muted-gold text-white border-muted-gold shadow-lg' 
                        : 'bg-sand text-luxury-text border-luxury-text/10 hover:border-luxury-text/20'
                    }`}
                  >
                    Sell
                  </button>
                </div>
              </div>
              
              <div className="md:col-span-2 mt-4">
                <button
                  type="submit"
                  className="w-full bg-sand text-luxury-text border border-luxury-text/10 px-8 py-5 rounded-full luxury-label hover:bg-muted-gold hover:text-white transition-all shadow-lg active:scale-[0.98]"
                >
                  Connect With Me
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
