import { useState, useEffect } from 'react';
import { 
  MapPin, Phone, Clock, Menu, X, ArrowUp, ChevronRight, 
  Sparkles, Star, Award, ChevronDown,
  Home, UtensilsCrossed, Camera
} from 'lucide-react';

import InteractiveTable from './components/InteractiveTable';
import ScrollMantelSection from './components/ScrollMantelSection';
import MenuCatalog from './components/MenuCatalog';
import EventCustomizer from './components/EventCustomizer';
import ReservationForm from './components/ReservationForm';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const toggleAccordion = (index: number) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-background text-text selection:bg-accent/20 selection:text-text antialiased">
      
      {/* HEADER DE NAVEGACIÓN */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-primary/20 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 sm:h-24">
            
            {/* LOGOTIPO */}
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => scrollToSection('inicio')}>
              <span className="text-lg sm:text-xl md:text-2xl font-black tracking-[0.1em] text-[#3F3428] font-serif uppercase group-hover:text-[#B8826A] transition-colors">
                El Capricho
              </span>
            </div>

            {/* LINKS DE NAVEGACIÓN (Escritorio) */}
            <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
              <a href="#nosotros" className="text-xs font-bold uppercase tracking-widest text-[#3F3428] hover:text-[#B8826A] border-b border-transparent hover:border-[#B8826A] pb-1 transition-all font-sans">Nosotros</a>
              <a href="#mesa-interactiva" className="text-xs font-bold uppercase tracking-widest text-[#3F3428] hover:text-[#B8826A] border-b border-transparent hover:border-[#B8826A] pb-1 transition-all font-sans flex items-center gap-1.5">La Mesa <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#B8826A] animate-pulse"></span></a>
              <a href="#carta" className="text-xs font-bold uppercase tracking-widest text-[#3F3428] hover:text-[#B8826A] border-b border-transparent hover:border-[#B8826A] pb-1 transition-all font-sans">Carta</a>
              <a href="#eventos" className="text-xs font-bold uppercase tracking-widest text-[#3F3428] hover:text-[#B8826A] border-b border-transparent hover:border-[#B8826A] pb-1 transition-all font-sans">Celebraciones</a>
              <a href="#opiniones" className="text-xs font-bold uppercase tracking-widest text-[#3F3428] hover:text-[#B8826A] border-b border-transparent hover:border-[#B8826A] pb-1 transition-all font-sans">Opiniones</a>
              <a href="#ubicacion" className="text-xs font-bold uppercase tracking-widest text-[#3F3428] hover:text-[#B8826A] border-b border-transparent hover:border-[#B8826A] pb-1 transition-all font-sans">Horario y Mapa</a>
            </nav>

            {/* BOTÓN RESERVAR (Escritorio) */}
            <div className="hidden lg:block">
              <button 
                onClick={() => scrollToSection('reservas')}
                className="px-6 py-2.5 bg-[#B8826A] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#6B5A45] transition-colors rounded-none shadow-sm"
              >
                Reservar Mesa
              </button>
            </div>

            {/* MENÚ MÓVIL (Gatillo) */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-none hover:bg-primary/20 text-[#3F3428] transition-colors cursor-pointer border border-[#D6C3A5]"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>

        {/* NAVEGACIÓN MÓVIL (Cajón) */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-primary/20 bg-background/98 backdrop-blur-lg py-4 px-4 space-y-2 shadow-xl animate-fade-in-down">
            <a 
              href="#nosotros" 
              onClick={() => { setMobileMenuOpen(false); }}
              className="block px-3 py-2 text-xs font-bold uppercase tracking-wider text-[#3F3428] hover:bg-[#D6C3A5]/20 font-sans"
            >
              Nosotros
            </a>
            <a 
              href="#mesa-interactiva" 
              onClick={() => { setMobileMenuOpen(false); }}
              className="block px-3 py-2 text-xs font-bold uppercase tracking-wider text-[#3F3428] hover:bg-[#D6C3A5]/20 font-sans flex items-center justify-between"
            >
              <span>La Mesa Interactiva</span>
              <span className="inline-block w-2 h-2 rounded-full bg-[#B8826A]"></span>
            </a>
            <a 
              href="#carta" 
              onClick={() => { setMobileMenuOpen(false); }}
              className="block px-3 py-2 text-xs font-bold uppercase tracking-wider text-[#3F3428] hover:bg-[#D6C3A5]/20 font-sans"
            >
              La Carta
            </a>
            <a 
              href="#eventos" 
              onClick={() => { setMobileMenuOpen(false); }}
              className="block px-3 py-2 text-xs font-bold uppercase tracking-wider text-[#3F3428] hover:bg-[#D6C3A5]/20 font-sans"
            >
              Celebraciones
            </a>
            <a 
              href="#opiniones" 
              onClick={() => { setMobileMenuOpen(false); }}
              className="block px-3 py-2 text-xs font-bold uppercase tracking-wider text-[#3F3428] hover:bg-[#D6C3A5]/20 font-sans"
            >
              Opiniones
            </a>
            <a 
              href="#ubicacion" 
              onClick={() => { setMobileMenuOpen(false); }}
              className="block px-3 py-2 text-xs font-bold uppercase tracking-wider text-[#3F3428] hover:bg-[#D6C3A5]/20 font-sans"
            >
              Horario y Ubicación
            </a>
            <div className="pt-4 border-t border-primary/20">
              <button 
                onClick={() => scrollToSection('reservas')}
                className="w-full block py-3 bg-[#B8826A] text-white hover:bg-[#6B5A45] text-center font-bold text-xs uppercase tracking-widest font-sans rounded-none"
              >
                Reservar Mesa
              </button>
            </div>
          </div>
        )}
      </header>

      {/* HERO SECTION */}
      <section id="inicio" className="relative py-20 lg:py-32 bg-[#F7F4EE] overflow-hidden border-b border-primary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Texto Hero */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-accent/10 border border-accent/20 rounded-full justify-center">
                <Sparkles className="w-4 h-4 text-[#B8826A]" />
                <span className="text-[10px] sm:text-xs font-bold text-[#B8826A] tracking-[0.2em] uppercase font-sans">Gastronomía y Tradición en el Aljarafe</span>
              </div>
              
              <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-[#3F3428] tracking-tight font-serif select-all leading-tight">
                El sabor de <br/>
                <span className="font-cursive text-6xl sm:text-8xl lg:text-9xl text-accent font-normal tracking-normal capitalize leading-none">siempre</span>
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-[#6B5A45] leading-relaxed max-w-2xl mx-auto lg:mx-0 font-sans">
                Descubre un rincón único en <span className="font-semibold text-[#3F3428]">Mairena del Aljarafe</span>. 
                Donde las recetas de toda la vida y el aire andaluz se unen alrededor del mantel familiar para crear momentos verdaderamente memorables.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start pt-2">
                <button 
                  onClick={() => scrollToSection('carta')}
                  className="group w-full sm:w-auto px-8 py-3.5 bg-[#B8826A] hover:bg-[#3F3428] text-[#F3EEE4] text-[11px] font-bold uppercase tracking-widest transition-all duration-300 font-sans flex items-center justify-center gap-2 rounded-full shadow-sm hover:shadow-md"
                >
                  Ver la Carta
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
                <button 
                  onClick={() => scrollToSection('reservas')}
                  className="group w-full sm:w-auto px-8 py-3.5 bg-transparent border border-[#6B5A45] text-[#3F3428] hover:bg-[#3F3428] hover:text-[#F3EEE4] hover:border-[#3F3428] text-[11px] font-bold uppercase tracking-widest transition-all duration-300 font-sans flex items-center justify-center gap-2 rounded-full"
                >
                  Reservar Mesa
                </button>
              </div>

              {/* Datos de contacto rápidos */}
              <div className="pt-8 border-t border-primary/20 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans text-brown">
                <div className="flex items-center gap-3 justify-center lg:justify-start">
                  <Phone className="w-4 h-4 text-[#B8826A]" /> <strong className="text-[#3F3428]">664 424 736</strong>
                </div>
                <div className="flex items-center gap-3 justify-center lg:justify-start">
                  <MapPin className="w-4 h-4 text-[#B8826A]" /> <span className="text-[#3F3428]">Calle Mandarina 2, Mairena del Aljarafe, Sevilla</span>
                </div>
              </div>
            </div>

            {/* Espacio visual del Hero: Decoración */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <div className="w-full aspect-square max-w-[420px] rounded-full border-4 border-[#D6C3A5] bg-tile-pattern relative flex items-center justify-center p-8 shadow-xl">
                <div className="absolute inset-4 rounded-full bg-background flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-[#B8826A]/30">
                  <UtensilsCrossed className="w-12 h-12 text-[#B8826A] mb-4 animate-bounce" />
                  <h3 className="font-serif font-black text-xl text-[#3F3428] uppercase tracking-wider">Venta El Capricho</h3>
                  <span className="text-[10px] text-accent font-bold uppercase tracking-widest mt-1">Desde 1994</span>
                  <p className="text-[11px] text-brown/85 mt-2.5 font-sans leading-relaxed">
                    Sabor andaluz casero, amplios patios y un ambiente idílico para toda la familia.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* QUIÉNES SOMOS / NOSOTROS */}
      <section id="nosotros" className="relative py-24 bg-background border-b border-primary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Columna Visual: 3 elegant Image Placeholders */}
            <div className="relative space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                
                {/* Image Card 1: La Venta */}
                <div className="aspect-[4/5] bg-surface border-2 border-dashed border-[#CFC2AE]/60 rounded-3xl flex flex-col items-center justify-center text-center p-6 group hover:border-accent/40 hover:bg-accent/5 transition-all duration-300">
                  <div className="w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                    <Camera className="w-5 h-5 text-[#B8826A]" />
                  </div>
                  <h4 className="font-serif font-bold text-text text-sm uppercase tracking-wider">La Venta</h4>
                  <p className="text-[10px] text-brown/65 mt-2 font-sans px-1 leading-normal">
                    [Espacio para foto de la edificación]
                  </p>
                </div>

                {/* Image Card 2: Nuestra Terraza */}
                <div className="aspect-[4/5] bg-surface border-2 border-dashed border-[#CFC2AE]/60 rounded-3xl flex flex-col items-center justify-center text-center p-6 group hover:border-accent/40 hover:bg-accent/5 transition-all duration-300">
                  <div className="w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                    <Camera className="w-5 h-5 text-[#B8826A]" />
                  </div>
                  <h4 className="font-serif font-bold text-text text-sm uppercase tracking-wider">La Terraza</h4>
                  <p className="text-[10px] text-brown/65 mt-2 font-sans px-1 leading-normal">
                    [Espacio para foto del patio exterior]
                  </p>
                </div>

                {/* Image Card 3: Eventos */}
                <div className="aspect-[4/5] bg-surface border-2 border-dashed border-[#CFC2AE]/60 rounded-3xl flex flex-col items-center justify-center text-center p-6 group hover:border-accent/40 hover:bg-accent/5 transition-all duration-300">
                  <div className="w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                    <Camera className="w-5 h-5 text-[#B8826A]" />
                  </div>
                  <h4 className="font-serif font-bold text-text text-sm uppercase tracking-wider">Celebraciones</h4>
                  <p className="text-[10px] text-brown/65 mt-2 font-sans px-1 leading-normal">
                    [Espacio para foto de eventos]
                  </p>
                </div>

              </div>
            </div>

            {/* Columna Texto */}
            <div className="space-y-6">
              <span className="font-cursive text-4xl text-[#B8826A] block leading-none">Bienvenidos</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-[#3F3428] tracking-tight">
                El Capricho de la Venta Andaluza
              </h2>
              <div className="w-16 h-[2px] bg-[#B8826A]"></div>
              
              <p className="text-[#6B5A45] text-xs sm:text-sm leading-relaxed font-sans">
                Fundada como un homenaje a la hospitalidad andaluza, en <strong className="text-text">Venta El Capricho</strong> nos enorgullece ofrecer un ambiente espacioso, luminoso y familiar en el Aljarafe.
              </p>
              
              <p className="text-[#6B5A45] text-xs sm:text-sm leading-relaxed font-sans">
                Nuestros amplios patios exteriores e interiores son perfectos para relajarse mientras disfruta de un solomillo al whisky excepcional, de un buen vino o celebra las comuniones y bautizos de sus seres más queridos en salones independientes de total comodidad.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-primary/20">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0">
                    <Award className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-text font-sans uppercase tracking-wider">Producto 100% de la Tierra</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0">
                    <Home className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-text font-sans uppercase tracking-wider">Salones e Instalaciones Amplias</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECCIÓN DEL MANTEL QUE SE DESPLIEGA CON EL SCROLL */}
      <ScrollMantelSection />

      {/* EL MANTEL DE LA EXPERIENCIA SENSORIAL INTERACTIVA */}
      <InteractiveTable />

      {/* CARTA / MENÚ */}
      <MenuCatalog />

      {/* DISEÑADOR / PERSONALIZADOR DE CELEBRACIONES */}
      <EventCustomizer />

      {/* FORMULARIO DE RESERVAS */}
      <ReservationForm />

      {/* OPINIONES / RESEÑAS */}
      <section id="opiniones" className="relative py-24 bg-background overflow-hidden border-t border-primary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-cursive text-4xl text-accent block mb-2 leading-none">
              Vuestra Experiencia
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-text font-serif mb-4">
              La Opinión de Nuestros Clientes
            </h2>
            <div className="w-16 h-[1px] bg-accent/40 mx-auto mb-6"></div>
            <p className="text-sm sm:text-base text-brown/95 leading-relaxed font-sans max-w-2xl mx-auto">
              Nuestra mayor satisfacción es ver a las familias sonreír alrededor de nuestras mesas. Descubre lo que opinan quienes nos eligen en Mairena del Aljarafe.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Lola Ramos",
                comment: "Celebré la comunión de mi hija el mes pasado y fue un acierto total. La comida estuvo espectacular, los espacios son amplios e idóneos para que los niños jueguen, y el servicio de mesa fue súper atento.",
                date: "Mayo 2026",
                source: "Google"
              },
              {
                name: "Jorge Rodríguez",
                comment: "Un restaurante excelente para disfrutar en familia de la gastronomía de toda la vida. La terraza exterior es súper agradable para la sobremesa con un café o una copa de manzanilla. Las croquetas son excelentes.",
                date: "Junio 2026",
                source: "Google"
              },
              {
                name: "María Luisa Sánchez",
                comment: "La calidez andaluza en estado puro. Te atienden con una sonrisa desde el primer segundo. Celebramos el bautizo de mi nieto y todos los invitados quedaron encantados tanto con el menú como con la belleza.",
                date: "Abril 2026",
                source: "Google"
              },
              {
                name: "Antonio J. Benítez",
                comment: "Excelente comida y precio inmejorable en la zona del Aljarafe. Probamos el arroz de la casa y el rabo de toro, ambos platos cocinados con el cariño que ya casi no se encuentra. Volveremos sin duda.",
                date: "Marzo 2026",
                source: "Google"
              }
            ].map((review, idx) => (
              <div key={idx} className="bg-surface p-6 rounded-none border border-primary/40 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-brown leading-relaxed font-sans italic">
                    "{review.comment}"
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-primary/20 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-text text-xs uppercase tracking-wider font-sans">{review.name}</h4>
                    <span className="text-[10px] text-brown/60 font-sans">{review.date}</span>
                  </div>
                  <span className="text-[10px] font-bold text-accent uppercase tracking-wider bg-accent/10 px-2.5 py-1 font-sans">{review.source}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* PREGUNTAS FRECUENTES (FAQS) */}
      <section className="relative py-20 bg-surface border-t border-b border-primary/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="font-cursive text-3xl text-accent block mb-1">Dudas Habituales</span>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-text uppercase tracking-tight">Preguntas Frecuentes</h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "¿Con cuánta antelación debo reservar para comuniones o bautizos?",
                a: "Para grandes celebraciones familiares como bautizos y comuniones, recomendamos reservar con un mínimo de 3 a 6 meses de antelación para asegurar la exclusividad del salón y fecha de preferencia."
              },
              {
                q: "¿Disponen de menús adaptados para alérgicos y celíacos?",
                a: "Sí, absolutamente. Nuestra cocina dispone de protocolos especiales para alérgicos. Contamos con platos señalizados sin gluten y menús personalizados para adaptarnos a cualquier intolerancia."
              },
              {
                q: "¿Hay espacio exterior para niños y carritos?",
                a: "Nuestra venta cuenta con amplios patios exteriores peatonales de aire andaluz, totalmente seguros y espaciosos para carritos de bebé y para que los niños puedan estar cómodos en familia."
              },
              {
                q: "¿Ofrecen aparcamiento cercano?",
                a: "Sí, en la Calle Mandarina y las inmediaciones de la venta hay amplias zonas públicas gratuitas para aparcar de manera cómoda y sin complicaciones."
              }
            ].map((faq, idx) => (
              <div key={idx} className="border border-primary/30 bg-background overflow-hidden rounded-none">
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full flex items-center justify-between p-5 text-left font-serif font-bold text-sm sm:text-base text-text hover:text-accent transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${activeAccordion === idx ? 'rotate-180 text-accent' : 'text-brown'}`} />
                </button>
                {activeAccordion === idx && (
                  <div className="p-5 border-t border-primary/20 bg-surface text-xs sm:text-sm text-brown leading-relaxed font-sans">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HORARIO Y MAPA (UBICACIÓN) */}
      <section id="ubicacion" className="relative py-24 bg-background border-b border-primary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            
            {/* Columna Horarios */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
              <div className="space-y-4">
                <span className="font-cursive text-4xl text-accent block leading-none">Visítanos</span>
                <h2 className="text-3xl sm:text-4xl font-bold font-serif text-text uppercase tracking-tight">Horario y Ubicación</h2>
                <div className="w-16 h-[2px] bg-accent"></div>
                <p className="text-[#6B5A45] text-xs sm:text-sm leading-relaxed font-sans">
                  Nos encontramos en un enclave estratégico y tranquilo del Aljarafe, en Mairena del Aljarafe, con un acceso sumamente fácil desde Sevilla. ¡Te esperamos con las puertas abiertas!
                </p>
              </div>

              {/* Bloque de Horarios */}
              <div className="bg-surface p-6 border border-primary/30 space-y-4">
                <div className="flex items-center gap-3 text-accent pb-3 border-b border-primary/20">
                  <Clock className="w-5 h-5" />
                  <h3 className="font-bold text-xs uppercase tracking-widest font-sans">Nuestro Horario de Cocina</h3>
                </div>
                
                <div className="space-y-2.5 text-xs text-brown font-sans">
                  <div className="flex justify-between">
                    <span className="font-bold text-text">Miércoles a Sábado:</span>
                    <span>13:00 a 16:30 y 20:30 a 23:30</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold text-text">Domingos:</span>
                    <span>13:00 a 17:00 (Tardes cerrado)</span>
                  </div>
                  <div className="flex justify-between text-accent/80 font-bold">
                    <span>Lunes y Martes:</span>
                    <span>Cerrado por descanso familiar</span>
                  </div>
                </div>
              </div>

              {/* Botón de Dirección */}
              <a 
                href="https://maps.google.com" 
                target="_blank" 
                referrerPolicy="no-referrer"
                className="w-full py-4 bg-[#B8826A] text-white hover:bg-[#6B5A45] text-center font-bold text-xs uppercase tracking-widest font-sans block"
              >
                Abrir en Google Maps
              </a>
            </div>

            {/* Columna Mapa */}
            <div className="lg:col-span-7 min-h-[400px] border border-primary/30 relative bg-surface p-4 flex items-center justify-center">
              <div className="w-full h-full bg-tile-pattern relative flex items-center justify-center">
                <div className="absolute inset-4 rounded-none bg-background flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-[#B8826A]/30 shadow-lg max-w-[400px]">
                  <MapPin className="w-12 h-12 text-[#B8826A] mb-4" />
                  <h3 className="font-serif font-black text-lg text-[#3F3428] uppercase tracking-wider">Venta El Capricho</h3>
                  <span className="text-[10px] text-accent font-bold uppercase tracking-widest mt-1">Calle Mandarina 2</span>
                  <p className="text-[11px] text-brown/85 mt-2.5 font-sans leading-relaxed">
                    Mairena del Aljarafe, 41920, Sevilla
                  </p>
                  <p className="text-[10px] text-brown/60 mt-2 font-sans italic">
                    [Aparcamiento fácil e idóneo para familias]
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* PIE DE PÁGINA (FOOTER) */}
      <footer className="bg-text text-[#F3EEE4] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-[#CFC2AE]/15">
            
            {/* Columna 1 */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold font-serif uppercase tracking-widest text-[#B8826A]">El Capricho</h3>
              <p className="text-xs text-[#F3EEE4]/75 leading-relaxed font-sans">
                El rincón tradicional del Aljarafe sevillano donde la calidad, la hospitalidad y la familia se reúnen alrededor de una buena mesa.
              </p>
            </div>

            {/* Columna 2 */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#B8826A] font-sans">Contacto</h4>
              <ul className="space-y-2 text-xs text-[#F3EEE4]/80 font-sans">
                <li className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-accent" /> 
                  <span>664 424 736</span>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-accent" /> 
                  <span>Calle Mandarina 2, Mairena del Aljarafe, Sevilla</span>
                </li>
              </ul>
            </div>

            {/* Columna 3 */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#B8826A] font-sans">Horario de Puertas</h4>
              <p className="text-xs text-[#F3EEE4]/80 leading-relaxed font-sans">
                Miércoles a Sábados: Almuerzos y Cenas.<br />
                Domingos: Almuerzos de 13:00 a 17:00.<br />
                Lunes y Martes cerrado por descanso.
              </p>
            </div>

          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-[#F3EEE4]/60 font-sans">
            <span>&copy; {new Date().getFullYear()} Venta El Capricho. Todos los derechos reservados.</span>
            <span>Mairena del Aljarafe, Sevilla</span>
          </div>
        </div>
      </footer>

      {/* BOTÓN VOLVER ARRIBA */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-40 p-3 bg-[#B8826A] text-white hover:bg-[#6B5A45] shadow-lg transition-all duration-300 cursor-pointer rounded-full"
          aria-label="Volver arriba"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

    </div>
  );
}
