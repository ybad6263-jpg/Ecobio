"use client"; // ✅ This makes Hooks allowed!

import { useEffect, useState } from 'react';
import { Header } from '@/components/header';
import { ThreadList } from '@/components/thread-list';
import { FAB } from '@/components/fab';
import { StartTopicModal } from '@/components/start-topic-modal';
import { seedInitialData } from '@/lib/store';

export default function VoiceClientUI({ initialTopics }: { initialTopics: any[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [topics, setTopics] = useState(initialTopics);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    // Seed data on first load
    seedInitialData();
  }, []);

  const handleSuccess = () => {
    // You can fetch new data here or just reload the page
    setRefreshKey((prev) => prev + 1);
    window.location.reload(); // Simplest way to show the new topic
  };

  return (
    <>
      <Header />

      <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 pb-24">
        {/* Pass topics to your list */}
        <ThreadList key={refreshKey} initialThreads={topics} />
      </div>

      {/**<FAB onClick={() => setIsModalOpen(false)} />*/}

      <StartTopicModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleSuccess}
      />
    </>
  );
}