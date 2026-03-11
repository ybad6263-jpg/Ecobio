import { Suspense } from 'react';
import VoiceClientUI from './voice-client-ui';
import { createClient } from '../utils/supabase/server'; // Ensure this utility is correct

//export const revalidate = 0;
//export const dynamic = 'force-dynamic';

export default async function VoicePage() {
  const supabase = await createClient();
  
  // Log to Vercel so we can see if it's actually running
  console.log("SERVER: Fetching topics...");

  const { data: topics, error } = await supabase
    .from('topics')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error("SERVER ERROR:", error.message);
  }

  return (
    <main className="container mx-auto py-10">
      <VoiceClientUI initialTopics={topics || []} />
    </main>
  );
}