import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
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
  const [pct, setPct] = useState(0);
  const [loading, setLoading] = useState(true);
  const readyRef = useRef(false);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block';
    wrapper.insertBefore(canvas, wrapper.firstChild);
    const ctx = canvas.getContext('2d', { alpha: false, willReadFrequently: false })!;
    const dpr = Math.min(window.devicePixelRatio || 1, 3);
    let w = 0, h = 0;

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(wrapper);

    const images: HTMLImageElement[] = [];
    let loaded = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `${BASE}frames/ezgif-frame-${pad(i)}.jpg`;
      img.onload = () => {
        loaded++;
        setPct(Math.round((loaded / TOTAL_FRAMES) * 100));
        if (loaded === TOTAL_FRAMES) {
          readyRef.current = true;
          setLoading(false);
          draw(0);
        }
      };
      images.push(img);
    }
    imagesRef.current = images;

    function draw(idx: number) {
      const img = images[idx];
      if (!img?.complete || !img.naturalWidth) return;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      const scale = Math.max(w / iw, h / ih);
      const sw = iw * scale;
      const sh = ih * scale;
      ctx.fillStyle = '#0F0F0F';
      ctx.fillRect(0, 0, w, h);
      ctx.drawImage(img, (w - sw) / 2, (h - sh) / 2, sw, sh);
    }

    function onResize() {
      resize();
      draw(currentIdx);
      ScrollTrigger.refresh();
    }
    window.addEventListener('resize', onResize);

    let currentIdx = 0;

    const st = ScrollTrigger.create({
      trigger: wrapper,
      pin: true,
      start: 'top top',
      end: `+=${TOTAL_FRAMES * 120}`,
      scrub: 0.5,
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
        gsap.to(wrapper, { opacity: 0, duration: 0.8, ease: 'power2.out' });
      },
      onEnterBack: () => {
        gsap.to(wrapper, { opacity: 1, duration: 0.4, ease: 'power2.out' });
      },
    });

    return () => {
      st.kill();
      window.removeEventListener('resize', onResize);
      ro.disconnect();
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
        className="relative w-full h-screen"
        style={{ willChange: 'opacity' }}
      >
        {loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-[#0F0F0F]">
            <div className="w-8 h-8 border border-[#C8A97E]/30 border-t-transparent rounded-full animate-spin mb-4" />
            <span className="text-[#C8A97E]/60 text-sm font-mono">{pct}%</span>
          </div>
        )}
      </div>
    </section>
  );
}
