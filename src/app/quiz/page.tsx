import { QuizForm } from "@/components/quiz/quiz-form";
import { EnergyWaves } from "@/components/quiz/energy-waves";
import './quiz-ui.css';

export default function QuizPage() {
  return (
    <div className="quiz-page-container relative overflow-hidden">
      <EnergyWaves />
      <div className="relative z-10 w-full flex items-center justify-center">
         <QuizForm />
      </div>
    </div>
  );
}
