"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart, Book, Settings, Wallet, Heart, LayoutDashboard } from 'lucide-react';
import Image from 'next/image';

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/dashboard/lessons', icon: Book, label: 'Lession' },
  { href: '/dashboard/statistics', icon: BarChart, label: 'Statistics' },
  { href: '/dashboard/favorites', icon: Heart, label: 'Favorite' },
  { href: '/dashboard/wallet', icon: Wallet, label: 'Wallet' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 p-6 flex flex-col justify-between bg-white/50 backdrop-blur-xl border-r border-white/30 rounded-r-2xl">
      <div>
        <div className="mb-8">
          <Link href="/" className="text-2xl font-bold text-foreground">
            Ofcourses.
          </Link>
        </div>
        <div className="flex items-center gap-4 mb-8 p-3 rounded-lg bg-white/70">
          <Avatar>
            <AvatarImage src="https://i.ibb.co/CbfcCvP/condor-ciencia.png" alt="Ruha Loirs" data-ai-hint="user avatar" />
            <AvatarFallback>RL</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">Ruha Loirs</p>
            <p className="text-sm text-muted-foreground">Student</p>
          </div>
        </div>
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                variant={pathname === item.href ? 'default' : 'ghost'}
                className="w-full justify-start gap-3 text-base"
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Button>
            </Link>
          ))}
        </nav>
        <Card className="mt-8 bg-gradient-to-br from-purple-400 to-pink-500 text-white rounded-2xl overflow-hidden shadow-lg">
            <CardContent className="p-6 text-center relative">
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/20 rounded-full"></div>
                <div className="absolute -bottom-8 -left-4 w-24 h-24 bg-white/10 rounded-full"></div>
                <Image src="https://placehold.co/100x100.png" alt="Upgrade" width={80} height={80} className="mx-auto mb-4 -mt-12" data-ai-hint="upgrade illustration" />
                <h3 className="font-bold text-lg">Upgrade Account</h3>
                <p className="text-sm opacity-80 mb-4">Unlock all premium course</p>
                <Button className="bg-white text-pink-500 hover:bg-white/90 rounded-full">Upgrade</Button>
            </CardContent>
        </Card>
      </div>
      <div>
        <Link href="/dashboard/settings">
          <Button variant="ghost" className="w-full justify-start gap-3 text-base">
            <Settings className="h-5 w-5" />
            Settings
          </Button>
        </Link>
      </div>
    </aside>
  );
}
