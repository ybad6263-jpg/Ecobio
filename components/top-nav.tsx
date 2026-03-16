'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { BookOpen, MessageSquare, Leaf } from 'lucide-react';

export default function TopNav() {
  const pathname = usePathname();
  
  // Logic to see which tab is active
  const isVoice = pathname.includes('/voice') || pathname.includes('/thread');
  const isQuiz = pathname.includes('/quiz');

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] px-4 py-3 md:top-4">
      <div className="mx-auto max-w-2xl">
        <div className="bg-background/70 backdrop-blur-xl border border-border/50 shadow-lg rounded-2xl md:rounded-full px-4 py-2 flex items-center justify-between gap-4">
          
          {/* Logo Section - Hidden on tiny phones to save space */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-accent/10 p-1.5 rounded-lg group-hover:bg-accent/20 transition-colors">
              <Leaf className="w-4 h-4 text-accent" />
            </div>
            <span className="hidden sm:block font-bold text-sm tracking-tight">
              MMStudentidea
            </span>
          </Link>

          {/* The Toggle Capsule */}
          <div className="flex bg-muted/50 p-1 rounded-xl md:rounded-full flex-1 max-w-[300px]">
            {/* Quiz Tab */}
            <Link 
              href="/" 
              className={`relative flex-1 flex items-center justify-center gap-2 px-3 py-1.5 text-xs sm:text-sm font-medium transition-all ${isQuiz ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              {isQuiz && (
                <motion.div 
                  layoutId="active-pill" 
                  className="absolute inset-0 bg-background rounded-lg md:rounded-full shadow-sm" 
                  transition={{ type: "spring", duration: 0.5 }}
                />
              )}
              <BookOpen className="w-3.5 h-3.5 relative z-10" />
              <span className="relative z-10">Quiz</span>
            </Link>

            {/* Voice Tab */}
            <Link 
              href="/voice" 
              className={`relative flex-1 flex items-center justify-center gap-2 px-3 py-1.5 text-xs sm:text-sm font-medium transition-all ${isVoice ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              {isVoice && (
                <motion.div 
                  layoutId="active-pill" 
                  className="absolute inset-0 bg-background rounded-lg md:rounded-full shadow-sm" 
                  transition={{ type: "spring", duration: 0.5 }}
                />
              )}
              <MessageSquare className="w-3.5 h-3.5 relative z-10" />
              <span className="relative z-10 text-nowrap">Student Voice</span>
            </Link>
          </div>

          {/* Minimal placeholder for balance */}
          <div className="w-8 h-8 rounded-full bg-accent/5 flex items-center justify-center sm:hidden">
             <span className="text-[10px] font-bold">MMSI</span>
          </div>
        </div>
      </div>
    </nav>
  );
}