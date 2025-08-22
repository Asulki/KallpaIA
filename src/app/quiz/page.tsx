"use client";

import { QuizForm } from "@/components/quiz/quiz-form";
import dynamic from 'next/dynamic';
import './quiz-ui.css';

const StellarPulseBackground = dynamic(
  () => import('@/components/quiz/stellar-pulse').then(mod => mod.StellarPulseBackground),
  { 
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-background" />
  }
);

export default function QuizPage() {
  return (
    <div className="quiz-page-container relative overflow-hidden">
      <StellarPulseBackground />
      <div className="relative z-10 w-full flex items-center justify-center">
         <QuizForm />
      </div>
    </div>
  );
}
