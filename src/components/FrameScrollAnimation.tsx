import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const BASE = import.meta.env.BASE_URL;
const TOTAL_FRAMES = 180;

function pad(n: number): string {
  return n.toString().padStart(3, '0');
}

export default function FrameScrollAnimation() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const readyRef = useRef(false);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block;pointer-events:none';
    wrapper.insertBefore(canvas, wrapper.firstChild);
    const ctx = canvas.getContext('2d', { alpha: false })!;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    const dpr = Math.min(window.devicePixelRatio, 2);
    let cw = 0, ch = 0;

    const resize = () => {
      cw = canvas.clientWidth;
      ch = canvas.clientHeight;
      canvas.width = cw * dpr;
      canvas.height = ch * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(wrapper);

    const imgs: HTMLImageElement[] = [];
    let loaded = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `${BASE}frames/ezgif-frame-${pad(i)}.jpg`;
      img.onload = () => {
        loaded++;
        if (loaded === TOTAL_FRAMES) {
          readyRef.current = true;
          setLoading(false);
          draw(0);
        }
      };
      imgs.push(img);
    }

    let currentIdx = 0;

    function draw(idx: number) {
      const img = imgs[idx];
      if (!img) return;
      const s = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
      const sw = img.naturalWidth * s;
      const sh = img.naturalHeight * s;
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, cw, ch);
      ctx.drawImage(img, (cw - sw) / 2, (ch - sh) / 2, sw, sh);
    }

    const mobileOff = window.innerWidth < 1024 ? 56 : 0;
    const st = ScrollTrigger.create({
      trigger: wrapper,
      pin: true,
      start: `top +=${mobileOff}`,
      end: `+=${TOTAL_FRAMES * 15}`,
      scrub: true,
      anticipatePin: 1,
      onUpdate: (self) => {
        if (!readyRef.current) return;
        const idx = Math.min(Math.floor(self.progress * TOTAL_FRAMES), TOTAL_FRAMES - 1);
        if (idx !== currentIdx) {
          currentIdx = idx;
          draw(idx);
        }
      },
      onLeave: () => {
        gsap.to(wrapper, { opacity: 0, duration: 0.5, ease: 'power2.out' });
      },
      onEnterBack: () => {
        gsap.to(wrapper, { opacity: 1, duration: 0.3, ease: 'power2.out' });
      },
    });

    return () => {
      st.kill();
      ro.disconnect();
      canvas.remove();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden bg-black">
      <div ref={wrapperRef} className="relative w-full h-screen" style={{ willChange: 'opacity' }}>
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center z-20 bg-black text-white/40 text-sm">
            Cargando...
          </div>
        )}
      </div>
    </section>
  );
}
