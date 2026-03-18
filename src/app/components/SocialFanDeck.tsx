'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from '../styles/SocialFanDeck.module.css';

interface SocialLink {
  label: string;
  href:  string;
}

const SOCIAL_LINKS: SocialLink[] = [
  { label: 'Instagram', href: 'https://instagram.com/yourusername'                    },
  { label: 'GitHub',    href: 'https://github.com/JackitudilinksG'                    },
  { label: 'LinkedIn',  href: 'https://www.linkedin.com/in/deric-jojo-0594a7271/'     },
  { label: 'Twitter',   href: 'https://twitter.com/yourusername'                      },
];

// Placeholder images — warm editorial tones that complement most themes
const CARD_IMAGES = [
  'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=480&q=80',
  'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=480&q=80',
  'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=480&q=80',
  'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=480&q=80',
  'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=480&q=80',
  'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=480&q=80',
  'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=480&q=80',
];

// [translateX (rem), translateY (rem), rotate (deg), scale, zIndex]
type CardState = [number, number, number, number, number];

const FINAL_STATE: CardState[] = [
  [-15,  7.3, -21, 0.7756, 1],
  [-11,  4,   -14, 0.8498, 2],
  [ -6,  1.3,  -7, 0.9346, 3],
  [  0,  0,     0, 1,     10],
  [  6,  1.3,   7, 0.9346, 3],
  [ 11,  4,    14, 0.8498, 2],
  [ 15,  7.3,  21, 0.7756, 1],
];

// Collapsed start — cards stacked tightly at centre
const START_STATE: CardState[] = [
  [-2.5, 3.5,  -4,  0.92, 1],
  [-1.8, 2.4,  -2.5, 0.94, 2],
  [-1,   1.2,  -1,  0.96, 3],
  [ 0,   0,     0,  1,   10],
  [ 1,   1.2,   1,  0.96, 3],
  [ 1.8, 2.4,   2.5, 0.94, 2],
  [ 2.5, 3.5,   4,  0.92, 1],
];

// Fan-out order: center first, then alternate outward
const FAN_ORDER = [3, 2, 4, 1, 5, 0, 6];
const STAGGER_MS = 65;
const FAN_DURATION_MS = 780;
const FAN_EASE = 'cubic-bezier(0.34, 1.20, 0.64, 1)';
const HOVER_EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';

function toTransform([tx, ty, rot, sc]: CardState): string {
  return `translate(${tx}rem, ${ty}rem) rotate(${rot}deg) scale(${sc})`;
}

export default function SocialFanDeck() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const hoverBound = useRef(false);

  function applyInstant(index: number, state: CardState) {
    const el = cardRefs.current[index];
    if (!el) return;
    el.style.transition = 'none';
    el.style.zIndex     = String(state[4]);
    el.style.transform  = toTransform(state);
  }

  function applyAnimated(index: number, state: CardState, delay: number) {
    const el = cardRefs.current[index];
    if (!el) return;
    el.style.zIndex     = String(state[4]);
    el.style.transition = `transform ${FAN_DURATION_MS}ms ${FAN_EASE} ${delay}ms`;
    el.style.transform  = toTransform(state);
  }

  function bindHover(index: number) {
    const el = cardRefs.current[index];
    if (!el) return;

    el.addEventListener('mouseenter', () => {
      const [tx, ty, rot, sc] = FINAL_STATE[index];
      el.style.transition = `transform 0.32s ${HOVER_EASE}`;
      el.style.zIndex     = '20';
      el.style.transform  =
        `translate(${tx}rem, calc(${ty}rem - 28px)) rotate(${rot}deg) scale(${sc * 1.10})`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transition = `transform 0.32s ${HOVER_EASE}`;
      el.style.zIndex     = String(FINAL_STATE[index][4]);
      el.style.transform  = toTransform(FINAL_STATE[index]);
    });
  }

  function runIntro() {
    hoverBound.current = false;

    // 1. Snap all cards to collapsed state
    cardRefs.current.forEach((_, i) => applyInstant(i, START_STATE[i]));

    // 2. Next paint → animate to final fan positions with stagger
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        FAN_ORDER.forEach((cardIndex, step) => {
          setTimeout(() => {
            applyAnimated(cardIndex, FINAL_STATE[cardIndex], 0);
          }, step * STAGGER_MS);
        });

        // 3. Attach hover listeners after animation completes
        const totalDelay = FAN_ORDER.length * STAGGER_MS + FAN_DURATION_MS;
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
    // Small mount delay so images have started loading
    const t = setTimeout(runIntro, 120);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className={styles.section}>
      {/* Fan deck */}
      <div className={styles.deckWrap}>
        {CARD_IMAGES.map((src, i) => (
          <div
            key={i}
            className={styles.card}
            ref={el => { cardRefs.current[i] = el; }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <Image src={src} alt="" fill sizes="160px" draggable={false} style={{ objectFit: 'cover', pointerEvents: 'none', userSelect: 'none' }} />
          </div>
        ))}
      </div>

      {/* Heading */}
      <div className={styles.headingBlock}>
        <span className={styles.headingRegular}>what's up</span>
        <span className={styles.headingSerif}>On Socials</span>
      </div>

      {/* Intro line */}
      <p className={styles.introText}>Follow along on social media</p>

      {/* Social links */}
      <nav className={styles.links}>
        {SOCIAL_LINKS.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            {label}
          </a>
        ))}
      </nav>
    </section>
  );
}