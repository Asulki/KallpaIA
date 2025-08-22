import { QuizForm } from "@/components/quiz/quiz-form";
import { StellarParticles } from "@/components/landing/stellar-particles";
import './quiz-ui.css';

export default function QuizPage() {
  return (
    <div className="quiz-page-container">
      <div className="absolute inset-0 z-0 opacity-10">
        <StellarParticles />
      </div>
      <div className="relative z-10 w-full flex items-center justify-center">
         <QuizForm />
      </div>
    </div>
  );
}
