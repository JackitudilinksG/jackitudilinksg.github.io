// ─── Theme Types ──────────────────────────────────────────────────────────────

export type AnimationStyle = 'fade-rise' | 'slide-reveal' | 'zoom-blur' | 'wipe';
export type DecorStyle    = 'grain' | 'geometric' | 'noise-mesh' | 'track-lines' | 'marquee' | 'asterisk' | 'grid-rules' | 'none';
export type HeroStyle     = 'overlay' | 'split' | 'outlined-title' | 'typographic' | 'panels';

export interface ProjectTheme {
  bg: string;
  surface: string;
  accent: string;
  accentText: string;
  text: string;
  muted: string;
  border: string;

  fontImport: string;
  headingFont: string;
  bodyFont: string;

  heroStyle: HeroStyle;
  heroOverlay: string;

  animation: AnimationStyle;
  ease: string;
  duration: string;

  decor: DecorStyle;
  // Optional ticker text for the marquee decoration
  marqueeText?: string;
  panelTagline?: string;  // large watermark text shown over full-bleed photo sections
}

// ─── Per-project themes ───────────────────────────────────────────────────────

export const THEMES: Record<string, ProjectTheme> = {

  'project-alpha': {
    bg:          '#F5F0E8',
    surface:     '#EDE8DC',
    accent:      '#C0392B',
    accentText:  '#FFFFFF',
    text:        '#1A1208',
    muted:       '#8A7E6A',
    border:      '#D6CFC0',
    fontImport:  'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Lora:ital,wght@0,400;0,500;1,400&display=swap',
    headingFont: "'Playfair Display', Georgia, serif",
    bodyFont:    "'Lora', Georgia, serif",
    heroStyle:   'overlay',
    heroOverlay: 'rgba(26,18,8,0.55)',
    animation:   'fade-rise',
    ease:        'cubic-bezier(0.22, 1, 0.36, 1)',
    duration:    '0.8s',
    decor:       'grain',
  },

  'project-beta': {
    bg:          '#0D1117',
    surface:     '#161B22',
    accent:      '#1EAEDB',
    accentText:  '#0D1117',
    text:        '#E2EAF4',
    muted:       '#6B7FA3',
    border:      '#21262D',
    fontImport:  'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;700&family=DM+Sans:wght@300;400;500&display=swap',
    headingFont: "'JetBrains Mono', 'Courier New', monospace",
    bodyFont:    "'DM Sans', system-ui, sans-serif",
    heroStyle:   'outlined-title',
    heroOverlay: 'rgba(13,17,23,0.7)',
    animation:   'slide-reveal',
    ease:        'cubic-bezier(0.16, 1, 0.3, 1)',
    duration:    '0.6s',
    decor:       'geometric',
  },

  'project-gamma': {
    bg:          '#0E0E0B',
    surface:     '#191916',
    accent:      '#E8003D',
    accentText:  '#FFFFFF',
    text:        '#EAE6D8',
    muted:       '#7A7568',
    border:      '#252520',
    fontImport:  'https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,700;0,900;1,700;1,900&family=Cormorant:ital,wght@1,600;1,700&family=Barlow:wght@300;400&display=swap',
    headingFont: "'Barlow Condensed', Impact, sans-serif",
    bodyFont:    "'Barlow', system-ui, sans-serif",
    heroStyle:   'typographic',
    heroOverlay: 'rgba(14,14,11,0.0)',
    animation:   'wipe',
    ease:        'cubic-bezier(0.77, 0, 0.175, 1)',
    duration:    '0.7s',
    decor:       'track-lines',
  },

  // ── Project Delta — Azuki-inspired: near-black, cream, red ────────────────
  'project-delta': {
    bg:          '#0A0A08',
    surface:     '#F0E8D4',
    accent:      '#E8001D',
    accentText:  '#FFFFFF',
    text:        '#F0E8D4',
    muted:       '#9A9080',
    border:      '#201E18',

    fontImport:  'https://fonts.googleapis.com/css2?family=Anton&family=Noto+Sans+JP:wght@400;700;900&family=Space+Grotesk:wght@300;400;500&display=swap',
    headingFont: "'Anton', Impact, sans-serif",
    bodyFont:    "'Space Grotesk', system-ui, sans-serif",

    heroStyle:   'typographic',
    heroOverlay: 'rgba(10,10,8,0.0)',

    animation:   'fade-rise',
    ease:        'cubic-bezier(0.22, 1, 0.36, 1)',
    duration:    '0.9s',

    decor:       'marquee',
    marqueeText: '予測分析 ✦ PREDICTIVE ANALYTICS ✦ 機械学習 ✦ MACHINE LEARNING ✦ データの力 ✦ PATTERN RECOGNITION ✦ 未来を見る ✦ FORECASTING ✦',
  },

  // ── Project Epsilon — 2D cutout, pure black + yellow ─────────────────────
  'project-epsilon': {
    bg:          '#0A0A08',
    surface:     '#F5D000',
    accent:      '#F5D000',
    accentText:  '#0A0A08',
    text:        '#F0ECD8',
    muted:       '#888070',
    border:      '#1E1C14',

    fontImport:  'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap',
    headingFont: "'Bebas Neue', Impact, sans-serif",
    bodyFont:    "'Space Mono', 'Courier New', monospace",

    heroStyle:   'typographic',
    heroOverlay: 'rgba(10,10,8,0)',

    animation:   'wipe',
    ease:        'cubic-bezier(0.77, 0, 0.175, 1)',
    duration:    '0.6s',

    decor:       'asterisk',
  },

  'project-race': {
    bg:          '#1C2116',
    surface:     '#242A1A',
    accent:      '#C8E84A',
    accentText:  '#1C2116',
    text:        '#E8E4D4',
    muted:       '#8A9270',
    border:      '#2E361F',
    fontImport:  'https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,400;0,700;0,900;1,700&family=Barlow:wght@300;400;500&display=swap',
    headingFont: "'Barlow Condensed', Impact, sans-serif",
    bodyFont:    "'Barlow', system-ui, sans-serif",
    heroStyle:   'overlay',
    heroOverlay: 'rgba(28,33,22,0.62)',
    animation:   'wipe',
    ease:        'cubic-bezier(0.77, 0, 0.175, 1)',
    duration:    '0.65s',
    decor:       'track-lines',
  },

  // ── Project Zeta — Tonevan-inspired: orange, cream, warm photos ───────────
  'project-zeta': {
    bg:           '#FAF5EE',
    surface:      '#E8570A',
    accent:       '#E8570A',
    accentText:   '#FFFFFF',
    text:         '#0F0C08',
    muted:        '#8A7060',
    border:       '#E8D8C4',

    fontImport:   'https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Instrument+Serif:ital@0;1&display=swap',
    headingFont:  "'Instrument Sans', 'Helvetica Neue', sans-serif",
    bodyFont:     "'Instrument Sans', 'Helvetica Neue', sans-serif",

    heroStyle:    'panels',
    heroOverlay:  'rgba(15,12,8,0.18)',

    animation:    'fade-rise',
    ease:         'cubic-bezier(0.22, 1, 0.36, 1)',
    duration:     '0.85s',

    decor:        'grid-rules',
    panelTagline: 'WHY ZETA',
  },
};

export const DEFAULT_THEME: ProjectTheme = THEMES['project-alpha'];

export function getTheme(slug: string): ProjectTheme {
  return THEMES[slug] ?? DEFAULT_THEME;
}