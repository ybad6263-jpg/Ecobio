"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import HeroSection from "@/components/[Quizz]/[ecobio]/hero-section";
import QuizCard from "@/components/quiz-card";
import ResultScreen from "@/components/[Quizz]/[ecobio]/result-screen";
import { Question, QuizResult } from "@/lib/[quizdata]/[ecobio]/quiz-data"; // Use the 'Question' interface

interface QuizSystemProps {
  questions: Question[]; // Pass the specific quiz here
  onBack: () => void;    // Function to return to the grid
  className?: string;
}

export default function QuizSystem({ questions, onBack, className = "" }: QuizSystemProps) {
  const [state, setState] = useState<"hero" | "quiz" | "result">("hero");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [result, setResult] = useState<QuizResult>({
    biology: 0,
    economics: 0,
    totalScore: 0,
  });

  const handleStart = () => {
    setState("quiz");
    setCurrentQuestion(0);
    setResult({ biology: 0, economics: 0, totalScore: 0 });
  };

  const handleAnswerSelect = (biologyScore: number, economicsScore: number) => {
    const newBiology = result.biology + biologyScore;
    const newEconomics = result.economics + economicsScore;
    const newTotalScore = result.totalScore + biologyScore + economicsScore;

    setResult({ biology: newBiology, economics: newEconomics, totalScore: newTotalScore });

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setState("result");
    }
  };

  const handleRetake = () => {
    setState("hero");
    setCurrentQuestion(0);
    setResult({ biology: 0, economics: 0, totalScore: 0 });
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Back Button for UX */}
      <button onClick={onBack} className="p-4 text-sm opacity-50 hover:opacity-100 transition-opacity">
        ← Back to Library
      </button>

      <AnimatePresence mode="wait">
        {state === "hero" && <HeroSection key="hero" onStart={handleStart} />}

        {state === "quiz" && (
          <div key="quiz" className="flex items-center justify-center px-4 py-8">
            <QuizCard
              question={questions[currentQuestion]}
              questionNumber={currentQuestion + 1}
              totalQuestions={questions.length}
              onAnswerSelect={handleAnswerSelect}
            />
          </div>
        )}

        {state === "result" && (
          <ResultScreen key="result" result={result} onRetake={handleRetake} />
        )}
      </AnimatePresence>
    </div>
  );
}