import { supabase } from '@/lib/supabase';
import { supabasePublic } from '@/lib/supabasePublic';
import type { BlogPost, BlogPostSummary } from '@/lib/types';

const SUMMARY_COLS = `
  id, slug, title, excerpt, cover_image,
  tags, read_time, published, published_at,
  created_at, updated_at
`;

// ── Public reads ──────────────────────────────────────────────────────

export async function dbGetPublishedPosts(): Promise<BlogPostSummary[]> {
  const { data, error } = await supabasePublic
    .from('blog_posts')
    .select(SUMMARY_COLS)
    .eq('published', true)
    .order('published_at', { ascending: false });

  if (error) throw new Error(`dbGetPublishedPosts: ${error.message}`);
  return (data ?? []) as BlogPostSummary[];
}

export async function dbGetPublishedPostsByTag(
  tag: string
): Promise<BlogPostSummary[]> {
  const { data, error } = await supabasePublic
    .from('blog_posts')
    .select(SUMMARY_COLS)
    .eq('published', true)
    .contains('tags', [tag])          // Postgres array contains
    .order('published_at', { ascending: false });

  if (error) throw new Error(`dbGetPublishedPostsByTag: ${error.message}`);
  return (data ?? []) as BlogPostSummary[];
}

export async function dbGetPostBySlug(
  slug: string
): Promise<BlogPost | null> {
  const { data, error } = await supabasePublic
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single();

  if (error?.code === 'PGRST116') return null;
  if (error) throw new Error(`dbGetPostBySlug: ${error.message}`);
  return data as BlogPost;
}

export async function dbGetPublishedPostSlugs(): Promise<string[]> {
  const { data, error } = await supabasePublic
    .from('blog_posts')
    .select('slug')
    .eq('published', true);

  if (error) throw new Error(`dbGetPublishedPostSlugs: ${error.message}`);
  return (data ?? []).map(p => p.slug);
}

export async function dbGetAllTags(): Promise<string[]> {
  // Postgres unnest flattens all tags arrays into individual rows
  // then distinct removes duplicates — one query, no JS deduplication
  const { data, error } = await supabasePublic
    .rpc('get_all_tags');             // see SQL function below

  if (error) throw new Error(`dbGetAllTags: ${error.message}`);
  return (data ?? []).map((r: { tag: string }) => r.tag);
}

export async function dbGetRecentPosts(
  limit: number = 3
): Promise<BlogPostSummary[]> {
  const { data, error } = await supabasePublic
    .from('blog_posts')
    .select(SUMMARY_COLS)
    .eq('published', true)
    .order('published_at', { ascending: false })
    .limit(limit);

  if (error) throw new Error(`dbGetRecentPosts: ${error.message}`);
  return (data ?? []) as BlogPostSummary[];
}

// ── CMS reads ─────────────────────────────────────────────────────────

export async function dbGetAllPostsCms(): Promise<BlogPostSummary[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select(SUMMARY_COLS)
    .order('created_at', { ascending: false });

  if (error) throw new Error(`dbGetAllPostsCms: ${error.message}`);
  return (data ?? []) as BlogPostSummary[];
}

export async function dbGetPostBySlugCms(
  slug: string
): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error?.code === 'PGRST116') return null;
  if (error) throw new Error(`dbGetPostBySlugCms: ${error.message}`);
  return data as BlogPost;
}

// ── CMS writes ────────────────────────────────────────────────────────

export async function dbCreatePost(
  payload: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>
): Promise<BlogPost> {
  const { data, error } = await supabase
    .from('blog_posts')
    .insert(payload)
    .select()
    .single();

  if (error) throw new Error(`dbCreatePost: ${error.message}`);
  return data as BlogPost;
}

export async function dbUpdatePost(
  id:      string,
  payload: Partial<Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>>
): Promise<BlogPost> {
  const { data, error } = await supabase
    .from('blog_posts')
    .update(payload)
    .eq('id', id)
    .select()
    .single();

  if (error) throw new Error(`dbUpdatePost: ${error.message}`);
  return data as BlogPost;
}

export async function dbDeletePost(id: string): Promise<void> {
  const { error } = await supabase
    .from('blog_posts')
    .delete()
    .eq('id', id);

  if (error) throw new Error(`dbDeletePost: ${error.message}`);
}

export async function dbPostSlugExists(slug: string): Promise<boolean> {
  const { count, error } = await supabase
    .from('blog_posts')
    .select('id', { count: 'exact', head: true })
    .eq('slug', slug);

  if (error) throw new Error(`dbPostSlugExists: ${error.message}`);
  return (count ?? 0) > 0;
}