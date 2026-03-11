import { NextResponse } from 'next/server';

export async function GET() {
  // We are NOT logging the full key for security, 
  // but we check if it exists and its length.
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  // Check if they are undefined or empty
  const urlStatus = supabaseUrl ? `Found (Length: ${supabaseUrl.length})` : "MISSING!";
  const keyStatus = supabaseKey ? `Found (Length: ${supabaseKey.length})` : "MISSING!";

  return NextResponse.json({
    supabase_url_status: urlStatus,
    supabase_key_status: keyStatus,
    // Show first 5 chars to verify it's not garbage data
    url_preview: supabaseUrl ? supabaseUrl.substring(0, 5) + '...' : 'N/A',
    key_preview: supabaseKey ? supabaseKey.substring(0, 5) + '...' : 'N/A',
  });
}