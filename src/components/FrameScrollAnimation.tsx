import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const BASE = import.meta.env.BASE_URL;
const TOTAL_FRAMES = 180;

const BG_COLOR = '#0D0D0D';

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
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let cw = 0;
    let ch = 0;
    let currentIdx = 0;

    function applyContextQuality() {
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
    }

    function draw(idx: number) {
      const img = imgs[idx];
      if (!img || !img.complete || !cw || !ch) return;
      const s = Math.min(cw / img.naturalWidth, ch / img.naturalHeight);
      const sw = img.naturalWidth * s;
      const sh = img.naturalHeight * s;
      ctx.fillStyle = BG_COLOR;
      ctx.fillRect(0, 0, cw, ch);
      ctx.drawImage(img, (cw - sw) / 2, (ch - sh) / 2, sw, sh);
    }

    function resize() {
      const rect = canvas.getBoundingClientRect();
      cw = rect.width;
      ch = rect.height;
      if (cw === 0 || ch === 0) return;
      canvas.width = Math.round(cw * dpr);
      canvas.height = Math.round(ch * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      applyContextQuality();
      draw(currentIdx);
    }

    const imgs: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `${BASE}frames/ezgif-frame-${pad(i)}.jpg`;
      img.onload = () => {
        loadedCount++;
        if (i === 1) draw(0);
      };
      imgs.push(img);
    }

    resize();

    const st = ScrollTrigger.create({
      trigger: '.animation-wrapper',
      start: 'top top',
      end: () => '+=' + scrollPx,
      pin: true,
      pinSpacing: true,
      scrub: true,
      anticipatePin: 1,
      onUpdate: (self) => {
        const idx = Math.min(
          Math.floor(self.progress * TOTAL_FRAMES),
          TOTAL_FRAMES - 1,
        );
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

  return <canvas ref={canvasRef} className="w-full h-full block" />;
}
