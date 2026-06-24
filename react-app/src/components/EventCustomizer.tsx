import { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart, Award, Users, Check } from 'lucide-react';
import { eventPackages } from '../data';

const iconMap: Record<string, React.ReactNode> = {
  Sparkles: <Sparkles className="w-6 h-6" />,
  Heart: <Heart className="w-6 h-6" />,
  Award: <Award className="w-6 h-6" />,
};

export default function EventCustomizer() {
  const [selectedPkgId, setSelectedPkgId] = useState<string>(eventPackages[0].id);
  const [guests, setGuests] = useState<number>(20);

  const pkg = eventPackages.find(p => p.id === selectedPkgId) || eventPackages[0];
  const totalPrice = pkg.pricePerPerson * guests;

  return (
    <section id="eventos" className="relative py-24 bg-background border-b border-primary/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-14">
          <span className="font-cursive text-4xl text-accent block mb-2 leading-none">
            Tus Momentos
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-text font-serif mb-4">
            Celebraciones y Eventos
          </h2>
          <div className="w-16 h-[1px] bg-accent/40 mx-auto mb-6"></div>
          <p className="text-sm sm:text-base text-brown/90 leading-relaxed font-sans max-w-2xl mx-auto">
            Organizamos bautizos, comuniones, bodas y comidas de empresa. Cada celebración es única, como tú.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {eventPackages.map((pkg) => (
            <motion.div
              key={pkg.id}
              whileHover={{ y: -4 }}
              onClick={() => setSelectedPkgId(pkg.id)}
              className={`cursor-pointer p-6 border transition-all duration-300 ${
                selectedPkgId === pkg.id
                  ? 'border-accent bg-accent/5 shadow-lg'
                  : 'border-primary/30 bg-surface hover:border-accent/50'
              }`}
            >
              <div className={`w-12 h-12 flex items-center justify-center mb-4 ${
                selectedPkgId === pkg.id ? 'text-accent' : 'text-brown'
              }`}>
                {iconMap[pkg.iconName] || <Award className="w-6 h-6" />}
              </div>
              <h3 className="font-serif font-bold text-lg text-text mb-2">{pkg.name}</h3>
              <p className="text-xs text-brown/80 font-sans leading-relaxed mb-4">{pkg.description}</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold font-serif text-accent">{pkg.pricePerPerson} €</span>
                <span className="text-xs text-brown/60 font-sans">/ persona</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Detalle del paquete seleccionado */}
        {pkg && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={pkg.id}
            className="border border-primary/30 bg-surface p-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-serif font-bold text-xl text-text mb-6">{pkg.name} — Menú</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-accent font-sans mb-2">
                      <Users className="w-3.5 h-3.5 inline mr-1" /> Entrantes
                    </h4>
                    <ul className="space-y-1.5">
                      {pkg.starters.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-brown/85 font-sans">
                          <Check className="w-3 h-3 text-accent mt-0.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-accent font-sans mb-2">Platos Principales</h4>
                    <ul className="space-y-1.5">
                      {pkg.mains.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-brown/85 font-sans">
                          <Check className="w-3 h-3 text-accent mt-0.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-accent font-sans mb-2">Postres</h4>
                    <ul className="space-y-1.5">
                      {pkg.desserts.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-brown/85 font-sans">
                          <Check className="w-3 h-3 text-accent mt-0.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-accent font-sans mb-2">Bebidas</h4>
                    <ul className="space-y-1.5">
                      {pkg.drinks.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-brown/85 font-sans">
                          <Check className="w-3 h-3 text-accent mt-0.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-between">
                <div className="bg-[#F7F4EE] p-6 border border-primary/20">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-text font-sans mb-4">Calcula tu presupuesto</h4>
                  
                  <div className="mb-6">
                    <label className="text-xs text-brown/70 font-sans block mb-2">Número de invitados</label>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setGuests(Math.max(10, guests - 5))}
                        className="w-8 h-8 border border-primary/40 flex items-center justify-center text-brown hover:text-accent hover:border-accent transition-colors"
                      >
                        −
                      </button>
                      <span className="text-lg font-bold font-serif text-text w-16 text-center">{guests}</span>
                      <button
                        onClick={() => setGuests(Math.min(200, guests + 5))}
                        className="w-8 h-8 border border-primary/40 flex items-center justify-center text-brown hover:text-accent hover:border-accent transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="border-t border-primary/20 pt-4">
                    <div className="flex justify-between items-baseline mb-1">
                      <span className="text-xs text-brown/70 font-sans">{pkg.pricePerPerson} € × {guests} personas</span>
                      <span className="text-xs text-brown/70 font-sans">{totalPrice.toFixed(2)} €</span>
                    </div>
                    <div className="flex justify-between items-baseline pt-2 border-t border-primary/20">
                      <span className="text-sm font-bold text-text font-sans">Total estimado</span>
                      <span className="text-xl font-bold font-serif text-accent">{totalPrice.toFixed(2)} €</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    const reservasSection = document.getElementById('reservas');
                    if (reservasSection) reservasSection.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full py-4 bg-accent text-white hover:bg-text text-xs font-bold uppercase tracking-widest font-sans transition-colors mt-4"
                >
                  Solicitar Presupuesto
                </button>
              </div>
            </div>
          </motion.div>
        )}

      </div>
    </section>
  );
}
