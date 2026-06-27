import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Menu, X, ChevronRight, Sparkles, Shield, Zap, Sun, Eye, Droplets } from 'lucide-react';
import FrameScrollAnimation from './components/FrameScrollAnimation';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-cream text-text flex flex-col selection:bg-gold/30 selection:text-brown-dark antialiased">

      {/* Header */}
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/90 backdrop-blur-md shadow-lg py-3 border-b border-gold/20' : 'bg-transparent py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <a href="#" className="flex items-center gap-3 group">
              <div className="w-8 h-8 rounded-full border-2 border-gold flex items-center justify-center">
                <span className="text-gold text-xs font-bold tracking-wider">RB</span>
              </div>
              <span className="text-xl font-cursive tracking-wide text-cream">
                Ray-Ban <span className="text-gold">LED</span>
              </span>
            </a>

            <nav className="hidden lg:flex items-center gap-8">
              <a href="#tecnologia" className="text-[11px] font-bold uppercase tracking-widest text-cream/80 hover:text-gold border-b border-transparent hover:border-gold pb-1 transition-all font-sans">Tecnología</a>
              <a href="#caracteristicas" className="text-[11px] font-bold uppercase tracking-widest text-cream/80 hover:text-gold border-b border-transparent hover:border-gold pb-1 transition-all font-sans">Características</a>
              <a href="#diseno" className="text-[11px] font-bold uppercase tracking-widest text-cream/80 hover:text-gold border-b border-transparent hover:border-gold pb-1 transition-all font-sans">Diseño</a>
              <a href="#especificaciones" className="text-[11px] font-bold uppercase tracking-widest text-cream/80 hover:text-gold border-b border-transparent hover:border-gold pb-1 transition-all font-sans">Especificaciones</a>
              <a href="#compra" className="px-6 py-2.5 bg-gold text-black text-[11px] font-bold uppercase tracking-widest hover:bg-cream transition-all rounded-none shadow-sm">
                Comprar
              </a>
            </nav>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-cream/80 hover:text-gold transition-colors cursor-pointer border border-gold/30">
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25 }}
            className="lg:hidden bg-black/95 border-t border-gold/20 shadow-lg">
            <div className="px-4 pt-3 pb-6 space-y-2">
              {['Tecnología', 'Características', 'Diseño', 'Especificaciones'].map(item => (
                <a key={item} href={`#${item.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-xs font-bold uppercase tracking-wider text-cream/80 hover:text-gold font-sans">
                  {item}
                </a>
              ))}
              <div className="pt-3 px-3">
                <a href="#compra" onClick={() => setMobileMenuOpen(false)}
                  className="w-full block py-3 bg-gold text-black text-center font-bold text-xs uppercase tracking-widest font-sans rounded-none">
                  Comprar ahora
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </header>

      <FrameScrollAnimation />

      {/* Tecnología Section */}
      <section id="tecnologia" className="py-28 bg-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
            backgroundSize: '128px 128px',
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }} viewport={{ once: true }}
            className="text-center space-y-4 max-w-3xl mx-auto mb-20">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gold/10 text-gold text-[9px] font-bold tracking-[0.25em] uppercase font-sans">
              <Sparkles className="w-3 h-3" /> Innovación Lumínica
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-cream font-serif leading-tight">
              LED Technology
            </h2>
            <p className="text-brown text-sm sm:text-base font-sans leading-relaxed max-w-2xl mx-auto">
              La integración perfecta de iluminación LED de alta densidad en la montura Wayfarer más icónica del mundo.
              Cada par de Ray-Ban LED contiene más de 200 micro-LEDs cosidos a mano en la montura de acetato.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Zap, title: '200+ Micro-LEDs', desc: 'Matriz de LEDs de alta densidad integrada directamente en el frontal de acetato.' },
              { icon: Sun, title: '400 lúmenes', desc: 'Iluminación potente con 3 modos de brillo ajustables mediante gesto táctil.' },
              { icon: Shield, title: '8 horas de autonomía', desc: 'Batería recargable por USB-C con carga rápida (15 min = 2 horas de uso).' },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.15 }} viewport={{ once: true }}
                className="border border-gold/15 bg-black/50 p-8 hover:border-gold/40 transition-all group">
                <div className="w-12 h-12 border border-gold/30 flex items-center justify-center mb-5 group-hover:bg-gold/10 transition-all">
                  <item.icon className="w-5 h-5 text-gold" />
                </div>
                <h3 className="text-lg font-bold text-cream font-serif mb-2">{item.title}</h3>
                <p className="text-brown text-sm font-sans leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Características Section */}
      <section id="caracteristicas" className="py-28 bg-cream relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }} viewport={{ once: true }} className="space-y-8">
              <div className="space-y-2">
                <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-gold bg-gold/10 px-3 py-1.5 font-sans inline-block">
                  Diseñado para destacar
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-brown-dark font-serif leading-tight">
                  La icónica montura Wayfarer, reimaginada
                </h2>
              </div>
              <div className="w-16 h-[1px] bg-gold/60"></div>
              <ul className="space-y-5">
                {[
                  'Acetato de celulosa de primera calidad importado de Italia',
                  'Bisagras de titanio con apertura y cierre suaves',
                  'Lentes de grado óptico con protección UV400 y antirreflejante',
                  'Tecnología LED integrada sin alterar el perfil clásico',
                  'Resistencia al agua IPX4 para uso en exteriores',
                  'Estuche de cuero marrón premium con carga inalámbrica integrada',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-gold/20 text-gold flex items-center justify-center text-[10px] mt-0.5">✓</div>
                    <span className="text-brown text-sm font-sans">{item}</span>
                  </li>
                ))}
              </ul>
              <a href="#especificaciones" className="inline-flex items-center gap-2 text-gold text-xs font-bold uppercase tracking-widest hover:text-brown-dark transition-colors font-sans group">
                Ver especificaciones completas <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }}
              className="aspect-square bg-black relative overflow-hidden border border-gold/20">
              <div className="absolute inset-4 border border-gold/10 flex items-center justify-center">
                <div className="text-center space-y-4 p-8">
                  <div className="w-16 h-16 rounded-full border-2 border-gold flex items-center justify-center mx-auto">
                    <Eye className="w-7 h-7 text-gold" />
                  </div>
                  <p className="text-cream/60 text-sm font-sans max-w-xs mx-auto leading-relaxed">
                    "No solo ves el mundo. Lo iluminas."
                  </p>
                  <div className="w-12 h-[1px] bg-gold/40 mx-auto"></div>
                  <span className="text-gold/50 text-[10px] uppercase tracking-widest font-sans block">Ray-Ban LED</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Diseño Section */}
      <section id="diseno" className="py-28 bg-black relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }} viewport={{ once: true }}
            className="text-center space-y-4 max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gold/10 text-gold text-[9px] font-bold tracking-[0.25em] uppercase font-sans">
              <Sparkles className="w-3 h-3" /> Funda Premium
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-cream font-serif leading-tight">
              Funda de cuero con carga integrada
            </h2>
            <p className="text-brown text-sm font-sans leading-relaxed max-w-2xl mx-auto">
              Cada Ray-Ban LED incluye una funda de cuero marrón genuino que funciona como estación de carga portátil.
              Inspirada en las clásicas fundas Ray-Ban de los años 50, ahora con tecnología de carga inalámbrica Qi.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              { title: 'Cuero Marrón Genuino', desc: 'Piel vacuno seleccionada, cosida a mano con acabado envejecido premium.' },
              { title: 'Carga Inalámbrica Qi', desc: 'Coloca tus gafas LED en la funda y se cargan automáticamente sin cables.' },
              { title: 'Forro Ultrasuave', desc: 'Interior de microfibra que protege las lentes y la montura de arañazos.' },
              { title: 'Diseño Plegable', desc: 'Ocupa el mínimo espacio en tu bolsillo o mochila. Ideal para llevar siempre.' },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }} viewport={{ once: true }}
                className="border border-gold/15 p-6 hover:border-gold/40 transition-all bg-black/30">
                <h3 className="text-base font-bold text-cream font-serif mb-2">{item.title}</h3>
                <p className="text-brown text-sm font-sans leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Especificaciones Section */}
      <section id="especificaciones" className="py-28 bg-cream relative overflow-hidden border-t border-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-brown-dark font-serif">
              Especificaciones Técnicas
            </h2>
            <div className="tile-divider justify-center my-4">
              <div className="w-16 h-[1px] bg-gold/70"></div>
              <div className="tile-star bg-gold/60"></div>
              <div className="w-16 h-[1px] bg-gold/70"></div>
            </div>
          </div>

          <div className="max-w-3xl mx-auto space-y-0">
            {[
              { label: 'Montura', value: 'Acetato de celulosa italiano' },
              { label: 'Peso', value: '38 g' },
              { label: 'LEDs', value: '208 micro-LEDs RGB' },
              { label: 'Brillo máximo', value: '400 lúmenes' },
              { label: 'Batería', value: '500 mAh (8 h autonomía)' },
              { label: 'Carga', value: 'USB-C / Qi inalámbrica' },
              { label: 'Resistencia', value: 'IPX4 (salpicaduras)' },
              { label: 'Lentes', value: 'UV400, antirreflejantes' },
              { label: 'Conectividad', value: 'Bluetooth 5.3' },
              { label: 'Compatibilidad', value: 'iOS 16+ / Android 12+' },
              { label: 'App', value: 'Ray-Ban LED Controller' },
              { label: 'Funda', value: 'Cuero marrón con carga Qi' },
            ].map((item, i) => (
              <div key={i} className={`flex justify-between items-center py-4 px-4 ${i % 2 === 0 ? 'bg-gold/5' : ''} border-b border-gold/10`}>
                <span className="text-sm font-bold text-brown-dark font-sans uppercase tracking-wider">{item.label}</span>
                <span className="text-sm text-brown font-sans text-right">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compra CTA */}
      <section id="compra" className="py-28 bg-black relative overflow-hidden border-t border-gold/20">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
            backgroundSize: '128px 128px',
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }} viewport={{ once: true }} className="space-y-6 max-w-2xl mx-auto">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-cream font-serif">
              Ilumina tu mundo
            </h2>
            <p className="text-brown text-base font-sans leading-relaxed">
              Edición limitada. Incluye gafas LED, funda de cuero con carga inalámbrica, cable USB-C y estuche premium.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <a href="#" className="group px-10 py-4 bg-gold hover:bg-cream text-black text-xs font-bold uppercase tracking-widest transition-all duration-300 font-sans flex items-center gap-2 shadow-sm hover:shadow-lg">
                Comprar ahora <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </a>
              <span className="text-gold/50 text-xs font-sans">Envío gratis · 2 años de garantía</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-cream/60 py-12 border-t border-gold/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full border border-gold/30 flex items-center justify-center">
                <span className="text-gold text-[9px] font-bold tracking-wider">RB</span>
              </div>
              <span className="text-base font-cursive tracking-wide text-cream/50">
                Ray-Ban <span className="text-gold/50">LED</span>
              </span>
            </div>
            <div className="flex gap-6 text-[11px] font-sans text-cream/40">
              <span className="hover:text-gold/60 cursor-pointer transition-colors">Aviso Legal</span>
              <span>·</span>
              <span className="hover:text-gold/60 cursor-pointer transition-colors">Privacidad</span>
              <span>·</span>
              <span className="hover:text-gold/60 cursor-pointer transition-colors">Cookies</span>
            </div>
            <p className="text-[11px] font-sans text-cream/30">&copy; {new Date().getFullYear()} Ray-Ban LED. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
