import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  MapPin, Phone, Clock, Menu, X, ChevronRight, ChevronLeft,
  Sparkles, Heart, Calendar, Star, ChevronDown
} from 'lucide-react';

import MenuCatalog from './components/MenuCatalog';
import EventCustomizer from './components/EventCustomizer';
import ReviewsCarousel from './components/ReviewsCarousel';
import ReservationForm from './components/ReservationForm';
import ScrollMantelSection from './components/ScrollMantelSection';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const touchStartX = useRef(0);

  const galleryImages = [
    'https://res.cloudinary.com/dmuxgamms/image/upload/v1782260950/unnamed_32_finhje.webp',
    'https://res.cloudinary.com/dmuxgamms/image/upload/v1782260950/unnamed_29_uutobw.webp',
    'https://res.cloudinary.com/dmuxgamms/image/upload/v1782260950/unnamed_22_t4nya7.webp',
    'https://res.cloudinary.com/dmuxgamms/image/upload/v1782260951/unnamed_27_mhrc8j.webp',
    'https://res.cloudinary.com/dmuxgamms/image/upload/v1782260951/unnamed_20_bi5bhp.webp',
    'https://res.cloudinary.com/dmuxgamms/image/upload/v1782260951/unnamed_24_g77mqn.webp',
    'https://res.cloudinary.com/dmuxgamms/image/upload/v1782260951/unnamed_28_eslvlg.webp',
    'https://res.cloudinary.com/dmuxgamms/image/upload/v1782260951/unnamed_26_z1zqjt.webp',
    'https://res.cloudinary.com/dmuxgamms/image/upload/v1782260951/unnamed_25_h4vgqs.webp',
    'https://res.cloudinary.com/dmuxgamms/image/upload/v1782260951/unnamed_19_c2jiks.webp',
    'https://res.cloudinary.com/dmuxgamms/image/upload/v1782260952/unnamed_23_jmbunf.webp',
    'https://res.cloudinary.com/dmuxgamms/image/upload/v1782260952/unnamed_18_ckvs0l.webp',
  ];

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const nextImage = useCallback(() => {
    setLightboxIndex((prev) => (prev + 1) % galleryImages.length);
  }, [galleryImages.length]);

  const prevImage = useCallback(() => {
    setLightboxIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  }, [galleryImages.length]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [lightboxOpen, closeLightbox, nextImage, prevImage]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) prevImage();
      else nextImage();
    }
  };

  const { scrollY } = useScroll();
  const mantelY = useTransform(scrollY, [0, 1000], [0, 240]);
  const mantelHeight = useTransform(scrollY, [0, 1000], [20, 120]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    const timer = setTimeout(() => setLoading(false), 1000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-text flex flex-col selection:bg-accent selection:text-white antialiased">
      
      {/* Loader */}
      <AnimatePresence>
        {loading && (
          <motion.div 
            id="loader" 
            className="fixed inset-0 bg-background z-[100] flex flex-col items-center justify-center p-6"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full border-4 border-accent border-t-transparent animate-spin mx-auto flex items-center justify-center">
                <span className="font-serif italic font-bold text-accent text-xs">VC</span>
              </div>
              <div>
                <h2 className="font-serif font-bold text-xl text-text tracking-wide uppercase">Venta El Capricho</h2>
                <p className="text-xs text-brown font-sans mt-1">Abriendo las puertas de la venta...</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-background/95 backdrop-blur-md shadow-md py-3 border-b border-border' 
            : 'bg-transparent py-5 border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <a href="#" className="flex flex-col group select-none">
              <span className="text-lg sm:text-xl md:text-2xl font-black tracking-[0.1em] text-[#3F3428] font-serif uppercase group-hover:text-[#B8826A] transition-colors">
                VENTA EL CAPRICHO
              </span>
              <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#6B5A45] font-sans">
                Mairena del Aljarafe
              </span>
            </a>

            <nav className="hidden lg:flex items-center gap-8">
              <a href="#nosotros" className="text-xs font-bold uppercase tracking-widest text-[#3F3428] hover:text-[#B8826A] border-b border-transparent hover:border-[#B8826A] pb-1 transition-all font-sans">Nosotros</a>
              <a href="#carta" className="text-xs font-bold uppercase tracking-widest text-[#3F3428] hover:text-[#B8826A] border-b border-transparent hover:border-[#B8826A] pb-1 transition-all font-sans">Carta</a>
              <a href="#eventos" className="text-xs font-bold uppercase tracking-widest text-[#3F3428] hover:text-[#B8826A] border-b border-transparent hover:border-[#B8826A] pb-1 transition-all font-sans">Celebraciones</a>
              <a href="#opiniones" className="text-xs font-bold uppercase tracking-widest text-[#3F3428] hover:text-[#B8826A] border-b border-transparent hover:border-[#B8826A] pb-1 transition-all font-sans">Opiniones</a>
              <a href="#ubicacion" className="text-xs font-bold uppercase tracking-widest text-[#3F3428] hover:text-[#B8826A] border-b border-transparent hover:border-[#B8826A] pb-1 transition-all font-sans">Horario y Mapa</a>
              <a 
                href="#reservas" 
                className="px-6 py-2.5 bg-[#B8826A] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#6B5A45] transition-colors rounded-none shadow-sm"
              >
                Reservar Mesa
              </a>
            </nav>

            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-none hover:bg-primary/20 text-[#3F3428] transition-colors cursor-pointer border border-[#D6C3A5]"
              aria-label="Abrir Menú"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden bg-[#F3EEE4] border-t border-[#D6C3A5] shadow-lg"
            >
              <div className="px-4 pt-3 pb-6 space-y-2">
                <a href="#nosotros" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-xs font-bold uppercase tracking-wider text-[#3F3428] font-sans">Nosotros</a>
                <a href="#carta" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-xs font-bold uppercase tracking-wider text-[#3F3428] font-sans">Carta y Especialidades</a>
                <a href="#eventos" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-xs font-bold uppercase tracking-wider text-[#3F3428] font-sans">Simulador de Celebraciones</a>
                <a href="#opiniones" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-xs font-bold uppercase tracking-wider text-[#3F3428] font-sans">Opiniones</a>
                <a href="#ubicacion" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-xs font-bold uppercase tracking-wider text-[#3F3428] font-sans">Horario y Ubicación</a>
                <div className="pt-3 px-3">
                  <a href="#reservas" onClick={() => setMobileMenuOpen(false)} className="w-full block py-3 bg-[#B8826A] text-white text-center font-bold text-xs uppercase tracking-widest font-sans rounded-none">Reservar Mesa en línea</a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden bg-background">
        <div className="absolute inset-0 bg-tile-pattern opacity-10 pointer-events-none"></div>
        
        {/* Dynamic Hanging Tablecloth Decor */}
        <motion.div 
          style={{ y: mantelY }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, ease: "easeOut", delay: 0.2 }}
          className="absolute top-[68px] left-0 w-full z-10 pointer-events-none select-none"
        >
          <motion.div style={{ height: mantelHeight }} className="bg-mantel w-full shadow-inner"></motion.div>
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center space-y-10">
          <div className="space-y-6 max-w-4xl mx-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#B8826A]/5 text-[#B8826A] text-[9px] font-bold tracking-[0.25em] uppercase font-sans">
              <Sparkles className="w-3 h-3" /> Sabor a leña, alma de Aljarafe
            </span>
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-[#3F3428] tracking-tight font-serif select-all leading-tight">
              Venta El Capricho
            </h1>
            <p className="font-cursive text-4xl sm:text-5xl md:text-6xl text-[#B8826A] leading-relaxed max-w-3xl mx-auto">
              Donde cada celebración familiar se convierte en un recuerdo imborrable
            </p>
            <div className="tile-divider my-4">
              <div className="w-16 h-[1px] bg-[#D6C3A5]/70"></div>
              <div className="tile-star bg-[#8FA3B1]/60"></div>
              <div className="w-16 h-[1px] bg-[#D6C3A5]/70"></div>
            </div>
            <p className="text-xs sm:text-sm md:text-base text-[#6B5A45]/90 max-w-2xl mx-auto font-sans leading-relaxed">
              Descubre un rincón único en <span className="font-semibold text-[#3F3428]">Mairena del Aljarafe</span>. 
              Gastronomía tradicional andaluza, comedores familiares, patio andaluz y el mejor servicio para comuniones, bautizos y bodas íntimas.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto pt-4">
            <a href="#reservas" className="group w-full sm:w-auto px-8 py-3.5 bg-[#B8826A] hover:bg-[#3F3428] text-[#F3EEE4] text-[11px] font-bold uppercase tracking-widest transition-all duration-300 font-sans flex items-center justify-center gap-2 rounded-full shadow-sm hover:shadow-md">
              <span>Reservar Mesa</span> 
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs text-[#6B5A45] max-w-3xl mx-auto pt-8 border-t border-[#D6C3A5]">
            <span className="flex items-center gap-2 font-sans tracking-wide">
              <Phone className="w-4 h-4 text-[#B8826A]" /> <strong className="text-[#3F3428]">664 424 736</strong>
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#D6C3A5] hidden sm:inline-block"></span>
            <span className="flex items-center gap-2 font-sans tracking-wide">
              <MapPin className="w-4 h-4 text-[#B8826A]" /> <span className="text-[#3F3428]">Calle Mandarina 2, Mairena del Aljarafe, Sevilla</span>
            </span>
          </div>
        </div>
      </section>

      {/* Nosotros Section */}
      <section id="nosotros" className="py-24 bg-background relative overflow-hidden border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Visual Column Placeholder Cards */}
            <div className="relative space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="aspect-[4/5] rounded-3xl overflow-hidden group relative">
                  <img
                    src="https://res.cloudinary.com/dmuxgamms/image/upload/v1782260950/unnamed_30_nwrqjh.webp"
                    alt="La Venta"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <h4 className="absolute bottom-4 left-4 font-serif font-bold text-white text-sm uppercase tracking-wider drop-shadow-md">La Venta</h4>
                </div>

                <div className="aspect-[4/5] rounded-3xl overflow-hidden group relative">
                  <img
                    src="https://res.cloudinary.com/dmuxgamms/image/upload/v1782260950/unnamed_21_rmmej6.webp"
                    alt="La Terraza"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <h4 className="absolute bottom-4 left-4 font-serif font-bold text-white text-sm uppercase tracking-wider drop-shadow-md">La Terraza</h4>
                </div>

                <div className="aspect-[4/5] rounded-3xl overflow-hidden group relative">
                  <img
                    src="https://res.cloudinary.com/dmuxgamms/image/upload/v1782260951/unnamed_31_nibgiv.webp"
                    alt="Celebraciones"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <h4 className="absolute bottom-4 left-4 font-serif font-bold text-white text-sm uppercase tracking-wider drop-shadow-md">Celebraciones</h4>
                </div>
              </div>
            </div>

            {/* Text Column */}
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="font-cursive text-3xl sm:text-4xl text-accent block leading-none">
                  Nuestra historia y raíces
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-text font-serif leading-tight">
                  Tradición, Familia y Cocina con Alma
                </h2>
              </div>
              <div className="w-16 h-[1px] bg-accent/40"></div>
              
              <div className="space-y-4 text-brown text-xs sm:text-sm leading-relaxed font-sans">
                <p>
                  En <strong className="text-text font-serif">Venta El Capricho</strong>, entendemos que la comida es mucho más que alimentación: es una oportunidad única de sentarse a compartir con quienes más amamos. Por eso, hemos diseñado un espacio amplio y acogedor para que te sientas como en tu propia casa.
                </p>
                <p>
                  Nuestros salones y la espléndida terraza exterior son el escenario ideal para celebrar comuniones entrañables, bautizos alegres, comidas familiares de fin de semana o almuerzos de negocios. Ponemos todo nuestro empeño en que cada comensal marche con una sonrisa y el deseo de regresar.
                </p>
              </div>

              <div className="border-l border-l-accent/65 pl-5 py-2.5 bg-accent/5">
                <p className="font-cursive text-2xl text-accent leading-relaxed">
                  "No nos limitamos a servir platos; nuestro compromiso es tejer momentos felices que duren para siempre."
                </p>
                <span className="text-[9px] uppercase font-bold tracking-[0.2em] text-brown/70 font-sans block mt-1.5">— Equipo de Sala, Venta El Capricho</span>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 bg-accent text-white flex items-center justify-center text-xs">✓</div>
                  <span className="text-xs font-bold text-text font-sans uppercase tracking-wider">Trato Familiar</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 bg-accent text-white flex items-center justify-center text-xs">✓</div>
                  <span className="text-xs font-bold text-text font-sans uppercase tracking-wider">Fácil Aparcamiento</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 bg-accent text-white flex items-center justify-center text-xs">✓</div>
                  <span className="text-xs font-bold text-text font-sans uppercase tracking-wider">Zona Infantil Amplia</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 bg-accent text-white flex items-center justify-center text-xs">✓</div>
                  <span className="text-xs font-bold text-text font-sans uppercase tracking-wider">Terraza Climatizada</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Galería */}
      <section className="relative z-10 bg-surface py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-14">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-text font-serif leading-tight">
              Nuestra Esencia en Imágenes
            </h2>
            <div className="tile-divider justify-center my-4">
              <div className="w-16 h-[1px] bg-[#D6C3A5]/70"></div>
              <div className="tile-star bg-[#8FA3B1]/60"></div>
              <div className="w-16 h-[1px] bg-[#D6C3A5]/70"></div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {galleryImages.map((url, i) => (
              <button
                key={i}
                onClick={() => openLightbox(i)}
                className="aspect-[4/3] rounded-xl overflow-hidden group cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <img src={url} alt={`Galería ${i + 1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
              </button>
            ))}
          </div>

          {/* Lightbox */}
          <AnimatePresence>
            {lightboxOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[200] bg-black/85 flex items-center justify-center p-4 sm:p-8"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                <button onClick={closeLightbox} className="absolute top-4 right-4 z-20 p-2 text-white/80 hover:text-white transition-colors cursor-pointer" aria-label="Cerrar">
                  <X className="w-7 h-7" />
                </button>

                <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 text-white/60 hover:text-white transition-colors cursor-pointer" aria-label="Anterior">
                  <ChevronLeft className="w-8 h-8" />
                </button>

                <motion.img
                  key={lightboxIndex}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.2 }}
                  src={galleryImages[lightboxIndex]}
                  alt={`Galería ${lightboxIndex + 1}`}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                />

                <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 text-white/60 hover:text-white transition-colors cursor-pointer" aria-label="Siguiente">
                  <ChevronRight className="w-8 h-8" />
                </button>

                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
                  {galleryImages.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setLightboxIndex(i)}
                      className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                        i === lightboxIndex ? 'bg-white w-4' : 'bg-white/40'
                      }`}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Kinetic Scrolling Tablecloth Section */}
      <ScrollMantelSection />

      {/* Catalog Menu */}
      <MenuCatalog />

      {/* Simulator Event Customizer */}
      <EventCustomizer />

      {/* Reviews Section */}
      <ReviewsCarousel />

      {/* Booking Form Section */}
      <ReservationForm />

      {/* Map Opening Hours Section */}
      <section id="ubicacion" className="py-24 bg-background relative overflow-hidden border-t border-border">
        <div className="absolute top-0 left-0 w-full h-4 bg-tile-pattern opacity-20"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
              <div className="space-y-4">
                <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-accent bg-accent/10 px-3 py-1.5 rounded-none font-sans inline-block">
                  ¿Dónde Estamos?
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text font-serif">
                  Ven a Disfrutar
                </h2>
                <p className="text-sm text-brown font-sans leading-relaxed">
                  Nos encontramos en una zona tranquila y muy accesible de Mairena del Aljarafe, con excelentes conexiones para venir desde Sevilla o cualquier pueblo de la comarca.
                </p>
              </div>

              <div className="space-y-4 font-sans text-sm">
                <div className="flex items-start gap-4 bg-surface p-5 border border-border">
                  <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-text text-xs uppercase tracking-widest font-sans">Dirección Postal</h4>
                    <p className="text-brown text-xs mt-1">Calle Mandarina 2, 41927 Mairena del Aljarafe, Sevilla</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-surface p-5 border border-border">
                  <Phone className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-text text-xs uppercase tracking-widest font-sans">Reservas Telefónicas</h4>
                    <p className="text-accent text-sm font-bold mt-1">
                      <a href="tel:664424736" className="hover:underline tracking-wider">664 424 736</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-surface p-5 border border-border">
                  <Clock className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <div className="w-full">
                    <h4 className="font-bold text-text text-xs uppercase tracking-widest font-sans mb-3">Horarios de Apertura</h4>
                    <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs text-brown">
                      <span className="font-medium text-text">Miércoles y Jueves:</span>
                      <span className="text-right">13:00 - 17:00 h</span>
                      <span className="font-medium text-text">Viernes:</span>
                      <span className="text-right">13:00 - 17:00 / 20:00 - 00:00 h</span>
                      <span className="font-medium text-text">Sábados:</span>
                      <span className="text-right">13:00 - 00:00 h</span>
                      <span className="font-medium text-text">Domingos:</span>
                      <span className="text-right">13:00 - 18:00 h</span>
                      <span className="font-bold text-accent pt-1">Lunes y Martes:</span>
                      <span className="text-right text-accent font-bold pt-1">Cerrado</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a href="https://maps.google.com/?q=Calle+Mandarina+2+41927+Mairena+del+Aljarafe+Sevilla" target="_blank" rel="noopener noreferrer" className="px-6 py-3.5 bg-accent text-white font-bold text-xs uppercase tracking-widest rounded-none transition-all font-sans text-center shadow-sm flex items-center justify-center gap-2">
                  <MapPin className="w-4 h-4" /> Cómo llegar con GPS
                </a>
                <a href="tel:664424736" className="px-6 py-3.5 bg-transparent text-text border-2 border-brown font-bold text-xs uppercase tracking-widest rounded-none transition-all font-sans text-center flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4 text-accent" /> Llamar Directamente
                </a>
              </div>
            </div>

            {/* Interactive Google Maps Embed */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div className="p-2 border border-border flex flex-col justify-between h-full bg-surface relative overflow-hidden min-h-[400px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3169.7715886010673!2d-6.033543!3d37.380987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd1261367d1cf0f7%3A0x7c3b2e5c5e5b5a0!2sCalle%20Mandarina%202%2C%2041927%20Mairena%20del%20Aljarafe%2C%20Sevilla!5e0!3m2!1ses!2ses!4v1"
                  width="100%"
                  height="100%"
                  className="min-h-[400px] border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación de Venta El Capricho"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-text text-[#F5F0E8] py-16 border-t-4 border-t-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5 space-y-4">
              <h3 className="font-serif text-2xl font-bold tracking-tight text-primary">VENTA EL CAPRICHO</h3>
              <p className="text-xs uppercase tracking-widest text-accent font-sans font-bold">Mairena del Aljarafe, Sevilla</p>
              <p className="text-xs text-background/80 leading-relaxed max-w-sm font-sans">
                Venta tradicional y salones de celebraciones idóneos para bautizos, comuniones y comidas familiares. Conservamos con orgullo las mejores recetas de toda la vida y la calidez del Aljarafe.
              </p>
            </div>

            <div className="lg:col-span-2 space-y-3">
              <h4 className="font-serif text-sm font-bold text-background uppercase tracking-wider">Enlaces</h4>
              <ul className="space-y-2 text-xs font-sans text-background/75">
                <li><a href="#nosotros" className="hover:text-accent">Nosotros</a></li>
                <li><a href="#carta" className="hover:text-accent">Nuestra Carta</a></li>
                <li><a href="#eventos" className="hover:text-accent">Simulador de Eventos</a></li>
                <li><a href="#reservas" className="hover:text-accent">Reservar Mesa</a></li>
              </ul>
            </div>

            <div className="lg:col-span-2 space-y-3">
              <h4 className="font-serif text-sm font-bold text-background uppercase tracking-wider">Contacto</h4>
              <ul className="space-y-2 text-xs font-sans text-background/75">
                <li><a href="tel:664424736" className="hover:text-accent">664 424 736</a></li>
                <li><span>Calle Mandarina 2</span></li>
                <li><span>41927 Mairena del Aljarafe</span></li>
                <li><span>Sevilla, España</span></li>
              </ul>
            </div>

            <div className="lg:col-span-3 space-y-3">
              <h4 className="font-serif text-sm font-bold text-background uppercase tracking-wider">Horario de Cocina</h4>
              <ul className="space-y-1.5 text-xs font-sans text-background/75">
                <li><span className="font-semibold text-primary">Mié - Jue:</span> 13:00 - 17:00 h</li>
                <li><span className="font-semibold text-primary">Viernes:</span> 13:00 - 17:00 / 20:00 - 00:00 h</li>
                <li><span className="font-semibold text-primary">Sábado:</span> 13:00 - 00:00 h</li>
                <li><span className="font-semibold text-primary">Domingo:</span> 13:00 - 18:00 h</li>
                <li className="text-accent font-semibold pt-1">Lunes y Martes cerrado por descanso</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-background/20 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-background/60 font-sans gap-4">
            <p>&copy; {new Date().getFullYear()} Venta El Capricho. Todos los derechos reservados.</p>
            <div className="flex gap-4">
              <span className="hover:text-accent cursor-pointer">Aviso Legal</span>
              <span>·</span>
              <span className="hover:text-accent cursor-pointer">Política de Privacidad</span>
              <span>·</span>
              <span className="hover:text-accent cursor-pointer">Política de Cookies</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
