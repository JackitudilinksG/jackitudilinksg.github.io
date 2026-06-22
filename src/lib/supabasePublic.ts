import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url) {
	throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL / SUPABASE_URL environment variable');
}
if (!anonKey) {
	// We allow server-only usage without a public client, but most public pages expect an anon key.
	console.warn('Warning: NEXT_PUBLIC_SUPABASE_ANON_KEY is not set — public client will be unauthenticated');
}

export const supabasePublic = createClient(url, anonKey ?? '', {
	auth: { persistSession: false },
});

export default supabasePublic;
