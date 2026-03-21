'use client';

import React, { useEffect, useState, useRef } from 'react';
import styles from '../styles/main.module.css';
import getCurrentDateFormatted from './date';
import Image from 'next/image';

// ─── Data ─────────────────────────────────────────────────────────────────────

const HIGHLIGHTS = [
  { label: 'Project Alpha', sub: 'Web Design · Mar 2025',    slug: '/projects/project-alpha'  },
  { label: 'Project Beta',  sub: 'Mobile App · Jan 2025',    slug: '/projects/project-beta'   },
  { label: 'Project Gamma', sub: 'Branding · Nov 2024',      slug: '/projects/project-gamma'  },
  { label: 'Project Zeta',  sub: 'Sound & Brand · Apr 2025', slug: '/projects/project-zeta'   },
];

const WIP_ITEMS = [
  {
    title: 'Portfolio v3',
    tag:   'Design System',
    body:  'A full ground-up redesign of this portfolio — new design tokens, a unified component library, and a CMS-driven project data layer so adding work takes seconds, not code changes.',
  },
  {
    title: 'Open-source CLI tool',
    tag:   'Developer Tooling',
    body:  'A command-line utility that scaffolds opinionated Next.js projects with pre-wired ESLint, Tailwind, and a sensible folder structure. Currently in private beta with a few friends.',
  },
  {
    title: 'Audio visualiser experiment',
    tag:   'Creative Coding',
    body:  'A WebGL canvas that reacts to microphone input in real time — frequency bands drive particle density, amplitude drives colour temperature. Early proof-of-concept stage.',
  },
];

// ─── Rotating orbit carousel ──────────────────────────────────────────────────

function ArcCarousel() {
  const clipRef  = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const rafRef   = useRef<number>(0);
  const angleRef = useRef<number>(0); // radians, increases = clockwise on screen

  useEffect(() => {
    const clip = clipRef.current;
    if (!clip) return;

    const SPEED = 0.0008; // radians per frame (~14s per revolution at 60fps)

    const tick = () => {
      angleRef.current += SPEED;

      const W  = clip.offsetWidth;
      const H  = clip.offsetHeight;          // = radius
      const cx = W / 2;
      const cy = H;                           // orbit centre sits at bottom edge of clip
      const R  = H * 0.80;                   // orbit radius — slightly less than H

      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        // Clockwise on screen: x = cx + R·cos(a), y = cy - R·sin(a)
        // Spread 4 cards 90° apart (π/2 radians)
        const a = angleRef.current + (i * Math.PI) / 2;
        const x = cx + R * Math.cos(a);
        const y = cy - R * Math.sin(a);
        // Centre the card on the computed point
        card.style.left = x + 'px';
        card.style.top  = y + 'px';
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div className={styles.arcClip} ref={clipRef}>
      {HIGHLIGHTS.map((h, i) => (
        <a
          key={h.label}
          href={h.slug}
          className={styles.arcCard}
          ref={el => { cardRefs.current[i] = el; }}
        >
          <span className={styles.arcCardLabel}>{h.label}</span>
          <span className={styles.arcCardSub}>{h.sub}</span>
        </a>
      ))}
    </div>
  );
}

// ─── Accordion item ───────────────────────────────────────────────────────────

function AccordionItem({ title, tag, body }: { title: string; tag: string; body: string }) {
  const [open, setOpen] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  return (
    <div className={`${styles.accordionItem} ${open ? styles.accordionOpen : ''}`}>
      <button className={styles.accordionTrigger} onClick={() => setOpen(o => !o)}>
        <span className={styles.accordionTitle}>{title}</span>
        <span className={styles.accordionTag}>{tag}</span>
        <span className={styles.accordionChevron}>{open ? '−' : '+'}</span>
      </button>
      <div
        ref={bodyRef}
        className={styles.accordionBody}
        style={{ maxHeight: open ? bodyRef.current?.scrollHeight + 'px' : '0px' }}
      >
        <p className={styles.accordionText}>{body}</p>
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function MainContent() {
  const [date, setDate] = useState('');

  useEffect(() => {
    setDate(getCurrentDateFormatted());
  }, []);

  return (
    <section>

      {/* ── CTA block ────────────────────────────────────────────────────── */}
      <div className={styles.CTA}>
        <div className={styles.ctaContent}>
          <p className={styles.date}>{date}</p>
          <div className={styles.about}>
        <p className={styles.aboutLabel}>About</p>
        <h2 className={styles.aboutHeading}>Hi, I'm Deric.</h2>
        <p className={styles.aboutBody}>
          I'm a full-stack developer and designer focused on building
          things that are fast, considered, and a little bit unexpected. I work across the full
          stack but lean toward the interface layer, where code and craft meet.
        </p>
        <p className={styles.aboutBody}>
          When I'm not pushing pixels I'm usually tinkering with side projects, contributing to
          open-source, or listening to music louder than I should.
        </p>
      </div>
          <div className={styles.ctaButton} onClick={() => window.location.href = '/about'}>
            <h2>Read More →</h2>
          </div>
        </div>
        <div className={styles.ctaImage}>
          <Image src="/assets/ctaImage.png" alt="Under Construction" width={562} height={398} />
        </div>
      </div>

      {/* ── Rotating arc carousel ─────────────────────────────────────────── */}
      <div className={styles.arcSection}>
        <p className={styles.aboutLabel}>Highlights</p>
        <ArcCarousel />
      </div>

      {/* ── WIP accordion ────────────────────────────────────────────────── */}
      <div className={styles.wipSection}>
        <p className={styles.aboutLabel}>Currently building</p>
        <div className={styles.accordionList}>
          {WIP_ITEMS.map(item => (
            <AccordionItem key={item.title} {...item} />
          ))}
        </div>
      </div>

    </section>
  );
}