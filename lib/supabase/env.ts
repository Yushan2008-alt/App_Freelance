const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

function requiredEnv(value: string | undefined, name: string) {
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export function getSupabaseEnv() {
  return {
    url: requiredEnv(supabaseUrl, "NEXT_PUBLIC_SUPABASE_URL"),
    anonKey: requiredEnv(supabaseAnonKey, "NEXT_PUBLIC_SUPABASE_ANON_KEY"),
  };
}
