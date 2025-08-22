"use client";

import { useEffect, useRef } from 'react';

type Mode = "morado" | "azul" | "amarillo";

export function EnergyWaves({ mode = "morado" }: { mode?: Mode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<{ pause: () => void; resume: () => void; } | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    
    const PALETA = {
      fondo: "#0B0F19",
      morado: "#7C3AED",
      azul: "#3B82F6",
      amarillo: "#EAB308",
      blanco: "rgba(255,255,255,0.9)",
      glow: "rgba(255,255,255,0.12)"
    };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const cs = document.createElement("canvas");
    const cw = document.createElement("canvas");
    
    Object.assign(cs.style, { position: "absolute", inset: "0", zIndex: "0", background: PALETA.fondo });
    Object.assign(cw.style, { position: "absolute", inset: "0", zIndex: "1", pointerEvents: "none" });

    container.appendChild(cs);
    container.appendChild(cw);

    const ctxs = cs.getContext("2d");
    let stars: any[] = [], rafS: number;

    function resizeStars() {
      if (!container || !ctxs) return;
      cs.width = container.clientWidth;
      cs.height = container.clientHeight;
      const count = Math.floor((cs.width * cs.height) / 7000);
      stars = Array.from({ length: count }).map(() => ({
        x: Math.random() * cs.width,
        y: Math.random() * cs.height,
        r: Math.random() * 1.4 + 0.3,
        a: Math.random() * Math.PI * 2,
        s: Math.random() * 0.6 + 0.4
      }));
    }

    function renderStars() {
      if (!ctxs) return;
      ctxs.clearRect(0, 0, cs.width, cs.height);
      for (const st of stars) {
        st.a += 0.02 * st.s;
        const opacity = 0.5 + Math.sin(st.a) * 0.5;
        ctxs.beginPath();
        ctxs.arc(st.x, st.y, st.r, 0, Math.PI * 2);
        ctxs.fillStyle = `rgba(255,255,255,${0.25 + 0.55 * opacity})`;
        ctxs.fill();
      }
      rafS = requestAnimationFrame(renderStars);
    }

    const ctxw = cw.getContext("2d");
    let rafW: number, t = 0;

    function resizeWaves() {
        if (!container) return;
        cw.width = container.clientWidth;
        cw.height = container.clientHeight;
    }

    function colorModo() {
      switch (mode) {
        case "azul": return PALETA.azul;
        case "amarillo": return PALETA.amarillo;
        default: return PALETA.morado;
      }
    }

    function renderWaves() {
      if (!ctxw) return;
      t += 0.008;
      ctxw.clearRect(0, 0, cw.width, cw.height);

      const cx = cw.width * 0.5;
      const cy = cw.height * 0.55;

      const grd = ctxw.createRadialGradient(cx, cy, 0, cx, cy, Math.max(cw.width, cw.height) * 0.7);
      grd.addColorStop(0, "rgba(124,58,237,0.05)");
      grd.addColorStop(1, "rgba(11,15,25,0)");
      ctxw.fillStyle = grd;
      ctxw.fillRect(0, 0, cw.width, cw.height);

      const base = Math.min(cw.width, cw.height) * 0.22;
      const col = colorModo();
      for (let i = 0; i < 4; i++) {
        const radius = base + i * 65 + Math.sin(t + i * 0.7) * 18;
        ctxw.beginPath();
        ctxw.arc(cx, cy, radius, 0, Math.PI * 2);
        ctxw.strokeStyle = col;
        ctxw.globalAlpha = 0.28 - i * 0.05;
        ctxw.lineWidth = 2;
        ctxw.stroke();

        ctxw.beginPath();
        ctxw.arc(cx, cy, radius, 0, Math.PI * 2);
        ctxw.strokeStyle = PALETA.glow;
        ctxw.lineWidth = 10;
        ctxw.stroke();
        ctxw.globalAlpha = 1;
      }

      const pulse = 0.35 + 0.15 * Math.sin(t * 2.2);
      const r = 60 + 8 * Math.sin(t * 2);
      const g = ctxw.createRadialGradient(cx, cy, 0, cx, cy, r);
      g.addColorStop(0, `rgba(255,255,255,${0.35 + pulse})`);
      g.addColorStop(1, "rgba(255,255,255,0)");
      ctxw.fillStyle = g;
      ctxw.beginPath();
      ctxw.arc(cx, cy, r, 0, Math.PI * 2);
      ctxw.fill();

      rafW = requestAnimationFrame(renderWaves);
    }
    
    const handleResize = () => {
        resizeStars();
        resizeWaves();
    }

    const mount = () => {
      handleResize();
      window.addEventListener("resize", handleResize);
      if (!reduce) {
        renderStars();
        renderWaves();
      }
    }
    
    mount();
    
    animationRef.current = {
        pause: () => {
            cancelAnimationFrame(rafS);
            cancelAnimationFrame(rafW);
        },
        resume: () => {
            if (!reduce) {
                renderStars();
                renderWaves();
            }
        }
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(rafS);
      cancelAnimationFrame(rafW);
      container.removeChild(cs);
      container.removeChild(cw);
    };
  }, [mode]);

  return <div ref={containerRef} className="absolute inset-0 z-0" />;
}
