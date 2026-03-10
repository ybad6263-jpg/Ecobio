import { Suspense } from 'react';
import VoiceClientUI from './voice-client-ui';
import { createClient } from '../utils/supabase/server'; // Ensure this utility is correct

export const revalidate = 0;
export const dynamic = 'force-dynamic';

export default async function VoicePage() {
  const supabase = await createClient();

  // Optimized Fetch
  const { data: topics, error } = await supabase
    .from('topics')
    .select(`
      *,
      comments (id)
    `)
    .order('created_at', { ascending: false });

  // Log exactly what the server sees
  console.log("--- SERVER DEBUG ---");
  if (error) console.error("Supabase Error:", error.message);
  console.log("Number of topics found:", topics?.length || 0);
  console.log("--- END DEBUG ---");

  return (
    <main className="min-h-screen bg-background">
      <Suspense fallback={<div className="p-10 text-center text-muted-foreground animate-pulse">Loading Discussions...</div>}>
        {/* Pass the data to the client component */}
        <VoiceClientUI initialTopics={topics || []} />
      </Suspense>
    </main>
  );
}