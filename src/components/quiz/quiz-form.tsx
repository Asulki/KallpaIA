"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle2 } from 'lucide-react';

type Planet = 'Ciencia' | 'Tecnología' | 'Ingeniería' | 'Matemáticas' | 'Arte';

const quizQuestions = [
  {
    question: '¿Qué actividad disfrutas más?',
    options: [
      { text: 'Observar estrellas 🌌', planet: 'Ciencia' },
      { text: 'Resolver acertijos 🧩', planet: 'Matemáticas' },
      { text: 'Crear ilustraciones digitales 🎨', planet: 'Arte' },
      { text: 'Programar un jueguito 🎮', planet: 'Tecnología' },
      { text: 'Construir un puente con bloques 🏗', planet: 'Ingeniería' },
    ],
  },
    {
    question: 'Si tuvieras superpoder, ¿cuál sería?',
    options: [
      { text: 'Descubrir nuevos elementos 🔬', planet: 'Ciencia' },
      { text: 'Dominar cualquier lenguaje de programación 💻', planet: 'Tecnología' },
      { text: 'Crear inventos útiles ⚙️', planet: 'Ingeniería' },
      { text: 'Resolver problemas complejos ➗', planet: 'Matemáticas' },
      { text: 'Inspirar con tus obras 🎭', planet: 'Arte' },
    ],
  },
  {
    question: '¿Qué clase en el cole disfrutas más?',
    options: [
        { text: 'Biología / Física 🧪', planet: 'Ciencia' },
        { text: 'Computación / Informática 💻', planet: 'Tecnología' },
        { text: 'Tecnología / Robótica 🤖', planet: 'Ingeniería' },
        { text: 'Matemáticas ➕', planet: 'Matemáticas' },
        { text: 'Arte / Música 🎶', planet: 'Arte' },
    ],
  },
  {
    question: '¿Cómo prefieres trabajar en equipo?',
    options: [
        { text: 'Analizando datos 📊', planet: 'Matemáticas' },
        { text: 'Diseñando prototipos 🔧', planet: 'Ingeniería' },
        { text: 'Codificando ideas 💻', planet: 'Tecnología' },
        { text: 'Contando historias visuales 🎨', planet: 'Arte' },
        { text: 'Investigando y compartiendo descubrimientos 🔬', planet: 'Ciencia' },
    ],
  },
    {
    question: '¿Qué te inspira más?',
    options: [
        { text: 'La naturaleza 🌱', planet: 'Ciencia' },
        { text: 'La innovación digital 📱', planet: 'Tecnología' },
        { text: 'Crear cosas útiles 🛠', planet: 'Ingeniería' },
        { text: 'Resolver enigmas 📐', planet: 'Matemáticas' },
        { text: 'Expresar emociones 🎭', planet: 'Arte' },
    ],
  },
  {
    question: 'Si fueras parte de un proyecto escolar, ¿qué rol tomarías?',
    options: [
        { text: 'Experimentar en laboratorio 🔬', planet: 'Ciencia' },
        { text: 'Diseñar el prototipo ⚙️', planet: 'Ingeniería' },
        { text: 'Programar la app 📲', planet: 'Tecnología' },
        { text: 'Calcular recursos ⏳', planet: 'Matemáticas' },
        { text: 'Hacer la presentación creativa 🎤', planet: 'Arte' },
    ],
  },
    {
    question: '¿Qué objeto te emociona más?',
    options: [
        { text: 'Microscopio 🔬', planet: 'Ciencia' },
        { text: 'Laptop 💻', planet: 'Tecnología' },
        { text: 'Impresora 3D 🖨', planet: 'Ingeniería' },
        { text: 'Calculadora 📱', planet: 'Matemáticas' },
        { text: 'Pinceles digitales 🎨', planet: 'Arte' },
    ],
  },
  {
    question: '¿Qué frase te representa más?',
    options: [
        { text: '“Quiero descubrir cómo funciona el mundo” 🌍', planet: 'Ciencia' },
        { text: '“Quiero crear el futuro con la tecnología” 🤖', planet: 'Tecnología' },
        { text: '“Quiero construir cosas que cambien vidas” 🏗', planet: 'Ingeniería' },
        { text: '“Quiero resolver problemas imposibles” ➗', planet: 'Matemáticas' },
        { text: '“Quiero expresar mi creatividad y dejar huella” 🎭', planet: 'Arte' },
    ],
  },
    {
    question: '¿Qué preferirías visitar?',
    options: [
        { text: 'Un laboratorio científico 🔬', planet: 'Ciencia' },
        { text: 'Un campus tecnológico 💻', planet: 'Tecnología' },
        { text: 'Una fábrica de inventos 🏭', planet: 'Ingeniería' },
        { text: 'Un torneo de matemáticas ➗', planet: 'Matemáticas' },
        { text: 'Un museo de arte 🎨', planet: 'Arte' },
    ],
  },
  {
    question: '¿Qué emoji usarías más seguido?',
    options: [
        { text: '🔬', planet: 'Ciencia' },
        { text: '💻', planet: 'Tecnología' },
        { text: '🏗', planet: 'Ingeniería' },
        { text: '➗', planet: 'Matemáticas' },
        { text: '🎨', planet: 'Arte' },
    ],
  },
];


export function QuizForm() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState<Record<Planet, number>>({
    Ciencia: 0,
    Tecnología: 0,
    Ingeniería: 0,
    Matemáticas: 0,
    Arte: 0,
  });
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const router = useRouter();

  const handleSelectOption = (index: number, planet: Planet) => {
    setSelectedOption(index);
  };
  
  const handleContinue = () => {
    if (selectedOption === null) return;
    
    const planet = quizQuestions[currentQuestion].options[selectedOption].planet as Planet;
    setScores(prev => ({ ...prev, [planet]: prev[planet] + 1 }));

    setSelectedOption(null); // Reset for next question

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };


  const getResult = () => {
    const finalScores = Object.entries(scores);
    finalScores.sort((a, b) => b[1] - a[1]);
    return finalScores[0][0];
  };

  if (showResult) {
    const resultPlanet = getResult();
    return (
      <div className="quiz-panel text-center p-8">
        <h2 className="quiz-question-title">¡Tu planeta aliado es {resultPlanet}!</h2>
        <p className="text-lg mb-6 text-text-soft">Basado en tus respuestas, tienes una gran afinidad con el mundo de {resultPlanet}.</p>
        <button onClick={() => router.push('/dashboard')} className="quiz-cta-button">Seguir explorando planetas</button>
      </div>
    );
  }

  const progressPercentage = ((currentQuestion + 1) / quizQuestions.length) * 100;
  const currentQData = quizQuestions[currentQuestion];

  return (
    <div className="quiz-panel">
      <header className="quiz-header">
        <div className="quiz-progress-info">
          <span>Pregunta {currentQuestion + 1} de {quizQuestions.length}</span>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progressPercentage}%` }}></div>
        </div>
      </header>

      <main>
        <h2 className="quiz-question-title">{currentQData.question}</h2>
        <div className="quiz-options-list" role="radiogroup">
          {currentQData.options.map((option, index) => {
            const [icon, ...textParts] = option.text.split(' ');
            const text = textParts.join(' ');
            return (
                <div
                    key={index}
                    className={`option-item ${selectedOption === index ? 'selected' : ''}`}
                    onClick={() => handleSelectOption(index, option.planet as Planet)}
                    tabIndex={0}
                    role="radio"
                    aria-checked={selectedOption === index}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleSelectOption(index, option.planet as Planet) }}
                >
                    <span className="option-icon">{icon}</span>
                    <span className="option-text">{text}</span>
                    <CheckCircle2 className="check-icon" size={20} />
                </div>
            )
          })}
        </div>
      </main>

      <footer className="quiz-footer">
        <button 
          className="quiz-cta-button" 
          onClick={handleContinue} 
          disabled={selectedOption === null}
        >
          Continuar
        </button>
      </footer>
    </div>
  );
}
