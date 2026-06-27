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

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const imgEls: HTMLImageElement[] = [];
    let loaded = 0;
    let currentIdx = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const el = document.createElement('img');
      el.src = `${BASE}frames/ezgif-frame-${pad(i)}.jpg`;
      el.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;background-color:#0F0F0F';
      el.onload = () => {
        loaded++;
        if (loaded === TOTAL_FRAMES) {
          setLoading(false);
          imgEls[0].style.opacity = '1';
        }
      };
      wrapper.insertBefore(el, wrapper.firstChild);
      imgEls.push(el);
    }

    function showFrame(idx: number) {
      if (currentIdx === idx) return;
      imgEls[currentIdx].style.opacity = '0';
      imgEls[idx].style.opacity = '1';
      currentIdx = idx;
    }

    const st = ScrollTrigger.create({
      trigger: wrapper,
      pin: true,
      start: 'top top',
      end: `+=${TOTAL_FRAMES * 15}`,
      scrub: true,
      anticipatePin: 1,
      onUpdate: (self) => {
        if (loading) return;
        const idx = Math.min(Math.floor(self.progress * TOTAL_FRAMES), TOTAL_FRAMES - 1);
        showFrame(idx);
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
      imgEls.forEach((el) => el.remove());
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
        style={{ willChange: 'opacity', backgroundColor: '#0F0F0F' }}
      >
        {loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
            <div className="w-8 h-8 border border-[#C8A97E]/30 border-t-transparent rounded-full animate-spin mb-4" />
          </div>
        )}
      </div>
    </section>
  );
}
