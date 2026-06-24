import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Sparkles, Calendar, Star, Award } from 'lucide-react';

export default function ScrollMantelSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const mantelHeight = useTransform(scrollYProgress, [0.1, 0.45], ["0%", "100%"]);
  const ruloScaleY = useTransform(scrollYProgress, [0.1, 0.45], [1, 0.2]);
  const ruloY = useTransform(scrollYProgress, [0.1, 0.45], ["0%", "100%"]);
  const paperOpacity = useTransform(scrollYProgress, [0.35, 0.5], [0, 1]);
  const paperY = useTransform(scrollYProgress, [0.35, 0.5], [40, 0]);

  return (
    <div 
      ref={containerRef}
      className="relative min-h-[140vh] sm:min-h-[160vh] md:min-h-[180vh] bg-[#F7F4EE] py-20 z-10"
      id="nosotros-historia"
    >
      {/* Título de la sección */}
      <div className="max-w-4xl mx-auto text-center px-4 mb-16 relative z-30">
        <span className="font-cursive text-4xl text-accent block mb-2 leading-none">
          Nuestra Esencia
        </span>
        <h2 className="text-3xl sm:text-5xl font-bold font-serif text-text tracking-tight uppercase">
          La Tradición Desplegada
        </h2>
        <p className="text-xs sm:text-sm font-sans tracking-widest text-brown/60 uppercase mt-3">
          Un lienzo de sabor, historia y calidez familiar
        </p>
      </div>

      {/* Caja contenedor principal */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative">
        
        {/* Mesa de Madera de Fondo */}
        <div className="absolute inset-0 bg-[#E8DFD0] border-y-8 border-[#3F3428]/10 rounded-none shadow-[inset_0_4px_24px_rgba(63,52,40,0.06)] overflow-hidden">
          <div className="absolute inset-0 opacity-[0.12] pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(90deg, #3F3428 0px, #3F3428 2px, transparent 2px, transparent 40px)' }}></div>
          <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(0deg, #3F3428 0px, #3F3428 1px, transparent 1px, transparent 30px)' }}></div>
        </div>

        {/* Rieles Metálicos de Sujeción */}
        <div className="absolute inset-y-0 left-2 sm:left-4 z-40 flex flex-col justify-between items-center pointer-events-none opacity-40">
          <div className="w-1.5 h-full bg-brown shadow-[0_0_8px_rgba(107,90,69,0.3)]"></div>
        </div>
        <div className="absolute inset-y-0 right-2 sm:right-4 z-40 flex flex-col justify-between items-center pointer-events-none opacity-40">
          <div className="w-1.5 h-full bg-brown shadow-[0_0_8px_rgba(107,90,69,0.3)]"></div>
        </div>

        {/* CONTENEDOR DE LA TELA */}
        <div className="relative w-full min-h-[90vh] sm:min-h-[110vh] md:min-h-[120vh] rounded-none py-10 px-4 sm:px-10 overflow-hidden">
          
          {/* EL MANTEL DE ALGODÓN */}
          <motion.div 
            style={{ height: mantelHeight }}
            className="absolute top-0 inset-x-4 sm:inset-x-8 bg-[#FDFBF7] shadow-[0_12px_40px_rgba(63,52,40,0.15)] origin-top border-x-4 border-[#CFC2AE]/50 overflow-hidden z-20"
          >
            {/* Sombra de pliegues en la tela */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/5 pointer-events-none mix-blend-multiply z-10"></div>
            
            {/* Flecos decorativos de macramé de encaje */}
            <div className="absolute bottom-0 inset-x-0 h-4 bg-[#FDFBF7] border-b-4 border-double border-accent/30 pointer-events-none"></div>

            {/* Cenefa bordada */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 pointer-events-none hidden md:flex items-center justify-center opacity-[0.04]">
              <div className="border-[12px] border-double border-[#3F3428] w-[92%] h-[84%] rounded-none flex items-center justify-center"></div>
            </div>

            {/* CONTENIDO DEL MANTEL (Revelado dinámicamente) */}
            <motion.div 
              style={{ opacity: paperOpacity, y: paperY }}
              className="relative w-full h-full min-h-[70vh] sm:min-h-[90vh] z-30 py-8 px-2 sm:px-6 flex flex-col justify-between"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                
                {/* Columna de Texto: Historia */}
                <div className="space-y-5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 border border-accent/20 rounded-full">
                    <Sparkles className="w-3.5 h-3.5 text-accent" />
                    <span className="text-[10px] font-bold text-accent uppercase tracking-widest font-sans">Historia Viva</span>
                  </div>
                  <h3 className="text-2xl sm:text-3.5xl font-bold font-serif text-text leading-tight tracking-tight">
                    El Capricho de Compartir Alrededor de una Mesa
                  </h3>
                  <p className="text-xs sm:text-sm text-brown/95 leading-relaxed font-sans">
                    Nacimos con una idea clara: crear un espacio donde la prisa no tenga cabida. En nuestra Venta, cada mantel que se despliega representa el inicio de una historia familiar, un reencuentro de amigos o una celebración única en el Aljarafe sevillano.
                  </p>
                  <p className="text-xs sm:text-sm text-brown/95 leading-relaxed font-sans">
                    Cocinar para nosotros es un acto de cariño. Por eso, seleccionamos minuciosamente cada materia prima: las carnes ibéricas, las verduras frescas locales y los vinos más selectos de la comarca, asegurándonos de que cada bocado evoque la calidez del hogar.
                  </p>

                  <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#CFC2AE]/30">
                    <div className="text-center p-3 bg-[#F7F4EE]/65 rounded-none border border-[#CFC2AE]/20">
                      <div className="font-serif text-xl sm:text-2xl font-bold text-accent">100%</div>
                      <div className="text-[9px] text-brown/70 uppercase tracking-wider font-sans mt-1">Casero</div>
                    </div>
                    <div className="text-center p-3 bg-[#F7F4EE]/65 rounded-none border border-[#CFC2AE]/20">
                      <div className="font-serif text-xl sm:text-2xl font-bold text-accent">Local</div>
                      <div className="text-[9px] text-brown/70 uppercase tracking-wider font-sans mt-1">Aljarafe</div>
                    </div>
                    <div className="text-center p-3 bg-[#F7F4EE]/65 rounded-none border border-[#CFC2AE]/20">
                      <div className="font-serif text-xl sm:text-2xl font-bold text-accent">Familiar</div>
                      <div className="text-[9px] text-brown/70 uppercase tracking-wider font-sans mt-1">Acogedor</div>
                    </div>
                  </div>
                </div>

                {/* Columna Visual: Bloques de Información Decorativos */}
                <div className="space-y-4">
                  
                  {/* Tarjeta 1 */}
                  <div className="bg-[#F7F4EE]/50 p-5 rounded-none border border-[#CFC2AE]/35 shadow-sm">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-none bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0 mt-0.5">
                        <Award className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-serif font-bold text-text text-sm uppercase tracking-wide">Tradición en el Plato</h4>
                        <p className="text-[11px] sm:text-xs text-brown/85 leading-relaxed mt-1 font-sans">
                          Recetas transmitidas de generación en generación, perfeccionadas con las mejores técnicas artesanales sevillanas.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Tarjeta 2 */}
                  <div className="bg-[#F7F4EE]/50 p-5 rounded-none border border-[#CFC2AE]/35 shadow-sm">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-none bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0 mt-0.5">
                        <Star className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-serif font-bold text-text text-sm uppercase tracking-wide">El Rincón Más Acogedor</h4>
                        <p className="text-[11px] sm:text-xs text-brown/85 leading-relaxed mt-1 font-sans">
                          Un patio luminoso de arquitectura tradicional andaluza y salones amplios para sentirse como en casa.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Tarjeta 3 */}
                  <div className="bg-[#F7F4EE]/50 p-5 rounded-none border border-[#CFC2AE]/35 shadow-sm">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-none bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0 mt-0.5">
                        <Calendar className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-serif font-bold text-text text-sm uppercase tracking-wide">Tus Momentos Especiales</h4>
                        <p className="text-[11px] sm:text-xs text-brown/85 leading-relaxed mt-1 font-sans">
                          Salones privados y un equipo experto dedicado a organizar bautizos, comuniones y comidas corporativas impecables.
                        </p>
                      </div>
                    </div>
                  </div>

                </div>

              </div>

              {/* Pie de Firma del Mantel */}
              <div className="mt-8 pt-4 border-t border-[#CFC2AE]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-1.5 text-xs text-brown/85 font-serif italic">
                  <span>Con cariño, la familia de</span>
                  <strong className="text-[#3F3428] font-bold not-italic">Venta El Capricho</strong>
                </div>
                <div className="text-[9px] uppercase tracking-widest text-[#B8826A] font-bold font-sans">
                  Sabor, Familia y Tradición
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* EL RULO FÍSICO DE LA TELA */}
          <motion.div 
            style={{ scaleY: ruloScaleY, y: ruloY }}
            className="absolute inset-x-3 sm:inset-x-6 h-12 bg-brown text-[#F3EEE4] p-5 border border-[#CFC2AE]/25 rounded-none relative overflow-hidden group hover:scale-[1.01] transition-transform duration-300 shadow-[0_8px_20px_rgba(63,52,40,0.25)] z-30"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/25 pointer-events-none"></div>
            <div className="absolute inset-y-0 left-0 w-3 bg-[#3F3428] border-r border-[#CFC2AE]/10"></div>
            <div className="absolute inset-y-0 right-0 w-3 bg-[#3F3428] border-l border-[#CFC2AE]/10"></div>

            <div className="w-full h-full flex items-center justify-center relative z-10">
              <span className="text-[9px] tracking-[0.2em] uppercase font-bold text-white/90 animate-pulse font-sans">
                Despliega deslizando hacia abajo ↓
              </span>
            </div>
          </motion.div>

        </div>

        {/* Cuerdas decorativas que cuelgan del rodillo */}
        <div className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-30 hidden xs:flex flex-col items-center gap-4 text-[#3F3428]/40 font-mono text-[9px]">
          <span className="rotate-90 origin-center translate-y-4 tracking-widest">SCROLL</span>
          <div className="w-[1.5px] h-16 bg-[#3F3428]/10 relative">
            <motion.div 
              style={{ y: ruloY }} 
              className="absolute top-0 -left-[1.5px] w-2 h-2 rounded-full bg-[#B8826A]"
            />
          </div>
        </div>

      </div>
    </div>
  );
}
