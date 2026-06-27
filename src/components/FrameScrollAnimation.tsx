import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const BASE = import.meta.env.BASE_URL;
const TOTAL_FRAMES = 180;

function pad(n: number): string {
  return n.toString().padStart(3, '0');
}

export function getScrollPx(isMobile: boolean): number {
  return TOTAL_FRAMES * (isMobile ? 6 : 15);
}

export default function FrameScrollAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const isMobile = window.innerWidth < 1024;
    const scrollPx = getScrollPx(isMobile);

    const ctx = canvas.getContext('2d', { alpha: false })!;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    const dpr = Math.min(window.devicePixelRatio, 2);

    let cw = 0, ch = 0;
    let currentIdx = 0;

    function resize() {
      const rect = canvas.getBoundingClientRect();
      cw = rect.width;
      ch = rect.height;
      if (cw === 0 || ch === 0) return;
      canvas.width = cw * dpr;
      canvas.height = ch * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();

    const imgs: HTMLImageElement[] = [];
    let ready = false;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `${BASE}frames/ezgif-frame-${pad(i)}.jpg`;
      img.onload = () => {
        if (!ready && imgs[0]?.complete) draw(0);
        if (i === TOTAL_FRAMES) {
          ready = true;
          if (!imgs[0]?.complete) imgs[0].onload = () => draw(0);
        }
      };
      imgs.push(img);
    }

    function draw(idx: number) {
      const img = imgs[idx];
      if (!img || !cw || !ch) return;
      const s = Math.min(cw / img.naturalWidth, ch / img.naturalHeight);
      const sw = img.naturalWidth * s;
      const sh = img.naturalHeight * s;
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, cw, ch);
      ctx.drawImage(img, (cw - sw) / 2, (ch - sh) / 2, sw, sh);
    }

    const st = ScrollTrigger.create({
      trigger: '.scroll-spacer',
      start: `top +=${isMobile ? 56 : 80}`,
      end: `+=${scrollPx}`,
      pin: '.animation-wrapper',
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
    });

    const ro = new ResizeObserver(() => {
      resize();
      ScrollTrigger.refresh();
    });
    ro.observe(canvas);

    return () => {
      st.kill();
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full block"
    />
  );
}
