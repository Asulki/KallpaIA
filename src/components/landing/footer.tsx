"use client";

import { BotIcon } from "lucide-react";
import { useEffect, useState } from "react";

export function Footer() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);


  return (
    <footer className="bg-neutral-900 border-t border-neutral-800 py-8">
      <div className="container mx-auto px-4 text-center text-gray-400">
        <div className="flex justify-center items-center gap-2 mb-4">
          <BotIcon className="w-6 h-6 text-primary" />
          <p className="font-headline text-xl font-bold text-white">KallpaIA</p>
        </div>
        <p className="mb-4">Únete a nuestra comunidad y comienza tu viaje de descubrimiento hoy.</p>
        <p className="text-sm">
          &copy; {currentYear} KallpaIA. Todos los derechos reservados. El futuro lo construyes tú.
        </p>
      </div>
    </footer>
  );
}