import { supabase } from '@/lib/supabase';
import type { CmsCredential, CmsChallenge } from '@/lib/types';

// ── Credentials ───────────────────────────────────────────────────────

export async function dbGetAllCredentials(): Promise<CmsCredential[]> {
  const { data, error } = await supabase
    .from('cms_credentials')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) throw new Error(`dbGetAllCredentials: ${error.message}`);
  return (data ?? []) as CmsCredential[];
}

export async function dbGetCredentialById(
  credentialId: string
): Promise<CmsCredential | null> {
  const { data, error } = await supabase
    .from('cms_credentials')
    .select('*')
    .eq('credential_id', credentialId)
    .single();

  if (error?.code === 'PGRST116') return null;
  if (error) throw new Error(`dbGetCredentialById: ${error.message}`);
  return data as CmsCredential;
}

export async function dbSaveCredential(
  payload: Omit<CmsCredential, 'id' | 'created_at'>
): Promise<CmsCredential> {
  const { data, error } = await supabase
    .from('cms_credentials')
    .insert(payload)
    .select()
    .single();

  if (error) throw new Error(`dbSaveCredential: ${error.message}`);
  return data as CmsCredential;
}

export async function dbUpdateCredentialCounter(
  id:         string,
  newCounter: number
): Promise<void> {
  const { error } = await supabase
    .from('cms_credentials')
    .update({ counter: newCounter })
    .eq('id', id);

  if (error) throw new Error(`dbUpdateCredentialCounter: ${error.message}`);
}

export async function dbDeleteCredential(id: string): Promise<void> {
  const { error } = await supabase
    .from('cms_credentials')
    .delete()
    .eq('id', id);

  if (error) throw new Error(`dbDeleteCredential: ${error.message}`);
}

// ── Challenges ────────────────────────────────────────────────────────

export async function dbSaveChallenge(value: string): Promise<void> {
  const { error } = await supabase
    .from('CMSChallenges')
    .insert({
      value,
      expires_at: new Date(Date.now() + 120_000).toISOString(),
    });

  if (error) throw new Error(`dbSaveChallenge: ${error.message}`);
}

export async function dbGetLatestChallenge(): Promise<CmsChallenge | null> {
  const { data, error } = await supabase
    .from('CMSChallenges')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (error?.code === 'PGRST116') return null;
  if (error) throw new Error(`dbGetLatestChallenge: ${error.message}`);
  return data as CmsChallenge;
}

export async function dbDeleteChallenge(id: string): Promise<void> {
  const { error } = await supabase
    .from('CMSChallenges')
    .delete()
    .eq('id', id);

  if (error) throw new Error(`dbDeleteChallenge: ${error.message}`);
}

export async function dbDeleteExpiredChallenges(): Promise<void> {
  const { error } = await supabase
    .from('CMSChallenges')
    .delete()
    .lt('expires_at', new Date().toISOString());

  if (error) throw new Error(`dbDeleteExpiredChallenges: ${error.message}`);
}