import { createClient } from "@supabase/supabase-js";

// These should come from your environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

// Create a single Supabase client for the whole app
export const supabase = createClient(supabaseUrl, supabaseAnonKey);