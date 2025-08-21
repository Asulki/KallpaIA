import { BotIcon } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 border-t border-neutral-800 py-8">
      <div className="container mx-auto px-4 text-center text-gray-400">
        <div className="flex justify-center items-center gap-2 mb-4">
          <BotIcon className="w-6 h-6 text-primary" />
          <p className="font-headline text-xl font-bold text-white">KallpaIA</p>
        </div>
        <p className="mb-4">Join our community and start your journey of discovery today.</p>
        <p className="text-sm">
          &copy; {currentYear} KallpaIA. All rights reserved. The future is built by you.
        </p>
      </div>
    </footer>
  );
}
