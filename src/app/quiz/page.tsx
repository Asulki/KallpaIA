import { QuizForm } from "@/components/quiz/quiz-form";
import './quiz-ui.css';

export default function QuizPage() {
  return (
    <div className="quiz-page-container">
      <div className="quiz-bg-particles"></div>
      <QuizForm />
    </div>
  );
}
