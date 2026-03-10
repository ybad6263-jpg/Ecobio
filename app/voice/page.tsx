import { Suspense } from 'react';
import VoiceClientUI from './voice-client-ui';
import { createClient } from '../utils/supabase/server';

export const revalidate = 0;

// This is the SERVER component
export default async function VoicePage() {
  const supabase = await createClient();
  const { data, error } = await supabase.from('topics').select('*');
console.log("Supabase Data:", data);
console.log("Supabase Error:", error);
  
  // Fetch topics directly on the server
  const { data: topics } = await supabase
    .from('topics')
    .select('* , content , comments(id)')
    .order('created_at', { ascending: false });


console.log("--- DEBUG START ---");
console.log("Topics Data:", JSON.stringify(data));
console.log("Error Object:", error);
console.log("URL Check:", process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 10));
console.log("--- DEBUG END ---");

  return (
    <main className="min-h-screen bg-background">
      {/* We pass the topics we found into the Client UI */}
      <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
        <VoiceClientUI initialTopics={topics || []} />
      </Suspense>
    </main>
  );
}