import { createBrowserClient } from '@supabase/ssr'
import type { Database } from './database.types'

// Browser client for client components
export const supabase = createBrowserClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Alias for compatibility
export const createSupabaseClient = () => supabase
