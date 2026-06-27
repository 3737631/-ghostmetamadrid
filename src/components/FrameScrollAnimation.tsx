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

    const container = document.createElement('div');
    container.style.cssText = 'position:absolute;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none';
    wrapper.insertBefore(container, wrapper.firstChild);

    const vignette = document.createElement('div');
    vignette.style.cssText = 'position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse at center,transparent 55%,#000 95%);z-index:2';
    container.appendChild(vignette);

    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'display:block;pointer-events:none;width:100%;height:100%';
    container.appendChild(canvas);
    const ctx = canvas.getContext('2d', { alpha: false })!;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    const dpr = Math.min(window.devicePixelRatio, 2);
    let cw = 0, ch = 0, iw = 0, ih = 0;

    const imgs: HTMLImageElement[] = [];
    let loaded = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `${BASE}frames/ezgif-frame-${pad(i)}.jpg`;
      img.onload = () => {
        if (iw === 0) { iw = img.naturalWidth; ih = img.naturalHeight; }
        loaded++;
        if (loaded === TOTAL_FRAMES) {
          readyRef.current = true;
          setLoading(false);
          resize();
          draw(0);
        }
      };
      imgs.push(img);
    }

    let currentIdx = 0;

    function resize() {
      const vw = wrapper.clientWidth;
      const vh = wrapper.clientHeight;
      const maxW = vw * 0.78;
      const maxH = vh * 0.7;
      const s = Math.min(Math.min(maxW / iw, maxH / ih), 1.5);
      cw = Math.round(iw * s);
      ch = Math.round(ih * s);
      canvas.style.width = cw + 'px';
      canvas.style.height = ch + 'px';
      canvas.width = cw * dpr;
      canvas.height = ch * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(wrapper);

    function draw(idx: number) {
      const img = imgs[idx];
      if (!img) return;
      ctx.drawImage(img, 0, 0, cw, ch);
    }

    const st = ScrollTrigger.create({
      trigger: wrapper,
      pin: true,
      start: 'top top',
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
      container.remove();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden bg-black">
      <div ref={wrapperRef} className="relative w-full h-screen" style={{ willChange: 'opacity' }}>
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center z-20 text-white/40 text-sm">
            Cargando...
          </div>
        )}
      </div>
    </section>
  );
}
