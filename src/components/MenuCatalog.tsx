import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Utensils, CheckCircle, Leaf, Soup, Flame, Fish, ChefHat, Cake, Wine, ChevronRight } from 'lucide-react';
import { menuItems } from '../data';

const categories = [
  { id: 'entrantes', label: 'Entrantes' },
  { id: 'carnes', label: 'Carnes a la Brasa' },
  { id: 'pescados', label: 'Pescados Frescos' },
  { id: 'arroces', label: 'Arroces (Domingos)' },
  { id: 'postres', label: 'Postres Caseros' },
  { id: 'bebidas', label: 'Bebidas y Bodega' }
];

export default function MenuCatalog() {
  const [activeCategory, setActiveCategory] = useState<string>('entrantes');
  const [filter, setFilter] = useState<'all' | 'popular' | 'vegetarian' | 'celiac'>('all');

  const renderCategoryIcon = (catId: string, className = "w-4 h-4") => {
    switch (catId) {
      case 'entrantes': return <Soup className={className} />;
      case 'carnes': return <Flame className={className} />;
      case 'pescados': return <Fish className={className} />;
      case 'arroces': return <ChefHat className={className} />;
      case 'postres': return <Cake className={className} />;
      case 'bebidas': return <Wine className={className} />;
      default: return <Utensils className={className} />;
    }
  };

  const filteredItems = menuItems.filter((item) => {
    if (item.category !== activeCategory) return false;
    if (filter === 'popular') return item.popular;
    if (filter === 'vegetarian') return item.vegetarian;
    if (filter === 'celiac') return item.celiac;
    return true;
  });

  return (
    <section id="carta" className="py-24 bg-[#F3EEE4] relative overflow-hidden border-b border-primary/30">
      <div className="absolute top-0 left-0 w-full h-4 bg-tile-pattern opacity-30"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-cursive text-3xl sm:text-4xl text-accent block leading-none mb-1">Platos elaborados con alma</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-text font-serif mb-4">Nuestra Carta</h2>
          <div className="w-16 h-[1px] bg-accent/40 mx-auto mb-6"></div>
          <p className="text-brown text-xs sm:text-sm leading-relaxed font-sans">
            Recetas tradicionales del Aljarafe elaboradas con el esmero de siempre, materias primas de calidad superior y un inconfundible toque casero.
          </p>
        </div>

        {/* Tab selector */}
        <div className="flex flex-wrap justify-center items-center pb-3 mb-10 gap-x-2 gap-y-2 border-b border-primary/30">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => { setActiveCategory(cat.id); setFilter('all'); }}
                className={`flex items-center gap-2 px-5 py-3 transition-all whitespace-nowrap cursor-pointer relative font-sans text-xs sm:text-sm font-bold uppercase tracking-wider ${
                  isActive ? 'text-accent' : 'text-brown/70 hover:text-text'
                }`}
              >
                <span>{renderCategoryIcon(cat.id, `w-3.5 h-3.5 ${isActive ? 'text-accent' : 'text-brown/50'}`)}</span>
                <span>{cat.label}</span>
                {isActive && (
                  <motion.div 
                    layoutId="activeCategoryBorder"
                    className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-accent"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center items-center gap-1.5 mb-12">
          {[
            { id: 'all', label: 'Ver Todo', icon: null },
            { id: 'popular', label: 'Especialidades', icon: <Sparkles className="w-3 h-3 text-accent" /> },
            { id: 'vegetarian', label: 'Vegetariano', icon: <Leaf className="w-3 h-3 text-green-700" /> },
            { id: 'celiac', label: 'Sin Gluten', icon: <CheckCircle className="w-3 h-3 text-accent" /> },
          ].map((f) => {
            const isSelected = filter === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setFilter(f.id as any)}
                className={`px-4 py-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-wider transition-all border rounded-full cursor-pointer flex items-center gap-1.5 ${
                  isSelected ? 'bg-[#3F3428] text-[#F3EEE4] border-[#3F3428]' : 'border-primary/60 text-brown hover:border-accent hover:text-accent'
                }`}
              >
                {f.icon}
                <span>{f.label}</span>
              </button>
            );
          })}
        </div>

        {/* Menu Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory + filter}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10"
          >
            {filteredItems.length === 0 ? (
              <div className="col-span-full text-center py-16 border border-dashed border-primary/50 rounded-2xl">
                <p className="text-brown/80 text-xs sm:text-sm">No se encontraron platos que coincidan con el filtro.</p>
              </div>
            ) : (
              filteredItems.map((item) => (
                <div key={item.id} className="pb-6 border-b border-primary/40 flex flex-col justify-between hover:border-accent/40 group">
                  <div>
                    <div className="flex justify-between items-baseline gap-4 mb-2">
                      <h3 className="text-base sm:text-lg font-bold text-text font-serif tracking-tight group-hover:text-accent transition-colors">
                        {item.name}
                      </h3>
                      <div className="flex-1 border-b border-dashed border-primary/55 mx-2 relative top-[-4px]"></div>
                      <span className="text-sm sm:text-base font-bold text-[#3F3428] whitespace-nowrap font-serif italic">
                        {item.price.toFixed(2)} €
                      </span>
                    </div>
                    <p className="text-brown/85 text-xs sm:text-sm leading-relaxed mb-3">{item.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 items-center">
                    {item.popular && <span className="text-[9px] font-bold uppercase text-accent font-sans">• Especialidad</span>}
                    {item.vegetarian && <span className="text-[9px] font-bold uppercase text-green-700 font-sans">• Vegetariano</span>}
                    {item.celiac && <span className="text-[9px] font-bold uppercase text-amber-800 font-sans">• Sin Gluten</span>}
                  </div>
                </div>
              ))
            )}
          </motion.div>
        </AnimatePresence>


      </div>
    </section>
  );
}
