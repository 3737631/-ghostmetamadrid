import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { reviews } from '../data';

export default function ReviewsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(0);

  const prevReview = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0) prevReview();
      else nextReview();
    }
  };

  return (
    <section id="opiniones" className="py-24 bg-background relative overflow-hidden border-b border-primary/30">
      <div className="absolute top-0 left-0 w-full h-4 bg-tile-pattern opacity-30"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-accent bg-accent/10 px-3 py-1.5 inline-flex items-center gap-1">
            Confianza y Tradición
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text mt-4 mb-2">La Voz de Nuestros Clientes</h2>
          <p className="text-sm text-brown max-w-xl mx-auto mt-2">Con un promedio de 4.0 ★ en Google basado en reseñas reales.</p>
        </div>

        <div className="relative min-h-[320px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.98, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.98, x: -20 }}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              className="premium-card-solid p-8 sm:p-10 rounded-2xl border-2 border-primary/50 relative shadow-md max-w-3xl w-full text-center cursor-grab active:cursor-grabbing"
            >
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center shadow-md">
                <Quote className="w-5 h-5" />
              </div>

              <div className="flex justify-center items-center gap-1 mb-5">
                {Array.from({ length: reviews[currentIndex].stars }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-500 text-amber-500" />
                ))}
              </div>

              <p className="text-text text-base sm:text-lg italic font-serif leading-relaxed mb-6">
                "{reviews[currentIndex].comment}"
              </p>

              <div className="border-t border-primary/30 pt-4 inline-block">
                <h4 className="font-bold text-text text-sm sm:text-base">{reviews[currentIndex].name}</h4>
                <span className="text-[10px] text-brown/70">{reviews[currentIndex].date} · {reviews[currentIndex].source}</span>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="absolute -bottom-16 sm:bottom-auto sm:left-[-24px] sm:right-[-24px] left-0 right-0 flex justify-center sm:justify-between items-center gap-4">
            <button onClick={prevReview} className="w-11 h-11 rounded-full bg-white border border-primary/50 hover:bg-primary/20 flex items-center justify-center text-text cursor-pointer shadow-sm">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={nextReview} className="w-11 h-11 rounded-full bg-white border border-primary/50 hover:bg-primary/20 flex items-center justify-center text-text cursor-pointer shadow-sm">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
