"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Search, Filter, ExternalLink, GraduationCap, Trophy, MapPin } from "lucide-react";

/** ---------- DATOS MOCK (Perú, solo Becas y Concursos) ---------- */
type Item = {
  id: string;
  categoria: "Beca" | "Concurso";
  titulo: string;
  entidad: string;
  ubicacion: "Nacional" | "Lima" | "Arequipa" | "Virtual";
  cierre: string;               // texto corto: "30/09" o "Abierta"
  desc: string;
  url: string;
};

const DATA: Item[] = [
  {
    id: "b1",
    categoria: "Beca",
    titulo: "Beca 18",
    entidad: "PRONABEC",
    ubicacion: "Nacional",
    cierre: "Seg. cronograma anual",
    desc: "Cobertura integral para estudios superiores. Modalidades: Ordinaria, Albergue, FF. AA., etc.",
    url: "https://www.pronabec.gob.pe/beca-18/",
  },
  {
    id: "b2",
    categoria: "Beca",
    titulo: "Beca Perú",
    entidad: "PRONABEC",
    ubicacion: "Nacional",
    cierre: "Convocatoria periódica",
    desc: "Capacitación y especialización con instituciones aliadas. Aplica según requisitos de cada curso.",
    url: "https://www.pronabec.gob.pe/beca-peru/",
  },
  {
    id: "b3",
    categoria: "Beca",
    titulo: "Beca Talentos (STEM)",
    entidad: "Talentos / aliados",
    ubicacion: "Virtual",
    cierre: "Abierta",
    desc: "Programas cortos STEM para escolares destacadas. Ver cupos, requisitos y fechas por cohorte.",
    url: "https://talentos.gob.pe/ (o entidad aliada local)",
  },
  {
    id: "c1",
    categoria: "Concurso",
    titulo: "Eureka: Feria Escolar de Ciencia y Tecnología",
    entidad: "MINEDU / CONCYTEC",
    ubicacion: "Nacional",
    cierre: "Cronograma regional",
    desc: "Concurso escolar de proyectos de ciencia y tecnología. Etapas UGEL, regional y nacional.",
    url: "https://www.minedu.gob.pe/feria-eureka/ (o portal regional)",
  },
  {
    id: "c2",
    categoria: "Concurso",
    titulo: "Concurso Escolar de Ciencia y Tecnología",
    entidad: "CONCYTEC (varias ediciones)",
    ubicacion: "Nacional",
    cierre: "Según bases",
    desc: "Convocatorias temáticas de innovación y ciencia. Revisa bases y cronogramas por edición.",
    url: "https://www.concytec.gob.pe/",
  },
];

/** ---------- UI ---------- */
function Icono({ cat }: { cat: Item["categoria"] }) {
  const cls = "h-4 w-4";
  return cat === "Beca" ? <GraduationCap className={cls} /> : <Trophy className={cls} />;
}

export default function OportunidadesPage() {
  // filtros y búsqueda
  const [q, setQ] = useState("");
  const [categoria, setCategoria] = useState<"Todas" | Item["categoria"]>("Todas");
  const [ubic, setUbic] = useState<"Todas" | Item["ubicacion"]>("Todas");

  const lista = useMemo(() => {
    const term = q.toLowerCase();
    return DATA.filter(it => {
      const passQ = !term || [it.titulo, it.desc, it.entidad].join(" ").toLowerCase().includes(term);
      const passCat = categoria === "Todas" || it.categoria === categoria;
      const passUb = ubic === "Todas" || it.ubicacion === ubic;
      return passQ && passCat && passUb;
    });
  }, [q, categoria, ubic]);

  return (
    <section className="kallpa-opps min-h-screen bg-[#0B0F19] text-[#F9FAFB]">
      {/* ---------- WRAPPER a ~1980x1200 ---------- */}
      <div className="mx-auto max-w-[1980px] min-h-[1200px] px-6 py-6">
        {/* ---------- HEADER igual al dashboard + “Inicio” ---------- */}
        <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="rounded-lg px-2 py-1 border border-white/10 bg-white/5 hover:bg-white/10 transition"
              aria-label="Volver al dashboard"
              title="Inicio (dashboard)"
            >
              Inicio
            </Link>
            <span className="text-white/40">/</span>
            <h1 className="text-2xl font-semibold">Oportunidades</h1>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Buscar becas o concursos…"
                className="h-10 w-[22rem] rounded-xl pl-9 pr-3 bg-[#0F1420] border border-white/15
                           placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
              />
            </div>

            <div className="hidden md:flex items-center gap-2">
              <Filter className="h-4 w-4 text-white/60" />
              <select value={categoria} onChange={e => setCategoria(e.target.value as any)}
                className="h-10 rounded-xl bg-[#0F1420] border border-white/15 px-3">
                <option>Todas</option>
                <option>Beca</option>
                <option>Concurso</option>
              </select>
              <select value={ubic} onChange={e => setUbic(e.target.value as any)}
                className="h-10 rounded-xl bg-[#0F1420] border border-white/15 px-3">
                <option>Todas</option>
                <option>Nacional</option>
                <option>Lima</option>
                <option>Arequipa</option>
                <option>Virtual</option>
              </select>
            </div>
          </div>
        </header>

        {/* ---------- GRID CARDS ---------- */}
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {lista.map((it) => (
            <article
              key={it.id}
              className="group rounded-2xl border border-white/10 bg-[rgba(26,30,46,0.85)]
                         p-4 hover:-translate-y-0.5 hover:shadow-lg transition"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 text-sm text-[#9CA3AF]
                                 rounded-full px-3 h-7 bg-white/5 border border-white/10">
                  <Icono cat={it.categoria} /> {it.categoria}
                </span>
                <span className="text-xs text-[#9CA3AF]">Cierre: {it.cierre}</span>
              </div>

              <h3 className="mt-2 text-lg font-semibold leading-snug">{it.titulo}</h3>
              <p className="text-sm text-[#9CA3AF]">{it.entidad}</p>
              <div className="mt-2 flex items-center gap-2 text-xs text-[#9CA3AF]">
                <MapPin className="h-4 w-4" /> {it.ubicacion}
              </div>
              <p className="mt-2 text-sm text-[#9CA3AF] line-clamp-3">{it.desc}</p>

              <div className="mt-4 flex items-center justify-between">
                <Link
                  href={it.url}
                  target="_blank"
                  className="inline-flex items-center gap-2 h-10 px-3 rounded-xl font-semibold
                             bg-gradient-to-r from-[#3B82F6] to-[#7C3AED] text-white hover:opacity-95"
                >
                  Ver detalle <ExternalLink className="h-4 w-4" />
                </Link>
                <button
                  type="button"
                  className="h-10 px-3 rounded-xl border border-white/15 text-white/80 hover:bg-white/10 transition"
                  onClick={() => alert("Guardado (demo)")}
                >
                  Guardar
                </button>
              </div>
            </article>
          ))}

          {lista.length === 0 && (
            <div className="col-span-full text-center text-[#9CA3AF] py-16 border border-dashed border-white/10 rounded-2xl">
              No hay resultados con esos filtros.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
