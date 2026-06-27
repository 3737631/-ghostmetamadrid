import { useEffect, useRef } from 'react';
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
    const material = new THREE.MeshBasicMaterial({ color: '#0F0F0F' });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const textures: THREE.Texture[] = [];
    let loaded = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const loader = new THREE.TextureLoader();
      const tex = loader.load(
        `${BASE}frames/ezgif-frame-${pad(i)}.jpg`,
        () => {
          loaded++;
          if (loaded === TOTAL_FRAMES) {
            material.map = textures[0];
            material.color = new THREE.Color('#ffffff');
            material.needsUpdate = true;
          }
        }
      );
      textures.push(tex);
    }

    let currentIdx = 0;

    function drawFrame(idx: number) {
      const clamped = Math.max(0, Math.min(idx, TOTAL_FRAMES - 1));
      if (clamped === currentIdx || !textures[clamped]) return;
      currentIdx = clamped;
      material.map = textures[clamped];
      material.needsUpdate = true;
    }

    function resize() {
      const cw = wrapper.clientWidth;
      const ch = wrapper.clientHeight;
      renderer.setSize(cw, ch);
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
      scrub: 0.8,
      anticipatePin: 1,
      onUpdate: (self) => {
        const idx = Math.floor(self.progress * (TOTAL_FRAMES - 1));
        drawFrame(idx);
      },
      onLeave: () => {
        gsap.to(wrapper, {
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
        });
      },
      onEnterBack: () => {
        gsap.to(wrapper, {
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out',
        });
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
