import { useState } from 'react';
import { menuItems } from '../data';
import { MenuItem } from '../types';

const categories = [
  { key: 'entrantes', label: 'Entrantes' },
  { key: 'carnes', label: 'Carnes' },
  { key: 'pescados', label: 'Pescados' },
  { key: 'arroces', label: 'Arroces' },
  { key: 'postres', label: 'Postres' },
  { key: 'bebidas', label: 'Bebidas' },
];

export default function MenuCatalog() {
  const [activeCategory, setActiveCategory] = useState<string>('entrantes');

  const filteredItems = menuItems.filter(item => item.category === activeCategory);

  return (
    <section id="carta" className="relative py-24 bg-[#F7F4EE] border-t border-b border-primary/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-14">
          <span className="font-cursive text-4xl text-accent block mb-2 leading-none">
            Nuestra Cocina
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-text font-serif mb-4">
            La Carta
          </h2>
          <div className="w-16 h-[1px] bg-accent/40 mx-auto mb-6"></div>
          <p className="text-sm sm:text-base text-brown/90 leading-relaxed font-sans max-w-2xl mx-auto">
            Producto fresco, recetas tradicionales y el cariño de siempre. Descubre nuestra selección de platos.
          </p>
        </div>

        {/* Pestañas de categorías */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-5 py-2 text-xs font-bold uppercase tracking-widest transition-all duration-300 font-sans ${
                activeCategory === cat.key
                  ? 'bg-accent text-white shadow-md'
                  : 'bg-background text-brown border border-primary/30 hover:border-accent/50 hover:text-accent'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Lista de platos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {filteredItems.map((item: MenuItem) => (
            <div
              key={item.id}
              className="bg-background p-5 border border-primary/30 hover:border-accent/40 transition-all duration-300 flex items-start justify-between gap-4"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-serif font-bold text-sm sm:text-base text-text">
                    {item.name}
                  </h3>
                  {item.popular && (
                    <span className="text-[9px] font-bold uppercase tracking-widest text-accent bg-accent/10 px-2 py-0.5 font-sans">
                      Popular
                    </span>
                  )}
                  {item.vegetarian && (
                    <span className="text-[9px] font-bold uppercase tracking-widest text-green-700 bg-green-50 px-2 py-0.5 font-sans">
                      Veg
                    </span>
                  )}
                  {item.celiac && (
                    <span className="text-[9px] font-bold uppercase tracking-widest text-amber-700 bg-amber-50 px-2 py-0.5 font-sans">
                      Sin Gluten
                    </span>
                  )}
                </div>
                <p className="text-[11px] sm:text-xs text-brown/75 mt-1 font-sans leading-relaxed">
                  {item.description}
                </p>
              </div>
              <span className="text-sm sm:text-base font-bold font-serif text-accent whitespace-nowrap ml-4">
                {item.price.toFixed(2)} €
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
