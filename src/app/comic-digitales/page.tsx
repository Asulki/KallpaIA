"use client";

import Link from "next/link";
import { BookOpen, Download, ExternalLink, Sparkles } from "lucide-react";

const READ_ES_URL = "https://g.co/gemini/share/8bfbcb748194";
const READ_QU_URL = "https://g.co/gemini/share/1feca566fbd3";

export default function ComicsDigitales() {
  return (
    <section className="kallpa-comics min-h-screen bg-[#0B0F19] text-[#F9FAFB]">
      <div className="mx-auto w-full max-w-[1980px] px-4 py-6">
        {/* Header/breadcrumb igual al dashboard */}
        <header className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="rounded-lg px-2 py-1 border border-white/10 bg-white/5 hover:bg-white/10 transition"
            aria-label="Volver al dashboard"
            title="Inicio (dashboard)"
          >
            Inicio
          </Link>
          <span className="text-white/40">/</span>
          <h1 className="text-2xl font-semibold inline-flex items-center gap-2">
            Comics digitales <Sparkles className="h-5 w-5 text-[#7C3AED]" />
          </h1>
        </header>

        {/* HERO COMPACTO (solo esta página) */}
        <div className="k-hero mx-auto w-full max-w-[1200px] rounded-2xl overflow-hidden
                bg-gradient-to-r from-[#3B82F6] via-[#7C3AED] to-[#22C55E]
                h-[clamp(220px,28vh,360px)]
                px-6 sm:px-10 py-6 sm:py-8
                flex flex-col items-center justify-center gap-3 mt-6">

          {/* Chips */}
          <div className="flex flex-wrap justify-center gap-2">
            {["Ingeniería","NASA","Inspiración"].map(t => (
              <span key={t}
                className="text-[13px] sm:text-sm text-white/90 bg-white/15 border border-white/20
                   rounded-full px-3 h-7 inline-flex items-center">
                {t}
              </span>
            ))}
          </div>

          {/* Título + subtítulo (clamp para no crecer de más) */}
          <h2 className="text-center font-semibold leading-tight
                 text-[clamp(22px,3.4vw,40px)] text-white">
            La ingeniería que alcanzó las estrellas
          </h2>
          <p className="text-center text-white/80 text-[clamp(13px,1.8vw,18px)]">
            Mary Jackson — NASA
          </p>

          {/* Botones compactos */}
          <div className="mt-1 flex flex-wrap items-center justify-center gap-8 sm:gap-4">
            <a href={READ_ES_URL} target="_blank" rel="noopener noreferrer"
               className="relative inline-flex items-center gap-2 h-11 px-4 rounded-xl font-semibold
                  bg-white/15 text-white hover:bg-white/20 transition
                  after:absolute after:inset-0 after:-translate-x-full
                  after:bg-[linear-gradient(120deg,transparent,rgba(255,255,255,.25),transparent)]
                  hover:after:translate-x-full after:transition-transform after:duration-700">
              <BookOpen className="h-4 w-4" /> Leer online (ES)
            </a>

            {/* PDF – deja deshabilitado si aún no hay link */}
            <button type="button" title="Pronto" disabled
                    className="h-11 px-4 rounded-xl border border-white/25 text-white/70
                       cursor-not-allowed inline-flex items-center gap-2">
              <Download className="h-4 w-4" /> Descargar PDF (ES)
            </button>

            <a href={READ_QU_URL} target="_blank" rel="noopener noreferrer"
               className="inline-flex items-center gap-2 h-11 px-4 rounded-xl border border-white/25 text-white hover:bg-white/15 transition">
              <ExternalLink className="h-4 w-4" /> Leer en quechua (QU)
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}