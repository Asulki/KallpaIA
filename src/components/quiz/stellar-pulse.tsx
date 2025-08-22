"use client";

import { useEffect, useRef } from 'react';

export function StellarPulseBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    
    const PALETTE = {
      bg: "#0B0F19",
      colors: ["#B9A6FF","#AEE6FF","#FFB3C6","#FFE08C","#BFF3D1"],
      glow: "rgba(255,255,255,0.12)"
    };
    const prefersReduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    const cs = document.createElement("canvas");
    const cp = document.createElement("canvas");
    cs.ariaHidden = "true";
    cp.ariaHidden = "true";
    
    container.appendChild(cs);
    container.appendChild(cp);

    Object.assign(cs.style, { position: "fixed", inset: "0", pointerEvents: "none" });
    Object.assign(cp.style, { position: "fixed", inset: "0", pointerEvents: "none" });

    // ===== Estrellas en movimiento =====
    const sctx = cs.getContext("2d");
    let stars: any[] = [], rafS: number;

    function resizeStars() {
      if (!sctx) return;
      cs.width = innerWidth;
      cs.height = innerHeight;
      const density = Math.floor((cs.width * cs.height) / 8000);
      stars = Array.from({length: density}).map(() => ({
        x: Math.random() * cs.width,
        y: Math.random() * cs.height,
        r: Math.random() * 1.6 + 0.3,
        vy: Math.random() * 0.35 + 0.15,
        tw: Math.random() * Math.PI * 2
      }));
    }
    function animateStars() {
      if (!sctx) return;
      sctx.clearRect(0,0,cs.width,cs.height);
      for (const st of stars) {
        st.y += st.vy; if (st.y > cs.height) st.y = -2;
        st.tw += 0.02;
        const a = 0.35 + 0.45 * (0.5 + 0.5 * Math.sin(st.tw));
        sctx.beginPath();
        sctx.arc(st.x, st.y, st.r, 0, Math.PI*2);
        sctx.fillStyle = `rgba(255,255,255,${a})`;
        sctx.fill();
      }
      rafS = requestAnimationFrame(animateStars);
    }

    // ===== Pulso radial (ondas circulares) =====
    const pctx = cp.getContext("2d");
    let rafP: number, t = 0;

    function resizePulse() {
      if (!pctx) return;
      cp.width = innerWidth;
      cp.height = innerHeight;
    }

    function animatePulse() {
      if (!pctx) return;
      pctx.clearRect(0,0,cp.width,cp.height);
      const cx = cp.width * 0.5;
      const cy = cp.height * 0.55;
      const maxR = Math.hypot(cp.width, cp.height) * 0.6;

      // Aura de fondo sutil
      const aura = pctx.createRadialGradient(cx, cy, 0, cx, cy, maxR*0.6);
      aura.addColorStop(0, "rgba(124,58,237,0.08)"); // morado leve
      aura.addColorStop(1, "rgba(11,15,25,0)");
      pctx.fillStyle = aura;
      pctx.fillRect(0,0,cp.width,cp.height);

      // Ondas (anillos) expandidas
      const rings = 6;
      for (let i=0; i<rings; i++){
        const prog = (t*0.006 + i/rings) % 1;           // 0..1
        const radius = 40 + prog * maxR;                // crece hacia afuera
        const color = PALETTE.colors[i % PALETTE.colors.length];

        // trazo principal
        pctx.beginPath();
        pctx.arc(cx, cy, radius, 0, Math.PI*2);
        pctx.strokeStyle = color;
        pctx.globalAlpha = 0.35 * (1 - prog);           // se desvanece al crecer
        pctx.lineWidth = 3 + (1 - prog) * 2;
        pctx.stroke();

        // halo difuso para glow
        pctx.beginPath();
        pctx.arc(cx, cy, radius, 0, Math.PI*2);
        pctx.strokeStyle = PALETTE.glow;
        pctx.lineWidth = 12 * (1 - prog);
        pctx.stroke();

        pctx.globalAlpha = 1;
      }

      // Núcleo pulsante (brillo central)
      const coreR = 60 + 8 * Math.sin(t*0.08);
      const cg = pctx.createRadialGradient(cx, cy, 0, cx, cy, coreR);
      cg.addColorStop(0, "rgba(255,255,255,0.5)");
      cg.addColorStop(1, "rgba(255,255,255,0)");
      pctx.fillStyle = cg;
      pctx.beginPath();
      pctx.arc(cx, cy, coreR, 0, Math.PI*2);
      pctx.fill();

      t += 1;
      rafP = requestAnimationFrame(animatePulse);
    }
    
    function onResize(){ resizeStars(); resizePulse(); }
    addEventListener("resize", onResize, {passive:true});
    onResize();

    if (!prefersReduced) {
      animateStars();
      animatePulse();
    } else if (pctx) {
      const cx = cp.width * 0.5, cy = cp.height * 0.55;
      pctx.beginPath(); pctx.arc(cx, cy, 140, 0, Math.PI*2);
      pctx.strokeStyle = "#B9A6FF"; pctx.globalAlpha = 0.35; pctx.lineWidth = 4; pctx.stroke();
      pctx.globalAlpha = 1;
    }

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(rafS);
      cancelAnimationFrame(rafP);
      if (container.contains(cs)) container.removeChild(cs);
      if (container.contains(cp)) container.removeChild(cp);
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 z-0" />;
}
