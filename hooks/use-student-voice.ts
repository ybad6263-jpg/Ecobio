import { useEffect, useState } from 'react';
import { getStudentId, getThreads, Thread } from '@/lib/store';

export function useStudentVoice() {
  const [studentId, setStudentId] = useState<string>('');
  const [threads, setThreads] = useState<Thread[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize student ID
    const id = getStudentId();
    setStudentId(id);

    // Load threads
    const loadedThreads = getThreads();
    setThreads(loadedThreads);
    setIsLoading(false);

    // Set up polling for real-time updates
    const interval = setInterval(() => {
      const updated = getThreads();
      setThreads(updated);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return {
    studentId,
    threads,
    isLoading,
  };
}
