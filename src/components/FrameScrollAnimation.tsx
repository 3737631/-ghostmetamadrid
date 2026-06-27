import { useEffect, useRef } from 'react';
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

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const isMobile = window.innerWidth < 1024;
    const headerH = isMobile ? 56 : 0;

    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block;pointer-events:none';
    wrapper.insertBefore(canvas, wrapper.firstChild);
    const ctx = canvas.getContext('2d', { alpha: false })!;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    const dpr = Math.min(window.devicePixelRatio, 2);
    let cw = 0, ch = 0, iw = 0, ih = 0;

    const imgs: HTMLImageElement[] = [];
    let ready = false;

    function setSize() {
      if (isMobile && iw) {
        cw = wrapper.clientWidth;
        ch = Math.round((cw / iw) * ih);
        wrapper.style.height = ch + 'px';
      } else {
        cw = wrapper.clientWidth;
        ch = wrapper.clientHeight;
      }
      canvas.width = cw * dpr;
      canvas.height = ch * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `${BASE}frames/ezgif-frame-${pad(i)}.jpg`;
      img.onload = () => {
        if (iw === 0) { iw = img.naturalWidth; ih = img.naturalHeight; if (isMobile) setSize(); }
        if (!ready && imgs[0]?.complete) draw(0);
        if (i === TOTAL_FRAMES) {
          ready = true;
          if (!imgs[0]?.complete) imgs[0].onload = () => draw(0);
        }
      };
      imgs.push(img);
    }

    wrapper.style.height = isMobile ? '100dvh' : '100vh';
    setSize();

    const ro = new ResizeObserver(() => { if (iw) setSize(); draw(currentIdx); });
    ro.observe(wrapper);

    let currentIdx = 0;

    function draw(idx: number) {
      const img = imgs[idx];
      if (!img || !cw || !ch) return;
      const s = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
      const sw = img.naturalWidth * s;
      const sh = img.naturalHeight * s;
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, cw, ch);
      ctx.drawImage(img, (cw - sw) / 2, (ch - sh) / 2, sw, sh);
    }

    const scrollEnd = isMobile ? TOTAL_FRAMES * 8 : TOTAL_FRAMES * 15;

    const st = ScrollTrigger.create({
      trigger: wrapper,
      pin: true,
      pinSpacing: true,
      start: `top +=${headerH}`,
      end: `+=${scrollEnd}`,
      scrub: true,
      anticipatePin: 1,
      onUpdate: (self) => {
        if (!ready) return;
        const idx = Math.min(Math.floor(self.progress * TOTAL_FRAMES), TOTAL_FRAMES - 1);
        if (idx !== currentIdx) {
          currentIdx = idx;
          draw(idx);
        }
      },
      onLeave: () => {
        gsap.to(wrapper, { opacity: 0, duration: 0.4, ease: 'power2.out' });
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
    <section ref={sectionRef} className="relative w-full bg-black">
      <div ref={wrapperRef} className="relative w-full" style={{ willChange: 'opacity' }} />
    </section>
  );
}
