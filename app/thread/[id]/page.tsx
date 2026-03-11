// app/thread/[id]/page.tsx
import { createClient } from '../../utils/supabase/server';
import { notFound } from 'next/navigation';
import ThreadClientUI from './thread-client-ui';



export default async function ThreadPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  // 1. OPEN THE ENVELOPE FIRST
  const { id } = await params; 

  const supabase = await createClient();

  // 2. USE THE UNWRAPPED 'id'
  const { data: thread, error } = await supabase
    .from('topics')
    .select('*, comments(*)')
    .eq('id', id) // Change params.id to just id
    .single();

  if (error || !thread) {
    console.error("Supabase Error or Missing Thread:", error);
    return notFound();
  }

  const formattedThread = {
    ...thread,
    timestamp: new Date(thread.created_at).getTime(),
    comments: (thread.comments || []).map((c: any) => ({
      ...c,
      timestamp: new Date(c.created_at).getTime(),
    })),
  };

  return <ThreadClientUI initialThread={formattedThread} />;
}