// ─── Project content types ────────────────────────────────────────────────────

export interface HeroToken {
  text:    string;
  accent?: boolean;   // rendered in theme accent colour
  serif?:  boolean;   // rendered in italic serif (Cormorant)
}

export interface ContentSection {
  heading: string;
  body: string;
  image?: string;
  imageAlt?: string;
  imagePosition?: 'left' | 'right';
  numbered?: boolean;
}

export interface ProjectContent {
  slug: string;

  // ── § 1  Hero ────────────────────────────────────────
  heroImage: string;
  heroImageAlt: string;
  // Only used when heroStyle === 'typographic'
  heroStatement?: HeroToken[];

  // ── § 2  Overview ───────────────────────────────────
  type: string;
  date?: string;
  title: string;
  tagline: string;
  overviewBody: string;
  stats?: { label: string; value: string }[];

  // ── § 3  Feature image ──────────────────────────────
  featureImage?: string;
  featureImageAlt?: string;
  featureCaption?: string;

  // ── § 4  Content sections (1–3) ─────────────────────
  sections: ContentSection[];

  // ── § 5  Gallery (3 images) ─────────────────────────
  gallery?: { src: string; alt: string }[];

  // ── § 6  Closing ────────────────────────────────────
  closingHeading: string;
  closingBody: string;
  tags?: string[];
}

// ─── Project data ─────────────────────────────────────────────────────────────

export const PROJECTS: ProjectContent[] = [
  {
    slug: 'project-alpha',
    heroImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=80',
    heroImageAlt: 'Mountain landscape at dawn',
    type: 'Web Design',
    date: 'Mar 10, 2025',
    title: 'Project Alpha: Redesigning the onboarding experience',
    tagline: 'Cutting time-to-activate from 8 minutes to under 3.',
    overviewBody:
      'A full redesign of the user onboarding flow. Through session recordings and interviews we mapped every friction point, then rebuilt the experience around progressive disclosure.',
    stats: [
      { label: 'Drop-off reduction', value: '−40%' },
      { label: 'Time to activate',   value: '2m 48s' },
      { label: 'Shipped',            value: 'Q1 2025' },
    ],
    featureImage: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=1400&q=80',
    featureImageAlt: 'Code on screen',
    featureCaption: 'The new flow reduced average steps from 11 to 5.',
    sections: [
      {
        heading: 'The problem with choice overload',
        body: 'Users were presented with every feature on day one. Decision fatigue set in before they had seen a single result. We stripped the first session down to one core action.',
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
        imageAlt: 'Team whiteboarding',
        imagePosition: 'right',
      },
      {
        heading: 'Writing with intent',
        body: 'Every label, tooltip and error message was rewritten to be action-oriented. Copy audits ran alongside the UX work, not after.',
        image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80',
        imageAlt: 'Notebook with pen',
        imagePosition: 'left',
      },
      {
        heading: 'Measuring what matters',
        body: 'We instrumented each step before launch so we could compare funnels directly. The 40% improvement in 7-day retention was visible within the first week.',
      },
    ],
    gallery: [
      { src: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80', alt: 'Mobile mockup 1' },
      { src: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=600&q=80', alt: 'Mobile mockup 2' },
      { src: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=600&q=80', alt: 'Dashboard UI' },
    ],
    closingHeading: 'What we learned',
    closingBody: "The biggest unlock was removing features, not adding them. Simplicity isn't the absence of work — it's the result of it.",
    tags: ['UX Research', 'Interaction Design', 'Copy Strategy', 'A/B Testing'],
  },

  {
    slug: 'project-beta',
    heroImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&q=80',
    heroImageAlt: 'Circuit board close-up',
    type: 'Mobile App',
    date: 'Jan 22, 2025',
    title: 'Project Beta: Real-time data dashboard',
    tagline: 'IoT sensor data, live — anywhere, offline-capable.',
    overviewBody:
      'A cross-platform mobile app for monitoring IoT sensor streams. Live charts update at 250ms intervals. Offline caching ensures field engineers keep working when connectivity drops.',
    stats: [
      { label: 'Sensor types',   value: '14' },
      { label: 'Refresh rate',   value: '250ms' },
      { label: 'Offline buffer', value: '72 hr' },
    ],
    featureImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=80',
    featureImageAlt: 'Data chart on dark background',
    featureCaption: 'Alert thresholds are configurable per sensor per deployment.',
    sections: [
      {
        heading: 'Architecture first',
        body: 'We modelled the data pipeline before touching the UI. A local SQLite layer buffers incoming events and syncs to the cloud when a connection is available.',
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
        imageAlt: 'Server racks',
        imagePosition: 'right',
      },
      {
        heading: 'Charting at 250ms',
        body: 'Standard charting libraries stall when you push updates faster than ~2Hz. We forked a canvas-based renderer and batched DOM writes to maintain 60fps on mid-range devices.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
        imageAlt: 'Performance graph',
        imagePosition: 'left',
      },
    ],
    gallery: [
      { src: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&q=80', alt: 'Matrix code' },
      { src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80', alt: 'Circuit detail' },
      { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', alt: 'Tech closeup' },
    ],
    closingHeading: 'Reliability over novelty',
    closingBody: "Field engineers don't care about animations. They care about not losing four hours of data when the cell tower drops.",
    tags: ['React Native', 'SQLite', 'WebSockets', 'Data Viz'],
  },

  {
    slug: 'project-gamma',
    heroImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=80',
    heroImageAlt: 'Brand identity system',

    // Typographic hero statement — tokens flow as one massive text block
    heroStatement: [
      { text: 'BUILDING'                          },
      { text: 'BRANDS',    accent: true           },
      { text: 'THAT'                              },
      { text: 'OUTLAST',   serif: true            },
      { text: 'THE'                               },
      { text: 'BRIEF.'                            },
      { text: 'DESIGNING', accent: true           },
      { text: 'A'                                 },
      { text: 'LEGACY',    serif: true            },
      { text: 'NOT'                               },
      { text: 'JUST',      accent: true           },
      { text: 'A'                                 },
      { text: 'LOGO.'                             },
    ],

    type: 'Branding',
    date: 'Nov 05, 2024',
    title: 'Project Gamma: Visual identity system',
    tagline: 'A brand built to outlast the brief.',
    overviewBody:
      'Built a comprehensive brand identity from scratch — logo, type scale, color system, and component library. Every decision traceable to a single founding idea: permanence over trend.',
    stats: [
      { label: 'Deliverables', value: '140+' },
      { label: 'Timeframe',    value: '6 wk' },
      { label: 'Platforms',    value: '8' },
    ],
    featureImage: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1400&q=80',
    featureImageAlt: 'Brand guidelines spread',
    featureCaption: 'The full system shipped across print, digital, and environmental touchpoints.',
    sections: [
      {
        heading: 'One idea, infinite executions',
        body: 'The founding idea — permanence — guided every decision. The typeface chosen was cut in 1932. The colour palette drawn from materials that age well: raw steel, aged paper, oxide red.',
        image: 'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=800&q=80',
        imageAlt: 'Typography detail',
        imagePosition: 'right',
      },
      {
        heading: 'Systems over symbols',
        body: 'A logo is the least important part of a brand. We spent more time on the type scale, spacing system, and motion language than on the mark itself — because that is what designers touch every day.',
        image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80',
        imageAlt: 'Design system grid',
        imagePosition: 'left',
      },
      {
        heading: 'Handing over the keys',
        body: 'Documentation is a design problem. The guidelines were built as a living Figma library — annotated, versioned, and maintained by the client team six months after handoff without a single question back to us.',
      },
    ],
    gallery: [
      { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', alt: 'Brand application 1' },
      { src: 'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=600&q=80', alt: 'Typography sample' },
      { src: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&q=80', alt: 'Design system' },
    ],
    closingHeading: 'Permanence is a design choice',
    closingBody: "Trends are easy to follow. Building something that still looks right in ten years requires the confidence to ignore what's popular right now.",
    tags: ['Brand Identity', 'Type Systems', 'Motion', 'Figma', 'Print'],
  },

  {
    slug: 'project-delta',
    heroImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&q=80',
    heroImageAlt: 'Predictive analytics data streams',

    heroStatement: [
      { text: 'SEE'                                },
      { text: 'THE',    accent: true               },
      { text: 'FUTURE'                             },
      { text: 'BEFORE', serif:  true               },
      { text: 'IT'                                 },
      { text: 'HAPPENS.'                           },
      { text: 'PREDICT', accent: true              },
      { text: 'WITH'                               },
      { text: 'PRECISION.',                        },
    ],

    type: 'AI / ML',
    date: 'Sep 14, 2024',
    title: 'Project Delta: Predictive analytics engine',
    tagline: '在未来到来之前看见它。 See it before it arrives.',
    overviewBody:
      'Trained and deployed a forecasting model that improved inventory planning accuracy by 28% quarter-over-quarter. Fourteen data sources unified into a single signal.',
    stats: [
      { label: '精度向上',      value: '+28%' },
      { label: 'SKUs covered', value: '12k'  },
      { label: 'Latency',      value: '< 2s' },
    ],
    featureImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&q=80',
    featureImageAlt: 'Neural network visualization',
    featureCaption: 'The model was retrained weekly on rolling 90-day windows.',
    sections: [
      {
        heading: 'The data problem',
        body: 'Fourteen data sources, zero shared schema. Before any model work we spent three weeks building a normalisation pipeline that could handle late, missing, and contradictory signals.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
        imageAlt: 'Data pipeline diagram',
        imagePosition: 'right',
      },
      {
        heading: 'パターン認識 — Pattern recognition',
        body: 'The model learned to weight recency over volume — a Friday in November means something different from a Friday in April. Seasonal priors, encoded explicitly, cut MAPE by 11 points.',
        image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80',
        imageAlt: 'Code matrix',
        imagePosition: 'left',
      },
      {
        heading: 'Shipping fast, failing faster',
        body: 'We deployed to 5% of SKUs first. Watched for three weeks. Expanded to 40%. Watched for two. Full rollout at week seven. Every metric was instrumented before we wrote a single line of model code.',
      },
    ],
    gallery: [
      { src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80', alt: 'Analytics dashboard' },
      { src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80', alt: 'Forecast chart' },
      { src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80', alt: 'Model architecture' },
    ],
    closingHeading: 'モデルは仮説だ — Models are hypotheses',
    closingBody: 'A model is only as good as your willingness to be wrong about it. We shipped weekly and killed features that did not move the metric. Certainty is the enemy of accuracy.',
    tags: ['Python', 'XGBoost', 'Airflow', 'dbt', '機械学習'],
  },

  {
    slug: 'project-epsilon',
    heroImage: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1400&q=80',
    heroImageAlt: 'Collaborative workspace',

    heroStatement: [
      { text: 'BUILD'                              },
      { text: 'TOGETHER.',  accent: true           },
      { text: 'SHIP'                               },
      { text: 'FASTER.',    serif: true            },
      { text: 'ZERO',       accent: true           },
      { text: 'CONFLICTS.'                         },
    ],

    type: 'Web App',
    date: 'Jul 30, 2024',
    title: 'Project Epsilon: Collaborative workspace tool',
    tagline: 'Real-time presence. Zero merge conflicts.',
    overviewBody:
      'A real-time collaborative platform with presence awareness, live commenting, and version history. Built for teams who cannot afford to lose work.',
    stats: [
      { label: 'Active teams', value: '320' },
      { label: 'Uptime',       value: '99.97%' },
      { label: 'Latency p99',  value: '42ms' },
    ],
    featureImage: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1400&q=80',
    featureImageAlt: 'Dashboard UI in use',
    featureCaption: 'Presence indicators update 10× per second — fast enough to feel live.',
    sections: [
      {
        heading: '01',
        body: 'Real-time sync without locking. Every keystroke is broadcast as a CRDT operation — no optimistic rollback, no merge dialogs, no lost work. Conflicts are mathematically impossible.',
        numbered: true,
      },
      {
        heading: '02',
        body: 'Presence without noise. Seventeen cursors moving at once is anxiety-inducing. We designed ambient presence — you know others are there without being distracted by them.',
        numbered: true,
      },
      {
        heading: '03',
        body: 'Version history as a first-class feature. Every session is snapshotted. Rolling back to any point in the last 90 days takes two clicks — no git, no exports, no support tickets.',
        numbered: true,
      },
      {
        heading: 'The sync engine',
        body: 'CRDT operations are batched in 16ms frames and broadcast over WebSockets with a fallback to SSE. The server is stateless — any node can serve any client at any time.',
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
        imageAlt: 'Server infrastructure',
        imagePosition: 'right',
      },
      {
        heading: 'Offline-first',
        body: 'Network goes down. Editor keeps working. Changes queue locally and replay cleanly when reconnected — whether that is 30 seconds or 30 minutes later.',
        image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80',
        imageAlt: 'Code running',
        imagePosition: 'left',
      },
    ],
    gallery: [
      { src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80', alt: 'Live chart' },
      { src: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=600&q=80', alt: 'Mobile view' },
      { src: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80', alt: 'Team session' },
    ],
    closingHeading: 'Collaboration is a UX problem',
    closingBody: 'The hardest part was not the sync engine. It was making shared work feel calm. Every technical decision was filtered through one question: does this reduce anxiety or add to it?',
    tags: ['React', 'CRDTs', 'WebSockets', 'Postgres', 'Offline-first'],
  },

  {
    slug: 'project-race',
    heroImage: 'https://images.unsplash.com/photo-1541348263662-e068662d82af?w=1400&q=80',
    heroImageAlt: 'Formula racing car on track',
    type: 'Motion & Experience Design',
    date: 'Feb 12, 2025',
    title: 'Project Race: A live race-day fan experience',
    tagline: 'Lap data, driver telemetry, and crowd energy — unified in real time.',
    overviewBody:
      'A broadcast-grade web experience for race day. Live telemetry streams feed into animated track maps, sector comparisons, and a social layer that turns passive fans into an active pit wall.',
    stats: [
      { label: 'Concurrent users', value: '240k' },
      { label: 'Data latency',     value: '< 80ms' },
      { label: 'Races covered',    value: '22' },
    ],
    featureImage: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=1400&q=80',
    featureImageAlt: 'Race track aerial view',
    featureCaption: 'Track map updates 12 times per second during live sessions.',
    sections: [
      {
        heading: 'Turning numbers into narrative',
        body: 'Raw telemetry is noise. Our render pipeline converts 300 data points per second into readable sector cards, tyre-deg curves, and pace deltas — all within a 16ms frame budget.',
        image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80',
        imageAlt: 'Racing dashboard',
        imagePosition: 'right',
      },
      {
        heading: 'Designing for split-second attention',
        body: 'Fans follow the race, not the screen. Every interaction was designed for peripheral vision — high contrast, large type, state changes under 200ms.',
        image: 'https://images.unsplash.com/photo-1612532168858-40d66c48fd68?w=800&q=80',
        imageAlt: 'Night race crowd',
        imagePosition: 'left',
      },
      {
        heading: 'Scale without compromise',
        body: 'Race start spikes to 8× normal load in under three seconds. Edge-cached static shells with streamed dynamic islands meant we never served a spinner at lights out.',
      },
    ],
    gallery: [
      { src: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&q=80', alt: 'Pit lane' },
      { src: 'https://images.unsplash.com/photo-1541348263662-e068662d82af?w=600&q=80', alt: 'Car on track' },
      { src: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&q=80', alt: 'Aerial track' },
    ],
    closingHeading: 'Speed is a design constraint',
    closingBody: 'Every millisecond of perceived lag is a fan looking away. We stopped treating performance as a polish pass and made it the foundation.',
    tags: ['Real-time', 'WebSockets', 'Canvas API', 'Edge CDN', 'Motion Design'],
  },

  {
    slug: 'project-zeta',
    heroImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1400&q=80',
    heroImageAlt: 'Musician with headphones in warm orange light',

    type: 'Sound & Brand Design',
    date: 'Apr 02, 2025',
    title: 'Project Zeta: Where sound becomes story',
    tagline: 'We understand sound and its value in commercial storytelling.',
    overviewBody:
      'A full-stack audio branding platform connecting creators with internationally licensed music — curated for mood, cleared for commercial use, delivered before the deadline.',
    stats: [
      { label: 'Tracks licensed', value: '12k+' },
      { label: 'Labels partnered', value: '340'  },
      { label: 'Avg. clearance',  value: '< 4hr' },
    ],

    featureImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1400&q=80',
    featureImageAlt: 'Live music silhouette in warm orange stage light',
    featureCaption: 'Every track is pre-cleared through our licensing pipeline before it reaches the platform.',

    sections: [
      {
        heading: 'Professional curation',
        body: 'Our editorial team listens to over 400 tracks a week. Less than 3% make it onto the platform — filtered for quality, originality, and commercial versatility.',
        image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80',
        imageAlt: 'Studio mixing desk in warm light',
        imagePosition: 'right',
      },
      {
        heading: 'Transparent licensing',
        body: 'We work with international music libraries and independent labels to find unique sounds and ensure official licensing. No hidden fees, no surprise takedowns, no grey areas.',
        image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&q=80',
        imageAlt: 'Musician performing',
        imagePosition: 'left',
      },
      {
        heading: 'Aesthetic precision hitting the mark',
        body: 'Brief-matched audio search means you describe the feeling — tense, playful, cinematic — and the platform surfaces tracks that fit. Not just by genre or BPM, but by emotional register.',
      },
    ],

    gallery: [
      { src: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&q=80', alt: 'DJ mixing' },
      { src: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600&q=80', alt: 'Concert crowd' },
      { src: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&q=80', alt: 'Studio session' },
    ],

    closingHeading: 'Our solution',
    closingBody:
      'We partner with independent labels and music libraries, officially clearing rights and selecting music perfectly suited to mood and format. No hassle — just the right music, in the right tone, delivered on time.',
    tags: ['Audio Branding', 'Licensing', 'Editorial Curation', 'Commercial Sync'],
  },
];

export function getProject(slug: string): ProjectContent | null {
  return PROJECTS.find(p => p.slug === slug) ?? null;
}