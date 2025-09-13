import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Only warn instead of crashing during build
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase environment variables are missing. Check Vercel settings.")
}

export const supabase = createClient(
  supabaseUrl || "",
  supabaseAnonKey || ""
)
