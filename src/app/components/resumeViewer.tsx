'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import styles from '../styles/resumeViewer.module.css';

// ── Put your resume PDF in /public and update this path ──
const RESUME_PATH = '/assets/DericJojoResume.pdf';

export default function ResumeViewer() {
  const containerRef  = useRef<HTMLDivElement>(null);
  const tooltipRef    = useRef<HTMLDivElement>(null);
  const [hovering, setHovering]   = useState(false);

  const onMouseMove = useCallback((e: MouseEvent) => {
    const tooltip = tooltipRef.current;
    const container = containerRef.current;
    if (!tooltip || !container) return;

    // Position tooltip relative to the container so it doesn't need fixed coords
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    tooltip.style.left = `${x + 18}px`;
    tooltip.style.top  = `${y - 14}px`;
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.addEventListener('mousemove', onMouseMove);
    return () => container.removeEventListener('mousemove', onMouseMove);
  }, [onMouseMove]);

  const handleClick = () => {
    const a = document.createElement('a');
    a.href     = RESUME_PATH;
    a.download = 'Deric_Jojo_Resume.pdf';
    a.click();
  };

  return (
    <div
      ref={containerRef}
      className={styles.container}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onClick={handleClick}
    >
      {/* Tooltip that follows the cursor */}
      <div
        ref={tooltipRef}
        className={`${styles.tooltip} ${hovering ? styles.tooltipVisible : ''}`}
        aria-hidden
      >
        ↓ Download resume
      </div>

      {/* PDF embed — object avoids loading the Next.js shell on error */}
      <object
        data={RESUME_PATH}
        type="application/pdf"
        className={styles.pdf}
        aria-label="Resume"
      >
        <p style={{ padding: '2rem', color: 'var(--foreground)', margin: 0 }}>
          PDF preview unavailable — click anywhere to download.
        </p>
      </object>

      {/* Transparent click-capture overlay so clicks on the iframe still trigger download */}
      <div className={styles.overlay} aria-hidden />
    </div>
  );
}