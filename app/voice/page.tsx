import { Suspense } from 'react';
import VoiceClientUI from './voice-client-ui';
import { createClient } from '../utils/supabase/server';

// This is the SERVER component
export default async function VoicePage() {
  const supabase = await createClient();
  
  // Fetch topics directly on the server
  const { data: topics } = await supabase
    .from('topics')
    .select('* , content , comments(id)')
    .order('created_at', { ascending: false });

  return (
    <main className="min-h-screen bg-background">
      {/* We pass the topics we found into the Client UI */}
      <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
        <VoiceClientUI initialTopics={topics || []} />
      </Suspense>
    </main>
  );
}