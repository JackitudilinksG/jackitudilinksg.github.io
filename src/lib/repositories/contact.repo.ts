import { supabase } from '@/lib/supabase';
import type { ContactMessage } from '@/lib/types';

export async function dbSaveMessage(
  payload: Omit<ContactMessage, 'id' | 'created_at'>
): Promise<ContactMessage> {
  const { data, error } = await supabase
    .from('ContactMessage')
    .insert(payload)
    .select()
    .single();

  if (error) throw new Error(`dbSaveMessage: ${error.message}`);
  return data as ContactMessage;
}

export async function dbGetAllMessages(): Promise<ContactMessage[]> {
  const { data, error } = await supabase
    .from('ContactMessage')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw new Error(`dbGetAllMessages: ${error.message}`);
  return (data ?? []) as ContactMessage[];
}

export async function dbGetUnreadMessages(): Promise<ContactMessage[]> {
  const { data, error } = await supabase
    .from('ContactMessage')
    .select('*')
    .eq('read', false)
    .order('created_at', { ascending: false });

  if (error) throw new Error(`dbGetUnreadMessages: ${error.message}`);
  return (data ?? []) as ContactMessage[];
}

export async function dbMarkMessageRead(id: string): Promise<void> {
  const { error } = await supabase
    .from('ContactMessage')
    .update({ read: true })
    .eq('id', id);

  if (error) throw new Error(`dbMarkMessageRead: ${error.message}`);
}

export async function dbDeleteMessage(id: string): Promise<void> {
  const { error } = await supabase
    .from('ContactMessage')
    .delete()
    .eq('id', id);

  if (error) throw new Error(`dbDeleteMessage: ${error.message}`);
}