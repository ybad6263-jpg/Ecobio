import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

const supabaseUrl = 'https://ahtvxahmxkipxymoxdmg.supabase.co'
const supabaseAnonKey ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFodHZ4YWhteGtpcHh5bW94ZG1nIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzA4MzI1MSwiZXhwIjoyMDg4NjU5MjUxfQ.uwMBnlIlpCRW5SqwdKBjKvkJtEwZwDJkknmXr7F1Mu8'

if (!supabaseUrl || !supabaseAnonKey) {
  // This will help you see in Vercel logs if the variables are even being read
  console.error("Missing Supabase Environment Variables!")
}

export const supabase = createClient(supabaseUrl!, supabaseAnonKey!)
