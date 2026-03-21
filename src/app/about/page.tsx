'use client';

import { useState } from 'react';
import ResumeViewer from '../components/resumeViewer';
import styles from './about.module.css';

const SKILLS = [
  // Frontend
  { name: 'React',       cat: 'Frontend',   level: 90 },
  { name: 'Next.js',     cat: 'Frontend',   level: 88 },
  { name: 'TypeScript',  cat: 'Frontend',   level: 82 },
  { name: 'CSS / Sass',  cat: 'Frontend',   level: 85 },
  // Backend
  { name: 'Node.js',     cat: 'Backend',    level: 78 },
  { name: 'Python',      cat: 'Backend',    level: 72 },
  { name: 'PostgreSQL',  cat: 'Backend',    level: 70 },
  // Tooling
  { name: 'Git',         cat: 'Tooling',    level: 90 },
  { name: 'Figma',       cat: 'Tooling',    level: 80 },
  { name: 'Docker',      cat: 'Tooling',    level: 60 },
  // Soft
  { name: 'Design Systems', cat: 'Design',  level: 85 },
  { name: 'Motion Design',  cat: 'Design',  level: 74 },
];

const CATS = ['All', 'Frontend', 'Backend', 'Tooling', 'Design'];

const CAT_COLOURS: Record<string, string> = {
  Frontend: '#3B82F6',
  Backend:  '#10B981',
  Tooling:  '#F59E0B',
  Design:   '#EC4899',
};

export default function About() {
  const [active, setActive] = useState('All');
  const [hovered, setHovered] = useState<string | null>(null);

  const visible = active === 'All' ? SKILLS : SKILLS.filter(s => s.cat === active);

  return (
    <main className={styles.page}>
      <div className={styles.layout}>

        {/* Left — resume viewer */}
        <div className={styles.left}>
          <ResumeViewer />
        </div>

        {/* Right — skills */}
        <div className={styles.right}>
          <p className={styles.label}>Skills</p>

          {/* Category filter pills */}
          <div className={styles.filters}>
            {CATS.map(c => (
              <button
                key={c}
                className={`${styles.filterBtn} ${active === c ? styles.filterActive : ''}`}
                style={active === c && c !== 'All'
                  ? { background: CAT_COLOURS[c], borderColor: CAT_COLOURS[c], color: '#fff' }
                  : {}}
                onClick={() => setActive(c)}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Skill bars */}
          <div className={styles.skillList}>
            {visible.map(s => (
                <div
                    key={s.name}
                    className={styles.skillRow}
                >
                    <span className={styles.skillName}>{s.name}</span>
                    <span
                    className={styles.skillCatPill}
                    style={{ background: CAT_COLOURS[s.cat] + '22', color: CAT_COLOURS[s.cat] }}
                    >
                    {s.cat}
                    </span>
                </div>
                ))}
          </div>
        </div>

      </div>
    </main>
  );
}