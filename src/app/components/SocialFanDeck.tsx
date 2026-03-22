'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from '../styles/SocialFanDeck.module.css';

interface SocialLink {
  label: string;
  href:  string;
}

const SOCIAL_LINKS: SocialLink[] = [
  { label: 'Instagram', href: 'https://www.instagram.com/dericjojo10/'               },
  { label: 'GitHub',    href: 'https://github.com/JackitudilinksG'                   },
  { label: 'LinkedIn',  href: 'https://www.linkedin.com/in/deric-jojo-0594a7271/'    },
];

const CARD_IMAGES = [
  'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=480&q=80',
  '/assets/socialFanDeck/hackfest.jpg',
  '/assets/socialFanDeck/insta2.webp',
  '/assets/socialFanDeck/manthan_speech.jpg',
  '/assets/socialFanDeck/random_1.jpg',
  '/assets/socialFanDeck/insta1.webp',
  '/assets/socialFanDeck/insta3.jpg',
];

// ─── Dynamic state generation ─────────────────────────────────────────────────

type CardState = [number, number, number, number, number]; // tx, ty, rot, scale, zIndex

/**
 * Generates FINAL_STATE for any number of cards.
 * Cards fan symmetrically — the centre card is upright,
 * outer cards rotate and drop progressively.
 * Max spread adapts so all cards stay visible.
 */
function buildFinalState(n: number): CardState[] {
  const MAX_SPREAD_REM = 11;   // half-width of the full fan in rem
  const MAX_ROT_DEG    = 20;   // max rotation at outermost card
  const MAX_DROP_REM   = 6;    // max vertical drop at outermost card

  return Array.from({ length: n }, (_, i) => {
    // Normalise position: -1 (leftmost) → 0 (centre) → +1 (rightmost)
    const t      = n === 1 ? 0 : (i / (n - 1)) * 2 - 1;
    const tx     = t * MAX_SPREAD_REM;
    const ty     = (t * t) * MAX_DROP_REM;   // parabolic drop — centre lowest
    const rot    = t * MAX_ROT_DEG;
    const scale  = 1 - Math.abs(t) * 0.22;  // outer cards slightly smaller
    const zIndex = i === Math.floor(n / 2) ? 10 : n - Math.abs(i - Math.floor(n / 2));
    return [tx, ty, rot, scale, zIndex] as CardState;
  });
}

/**
 * Collapsed start — all cards near-centre, tiny spread.
 */
function buildStartState(n: number): CardState[] {
  return Array.from({ length: n }, (_, i) => {
    const t      = n === 1 ? 0 : (i / (n - 1)) * 2 - 1;
    const tx     = t * 2;
    const ty     = (t * t) * 3;
    const rot    = t * 4;
    const scale  = 1 - Math.abs(t) * 0.08;
    const zIndex = i === Math.floor(n / 2) ? 10 : n - Math.abs(i - Math.floor(n / 2));
    return [tx, ty, rot, scale, zIndex] as CardState;
  });
}

/**
 * Fan-out order: centre first, then alternate left/right outward.
 */
function buildFanOrder(n: number): number[] {
  const centre = Math.floor(n / 2);
  const order  = [centre];
  for (let d = 1; d <= centre; d++) {
    if (centre - d >= 0) order.push(centre - d);
    if (centre + d < n)  order.push(centre + d);
  }
  return order;
}

// ─────────────────────────────────────────────────────────────────────────────

const STAGGER_MS    = 65;
const FAN_DURATION  = 780;
const FAN_EASE      = 'cubic-bezier(0.34, 1.20, 0.64, 1)';
const HOVER_EASE    = 'cubic-bezier(0.22, 1, 0.36, 1)';

function toTransform([tx, ty, rot, sc]: CardState): string {
  return `translate(${tx}rem, ${ty}rem) rotate(${rot}deg) scale(${sc})`;
}

export default function SocialFanDeck() {
  const n           = CARD_IMAGES.length;
  const finalState  = buildFinalState(n);
  const startState  = buildStartState(n);
  const fanOrder    = buildFanOrder(n);

  const cardRefs   = useRef<(HTMLDivElement | null)[]>([]);
  const hoverBound = useRef(false);

  function applyInstant(i: number, state: CardState) {
    const el = cardRefs.current[i];
    if (!el) return;
    el.style.transition = 'none';
    el.style.zIndex     = String(state[4]);
    el.style.transform  = toTransform(state);
  }

  function applyAnimated(i: number, state: CardState) {
    const el = cardRefs.current[i];
    if (!el) return;
    el.style.zIndex     = String(state[4]);
    el.style.transition = `transform ${FAN_DURATION}ms ${FAN_EASE}`;
    el.style.transform  = toTransform(state);
  }

  function bindHover(i: number) {
    const el = cardRefs.current[i];
    if (!el) return;
    el.addEventListener('mouseenter', () => {
      const [tx, ty, rot, sc] = finalState[i];
      el.style.transition = `transform 0.32s ${HOVER_EASE}`;
      el.style.zIndex     = '20';
      el.style.transform  =
        `translate(${tx}rem, calc(${ty}rem - 28px)) rotate(${rot}deg) scale(${sc * 1.10})`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transition = `transform 0.32s ${HOVER_EASE}`;
      el.style.zIndex     = String(finalState[i][4]);
      el.style.transform  = toTransform(finalState[i]);
    });
  }

  function runIntro() {
    hoverBound.current = false;
    cardRefs.current.forEach((_, i) => applyInstant(i, startState[i]));

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        fanOrder.forEach((cardIndex, step) => {
          setTimeout(() => applyAnimated(cardIndex, finalState[cardIndex]), step * STAGGER_MS);
        });

        const totalDelay = fanOrder.length * STAGGER_MS + FAN_DURATION;
        setTimeout(() => {
          if (!hoverBound.current) {
            cardRefs.current.forEach((_, i) => bindHover(i));
            hoverBound.current = true;
          }
        }, totalDelay);
      });
    });
  }

  useEffect(() => {
    const t = setTimeout(runIntro, 120);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.deckWrap}>
        {CARD_IMAGES.map((src, i) => (
          <div
            key={i}
            className={styles.card}
            ref={el => { cardRefs.current[i] = el; }}
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="160px"
              draggable={false}
              style={{ objectFit: 'cover', pointerEvents: 'none', userSelect: 'none' }}
            />
          </div>
        ))}
      </div>

      <div className={styles.headingBlock}>
        <span className={styles.headingRegular}>what's up</span>
        <span className={styles.headingSerif}>On Socials</span>
      </div>

      <p className={styles.introText}>Follow along on social media</p>

      <nav className={styles.links}>
        {SOCIAL_LINKS.map(({ label, href }) => (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer" className={styles.link}>
            {label}
          </a>
        ))}
      </nav>
    </section>
  );
}