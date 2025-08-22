"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { BookOpen, Download, Globe } from "lucide-react";
import "./comics.css";

const comicData = {
  id: "mary-jackson",
  title: "La ingeniería que alcanzó las estrellas",
  subtitle: "Mary Jackson — NASA",
  cover: "https://i.ibb.co/7Qr0T2W/comic-cover-mary-jackson.jpg", // placeholder
  read_es: "https://example.com/read/mary-jackson/es",
  pdf_es: null, // "https://example.com/download/mary-jackson.pdf",
  read_qu: null,
  tags: ["Ingeniería", "NASA", "Inspiración"],
  active: true,
};


export default function ComicsDigitalesPage() {
  if (!comicData || !comicData.active) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <p className="text-gray-400">Aún no hay comics disponibles. ¡Vuelve pronto!</p>
      </div>
    );
  }

  return (
    <section className="kallpa-comics">
      <div className="comic-container">
        {/* BREADCRUMB */}
        <header className="breadcrumb">
          <Link href="/dashboard" className="breadcrumb-link">
            Inicio
          </Link>
          <span className="breadcrumb-separator">/</span>
          <h1 className="breadcrumb-current">Comics digitales</h1>
        </header>

        {/* HERO CARD */}
        <article className="comic-card">
          <div className="comic-cover">
            <Image
              src={comicData.cover}
              alt={`Portada del cómic ${comicData.title}`}
              width={1920}
              height={1080}
              className="comic-image"
              data-ai-hint="comic book cover woman looking at stars nasa"
              priority
            />
          </div>

          <div className="comic-details">
            <div className="comic-tags">
              {comicData.tags.map((tag) => (
                <span key={tag} className="tag-chip">{tag}</span>
              ))}
            </div>

            <h2 className="comic-title">{comicData.title}</h2>
            <p className="comic-subtitle">{comicData.subtitle}</p>

            <div className="comic-actions">
              <TooltipProvider>
                {/* LEER ONLINE */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="w-full md:w-auto">
                        <Button
                            asChild
                            className="btn-primary w-full md:w-auto"
                            aria-label="Leer el cómic online en español"
                            disabled={!comicData.read_es}
                        >
                            <Link href={comicData.read_es ?? '#'} target="_blank" rel="noopener noreferrer">
                                <BookOpen />
                                Leer online (ES)
                            </Link>
                        </Button>
                    </div>
                  </TooltipTrigger>
                  {!comicData.read_es && <TooltipContent><p>Pronto disponible</p></TooltipContent>}
                </Tooltip>

                {/* DESCARGAR PDF */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="w-full md:w-auto">
                        <Button
                            asChild
                            variant="outline"
                            className="btn-secondary w-full md:w-auto"
                            aria-label="Descargar el cómic como PDF en español"
                            disabled={!comicData.pdf_es}
                        >
                            <Link href={comicData.pdf_es ?? '#'} target="_blank" rel="noopener noreferrer">
                                <Download />
                                Descargar PDF (ES)
                            </Link>
                        </Button>
                    </div>
                  </TooltipTrigger>
                  {!comicData.pdf_es && <TooltipContent><p>Pronto disponible</p></TooltipContent>}
                </Tooltip>

                {/* LEER EN QUECHUA */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="w-full md:w-auto">
                        <Button
                            asChild
                            variant="outline"
                            className="btn-secondary w-full md:w-auto"
                            aria-label="Leer el cómic en quechua"
                            disabled={!comicData.read_qu}
                        >
                            <Link href={comicData.read_qu ?? '#'} target="_blank" rel="noopener noreferrer">
                                <Globe />
                                Leer en quechua (QU)
                            </Link>
                        </Button>
                    </div>
                  </TooltipTrigger>
                  {!comicData.read_qu && <TooltipContent><p>Pronto disponible</p></TooltipContent>}
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
