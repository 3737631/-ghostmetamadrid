import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Menu, X, ChevronRight, Clock, MapPin, Phone, Instagram, Facebook, Star } from 'lucide-react';
import FrameScrollAnimation from './components/FrameScrollAnimation';
import MenuCatalog from './components/MenuCatalog';
import ReviewsCarousel from './components/ReviewsCarousel';
import ReservationForm from './components/ReservationForm';
import EventCustomizer from './components/EventCustomizer';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#casa', label: 'Nuestra Casa' },
    { href: '#carta', label: 'La Carta' },
    { href: '#eventos', label: 'Celebraciones' },
    { href: '#opiniones', label: 'Opiniones' },
    { href: '#reservas', label: 'Reservas' },
  ];

  return (
    <div className="min-h-screen bg-black text-cream flex flex-col selection:bg-gold/30 selection:text-brown antialiased">

      {/* Header */}
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/90 backdrop-blur-md shadow-lg py-3 border-b border-white/10' : 'bg-transparent py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <a href="#" className="flex items-center gap-3 group">
              <div className="flex flex-col">
                <span className="text-sm font-bold tracking-wide text-cream">Venta El Capricho</span>
                <span className="text-[9px] text-gold/60 tracking-widest uppercase font-sans">Córdoba</span>
              </div>
            </a>

            <nav className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href}
                  className="font-medium text-sm text-text/80 hover:text-secondary transition-colors">
                  {link.label}
                </a>
              ))}
              <a href="mailto:ghostmediamadrid@gmail.com"
                className="font-medium text-sm text-text/80 hover:text-secondary transition-colors">
                Contacto
              </a>
              <a href="#reservas"
                className="bg-secondary text-white font-medium text-sm px-5 py-2 rounded-full hover:bg-hover transition-colors shadow-sm">
                Reservar Mesa
              </a>
            </nav>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-cream/80 hover:text-gold transition-colors cursor-pointer">
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25 }}
            className="lg:hidden bg-black/95 border-t border-white/10 shadow-lg">
            <div className="px-4 pt-3 pb-6 space-y-2">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-xs font-bold uppercase tracking-wider text-cream/80 hover:text-gold font-sans">
                  {link.label}
                </a>
              ))}
              <a href="mailto:ghostmediamadrid@gmail.com" onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-xs font-bold uppercase tracking-wider text-cream/80 hover:text-gold font-sans">
                Contacto
              </a>
              <div className="pt-3 px-3">
                <a href="#reservas" onClick={() => setMobileMenuOpen(false)}
                  className="w-full block py-3 bg-secondary text-white font-serif text-2xl rounded-full hover:bg-hover transition-colors shadow-md mt-4 text-center">
                  Reservar Mesa
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </header>

      {/* Hero */}
      <section className="relative h-screen overflow-hidden bg-black">
        <FrameScrollAnimation />
        <div className="absolute inset-0 z-10 flex flex-col justify-center items-center pointer-events-none px-4">
          <div className="text-center max-w-3xl mx-auto pointer-events-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tight text-cream font-serif leading-[1.05] drop-shadow-lg">
                Venta El Capricho
              </h1>
              <p className="text-cream/80 text-base sm:text-lg font-sans leading-relaxed max-w-xl mx-auto mt-4 drop-shadow-md">
                Donde las recetas de nuestros abuelos cordobeses cobran vida. Disfruta de la mejor cocina tradicional en un entorno único diseñado para recordar.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
                <a href="#reservas"
                  className="w-full sm:w-auto bg-secondary text-white font-medium px-8 py-3.5 rounded-full hover:bg-hover transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2 group cursor-pointer">
                  Reservar Mesa <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="#carta"
                  className="w-full sm:w-auto bg-surface/75 backdrop-blur-sm border border-border text-brown font-medium px-8 py-3.5 rounded-full hover:bg-border/60 transition-all duration-300 shadow-sm flex items-center justify-center gap-2 cursor-pointer">
                  Explorar la Carta
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Nuestra Casa */}
      <section id="casa" className="py-24 bg-black relative overflow-hidden border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }} viewport={{ once: true }}
            className="text-center space-y-4 mb-16">
            <span className="text-gold text-[10px] font-bold tracking-[0.25em] uppercase font-sans">Nuestra Casa</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-cream font-serif">
              La Tradición Hecha Hogar
            </h2>
            <p className="text-brown text-sm sm:text-base font-sans max-w-2xl mx-auto">
              Nuestra venta es el resultado de décadas de cariño familiar por la gastronomía andaluza clásica.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Star, title: 'Cocina a Fuego Lento',
                desc: 'Nuestro rabo de toro se estofa durante 6 horas hasta alcanzar la textura perfecta que se deshace en el paladar. Paciencia y cariño en cada cacerola.'
              },
              {
                icon: Clock, title: 'El Horario de Nuestra Cocina',
                desc: 'De domingo a jueves de 13:00 a 16:30 h. Viernes y sábados también por la noche de 20:30 a 23:30 h.'
              },
              {
                icon: MapPin, title: 'Ubicación Inmejorable',
                desc: 'Situados a las afueras de Córdoba, con aparcamiento gratuito para nuestros comensales. Un oasis de tranquilidad para disfrutar sin prisas.'
              },
            ].map((item, i) => (
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

      {/* La Carta */}
      <MenuCatalog />

      {/* Celebraciones */}
      <EventCustomizer />

      {/* Opiniones */}
      <ReviewsCarousel />

      {/* Reservas */}
      <ReservationForm />

      {/* Footer */}
      <footer className="bg-black text-cream/60 py-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div>
              <span className="text-sm font-bold tracking-wide text-cream">Venta El Capricho</span>
              <span className="text-[9px] text-gold/60 tracking-widest uppercase font-sans block mt-0.5">Córdoba</span>
              <p className="text-xs text-brown font-sans mt-4 leading-relaxed">
                Cocina tradicional andaluza con el sabor de toda la vida. Donde cada receta cuenta una historia.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-cream/80 mb-4 font-sans">Horarios</h4>
              <div className="space-y-2 text-xs font-sans">
                <p className="text-brown">Ma–Ju <span className="text-cream/60">13:00–16:30</span></p>
                <p className="text-brown">Vi–Sá <span className="text-cream/60">13:00–23:30</span></p>
                <p className="text-brown">Do <span className="text-cream/60">13:00–16:30</span></p>
                <p className="text-brown">Lu <span className="text-cream/60">Cerrado</span></p>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-cream/80 mb-4 font-sans">Contacto</h4>
              <div className="space-y-3 text-xs font-sans">
                <a href="tel:+34664424736" className="flex items-center gap-2 text-brown hover:text-gold transition-colors">
                  <Phone className="w-3.5 h-3.5 text-gold" /> 664 424 736
                </a>
                <a href="mailto:ghostmediamadrid@gmail.com" className="flex items-center gap-2 text-brown hover:text-gold transition-colors">
                  ghostmediamadrid@gmail.com
                </a>
                <p className="flex items-start gap-2 text-brown">
                  <MapPin className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                  Afueras de Córdoba · Aparcamiento gratis
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-cream/80 mb-4 font-sans">Síguenos</h4>
              <div className="flex items-center gap-3 mt-2">
                <a href="https://instagram.com" target="_blank" rel="noreferrer"
                  className="p-2.5 bg-white/10 rounded-full hover:bg-secondary hover:text-white transition-colors"
                  aria-label="Síguenos en Instagram">
                  <Instagram size={18} />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noreferrer"
                  className="p-2.5 bg-white/10 rounded-full hover:bg-secondary hover:text-white transition-colors"
                  aria-label="Síguenos en Facebook">
                  <Facebook size={18} />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[11px] font-sans text-cream/30">
              &copy; {new Date().getFullYear()} Venta El Capricho. Todos los derechos reservados.
            </p>
            <div className="flex gap-6 text-[11px] font-sans text-cream/40">
              <span className="hover:text-gold/60 cursor-pointer transition-colors">Aviso Legal</span>
              <span>·</span>
              <span className="hover:text-gold/60 cursor-pointer transition-colors">Privacidad</span>
              <span>·</span>
              <span className="hover:text-gold/60 cursor-pointer transition-colors">Cookies</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
