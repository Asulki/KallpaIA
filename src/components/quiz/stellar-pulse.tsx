"use client";

import { useEffect, useRef } from 'react';

export function StellarPulseBackground() {
  const starsRef = useRef<HTMLCanvasElement>(null);
  const pulseRef = useRef<HTMLCanvasElement>(null);
  const earthRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const starsCanvas = starsRef.current;
    const pulseCanvas = pulseRef.current;
    const earthCanvas = earthRef.current;

    if (!starsCanvas || !pulseCanvas || !earthCanvas) return;

    const sctx = starsCanvas.getContext('2d');
    const pctx = pulseCanvas.getContext('2d');
    const ectx = earthCanvas.getContext('2d');

    if (!sctx || !pctx || !ectx) return;

    const PALETTE = {
      colors: ["#B9A6FF", "#AEE6FF", "#FFB3C6", "#FFE08C", "#BFF3D1"]
    };

    let stars: any[] = [];
    let t = 0;

    const resizeAll = () => {
      starsCanvas.width = window.innerWidth;
      starsCanvas.height = window.innerHeight;
      pulseCanvas.width = window.innerWidth;
      pulseCanvas.height = window.innerHeight;
      earthCanvas.width = window.innerWidth;
      earthCanvas.height = window.innerHeight;

      const density = Math.floor((starsCanvas.width * starsCanvas.height) / 15000);
      stars = Array.from({ length: density }).map(() => ({
        x: Math.random() * starsCanvas.width,
        y: Math.random() * starsCanvas.height,
        r: Math.random() * 1.2 + 0.2,
        tw: Math.random() * Math.PI * 2
      }));
    };

    const animate = () => {
      // === Estrellas lentas ===
      sctx.clearRect(0, 0, starsCanvas.width, starsCanvas.height);
      for (const st of stars) {
        st.tw += 0.005; // mucho más lento
        const a = 0.2 + 0.3 * (0.5 + 0.5 * Math.sin(st.tw));
        sctx.beginPath();
        sctx.arc(st.x, st.y, st.r, 0, Math.PI * 2);
        sctx.fillStyle = `rgba(255,255,255,${a})`;
        sctx.fill();
      }

      // === Ondas radiales suaves ===
      pctx.clearRect(0, 0, pulseCanvas.width, pulseCanvas.height);
      const cx = pulseCanvas.width * 0.5;
      const cy = pulseCanvas.height * 0.55;
      const maxR = Math.hypot(pulseCanvas.width, pulseCanvas.height) * 0.6;

      const rings = 4;
      for (let i = 0; i < rings; i++) {
        const prog = (t * 0.002 + i / rings) % 1; // más lento (antes 0.012)
        const radius = 60 + prog * maxR;
        const color = PALETTE.colors[i % PALETTE.colors.length];

        pctx.beginPath();
        pctx.arc(cx, cy, radius, 0, Math.PI * 2);
        pctx.strokeStyle = color;
        pctx.globalAlpha = 0.2 * (1 - prog);
        pctx.lineWidth = 2 + (1 - prog) * 1.5;
        pctx.stroke();
      }
      pctx.globalAlpha = 1;

      // === Planeta Tierra flotando ===
      ectx.clearRect(0, 0, earthCanvas.width, earthCanvas.height);
      const earthR = 70;
      const driftX = Math.sin(t * 0.0015) * 8; // movimiento lateral leve
      const driftY = Math.cos(t * 0.001) * 6; // movimiento vertical leve
      const ex = cx + driftX;
      const ey = cy + driftY;

      // círculo base tierra
      const grad = ectx.createRadialGradient(ex, ey, earthR * 0.3, ex, ey, earthR);
      grad.addColorStop(0, "#AEE6FF"); // celeste
      grad.addColorStop(0.6, "#4FC3F7");
      grad.addColorStop(1, "#0B0F19");
      ectx.fillStyle = grad;
      ectx.beginPath();
      ectx.arc(ex, ey, earthR, 0, Math.PI * 2);
      ectx.fill();

      // brillo atmosférico
      ectx.strokeStyle = "rgba(255,255,255,0.4)";
      ectx.lineWidth = 4;
      ectx.beginPath();
      ectx.arc(ex, ey, earthR + 2, 0, Math.PI * 2);
      ectx.stroke();

      t++;
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resizeAll);
    resizeAll();
    
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        animate();
    }


    return () => {
      window.removeEventListener("resize", resizeAll);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <>
      <canvas ref={starsRef} id="stars" aria-hidden="true"></canvas>
      <canvas ref={pulseRef} id="pulse" aria-hidden="true"></canvas>
      <canvas ref={earthRef} id="earth" aria-hidden="true"></canvas>
    </>
  );
}
