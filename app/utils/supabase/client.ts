import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  // This will help you see in Vercel logs if the variables are even being read
  console.error("Missing Supabase Environment Variables!")
}

export const supabase = createClient(supabaseUrl!, supabaseAnonKey!)
