import { useState } from 'react';
import { Sparkles, Award, Heart, Check, Users, ChevronRight } from 'lucide-react';
import { eventPackages } from '../data';

const courseTabs = [
  { id: 'starters', label: 'Entrantes', getter: (pkg: typeof eventPackages[0]) => pkg.starters },
  { id: 'mains', label: 'Segundos', getter: (pkg: typeof eventPackages[0]) => pkg.mains },
  { id: 'desserts', label: 'Postre', getter: (pkg: typeof eventPackages[0]) => pkg.desserts },
  { id: 'drinks', label: 'Bebida', getter: (pkg: typeof eventPackages[0]) => pkg.drinks },
] as const;

export default function EventCustomizer() {
  const [selectedPackage, setSelectedPackage] = useState<string>('ep2');
  const [guestsCount, setGuestsCount] = useState<number>(45);
  const [activeTab, setActiveTab] = useState<string>('starters');

  const activePkg = eventPackages.find((pkg) => pkg.id === selectedPackage) || eventPackages[0];
  const totalCost = activePkg.pricePerPerson * guestsCount;

  const activeTabItems = courseTabs.find((t) => t.id === activeTab)?.getter(activePkg) || [];

  return (
    <section id="eventos" className="py-24 bg-background relative overflow-hidden border-y border-primary/30">
      <div className="absolute top-0 left-0 w-full h-4 bg-tile-pattern opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-accent bg-accent/10 px-3 py-1.5 inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Diseña tu Celebración
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-text font-serif mt-4 mb-2">
            Tus Celebraciones a Medida
          </h2>
          <p className="text-sm text-brown/90 font-sans max-w-xl mx-auto">
            Elige tu menú, define el número de invitados y solicita una fecha para tu evento.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: selector + tabs */}
          <div className="lg:col-span-7 space-y-6">

            {/* Package selector */}
            <div className="bg-white/85 p-5 sm:p-6 border border-primary/30 rounded-2xl shadow-sm">
              <h3 className="text-base sm:text-lg font-bold text-text mb-4 flex items-center gap-2 font-serif">
                <span className="w-6 h-6 rounded-full bg-accent/15 text-accent text-xs font-bold flex items-center justify-center font-sans">1</span>
                Selecciona tu menú
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {eventPackages.map((pkg) => (
                  <button
                    key={pkg.id}
                    onClick={() => setSelectedPackage(pkg.id)}
                    className={`p-4 border text-left flex flex-col justify-between cursor-pointer rounded-xl transition-all ${
                      selectedPackage === pkg.id ? 'border-accent bg-accent/5 ring-1 ring-accent' : 'border-primary/30 bg-background/50 hover:bg-primary/25'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-text font-bold text-xs sm:text-sm truncate">{pkg.name}</span>
                        {pkg.iconName === 'Award' && <Award className="w-3.5 h-3.5 text-accent shrink-0" />}
                        {pkg.iconName === 'Heart' && <Heart className="w-3.5 h-3.5 text-accent shrink-0" />}
                        {pkg.iconName === 'Sparkles' && <Sparkles className="w-3.5 h-3.5 text-accent shrink-0" />}
                      </div>
                      <p className="text-[11px] text-brown leading-tight mb-3 font-sans line-clamp-2">{pkg.description}</p>
                    </div>
                    <div className="text-sm font-extrabold text-accent">{pkg.pricePerPerson} € <span className="text-[10px] text-brown font-normal">/ persona</span></div>
                  </button>
                ))}
              </div>
            </div>

            {/* Tabs: Entrantes / Segundos / Postre / Bebida */}
            <div className="bg-white/85 p-5 sm:p-6 border border-primary/30 rounded-2xl shadow-sm">
              <h3 className="text-base sm:text-lg font-bold text-text mb-4 flex items-center gap-2 font-serif">
                <span className="w-6 h-6 rounded-full bg-accent/15 text-accent text-xs font-bold flex items-center justify-center font-sans">2</span>
                ¿Qué incluye?
              </h3>
              <div className="flex gap-1 border-b border-primary/30 mb-4">
                {courseTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer relative ${
                      activeTab === tab.id ? 'text-accent' : 'text-brown/60 hover:text-text'
                    }`}
                  >
                    {tab.label}
                    {activeTab === tab.id && (
                      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-accent" />
                    )}
                  </button>
                ))}
              </div>
              <ul className="space-y-2.5">
                {activeTabItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span className="text-sm text-text/85 font-sans">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Guest slider */}
            <div className="bg-white/85 p-5 sm:p-6 border border-primary/30 rounded-2xl shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-base sm:text-lg font-bold text-text font-serif flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-accent/15 text-accent text-xs font-bold flex items-center justify-center font-sans">3</span>
                  Número de invitados
                </h3>
                <span className="inline-flex items-center gap-1 bg-brown text-white text-xs font-bold px-3 py-1 rounded-full">
                  <Users className="w-3.5 h-3.5" /> {guestsCount}
                </span>
              </div>
              <input
                type="range" min="10" max="150" value={guestsCount}
                onChange={(e) => setGuestsCount(parseInt(e.target.value, 10))}
                className="w-full h-2 bg-accent/40 rounded-full appearance-none cursor-pointer accent-accent"
              />
              <div className="flex justify-between text-[10px] text-brown/60 mt-1 font-sans">
                <span>10</span>
                <span>150</span>
              </div>
            </div>
          </div>

          {/* Budget Summary */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="p-6 sm:p-8 border border-primary/40 rounded-3xl shadow-lg bg-surface/40 backdrop-blur-md flex flex-col justify-between h-full">
              <div>
                <div className="border-b border-primary/30 pb-4 mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-accent">Resumen del Presupuesto</span>
                  <h3 className="text-xl font-bold text-text font-serif mt-1">{activePkg.name}</h3>
                </div>

                <div className="space-y-3">
                  {courseTabs.map((tab) => {
                    const items = tab.getter(activePkg);
                    return (
                      <div key={tab.id}>
                        <h4 className="font-bold text-text uppercase tracking-wider text-[10px] mb-1">{tab.label}</h4>
                        <p className="text-xs text-brown/90 font-sans">{items.join(' · ')}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <div className="bg-background rounded-2xl p-5 border border-primary/40 text-center">
                  <span className="text-[10px] font-bold text-brown uppercase tracking-wider">Presupuesto Estimado</span>
                  <div className="text-3xl sm:text-4xl font-extrabold text-accent mt-1 font-serif">
                    {totalCost.toFixed(2)} €
                  </div>
                  <div className="text-[10px] text-brown/70 font-sans">
                    ({activePkg.pricePerPerson.toFixed(2)} € × {guestsCount} personas)
                  </div>
                </div>
                <a href="#reservas"
                  className="w-full py-3.5 px-5 rounded-full bg-accent text-white hover:bg-brown text-center font-bold text-xs uppercase tracking-widest transition-all block cursor-pointer flex items-center justify-center gap-2">
                  Solicitar Fecha del Evento <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
