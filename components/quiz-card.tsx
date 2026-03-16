"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Question } from "@/lib/[quizdata]/[ecobio]/quiz-data";
import ProgressBar from "./progress-bar";

interface QuizCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswerSelect: (biologyScore: number, economicsScore: number) => void;
}

export default function QuizCard({
  question,
  questionNumber,
  totalQuestions,
  onAnswerSelect,
}: QuizCardProps) {
  const containerVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      x: -20,
      transition: { duration: 0.3 },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: "easeOut",
      },
    }),
    hover: {
      scale: 1.02,
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
    },
  };

  return (
    <motion.div
      className="w-full max-w-2xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="bg-card rounded-2xl p-8 md:p-10 shadow-lg border border-border">
        <ProgressBar current={questionNumber} total={totalQuestions} />

        <motion.div className="mt-8 mb-8" variants={containerVariants}>
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-2">
            {question.text}
          </h2>
          <div className="h-1 w-12 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full" />
        </motion.div>

        <div className="space-y-3">
          {question.answers.map((answer, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
            >
              <Button
                onClick={() =>
                  onAnswerSelect(answer.biology, answer.economics)
                }
                className="w-full h-auto whitespace-normal py-4 px-6 justify-start text-left bg-muted hover:bg-teal-100 dark:hover:bg-teal-900/30 text-foreground border border-border hover:border-teal-500 transition-colors rounded-xl"
                variant="outline"
              >
                <span className="text-sm">{answer.text}</span>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}