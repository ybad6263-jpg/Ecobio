import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Helper to decode the JWT without libraries
function decodeJWT(token: string) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (e) {
    return { error: 'Could not decode key' };
  }
}

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // 1. Extract Project ID from the URL
  // e.g., "https://abcdefghijklmnop.supabase.co" -> "abcdefghijklmnop"
  const urlProjectId = supabaseUrl ? supabaseUrl.replace('https://', '').split('.')[0] : 'URL MISSING';

  // 2. Decode the Key to find the Project ID inside it
  const decodedKey = supabaseKey ? decodeJWT(supabaseKey) : {};
  const keyProjectId = decodedKey.ref || decodedKey.project_id || 'KEY MISSING OR INVALID';

  // 3. Compare them
  const isMatch = urlProjectId === keyProjectId;

  return NextResponse.json({
    diagnostic: {
      url_project_id: urlProjectId,
      key_project_id: keyProjectId,
      ids_match: isMatch,
    },
    error_check: {
      message: isMatch ? "IDs Match! The credentials are correct pairs." : "MISMATCH! The Key belongs to a different project than the URL."
    }
  });
}