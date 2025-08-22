import { QuizForm } from "@/components/quiz/quiz-form";
import { StellarPulseBackground } from "@/components/quiz/stellar-pulse";
import './quiz-ui.css';

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
