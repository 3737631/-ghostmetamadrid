import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Menu, X, ChevronRight, Sparkles, Shield, Wrench, Truck, Star, Send, EyeOff, RefreshCw, CheckCircle, Search } from 'lucide-react';
import FrameScrollAnimation from './components/FrameScrollAnimation';

const TIKTOK_URL = 'https://vm.tiktok.com/ZNRw1kutc/';

const services = [
  { icon: EyeOff, title: 'Eliminación de LEDs', desc: 'Retirada profesional de sistemas luminosos manteniendo la integridad estética de la montura.' },
  { icon: RefreshCw, title: 'Restauración estética', desc: 'Corrección de marcas, acabados y pequeñas imperfecciones tras la modificación.' },
  { icon: Sparkles, title: 'Personalización Premium', desc: 'Acabados mate, brillo y detalles personalizados.' },
  { icon: CheckCircle, title: 'Diagnóstico gratuito', desc: 'Analizamos tu modelo antes de realizar cualquier modificación.' },
];

const processSteps = [
  { icon: Send, step: '1', title: 'Envío', desc: 'Nos envías fotografías o el modelo.' },
  { icon: Search, step: '2', title: 'Evaluación', desc: 'Analizamos la viabilidad de la modificación.' },
  { icon: Wrench, step: '3', title: 'Modificación', desc: 'Realizamos el trabajo de forma profesional.' },
  { icon: Truck, step: '4', title: 'Entrega', desc: 'Recibes tus gafas listas para usar.' },
];

const testimonials = [
  { stars: 5, text: '"Parecen unas gafas completamente nuevas."' },
  { stars: 5, text: '"El resultado es impecable y muy profesional."' },
  { stars: 5, text: '"Recuperé el aspecto clásico que buscaba."' },
];

const faqs = [
  { q: '¿Cuánto tarda?', a: '3–7 días laborables.' },
  { q: '¿Pierdo garantía?', a: 'Depende del fabricante y modelo.' },
  { q: '¿Qué modelos aceptáis?', a: 'La mayoría de gafas inteligentes compatibles.' },
  { q: '¿Hacéis envíos?', a: 'Sí, a toda España.' },
];

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-cream flex flex-col selection:bg-gold/30 selection:text-brown-dark antialiased">

      {/* Header */}
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/90 backdrop-blur-md shadow-lg py-3 border-b border-white/10' : 'bg-transparent py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <a href="#" className="flex items-center gap-3 group">
              <div className="w-8 h-8 rounded-full border border-gold/60 flex items-center justify-center">
                <span className="text-gold text-[9px] font-bold tracking-wider">GM</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold tracking-wide text-cream">Ghost Media</span>
                <span className="text-[9px] text-gold/60 tracking-widest uppercase font-sans">Madrid</span>
              </div>
            </a>

            <nav className="hidden lg:flex items-center gap-6">
              <a href="#servicios" className="text-[11px] font-bold uppercase tracking-widest text-cream/70 hover:text-gold transition-colors font-sans">Servicios</a>
              <a href="#proceso" className="text-[11px] font-bold uppercase tracking-widest text-cream/70 hover:text-gold transition-colors font-sans">Proceso</a>
              <a href="#precio" className="text-[11px] font-bold uppercase tracking-widest text-cream/70 hover:text-gold transition-colors font-sans">Precio</a>
              <a href="#faq" className="text-[11px] font-bold uppercase tracking-widest text-cream/70 hover:text-gold transition-colors font-sans">FAQ</a>
              <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-4 py-2 bg-white/5 hover:bg-white/10 text-cream text-[11px] font-bold uppercase tracking-widest transition-all rounded-full border border-white/10">
                TikTok
              </a>
              <a href="#presupuesto" className="px-5 py-2.5 bg-gold text-black text-[11px] font-bold uppercase tracking-widest hover:bg-cream transition-all rounded-none shadow-sm">
                Presupuesto
              </a>
            </nav>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-cream/80 hover:text-gold transition-colors cursor-pointer border border-white/10">
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25 }}
            className="lg:hidden bg-black/95 border-t border-white/10 shadow-lg">
            <div className="px-4 pt-3 pb-6 space-y-2">
              {['Servicios', 'Proceso', 'Precio', 'FAQ'].map(item => (
                <a key={item} href={`#${item.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-xs font-bold uppercase tracking-wider text-cream/80 hover:text-gold font-sans">
                  {item}
                </a>
              ))}
              <div className="pt-3 px-3 flex flex-col gap-2">
                <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer" onClick={() => setMobileMenuOpen(false)}
                  className="w-full block py-3 border border-white/10 text-cream text-center font-bold text-xs uppercase tracking-widest font-sans rounded-full">
                  TikTok
                </a>
                <a href="#presupuesto" onClick={() => setMobileMenuOpen(false)}
                  className="w-full block py-3 bg-gold text-black text-center font-bold text-xs uppercase tracking-widest font-sans rounded-none">
                  Solicitar presupuesto
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </header>

      <FrameScrollAnimation />

      {/* TikTok Banner - prominent */}
      <section className="py-8 bg-black border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.a
            href={TIKTOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-all group"
          >
            <span className="text-lg">🎬</span>
            <span className="text-sm font-sans text-cream/80 group-hover:text-cream transition-colors">
              Síguenos en TikTok —{' '}
              <span className="font-bold text-gold">@ghostmediamadrid</span>
            </span>
            <ChevronRight className="w-4 h-4 text-gold group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </div>
      </section>

      {/* Hero Content */}
      <section className="py-20 bg-black relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }} viewport={{ once: true }}
            className="text-center space-y-6 max-w-4xl mx-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gold/10 text-gold text-[9px] font-bold tracking-[0.25em] uppercase font-sans">
              RayRestore Studio <span className="text-cream/30 mx-1">·</span> by Ghost Media Madrid
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-cream font-serif leading-[1.05]">
              Devuelve a tus gafas<br />
              <span className="text-gold">su diseño original</span>
            </h1>
            <p className="text-brown text-base sm:text-lg font-sans leading-relaxed max-w-2xl mx-auto">
              Eliminamos discretamente módulos LED, componentes luminosos y elementos electrónicos visibles
              para conseguir una estética más limpia y elegante.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <a href="#presupuesto" className="group px-8 py-3.5 bg-gold hover:bg-cream text-black text-xs font-bold uppercase tracking-widest transition-all duration-300 font-sans flex items-center gap-2 shadow-sm hover:shadow-lg">
                Solicitar presupuesto <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#proceso" className="group px-8 py-3.5 border border-white/20 hover:border-gold/50 text-cream text-xs font-bold uppercase tracking-widest transition-all duration-300 font-sans flex items-center gap-2">
                Ver proceso
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Servicios */}
      <section id="servicios" className="py-24 bg-black relative overflow-hidden border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }} viewport={{ once: true }}
            className="text-center space-y-4 mb-16">
            <span className="text-gold text-[10px] font-bold tracking-[0.25em] uppercase font-sans">Servicios</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-cream font-serif">
              Transformamos tus gafas
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }} viewport={{ once: true }}
                className="border border-white/10 bg-white/[0.02] p-6 hover:border-gold/30 transition-all group">
                <div className="w-10 h-10 border border-white/10 flex items-center justify-center mb-4 group-hover:border-gold/30 transition-all">
                  <item.icon className="w-4 h-4 text-gold" />
                </div>
                <h3 className="text-base font-bold text-cream font-serif mb-2">{item.title}</h3>
                <p className="text-brown text-sm font-sans leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Proceso */}
      <section id="proceso" className="py-24 bg-black relative overflow-hidden border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }} viewport={{ once: true }}
            className="text-center space-y-4 mb-16">
            <span className="text-gold text-[10px] font-bold tracking-[0.25em] uppercase font-sans">Proceso</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-cream font-serif">
              Cómo funciona
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.12 }} viewport={{ once: true }}
                className="text-center relative">
                <div className="w-14 h-14 rounded-full border border-gold/30 flex items-center justify-center mx-auto mb-4 bg-black">
                  <span className="text-gold text-lg font-bold font-serif">{item.step}</span>
                </div>
                <h3 className="text-base font-bold text-cream font-serif mb-2">{item.title}</h3>
                <p className="text-brown text-sm font-sans">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Precio */}
      <section id="precio" className="py-24 bg-black relative overflow-hidden border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }} viewport={{ once: true }}
            className="max-w-lg mx-auto text-center">
            <span className="text-gold text-[10px] font-bold tracking-[0.25em] uppercase font-sans">Precio</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-cream font-serif mt-4 mb-2">
              Servicio completo
            </h2>
            <div className="text-5xl font-bold text-gold font-serif my-6">79€</div>
            <p className="text-brown text-sm font-sans mb-8">Incluye:</p>
            <ul className="space-y-3 text-left max-w-xs mx-auto">
              {[
                'Eliminación de LEDs o componentes visibles',
                'Restauración estética completa',
                'Ajustes de acabado',
                'Control final de calidad',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm font-sans">
                  <CheckCircle className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                  <span className="text-cream/80">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 p-6 border border-white/10 bg-white/[0.02]">
              <div className="flex items-center gap-2 justify-center mb-3">
                <Truck className="w-4 h-4 text-gold" />
                <span className="text-sm font-bold text-cream font-sans">Envíos a toda España</span>
              </div>
              <p className="text-brown text-xs font-sans">
                Recogida y entrega disponible según zona · Embalaje seguro incluido<br />
                Tiempo estimado: <strong className="text-cream">3–7 días laborables</strong>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="py-20 bg-black relative overflow-hidden border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }} viewport={{ once: true }}
            className="text-center space-y-4 mb-12">
            <span className="text-gold text-[10px] font-bold tracking-[0.25em] uppercase font-sans">Testimonios</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-cream font-serif">
              Lo que dicen nuestros clientes
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {testimonials.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }} viewport={{ once: true }}
                className="border border-white/10 p-6 text-center bg-white/[0.02]">
                <div className="flex justify-center gap-0.5 mb-3">
                  {Array.from({ length: item.stars }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-cream/80 text-sm font-sans leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 bg-black relative overflow-hidden border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }} viewport={{ once: true }}
            className="text-center space-y-4 mb-12">
            <span className="text-gold text-[10px] font-bold tracking-[0.25em] uppercase font-sans">FAQ</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-cream font-serif">
              Preguntas frecuentes
            </h2>
          </motion.div>
          <div className="max-w-2xl mx-auto space-y-3">
            {faqs.map((item, i) => (
              <motion.details key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }} viewport={{ once: true }}
                className="border border-white/10 bg-white/[0.02] group open:border-gold/30 transition-all">
                <summary className="px-5 py-4 text-sm font-bold text-cream font-sans cursor-pointer list-none flex items-center justify-between">
                  {item.q}
                  <ChevronRight className="w-3.5 h-3.5 text-gold/60 group-open:rotate-90 transition-transform" />
                </summary>
                <p className="px-5 pb-4 text-sm text-brown font-sans">{item.a}</p>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* Presupuesto CTA */}
      <section id="presupuesto" className="py-20 bg-black relative overflow-hidden border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }} viewport={{ once: true }} className="space-y-5 max-w-xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-cream font-serif">
          ¿Listo para restaurar tus gafas?
            </h2>
            <p className="text-brown text-sm font-sans">
              Contáctanos y recibe un diagnóstico gratuito en 24 horas.
            </p>
            <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gold hover:bg-cream text-black text-xs font-bold uppercase tracking-widest transition-all font-sans">
              Escríbenos por TikTok
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-cream/60 py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full border border-gold/30 flex items-center justify-center">
                <span className="text-gold text-[9px] font-bold tracking-wider">GM</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold tracking-wide text-cream/50">Ghost Media</span>
                <span className="text-[8px] text-gold/40 tracking-widest uppercase font-sans">Madrid</span>
              </div>
            </div>
            <div className="flex gap-6 text-[11px] font-sans text-cream/40">
              <span className="hover:text-gold/60 cursor-pointer transition-colors">Aviso Legal</span>
              <span>·</span>
              <span className="hover:text-gold/60 cursor-pointer transition-colors">Privacidad</span>
              <span>·</span>
              <span className="hover:text-gold/60 cursor-pointer transition-colors">Cookies</span>
            </div>
            <p className="text-[11px] font-sans text-cream/30">&copy; {new Date().getFullYear()} Ghost Media Madrid. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
