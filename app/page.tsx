"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import HeroSection from "@/components/hero-section";
import QuizCard from "@/components/quiz-card";
import ResultScreen from "@/components/result-screen";
import { quizQuestions, QuizResult } from "@/lib/quiz-data";

type PageState = "hero" | "quiz" | "result";

export default function Home() {
  const [state, setState] = useState<PageState>("hero");
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

    setResult({
      biology: newBiology,
      economics: newEconomics,
      totalScore: newTotalScore,
    });

    if (currentQuestion < quizQuestions.length - 1) {
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
    <main className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        {state === "hero" && (
          <HeroSection key="hero" onStart={handleStart} />
        )}

        {state === "quiz" && (
          <div key="quiz" className="min-h-screen flex items-center justify-center px-4 py-8">
            <QuizCard
              question={quizQuestions[currentQuestion]}
              questionNumber={currentQuestion + 1}
              totalQuestions={quizQuestions.length}
              onAnswerSelect={handleAnswerSelect}
            />
          </div>
        )}

        {state === "result" && (
          <ResultScreen
            key="result"
            result={result}
            onRetake={handleRetake}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
