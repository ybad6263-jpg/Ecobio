import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

const supabaseUrl = 'https://ahtvxahmxkipxymoxdmg.supabase.co'
const supabaseAnonKey ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFodHZ4YWhteGtpcHh5bW94ZG1nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwODMyNTEsImV4cCI6MjA4ODY1OTI1MX0.CBnEUzlTYsMhl9YJb1N1-NBp6cLX9GiBRe7VyGUlQKg'

if (!supabaseUrl || !supabaseAnonKey) {
  // This will help you see in Vercel logs if the variables are even being read
  console.error("Missing Supabase Environment Variables!")
}

export const supabase = createClient(supabaseUrl!, supabaseAnonKey!)
