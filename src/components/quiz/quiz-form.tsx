"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { useRouter } from 'next/navigation';

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
  const [showResult, setShowResult] = useState(false);
  const router = useRouter();

  const handleAnswer = (planet: Planet) => {
    setScores(prev => ({ ...prev, [planet]: prev[planet] + 1 }));

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const getResult = () => {
    const finalScores = Object.entries(scores);
    finalScores.sort((a, b) => b[1] - a[1]);

    const topScore = finalScores[0][1];
    const tiedPlanets = finalScores.filter(score => score[1] === topScore).map(score => score[0]);

    if (tiedPlanets.length > 1) {
      return tiedPlanets[Math.floor(Math.random() * tiedPlanets.length)];
    }
    return finalScores[0][0];
  };

  if (showResult) {
    const resultPlanet = getResult();
    return (
      <div className="text-center p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-4">¡Tu planeta es {resultPlanet}!</h2>
        <p className="text-lg mb-6">Basado en tus respuestas, tienes una gran afinidad con el mundo de {resultPlanet}.</p>
        <Button onClick={() => router.push('/dashboard')}>Continuar a mi Aventura</Button>
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  return (
    <Card className="w-full max-w-2xl p-6 md:p-8 bg-white/80 backdrop-blur-lg border-none shadow-xl rounded-2xl">
      <CardContent className="p-0">
        <div className="flex items-center gap-4 mb-6">
          <Image src="https://placehold.co/80x80.png" alt="Pixel art computer" width={60} height={60} data-ai-hint="pixel art computer" />
          <div className="bg-white p-4 rounded-lg shadow-inner text-lg w-full">
            <p>{quizQuestions[currentQuestion].question}</p>
          </div>
        </div>
        
        <div className="mb-6">
          <Progress value={progress} className="h-4 rounded-full" />
          <p className="text-center mt-2 text-sm text-gray-600">Pregunta {currentQuestion + 1} de {quizQuestions.length}</p>
        </div>

        <div className="flex items-center justify-center">
            <div className="mr-8">
                <Image src="https://placehold.co/120x120.png" alt="Pixel art character" width={100} height={100} data-ai-hint="pixel art character" />
            </div>
            <div className="grid grid-cols-1 gap-4 w-full">
            {quizQuestions[currentQuestion].options.map(option => (
                <Button
                key={option.text}
                onClick={() => handleAnswer(option.planet as Planet)}
                variant="outline"
                className="justify-start text-left h-auto py-3 px-4 rounded-lg bg-white hover:bg-blue-100 border border-blue-200 shadow-sm"
                >
                {option.text}
                </Button>
            ))}
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
