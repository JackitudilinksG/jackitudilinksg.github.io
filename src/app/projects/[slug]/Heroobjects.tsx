// HeroObjects.tsx
// Each project gets a unique floating SVG object rendered in the hero centre.
// Add a new entry to HERO_OBJECTS keyed by slug.
// The component receives `color` (the project's accent) and `muted` (secondary tone).

import styles from './HeroObjects.module.css';

interface ObjectProps {
  color: string;   // accent colour from theme
  muted: string;   // muted colour from theme
}

// ─── Individual objects ───────────────────────────────────────────────────────

function Earbud({ color, muted }: ObjectProps) {
  return (
    <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.obj}>
      {/* Stem */}
      <rect x="72" y="88" width="16" height="48" rx="8" fill={color} />
      {/* Stem highlight */}
      <rect x="76" y="92" width="5" height="20" rx="2.5" fill="white" opacity="0.25" />
      {/* Body */}
      <ellipse cx="80" cy="72" rx="30" ry="32" fill={color} />
      {/* Body highlight */}
      <ellipse cx="70" cy="60" rx="10" ry="12" fill="white" opacity="0.15" />
      {/* Speaker mesh */}
      <circle cx="80" cy="75" r="12" fill={muted} opacity="0.5" />
      <circle cx="80" cy="75" r="7"  fill={muted} opacity="0.6" />
      <circle cx="80" cy="75" r="3"  fill="white" opacity="0.4" />
      {/* Ear tip */}
      <ellipse cx="80" cy="44" rx="14" ry="10" fill={color} />
      <ellipse cx="80" cy="44" rx="8"  ry="6"  fill="white" opacity="0.12" />
      {/* Sound waves */}
      <path d="M 116 55 Q 126 72 116 89" stroke={color} strokeWidth="3" strokeLinecap="round" opacity="0.5" />
      <path d="M 124 48 Q 138 72 124 96" stroke={color} strokeWidth="2.5" strokeLinecap="round" opacity="0.3" />
      <path d="M 44 55 Q 34 72 44 89"   stroke={color} strokeWidth="3" strokeLinecap="round" opacity="0.5" />
      <path d="M 36 48 Q 22 72 36 96"   stroke={color} strokeWidth="2.5" strokeLinecap="round" opacity="0.3" />
    </svg>
  );
}

function Cursor({ color, muted }: ObjectProps) {
  return (
    <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.obj}>
      {/* Shadow */}
      <ellipse cx="80" cy="148" rx="28" ry="6" fill={color} opacity="0.15" />
      {/* Cursor arrow */}
      <path d="M 52 28 L 52 108 L 72 88 L 88 122 L 100 116 L 84 82 L 112 82 Z"
            fill={color} stroke="white" strokeWidth="3" strokeLinejoin="round" />
      {/* Shine */}
      <path d="M 56 34 L 56 78 L 68 66" stroke="white" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round" opacity="0.3" />
      {/* Click ripple */}
      <circle cx="80" cy="80" r="50" stroke={color} strokeWidth="1.5" opacity="0.15" strokeDasharray="4 4" />
      <circle cx="80" cy="80" r="36" stroke={color} strokeWidth="1.5" opacity="0.2"  strokeDasharray="4 4" />
    </svg>
  );
}

function Chip({ color, muted }: ObjectProps) {
  return (
    <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.obj}>
      {/* Body */}
      <rect x="42" y="42" width="76" height="76" rx="10" fill={muted} opacity="0.25" />
      <rect x="48" y="48" width="64" height="64" rx="7"  fill={color} opacity="0.9" />
      {/* Inner die */}
      <rect x="60" y="60" width="40" height="40" rx="4" fill={muted} opacity="0.5" />
      {/* Circuit paths — top/bottom pins */}
      {[58, 72, 86, 100].map(x => (
        <g key={x}>
          <line x1={x} y1="42" x2={x} y2="28" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
          <line x1={x} y1="118" x2={x} y2="132" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
        </g>
      ))}
      {/* Circuit paths — left/right pins */}
      {[58, 72, 86, 100].map(y => (
        <g key={y}>
          <line x1="42" y1={y} x2="28" y2={y} stroke={color} strokeWidth="3.5" strokeLinecap="round" />
          <line x1="118" y1={y} x2="132" y2={y} stroke={color} strokeWidth="3.5" strokeLinecap="round" />
        </g>
      ))}
      {/* Highlight */}
      <rect x="52" y="52" width="22" height="10" rx="3" fill="white" opacity="0.15" />
    </svg>
  );
}

function DiamondMark({ color, muted }: ObjectProps) {
  return (
    <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.obj}>
      {/* Outer diamond */}
      <path d="M 80 18 L 142 80 L 80 142 L 18 80 Z" fill={color} opacity="0.15" />
      {/* Mid diamond rotated */}
      <path d="M 80 30 L 130 80 L 80 130 L 30 80 Z"
            fill="none" stroke={color} strokeWidth="2" opacity="0.4" />
      {/* Inner solid */}
      <path d="M 80 50 L 110 80 L 80 110 L 50 80 Z" fill={color} />
      {/* Centre dot */}
      <circle cx="80" cy="80" r="10" fill="white" opacity="0.3" />
      {/* Corner accents */}
      <circle cx="80"  cy="18"  r="4" fill={color} />
      <circle cx="142" cy="80"  r="4" fill={color} />
      <circle cx="80"  cy="142" r="4" fill={color} />
      <circle cx="18"  cy="80"  r="4" fill={color} />
      {/* Shine */}
      <path d="M 65 65 L 80 56 L 95 65" stroke="white" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round" opacity="0.35" />
    </svg>
  );
}

function NeuralNode({ color, muted }: ObjectProps) {
  // Central node with orbiting satellites connected by lines
  const satellites = [
    { cx: 80,  cy: 24 },
    { cx: 136, cy: 56 },
    { cx: 136, cy: 104 },
    { cx: 80,  cy: 136 },
    { cx: 24,  cy: 104 },
    { cx: 24,  cy: 56 },
  ];
  return (
    <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.obj}>
      {/* Connection lines */}
      {satellites.map((s, i) => (
        <line key={i} x1="80" y1="80" x2={s.cx} y2={s.cy}
              stroke={color} strokeWidth="1.5" opacity="0.35" />
      ))}
      {/* Cross-connections */}
      {satellites.map((s, i) => {
        const next = satellites[(i + 1) % satellites.length];
        return <line key={`x${i}`} x1={s.cx} y1={s.cy} x2={next.cx} y2={next.cy}
                     stroke={muted} strokeWidth="1" opacity="0.2" />;
      })}
      {/* Satellite nodes */}
      {satellites.map((s, i) => (
        <circle key={i} cx={s.cx} cy={s.cy} r="9" fill={color} opacity="0.7" />
      ))}
      {/* Centre */}
      <circle cx="80" cy="80" r="24" fill={color} />
      <circle cx="80" cy="80" r="14" fill="white" opacity="0.15" />
      <circle cx="80" cy="80" r="6"  fill="white" opacity="0.4" />
    </svg>
  );
}

function CollabNodes({ color, muted }: ObjectProps) {
  return (
    <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.obj}>
      {/* Connection lines */}
      <line x1="52" y1="64"  x2="108" y2="64"  stroke={color} strokeWidth="2" opacity="0.3" />
      <line x1="52" y1="64"  x2="80"  y2="108" stroke={color} strokeWidth="2" opacity="0.3" />
      <line x1="108" y1="64" x2="80"  y2="108" stroke={color} strokeWidth="2" opacity="0.3" />
      <line x1="52" y1="64"  x2="80"  y2="32"  stroke={color} strokeWidth="2" opacity="0.3" />
      <line x1="108" y1="64" x2="80"  y2="32"  stroke={color} strokeWidth="2" opacity="0.3" />
      {/* Presence dots (users) */}
      <circle cx="80"  cy="32"  r="16" fill={color}  opacity="0.9" />
      <circle cx="52"  cy="64"  r="14" fill={muted}  opacity="0.8" />
      <circle cx="108" cy="64"  r="14" fill={color}  opacity="0.7" />
      <circle cx="80"  cy="108" r="18" fill={color}  opacity="0.95" />
      {/* Avatar suggestion — small face circles */}
      {[
        { cx: 80, cy: 32, r: 16 },
        { cx: 52, cy: 64, r: 14 },
        { cx: 108, cy: 64, r: 14 },
        { cx: 80, cy: 108, r: 18 },
      ].map((n, i) => (
        <circle key={i} cx={n.cx - n.r * 0.2} cy={n.cy - n.r * 0.15} r={n.r * 0.3}
                fill="white" opacity="0.2" />
      ))}
      {/* Live cursor */}
      <path d="M 118 108 L 118 130 L 124 124 L 130 136 L 135 134 L 129 122 L 138 122 Z"
            fill={color} stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

// ─── AsteriskMark ────────────────────────────────────────────────────────────

function AsteriskMark({ color, muted }: ObjectProps) {
  // Six-arm asterisk / star — the signature shape of the cutout aesthetic
  const arms = Array.from({ length: 6 }, (_, i) => {
    const angle = (i * 60) * Math.PI / 180;
    const x1 = 80 + Math.cos(angle) * 16;
    const y1 = 80 + Math.sin(angle) * 16;
    const x2 = 80 + Math.cos(angle) * 62;
    const y2 = 80 + Math.sin(angle) * 62;
    return { x1, y1, x2, y2 };
  });
  return (
    <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.obj}>
      {/* Arm shadows */}
      {arms.map((a, i) => (
        <line key={`s${i}`} x1={a.x1 + 2} y1={a.y1 + 2} x2={a.x2 + 2} y2={a.y2 + 2}
              stroke={muted} strokeWidth="14" strokeLinecap="round" opacity="0.3" />
      ))}
      {/* Arms */}
      {arms.map((a, i) => (
        <line key={i} x1={a.x1} y1={a.y1} x2={a.x2} y2={a.y2}
              stroke={color} strokeWidth="14" strokeLinecap="round" />
      ))}
      {/* Centre disc */}
      <circle cx="80" cy="80" r="14" fill={color} />
      <circle cx="80" cy="80" r="7"  fill="#0A0A08" />
    </svg>
  );
}

function RaceHelmet({ color, muted }: ObjectProps) {
  return (
    <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.obj}>
      {/* Outer shell */}
      <path d="M 32 90 C 32 52 52 22 80 22 C 108 22 128 52 128 90 L 128 104 C 128 112 122 118 114 118 L 46 118 C 38 118 32 112 32 104 Z"
            fill={color} />
      {/* Visor cutout */}
      <path d="M 44 78 C 44 62 58 52 80 52 C 102 52 116 62 116 78 L 116 92 C 116 96 113 98 109 98 L 51 98 C 47 98 44 96 44 92 Z"
            fill={muted} opacity="0.85" />
      {/* Visor reflection */}
      <path d="M 50 60 C 56 54 66 52 76 52" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.35" />
      <path d="M 48 68 C 52 62 60 58 70 57" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.2" />
      {/* Chin guard */}
      <path d="M 46 118 L 46 128 C 46 130 48 132 50 132 L 110 132 C 112 132 114 130 114 128 L 114 118 Z"
            fill={color} opacity="0.7" />
      {/* Side air duct left */}
      <rect x="26" y="88" width="10" height="18" rx="3" fill={color} opacity="0.6" />
      <line x1="29" y1="91" x2="29" y2="103" stroke={muted} strokeWidth="1.5" opacity="0.5" />
      <line x1="33" y1="91" x2="33" y2="103" stroke={muted} strokeWidth="1.5" opacity="0.5" />
      {/* Side air duct right */}
      <rect x="124" y="88" width="10" height="18" rx="3" fill={color} opacity="0.6" />
      <line x1="127" y1="91" x2="127" y2="103" stroke={muted} strokeWidth="1.5" opacity="0.5" />
      <line x1="131" y1="91" x2="131" y2="103" stroke={muted} strokeWidth="1.5" opacity="0.5" />
      {/* Top fin */}
      <path d="M 76 22 L 80 10 L 84 22" fill={color} opacity="0.5" />
      {/* Helmet livery stripe */}
      <path d="M 44 82 L 116 82" stroke="white" strokeWidth="3" opacity="0.15" />
      {/* Number plate on chin */}
      <rect x="62" y="120" width="36" height="14" rx="3" fill={muted} opacity="0.4" />
      <text x="80" y="131" textAnchor="middle" fontFamily="monospace" fontSize="9"
            fontWeight="bold" fill="white" opacity="0.7">4</text>
    </svg>
  );
}


// ─── Headphones ───────────────────────────────────────────────────────────────

function Headphones({ color, muted }: ObjectProps) {
  return (
    <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.obj}>
      {/* Headband arc */}
      <path d="M 28 90 C 28 50 52 22 80 22 C 108 22 132 50 132 90"
            stroke={color} strokeWidth="10" strokeLinecap="round" fill="none" />
      {/* Headband highlight */}
      <path d="M 38 78 C 40 52 58 28 80 28"
            stroke="white" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.25" />
      {/* Left ear cup */}
      <rect x="16" y="84" width="28" height="40" rx="10" fill={color} />
      <rect x="20" y="90" width="20" height="28" rx="7"  fill={muted} opacity="0.6" />
      {/* Left cup shine */}
      <rect x="22" y="93" width="7" height="8" rx="3" fill="white" opacity="0.2" />
      {/* Right ear cup */}
      <rect x="116" y="84" width="28" height="40" rx="10" fill={color} />
      <rect x="120" y="90" width="20" height="28" rx="7"  fill={muted} opacity="0.6" />
      {/* Right cup shine */}
      <rect x="122" y="93" width="7" height="8" rx="3" fill="white" opacity="0.2" />
      {/* Cable */}
      <path d="M 80 138 C 80 148 90 150 90 148" stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.5" />
      {/* Sound wave dots */}
      <circle cx="80" cy="80" r="5" fill={color} opacity="0.4" />
      <circle cx="80" cy="80" r="12" stroke={color} strokeWidth="1.5" opacity="0.2" fill="none" />
      <circle cx="80" cy="80" r="20" stroke={color} strokeWidth="1"   opacity="0.1" fill="none" />
    </svg>
  );
}

// ─── Registry ─────────────────────────────────────────────────────────────────

const HERO_OBJECTS: Record<string, React.ComponentType<ObjectProps>> = {
  'hearing-aid':     Earbud,
  'project-alpha':   Cursor,
  'project-beta':    Chip,
  'project-gamma':   DiamondMark,
  'project-delta':   NeuralNode,
  'project-epsilon': AsteriskMark,
  'project-race':    RaceHelmet,
  'project-zeta':    Headphones,
};

// ─── Exported component ───────────────────────────────────────────────────────

interface HeroObjectProps {
  slug:    string;
  color:   string;
  muted:   string;
}

export default function HeroObject({ slug, color, muted }: HeroObjectProps) {
  const ObjectComponent = HERO_OBJECTS[slug];
  if (!ObjectComponent) return null;

  return (
    <div className={styles.wrapper}>
      <div className={styles.glow} style={{ background: color }} />
      <ObjectComponent color={color} muted={muted} />
    </div>
  );
}