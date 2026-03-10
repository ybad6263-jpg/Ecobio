'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createThread } from '@/lib/store';
import { X } from 'lucide-react';

interface StartTopicModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const CATEGORIES = [
  '#Biology',
  '#Chemistry',
  '#Physics',
  '#Economics',
  '#English',
  '#Mathematics',
  '#University',
  '#General',
];

export function StartTopicModal({ isOpen, onClose, onSuccess }: StartTopicModalProps) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('#General');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setIsSubmitting(true);
    try {
      createThread(title, category, content);
      setTitle('');
      setContent('');
      setCategory('#General');
      onSuccess();
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-x-4 top-1/2 z-50 max-h-[90vh] w-auto -translate-y-1/2 rounded-2xl border border-border bg-card p-6 shadow-xl sm:inset-x-auto sm:left-1/2 sm:w-full sm:max-w-md sm:-translate-x-1/2 overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-lg p-1 transition-colors hover:bg-muted"
            >
              <X className="h-5 w-5 text-muted-foreground" />
            </button>

            <h2 className="text-2xl font-bold text-foreground mb-6">Start a Topic</h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Category Select */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-lg border border-border bg-input px-4 py-2.5 text-foreground transition-colors hover:border-accent focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Title Input */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="What's your question or discussion?"
                  maxLength={200}
                  className="w-full rounded-lg border border-border bg-input px-4 py-2.5 text-foreground placeholder-muted-foreground transition-colors hover:border-accent focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                />
                <p className="mt-1 text-xs text-muted-foreground">
                  {title.length}/200
                </p>
              </div>

              {/* Content Input */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Details (Optional)
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Add more context to help others understand..."
                  maxLength={1000}
                  rows={4}
                  className="w-full rounded-lg border border-border bg-input px-4 py-2.5 text-foreground placeholder-muted-foreground transition-colors hover:border-accent focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent resize-none"
                />
                <p className="mt-1 text-xs text-muted-foreground">
                  {content.length}/1000
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!title.trim() || !content.trim() || isSubmitting}
                className="w-full rounded-lg bg-primary py-2.5 font-medium text-primary-foreground transition-all duration-200 hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50 active:scale-95 min-h-[44px]"
              >
                {isSubmitting ? 'Publishing...' : 'Publish Topic'}
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
