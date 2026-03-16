"use client";

import { useState } from "react";
import QuizSystem from "@/components/quiz-system";
import { quizQuestions, Question } from "@/lib/[quizdata]/[ecobio]/quiz-data";

// This is where you'll define your different tests
const ALL_QUIZZES = [
  {
    id: "career-1",
    title: "Career Path Finder",
    description: "Bio လား? Econ လား? မင်းနဲ့အကိုက်ညီဆုံးကို ရှာဖွေလိုက်ပါ။",
    icon: "🚀",
    data: quizQuestions,
  },
  {
    id: "coming-soon",
    title: "Your Learning Style",
    description: "Coming soon - Find out your learning Style",
    icon: "🧠",
    data: [], // Empty for now
  },
  {
    id: "coming",
    title: "What's After G12",
    description: "Coming soon - Career choice base on what you passionate about",
    icon: "A",
    data: [], // Empty for now
  }
];

export default function Home() {
  const [activeQuiz, setActiveQuiz] = useState<Question[] | null>(null);

  // If a quiz is active, show the QuizSystem
  if (activeQuiz) {
    return (
      <main className="min-h-screen bg-background">
        <QuizSystem questions={activeQuiz} onBack={() => setActiveQuiz(null)} />
      </main>
    );
  }

  // Otherwise, show the Library Grid
  return (
    <main className="min-h-screen bg-background p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-extrabold tracking-tight">Quiz Library</h1>
          <p className="text-muted-foreground">ဖြေဆိုလိုသည့် Quiz ကို ရွေးချယ်ပါ။</p>
        </header>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {ALL_QUIZZES.map((quiz) => (
            <button
              key={quiz.id}
              onClick={() => quiz.data.length > 0 && setActiveQuiz(quiz.data)}
              className={`text-left p-6 rounded-2xl border bg-card transition-all hover:ring-2 hover:ring-primary/50 
                ${quiz.data.length === 0 ? "opacity-50 cursor-not-allowed" : "cursor-pointer active:scale-95"}`}
            >
              <span className="text-4xl mb-4 block">{quiz.icon}</span>
              <h2 className="text-xl font-bold mb-2">{quiz.title}</h2>
              <p className="text-sm text-muted-foreground">{quiz.description}</p>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}