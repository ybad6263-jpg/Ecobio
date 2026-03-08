"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  onStart: () => void;
}

export default function HeroSection({ onStart }: HeroSectionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-background to-muted/20 px-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="text-center max-w-2xl" variants={itemVariants}>
        <motion.h1
          className="text-3xl md:text-3xl font-bold tracking-tight mb-4"
          variants={itemVariants}
        >
          <span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
            မင်းရဲ့ အနာဂတ်က ဘယ်ဘက်မှာလဲ?"
          </span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-l text-muted-foreground mb-6 leading-relaxed"
          variants={itemVariants}
        >
သက်ရှိလောကကို စူးစမ်းရတာ ဝါသနာပါသလား? ဒါမှမဟုတ် စီးပွားရေးလောကမှာ အောင်မြင်ချင်တာလား?

Bio လား? Eco လား? ဝေခွဲမရဖြစ်နေရင် ဒီ Quiz လေးဖြေပြီး မင်းနဲ့ အကိုက်ညီဆုံးလမ်းကြောင်းကို အခုပဲ ရှာဖွေလိုက်ပါ။
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8"
          variants={itemVariants}
        >
          <Button
            size="lg"
            onClick={onStart}
            className="bg-teal-600 hover:bg-teal-700 text-white px-8"
          >
            Start Quiz
          </Button>
          <p className="text-sm text-muted-foreground">
            10 questions • ~2 minutes
          </p>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        variants={itemVariants}
      >
        <div className="text-muted-foreground">↓</div>
      </motion.div>
    </motion.div>
  );
}
