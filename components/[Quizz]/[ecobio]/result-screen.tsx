"use client";

import { useState } from "react"; // Added for copy success state
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { QuizResult, getResultMessage } from "@/lib/[quizdata]/[ecobio]/quiz-data";
import { Share2, Copy, Check, Facebook } from "lucide-react"; // Added icons

interface ResultScreenProps {
  result: QuizResult;
  onRetake: () => void;
}

export default function ResultScreen({ result, onRetake }: ResultScreenProps) {
  const [copied, setCopied] = useState(false);
  const resultMessage = getResultMessage(result.biology, result.economics);
  
  const biologyPercent = result.totalScore > 0 ? (result.biology / result.totalScore) * 100 : 0;
  const economicsPercent = result.totalScore > 0 ? (result.economics / result.totalScore) * 100 : 0;

  // --- SHARE HOOK LOGIC ---
  const shareUrl = typeof window !== "undefined" ? window.location.origin : "";
  const shareText = `ငါ့ရဲ့ ဝါသနာကတော့ "${resultMessage.title}" တဲ့! 🧬${Math.round(biologyPercent)}% Bio vs 💼${Math.round(economicsPercent)}% Eco ထွက်တယ်။ မင်းရော ဘာထွက်မလဲ စမ်းကြည့်ဦး! 👇\n${shareUrl}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  const handleNativeShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Bio vs Eco Quiz',
        text: shareText,
        url: shareUrl,
      });
    } else {
      handleCopy();
    }
  };

  // Variants... (Keep your existing variants here)
  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
  const chartVariants = { hidden: { scaleX: 0, originX: 0 }, visible: (delay: number) => ({ scaleX: 1, transition: { delay, duration: 0.8, ease: "easeOut" } }) };

  return (
    
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-background to-muted/20 px-4 py-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="max-w-2xl w-full" variants={itemVariants}>
        <div className="bg-card rounded-3xl p-6 md:p-10 shadow-xl border border-border overflow-hidden">
          
          {/* Main Result */}
          <motion.div className="text-center mb-8" variants={itemVariants}>
            <span className="inline-block px-4 py-1.5 mb-4 rounded-full bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 text-sm font-bold tracking-wide uppercase">
              Your Result
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold mb-4 text-foreground leading-tight">
              {resultMessage.title}
            </h1>
            <p className="text-[17px] leading-relaxed text-muted-foreground">
              {resultMessage.description}
            </p>
          </motion.div>

          {/* Progress Bars Section */}
          <motion.div className="space-y-5 mb-10 bg-muted/30 p-5 rounded-2xl" variants={itemVariants}>
             {/* Bio Bar */}
             <div>
               <div className="flex justify-between items-center mb-2">
                 <span className="font-bold flex items-center gap-2">🧬 Biology</span>
                 <span className="font-black text-teal-600">{Math.round(biologyPercent)}%</span>
               </div>
               <div className="h-4 bg-background rounded-full overflow-hidden border border-border">
                 <motion.div className="h-full bg-teal-500" custom={0} variants={chartVariants} initial="hidden" animate="visible" style={{ width: `${biologyPercent}%` }} />
               </div>
             </div>
             {/* Eco Bar */}
             <div>
               <div className="flex justify-between items-center mb-2">
                 <span className="font-bold flex items-center gap-2">💼 Economics</span>
                 <span className="font-black text-blue-600">{Math.round(economicsPercent)}%</span>
               </div>
               <div className="h-4 bg-background rounded-full overflow-hidden border border-border">
                 <motion.div className="h-full bg-blue-500" custom={0.1} variants={chartVariants} initial="hidden" animate="visible" style={{ width: `${economicsPercent}%` }} />
               </div>
             </div>
          </motion.div>

          {/* --- SPONSORED PLACEMENT --- */}
<motion.div 
  className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 shadow-sm"
  variants={itemVariants}
>
  <div className="flex items-start gap-4">
    <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center shadow-sm shrink-0">
      <span className="text-xl">🏫</span> {/* Replace with Partner Logo */}
    </div>
    <div className="flex-1">
      <span className="text-[10px] font-bold uppercase tracking-widest text-orange-600 mb-1 block">
        Sponsored Partner
      </span>
      <h4 className="text-md font-bold text-foreground">Hteik Htan Private School</h4>
      <p className="text-sm text-muted-foreground mb-3">
        Bio တွဲယူမယ့် ကျောင်းသားများအတွက် အထူးဦးစားပေး သင်ကြားပေးနေပါပြီ။
      </p>
      <Button variant="outline" size="sm" className="h-8 text-xs border-orange-200 hover:bg-orange-100">
        အသေးစိတ်ကြည့်ရန်
      </Button>
    </div>
  </div>
</motion.div>

          {/* Explanation Text */}
          <motion.div className="border-t border-border pt-8 mb-10" variants={itemVariants}>
            <h3 className="text-lg font-bold mb-3">ဒါက ဘာကို ဆိုလိုတာလဲ?</h3>
            <p className="text-muted-foreground leading-relaxed">
              မင်းရဲ့ အဖြေတွေအရ မင်းက {" "}
              <span className="font-bold text-foreground underline decoration-teal-500/30">
                {biologyPercent > economicsPercent
                  ? "သက်ရှိလောကနဲ့ ဇီဝသိပ္ပံပညာရပ်တွေကို စူးစမ်းလေ့လာရတာကို ပိုပြီး စိတ်အားထက်သန်တာ"
                  : "စီးပွားရေးစနစ်တွေကို ခွဲခြမ်းစိတ်ဖြာပြီး တန်ဖိုးအသစ်တွေ ဖန်တီးရတာကို ပိုပြီး ဝါသနာပါတာ"}
              </span>{" "}
              တွေ့ရပါတယ်။ ဒါပေမဲ့ တခြားဘာသာရပ်တစ်ခုကို လုံးဝ လျစ်လျူရှုလိုက်ဖို့ မဆိုလိုပါဘူး။ ဒီနေ့ခေတ်ရဲ့ အလန်းဆုံး အခွင့်အလမ်းသစ်တွေက ဒီဘာသာရပ်နှစ်ခုလုံး ပေါင်းစပ်သွားတဲ့ နေရာတွေမှာ ရှိနေတတ်လို့ပါပဲ။
            </p>
          </motion.div>

          {/* --- SHARE HOOK BUTTONS --- */}
          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-3" variants={itemVariants}>
            <Button
              onClick={handleNativeShare}
              className="w-full bg-foreground text-background hover:opacity-90 h-14 rounded-2xl font-bold text-lg transition-all"
            >
              <Share2 className="mr-2 h-5 w-5" />
              အခုပဲ Share မယ်
            </Button>
            
            <Button
              onClick={handleCopy}
              variant="outline"
              className="w-full h-14 rounded-2xl font-bold text-lg border-2"
            >
              {copied ? <Check className="mr-2 h-5 w-5 text-green-500" /> : <Copy className="mr-2 h-5 w-5" />}
              {copied ? "Copy လုပ်ပြီးပါပြီ" : "Link ကို Copy ယူမယ်"}
            </Button>
          </motion.div>

          <motion.button 
            onClick={onRetake}
            className="w-full mt-6 text-muted-foreground hover:text-foreground font-medium transition-colors underline underline-offset-4"
            variants={itemVariants}
          >
            Quiz ပြန်ဖြေကြည့်မယ်
          </motion.button>
          

        </div>
      </motion.div>
      {/* --- SOCIAL SHARE SUITE --- */}
<motion.div className="space-y-3" variants={itemVariants}>
  <div className="grid grid-cols-2 gap-3">
    {/* Telegram Button */}
    <Button
      onClick={() => window.open(`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`, '_blank')}
      className="w-full bg-[#24A1DE] hover:bg-[#24A1DE]/90 text-white h-12 rounded-xl font-bold transition-all"
    >
      <svg className="mr-2 h-5 w-5 fill-current" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/></svg>
      Telegram
    </Button>

    {/* TikTok/Story Mode Button */}
    <Button
      onClick={() => alert("Screenshot ရိုက်ပြီး TikTok မှာ တင်လိုက်တော့နော်! ✨")}
      className="w-full bg-[#000000] hover:bg-[#000000]/90 text-white h-12 rounded-xl font-bold transition-all"
    >
      <svg className="mr-2 h-5 w-5 fill-current" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.6-4.12-1.31a6.47 6.47 0 01-1.07-.77v6.76c0 1.96-.57 3.91-1.74 5.43a7.83 7.83 0 01-11.51.98 7.84 7.84 0 01-2.01-8.91 7.83 7.83 0 0110.12-4.14v4.17a3.7 3.7 0 00-3.15 1.18 3.72 3.72 0 00.19 5.2 3.71 3.71 0 005.12-.13c.69-.8 1.07-1.85 1.07-2.92V0h-.44z"/></svg>
      TikTok / Story
    </Button>
  </div>

  {/* Original Facebook/Copy Button */}
  <Button
    onClick={handleNativeShare}
    className="w-full bg-blue-600 hover:bg-blue-700 text-white h-14 rounded-2xl font-extrabold text-lg shadow-lg shadow-blue-500/20 transition-all active:scale-95"
  >
    <Facebook className="mr-2 h-6 w-6" />
    Facebook မှာ သူငယ်ချင်းတွေကို ပြမယ်
  </Button>
</motion.div>

    </motion.div>
  );
}