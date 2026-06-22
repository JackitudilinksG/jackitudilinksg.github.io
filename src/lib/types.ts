// Shared domain types used across repositories and services

export type ISODateString = string;

export type ProjectSummary = {
	id: string;
	slug: string;
	title: string;
	description?: string | null;
	cover_image?: string | null;
	type?: string | null;
	tags?: string[] | null;
	date?: ISODateString | null;
	accent?: string | null;
	theme?: string | null;
	featured?: boolean;
	sort_order?: number | null;
	live_url?: string | null;
	github_url?: string | null;
	published?: boolean;
	created_at?: ISODateString | null;
	updated_at?: ISODateString | null;
};

export type ProjectFull = ProjectSummary & {
	// Additional rich content stored for CMS editing (nullable)
	content?: string | null;
	// Allow arbitrary extra metadata coming from the DB
	[key: string]: any;
};

export interface ContactMessage {
  id:         string;
  email:      string;
  subject:    string;
  body:       string;
  read:       boolean;
  created_at: string;
}

export type AuthUser = {
	id: string;
	email?: string | null;
	role?: string | null;
};

// Add to src/lib/types.ts

export interface BlogPostSummary {
  id:           string;
  slug:         string;
  title:        string;
  excerpt:      string | null;
  cover_image:  string | null;
  tags:         string[];
  read_time:    number | null;
  published:    boolean;
  published_at: string | null;
  created_at:   string;
  updated_at:   string;
}

// export interface BlogPost extends BlogPostSummary {
//   content: ContentBlock[];
// }


export type BlogPost = {
	id: string;
	slug: string;
	title: string;
	summary?: string | null;
	content?: string | null;
	tags?: string[] | null;
	published?: boolean;
	created_at?: ISODateString | null;
	updated_at?: ISODateString | null;
};

export interface CmsCredential {
  id:                    string;
  credential_id:         string;
  credential_public_key: string;
  counter:               number;
  device_name:           string;
  created_at:            string;
}

export interface CmsChallenge {
  id:         string;
  value:      string;
  expires_at: string;
  created_at: string;
}

