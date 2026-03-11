'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
// We'll rename initialTopics to threads for consistency with your code
import { getColorForUser, Thread } from '@/lib/store'; 
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';

// 1. Define what the component expects to receive
interface ThreadListProps {
  initialThreads?: Thread[]; 
}

export function ThreadList({ initialThreads = [] }: ThreadListProps) {
  // 2. Initialize state with the props we got from the Server
  const [threads, setThreads] = useState<Thread[]>(initialThreads);
  const [isLoading, setIsLoading] = useState(true); // No need to load if we have initial data

  // Keep your polling logic if you want it to check for new updates
  useEffect(() => {
    // If you're using Supabase Realtime later, this is where it would go
    // For now, let's just keep the threads in sync with your local store/props
    setThreads(initialThreads);
  }, [initialThreads]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-border border-t-accent"></div>
      </div>
    );
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-3"
    >
      {threads.length === 0 ? (
        <motion.div variants={item} className="rounded-2xl bg-muted/30 p-8 text-center">
          <p className="text-lg font-medium text-foreground">Be the first to share your opinion!</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Start a topic and spark a conversation with fellow students.
          </p>
        </motion.div>
      ) : (
        threads.map((thread) => (
          <motion.div key={thread.id} variants={item}>
            <Link href={`/thread/${thread.id}`}>
              <div className="group cursor-pointer rounded-2xl border border-border bg-card p-4 transition-all duration-300 hover:border-accent hover:shadow-sm hover:shadow-accent/20 sm:p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-balance font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {thread.title}
                    </h3>
                    {/* The Fix: Add this line to show the "Hook" description */}
  <p className="text-muted-foreground text-sm leading-relaxed mb-4 italic">
    {thread.content}
  </p>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${getColorForUser(thread.authorId)}`}>
                        {thread.authorName}
                      </span>

                      <span className="inline-block rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                        {thread.category}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {/* Check if timestamp exists before formatting */}
                        {thread.timestamp ? formatDistanceToNow(new Date(thread.timestamp), { addSuffix: true }) : 'just now'}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-shrink-0 flex-col items-end gap-1">
                    <div className="text-xl font-bold text-primary">
                      {thread.comments?.length || 0}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {thread.comments?.length === 1 ? 'reply' : 'replies'}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))
      )}
    </motion.div>
  );
}