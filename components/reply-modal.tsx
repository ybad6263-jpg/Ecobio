'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { addCommentToThread } from '@/lib/store';
import { X } from 'lucide-react';

interface ReplyModalProps {
  isOpen: boolean;
  threadId: string;
  onClose: () => void;
  onSuccess: () => void;
  replyingToAuthor?: string;
}

export function ReplyModal({
  isOpen,
  threadId,
  onClose,
  onSuccess,
  replyingToAuthor,
}: ReplyModalProps) {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsSubmitting(true);
    try {
      addCommentToThread(threadId, content);
      setContent('');
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
            className="fixed inset-x-4 bottom-4 z-50 max-h-[90vh] w-auto rounded-2xl border border-border bg-card p-6 shadow-xl sm:inset-x-auto sm:left-1/2 sm:top-1/2 sm:w-full sm:max-w-md sm:-translate-x-1/2 sm:-translate-y-1/2 overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-lg p-1 transition-colors hover:bg-muted"
            >
              <X className="h-5 w-5 text-muted-foreground" />
            </button>

            <h2 className="text-xl font-bold text-foreground mb-2">Reply</h2>
            {replyingToAuthor && (
              <p className="text-sm text-muted-foreground mb-4">
                Replying to <span className="font-medium text-foreground">{replyingToAuthor}</span>
              </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Content Input */}
              <div>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Share your thoughts..."
                  maxLength={500}
                  rows={4}
                  className="w-full rounded-lg border border-border bg-input px-4 py-3 text-foreground placeholder-muted-foreground transition-colors hover:border-accent focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent resize-none min-h-[44px]"
                />
                <p className="mt-1 text-xs text-muted-foreground">
                  {content.length}/500
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!content.trim() || isSubmitting}
                className="w-full rounded-lg bg-accent py-2.5 font-medium text-accent-foreground transition-all duration-200 hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-50 active:scale-95 min-h-[44px]"
              >
                {isSubmitting ? 'Posting...' : 'Post Reply'}
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
