import { createClient } from '@supabase/supabase-js';

const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url) {
	throw new Error('Missing SUPABASE_URL / NEXT_PUBLIC_SUPABASE_URL environment variable');
}
if (!serviceRoleKey) {
	throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY environment variable (server-side)');
}

// Server-side client (uses service role key). Keep sessions disabled for server usage.
export const supabase = createClient(url, serviceRoleKey, {
	auth: { persistSession: false },
});

export default supabase;
