"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, ResponsiveContainer } from 'recharts';
import { Progress } from '@/components/ui/progress';
import { Award, Gift } from 'lucide-react';

const activityData = [
  { name: 'Mo', value: 300 },
  { name: 'Tu', value: 500 },
  { name: 'We', value: 200 },
  { name: 'Th', value: 800 },
  { name: 'Fr', value: 400 },
  { name: 'Sa', value: 600 },
  { name: 'Su', value: 700 },
];

export function Statistics() {
  return (
    <div className="space-y-6">
      <Card className="bg-white/70 backdrop-blur-lg border-white/40 shadow-sm">
        <CardHeader>
          <CardTitle>Statistics</CardTitle>
          <div className="flex gap-2 bg-muted p-1 rounded-full">
            <Button variant="ghost" size="sm" className="flex-1 rounded-full text-xs sm:text-sm">Day</Button>
            <Button variant="default" size="sm" className="flex-1 rounded-full shadow-md text-xs sm:text-sm">Week</Button>
            <Button variant="ghost" size="sm" className="flex-1 rounded-full text-xs sm:text-sm">Month</Button>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-2">Activity</p>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activityData}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <Bar dataKey="value" fill="hsl(var(--primary))" radius={[10, 10, 10, 10]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-2 gap-6">
        <Card className="bg-white/70 backdrop-blur-lg border-white/40 shadow-sm">
            <CardHeader>
                <CardTitle className="text-base">Progress</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="relative h-24 w-24 mx-auto">
                    <svg className="w-full h-full" viewBox="0 0 36 36">
                        <path
                            d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="hsl(var(--muted))"
                            strokeWidth="4"
                        />
                        <path
                            d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="hsl(var(--primary))"
                            strokeWidth="4"
                            strokeDasharray="50, 100"
                        />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-bold">50%</span>
                    </div>
                </div>
            </CardContent>
        </Card>
        <Card className="bg-white/70 backdrop-blur-lg border-white/40 shadow-sm">
            <CardHeader>
                <CardTitle className="text-base">23+</CardTitle>
            </CardHeader>
            <CardContent>
                <Gift className="h-16 w-16 text-primary mx-auto" />
            </CardContent>
        </Card>
      </div>
       <Card className="bg-white/70 backdrop-blur-lg border-white/40 shadow-sm">
            <CardHeader>
                <CardTitle className="text-base">13+ Achievement</CardTitle>
            </CardHeader>
            <CardContent>
                <Award className="h-16 w-16 text-yellow-500 mx-auto" />
                <Button className="w-full mt-4 rounded-full" variant="default">UNLOCKED</Button>
            </CardContent>
        </Card>
    </div>
  );
}
