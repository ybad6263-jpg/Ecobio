'use client';

import { motion } from 'framer-motion';

export function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40"
    >
      <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-balance">
            <span className="text-primary">Student Voice</span>
          </h1>
          <p className="text-sm text-muted-foreground whitespace-normal">
            ကျောင်းသားထုရဲ့ အသံ • No login required. Share your experience anonymously.
          </p>
        </div>
      </div>
    </motion.header>
  );
}
