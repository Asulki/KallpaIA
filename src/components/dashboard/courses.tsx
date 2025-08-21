import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import Image from 'next/image';

const courses = [
  {
    title: 'Photography',
    chapters: 34,
    progress: 80,
    image: 'https://placehold.co/60x60.png',
    hint: 'camera illustration',
    bgColor: 'bg-yellow-100',
  },
  {
    title: 'Data Science',
    chapters: 28,
    progress: 50,
    image: 'https://placehold.co/60x60.png',
    hint: 'data chart illustration',
    bgColor: 'bg-purple-100',
  },
  {
    title: 'Social Media Marketing',
    chapters: 42,
    progress: 25,
    image: 'https://placehold.co/60x60.png',
    hint: 'social media icons',
    bgColor: 'bg-green-100',
  },
];

export function Courses() {
  return (
    <div className="space-y-6">
      {courses.map((course) => (
        <Card key={course.title} className="bg-white/70 backdrop-blur-lg border-white/40 shadow-sm hover:shadow-lg transition-shadow">
          <CardContent className="p-4 flex items-center gap-6">
            <div className={`p-4 rounded-xl ${course.bgColor}`}>
                <Image src={course.image} alt={course.title} width={40} height={40} data-ai-hint={course.hint} />
            </div>
            <div className="flex-grow">
              <h3 className="font-bold text-lg">{course.title}</h3>
              <p className="text-sm text-muted-foreground">{course.chapters} Chapters</p>
              <Progress value={course.progress} className="mt-2 h-2" />
            </div>
            <Button variant="ghost" size="icon">
              <MoreHorizontal />
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
