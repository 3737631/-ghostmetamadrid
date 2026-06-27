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
  const frameRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const readyRef = useRef(false);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const frame = frameRef.current;
    if (!wrapper || !frame) return;

    let loaded = 0;
    let currentIdx = 0;
    const urls: string[] = [];

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const url = `${BASE}frames/ezgif-frame-${pad(i)}.jpg`;
      urls.push(url);
      const img = new Image();
      img.src = url;
      img.onload = () => {
        loaded++;
        if (loaded === TOTAL_FRAMES) {
          readyRef.current = true;
          setLoading(false);
          frame.style.backgroundImage = `url("${urls[0]}")`;
        }
      };
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
          frame.style.backgroundImage = `url("${urls[idx]}")`;
        }
      },
      onLeave: () => {
        gsap.to(wrapper, { opacity: 0, duration: 0.5, ease: 'power2.out' });
      },
      onEnterBack: () => {
        gsap.to(wrapper, { opacity: 1, duration: 0.3, ease: 'power2.out' });
      },
    });

    window.addEventListener('resize', () => ScrollTrigger.refresh());

    return () => {
      st.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden select-none">
      <div ref={wrapperRef} className="relative w-full h-screen" style={{ willChange: 'opacity' }}>
        <div
          ref={frameRef}
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            pointerEvents: 'none',
            userSelect: 'none',
            WebkitUserSelect: 'none',
            WebkitTouchCallout: 'none',
          }}
        />
        <div className="absolute inset-0 pointer-events-none opacity-[0.06]" style={{ background: 'rgba(0,0,0,0.06)' }} />
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center z-20 bg-black text-white/40 text-sm font-mono">
            Cargando...
          </div>
        )}
      </div>
    </section>
  );
}
