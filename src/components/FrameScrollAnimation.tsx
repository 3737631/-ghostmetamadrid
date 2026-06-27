import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const BASE = import.meta.env.BASE_URL;
const TOTAL_FRAMES = 180;
const SCROLL_DISTANCE = TOTAL_FRAMES * 120;

function pad(n: number): string {
  return n.toString().padStart(3, '0');
}

export default function FrameScrollAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d', { alpha: false, willReadFrequently: false });
    if (!canvas || !ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 3);
    let w = 0, h = 0;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
    };
    resize();

    const images: HTMLImageElement[] = [];
    let loaded = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `${BASE}frames/ezgif-frame-${pad(i)}.jpg`;
      img.onload = () => {
        loaded++;
        if (loaded >= TOTAL_FRAMES) setReady(true);
      };
      if (i === 0 || i === 1) img.fetchPriority = 'high';
      images.push(img);
    }
    imagesRef.current = images;

    const draw = (idx: number) => {
      const img = images[idx];
      if (!img?.complete || !img.naturalWidth) return;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      const scale = Math.max(w / iw, h / ih);
      const sw = iw * scale;
      const sh = ih * scale;
      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(img, (w - sw) / 2, (h - sh) / 2, sw, sh);
    };

    draw(0);

    const onResize = () => {
      resize();
      draw(frameRef.current);
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', onResize);

    ScrollTrigger.create({
      trigger: sectionRef.current,
      pin: true,
      start: 'top top',
      end: `+=${SCROLL_DISTANCE}`,
      scrub: 0.8,
      anticipatePin: 1,
      onUpdate: (self) => {
        const idx = Math.min(Math.floor(self.progress * (TOTAL_FRAMES - 1)), TOTAL_FRAMES - 1);
        if (idx !== frameRef.current) {
          frameRef.current = idx;
          draw(idx);
        }
      },
      onLeave: () => {
        gsap.to(wrapperRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
        });
      },
      onEnterBack: () => {
        gsap.to(wrapperRef.current, {
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out',
        });
      },
    });

    return () => {
      window.removeEventListener('resize', onResize);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: '#0F0F0F' }}
    >
      <div
        ref={wrapperRef}
        className="relative w-full h-screen flex items-center justify-center"
        style={{ willChange: 'opacity' }}
      >
        {!ready && (
          <div className="w-6 h-6 border border-[#C8A97E]/30 border-t-transparent rounded-full animate-spin" />
        )}
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 ${ready ? 'block' : 'hidden'}`}
          style={{
            filter: 'contrast(1.15) brightness(1.03) saturate(1.08) drop-shadow(0 0 0.5px rgba(255,255,255,0.05))',
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.035]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E")`,
            backgroundSize: '96px 96px',
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0F0F0F] to-transparent pointer-events-none z-10" />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#0F0F0F] to-transparent pointer-events-none z-10" />
      </div>
    </section>
  );
}
