'use client';

import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

interface FABProps {
  onClick: () => void;
  label?: string;
}

export function FAB({ onClick, label = 'Start Topic' }: FABProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2 }}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-accent shadow-lg shadow-accent/30 transition-all duration-300 hover:shadow-xl hover:shadow-accent/40 active:shadow-md sm:h-16 sm:w-16"
    >
      <Plus className="h-6 w-6 text-accent-foreground sm:h-7 sm:w-7" strokeWidth={2.5} />
      <span className="sr-only">{label}</span>
    </motion.button>
  );
}
