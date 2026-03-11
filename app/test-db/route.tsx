import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  // Log to Vercel "Functions" logs (Server-side)
  console.log('--- DB TEST ---');
  console.log('URL:', supabaseUrl);
  console.log('Key Length:', supabaseKey?.length);

  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Replace 'your_table_name' with an actual table from your DB, e.g., 'posts' or 'profiles'
    const { data, error } = await supabase.from('topics').select('*').limit(1);

    if (error) {
      console.error('Supabase Error:', error);
      return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
    }

    return NextResponse.json({ status: 'success', data: data });
  } catch (err: any) {
    return NextResponse.json({ status: 'crash', message: err.message }, { status: 500 });
  }
}