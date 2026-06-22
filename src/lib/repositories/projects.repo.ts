import { supabase } from '../supabase';
import { supabasePublic } from '@/lib/supabasePublic';
import type { ProjectFull, ProjectSummary } from '@/lib/types';

const SUMMARY_COLS = `
  id, slug, title, description, cover_image,
  type, tags, date, accent, theme, featured,
  sort_order, live_url, github_url, published,
  created_at, updated_at
`;

// ── Read (public) ─────────────────────────────────────────────────────

export async function dbGetPublishedProjects(): Promise<ProjectSummary[]> {
  const { data, error } = await supabasePublic
    .from('projects')
    .select(SUMMARY_COLS)
    .eq('published', true)
    .order('sort_order', { ascending: true });

  if (error) throw new Error(error.message);
  return (data ?? []) as ProjectSummary[];
}

export async function dbGetProjectBySlug(
  slug: string
): Promise<ProjectFull | null> {
  const { data, error } = await supabasePublic
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single();

  if (error?.code === 'PGRST116') return null; // not found — not an error
  if (error) throw new Error(error.message);
  return data as ProjectFull;
}

export async function dbGetAllSlugs(): Promise<string[]> {
  const { data, error } = await supabasePublic
    .from('projects')
    .select('slug')
    .eq('published', true);

  if (error) throw new Error(error.message);
  return (data ?? []).map(p => p.slug);
}

export async function dbGetFeaturedProjects(): Promise<ProjectSummary[]> {
  const { data, error } = await supabasePublic
    .from('projects')
    .select(SUMMARY_COLS)
    .eq('published', true)
    .eq('featured', true)
    .order('sort_order', { ascending: true });

  if (error) throw new Error(error.message);
  return (data ?? []) as ProjectSummary[];
}

// ── Read (CMS — service role) ─────────────────────────────────────────

export async function dbGetAllProjectsCms(): Promise<ProjectSummary[]> {
  const { data, error } = await supabase
    .from('projects')
    .select(SUMMARY_COLS)
    .order('sort_order', { ascending: true });

  if (error) throw new Error(error.message);
  return (data ?? []) as ProjectSummary[];
}

export async function dbGetProjectBySlugCms(
  slug: string
): Promise<ProjectFull | null> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error?.code === 'PGRST116') return null;
  if (error) throw new Error(error.message);
  return data as ProjectFull;
}

// ── Write (CMS — service role) ────────────────────────────────────────

export async function dbCreateProject(
  payload: Omit<ProjectFull, 'id' | 'created_at' | 'updated_at'>
): Promise<ProjectFull> {
  const { data, error } = await supabase
    .from('projects')
    .insert(payload)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as ProjectFull;
}

export async function dbUpdateProject(
  id: string,
  payload: Partial<Omit<ProjectFull, 'id' | 'created_at' | 'updated_at'>>
): Promise<ProjectFull> {
  const { data, error } = await supabase
    .from('projects')
    .update(payload)
    .eq('id', id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as ProjectFull;
}

export async function dbDeleteProject(id: string): Promise<void> {
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id);

  if (error) throw new Error(error.message);
}