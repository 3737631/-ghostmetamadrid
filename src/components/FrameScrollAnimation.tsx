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
  const [loading, setLoading] = useState(true);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#0F0F0F');

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({ alpha: false, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 3));
    const w = wrapper.clientWidth;
    const h = wrapper.clientHeight;
    renderer.setSize(w, h);
    renderer.domElement.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block';
    wrapper.insertBefore(renderer.domElement, wrapper.firstChild);

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.MeshBasicMaterial();
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const textures: THREE.Texture[] = [];
    let loaded = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const tex = new THREE.TextureLoader().load(
        `${BASE}frames/ezgif-frame-${pad(i)}.jpg`,
        () => {
          loaded++;
          setPct(Math.round((loaded / TOTAL_FRAMES) * 100));
          if (loaded === TOTAL_FRAMES) {
            setLoading(false);
            material.map = textures[0];
            material.needsUpdate = true;
          }
        }
      );
      textures.push(tex);
    }

    let currentIdx = 0;

    function drawFrame(idx: number) {
      const clamped = Math.max(0, Math.min(idx, TOTAL_FRAMES - 1));
      if (clamped === currentIdx) return;
      currentIdx = clamped;
      material.map = textures[clamped];
      material.needsUpdate = true;
    }

    function resize() {
      renderer.setSize(wrapper.clientWidth, wrapper.clientHeight);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(wrapper);

    function animate() {
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }
    animate();

    const st = ScrollTrigger.create({
      trigger: wrapper,
      pin: true,
      start: 'top top',
      end: `+=${TOTAL_FRAMES * 120}`,
      scrub: 0.5,
      anticipatePin: 1,
      onUpdate: (self) => {
        if (loading) return;
        const idx = Math.floor(self.progress * (TOTAL_FRAMES - 1));
        drawFrame(idx);
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
      ro.disconnect();
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      textures.forEach((t) => t.dispose());
    };
  }, [loading]);

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
