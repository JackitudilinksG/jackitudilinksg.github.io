'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import type { ProjectContent, HeroToken } from './projectData';
import type { ProjectTheme } from './themes';
import styles from './ProjectTemplate.module.css';
import HeroObject from './Heroobjects';

interface Props {
  project: ProjectContent;
  theme:   ProjectTheme;
}

const ANIM_CLASS: Record<string, string> = {
  'fade-rise':    styles.animFadeRise,
  'slide-reveal': styles.animSlideReveal,
  'zoom-blur':    styles.animZoomBlur,
  'wipe':         styles.animWipe,
};

function useThemeVars(theme: ProjectTheme) {
  useEffect(() => {
    const el = document.getElementById('project-root') as HTMLElement | null;
    if (!el) return;
    const vars: Record<string, string> = {
      '--pt-bg':           theme.bg,
      '--pt-surface':      theme.surface,
      '--pt-accent':       theme.accent,
      '--pt-accent-text':  theme.accentText,
      '--pt-text':         theme.text,
      '--pt-muted':        theme.muted,
      '--pt-border':       theme.border,
      '--pt-heading-font': theme.headingFont,
      '--pt-body-font':    theme.bodyFont,
      '--pt-ease':         theme.ease,
      '--pt-duration':     theme.duration,
    };
    for (const [k, v] of Object.entries(vars)) el.style.setProperty(k, v);
  }, [theme]);
}

function useFontImport(url: string) {
  useEffect(() => {
    const id = 'project-font-import';
    document.getElementById(id)?.remove();
    const link = document.createElement('link');
    link.id = id; link.rel = 'stylesheet'; link.href = url;
    document.head.appendChild(link);
    return () => { document.getElementById(id)?.remove(); };
  }, [url]);
}

function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add(styles.visible);
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(`.${styles.reveal}`).forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ─── Ruler strip (reused across panels aesthetic) ─────────────────────────────
function PanelsRuler({ label }: { label?: string }) {
  const text = label ?? 'Project Zeta';
  const repeated = Array.from({ length: 6 }, () => text);
  return (
    <div className={styles.panelsRuler}>
      <div className={styles.panelsRulerDot} />
      {repeated.map((t, i) => (
        <span key={i} style={{ display: 'contents' }}>
          <span className={styles.panelsRulerLabel}>{t}</span>
          {i < repeated.length - 1 && <span className={styles.panelsRulerLine} />}
        </span>
      ))}
      <div className={styles.panelsRulerDot} />
    </div>
  );
}

// ─── Decorations ──────────────────────────────────────────────────────────────

function AsteriskSVG({ className }: { className: string }) {
  const arms = Array.from({ length: 6 }, (_, i) => {
    const angle = (i * 60) * Math.PI / 180;
    return {
      x1: 50 + Math.cos(angle) * 10, y1: 50 + Math.sin(angle) * 10,
      x2: 50 + Math.cos(angle) * 48, y2: 50 + Math.sin(angle) * 48,
    };
  });
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden>
      {arms.map((a, i) => (
        <line key={i} x1={a.x1} y1={a.y1} x2={a.x2} y2={a.y2}
              stroke="currentColor" strokeWidth="9" strokeLinecap="round" />
      ))}
      <circle cx="50" cy="50" r="9" fill="currentColor" />
    </svg>
  );
}

function Decoration({ style, marqueeText }: { style: ProjectTheme['decor']; marqueeText?: string }) {
  if (style === 'asterisk') return (
    <>
      <AsteriskSVG className={styles.decorAsterisk} />
      <AsteriskSVG className={styles.decorAsteriskOutline} />
    </>
  );
  if (style === 'marquee') {
    const doubled = (marqueeText ?? 'COMING SOON ✦ ') + (marqueeText ?? 'COMING SOON ✦ ');
    return (
      <div className={styles.decorMarqueeWrap} aria-hidden>
        <div className={styles.decorMarqueeTrack}><span>{doubled}</span></div>
      </div>
    );
  }
  // grid-rules: no global decoration — rulers are embedded per-section
  if (style === 'grid-rules') return null;
  if (style === 'grain') return (
    <svg className={styles.decorGrain} xmlns="http://www.w3.org/2000/svg" width="200" height="200">
      <filter id="grain-filter">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
        <feColorMatrix type="saturate" values="0"/>
      </filter>
      <rect width="100%" height="100%" filter="url(#grain-filter)" opacity="0.04"/>
    </svg>
  );
  if (style === 'geometric') return (
    <div className={styles.decorGeometric} aria-hidden>
      {[...Array(6)].map((_, i) => (
        <div key={i} className={styles.decorCircle} style={{ '--i': i } as React.CSSProperties} />
      ))}
    </div>
  );
  if (style === 'noise-mesh') return <div className={styles.decorMesh} aria-hidden />;
  if (style === 'track-lines') return (
    <svg className={styles.decorTrack} viewBox="0 0 1440 900"
         preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M -60 820 C 120 820 180 640 320 580 S 520 480 600 360 S 740 120 900 80 S 1100 60 1200 140 S 1380 320 1500 280"
            stroke="currentColor" strokeWidth="2.5" fill="none" opacity="0.12" />
      <path d="M -60 840 C 120 840 185 660 325 600 S 530 500 610 380 S 750 140 910 100 S 1110 80 1210 160 S 1390 340 1510 300"
            stroke="currentColor" strokeWidth="1" fill="none" opacity="0.07" />
      {[200, 400, 600, 800, 1000, 1200].map((x, i) => (
        <rect key={i} x={x} y={i % 2 === 0 ? 870 : 860} width="40" height="8" rx="2" fill="currentColor" opacity="0.08" />
      ))}
    </svg>
  );
  return null;
}

// ─── Hero variants ────────────────────────────────────────────────────────────

function StatementHero({ tokens, type, date, cutout }: { tokens: HeroToken[]; type: string; date?: string; cutout?: boolean }) {
  return (
    <section className={`${styles.heroTypographic} ${cutout ? styles.cutoutHero : ''} ${styles.reveal} ${styles.visible} ${styles.aboveDecor}`}>
      <div className={styles.heroStatement}>
        {tokens.map((t, i) => {
          if (t.accent) return <span key={i} className={styles.heroTokenAccent}>{t.text}</span>;
          if (t.serif)  return <span key={i} className={styles.heroTokenSerif}>{t.text}</span>;
          return <span key={i} className={styles.heroToken}>{t.text}</span>;
        })}
      </div>
      <p className={styles.heroTypographicMeta}>{type}{date && ` — ${date}`}</p>
    </section>
  );
}

function PanelsHero({ project, theme }: { project: ProjectContent; theme: ProjectTheme }) {
  const { heroImage, heroImageAlt, title, type, date } = project;
  return (
    <section className={`${styles.heroPanels} ${styles.reveal} ${styles.visible} ${styles.aboveDecor}`}>
      {/* Ruler across top */}
      <div className={styles.heroPanelsRuler}>
        <PanelsRuler label={project.title.split(':')[0]} />
      </div>

      {/* Left — orange + title */}
      <div className={styles.heroPanelLeft}>
        <div className={styles.heroPanelToggle}>
          <div className={styles.heroPanelToggleDot} />
        </div>
        <h1 className={styles.heroPanelTitle}>{title.split(':')[1]?.trim() || title}</h1>
      </div>

      {/* Centre — photo */}
      <div className={styles.heroPanelPhoto}>
        <img src={heroImage} alt={heroImageAlt} className={styles.heroPanelImg} />
      </div>

      {/* Right — cream + badge */}
      <div className={styles.heroPanelRight}>
        <div className={styles.heroPanelGlow} />
        <div className={styles.heroPanelBadge}>
          <span className={styles.heroPanelBadgeText}>
            {project.title.split(':')[0]}
          </span>
        </div>
      </div>
    </section>
  );
}

// ─── Numbered rule card ───────────────────────────────────────────────────────

function NumberedCard({ index, body }: { index: number; body: string }) {
  const num = String(index + 1).padStart(2, '0');
  return (
    <div className={styles.numberedCard}>
      <span className={styles.numberedCardNum}>{num}</span>
      <div className={styles.numberedCardBody}>
        <span className={styles.numberedCardLabel}>Rule to follow</span>
        <p className={styles.numberedCardText}>{body}</p>
      </div>
    </div>
  );
}

// ─── Template ─────────────────────────────────────────────────────────────────

export default function ProjectTemplate({ project, theme }: Props) {
  useThemeVars(theme);
  useFontImport(theme.fontImport);
  useReveal();

  const animClass  = ANIM_CLASS[theme.animation] ?? styles.animFadeRise;
  const above      = styles.aboveDecor;
  const isCutout   = theme.decor === 'asterisk';
  const isPanels   = theme.heroStyle === 'panels';
  const isMarquee  = theme.decor === 'marquee';
  const bodySurface = isMarquee ? styles.surfaceSection : '';

  const {
    heroImage, heroImageAlt, heroStatement,
    type, date, title, tagline, overviewBody, stats,
    featureImage, featureImageAlt, featureCaption,
    sections, gallery,
    closingHeading, closingBody, tags,
  } = project;

  const numberedSections = sections.filter(s => s.numbered);
  const standardSections = sections.filter(s => !s.numbered);

  // ── Panels layout (project-zeta) — completely custom page structure ──────
  if (isPanels) {
    return (
      <div id="project-root" className={`${styles.root} ${animClass}`}>
        <Decoration style={theme.decor} />

        {/* Hero — 3-panel split */}
        <PanelsHero project={project} theme={theme} />

        {/* Ruler */}
        <PanelsRuler label={title.split(':')[0]} />

        {/* Overview — 2-col text + stats */}
        <section className={`${styles.panelsOverview} ${styles.reveal} ${above}`}>
          <div className={styles.panelsOverviewLeft}>
            <div className={styles.panelsToggle}>
              <div className={styles.panelsToggleSwitch}>
                <div className={styles.panelsToggleDot} />
              </div>
              <span className={styles.panelsToggleLabel}>{type}{date && ` · ${date}`}</span>
            </div>
            <div className={styles.panelsAccentBar} />
            <h2 className={styles.panelsOverviewHeading}>{tagline}</h2>
            <p  className={styles.panelsOverviewBody}>{overviewBody}</p>
          </div>
          <div className={styles.panelsOverviewRight}>
            {stats && (
              <div className={styles.panelsStatRow}>
                {stats.map(s => (
                  <div key={s.label} className={styles.panelsStat}>
                    <span className={styles.panelsStatValue}>{s.value}</span>
                    <span className={styles.panelsStatLabel}>{s.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Full-bleed photo section with floating meta + watermark */}
        {featureImage && (
          <>
            <PanelsRuler label={title.split(':')[0]} />
            <section className={`${styles.panelsPhotoSection} ${styles.reveal} ${above}`}>
              <img src={featureImage} alt={featureImageAlt ?? ''} className={styles.panelsPhotoSectionImg} />
              <div className={styles.panelsPhotoOverlay} />
              {stats && (
                <div className={styles.panelsPhotoMeta}>
                  {stats.map(s => (
                    <div key={s.label} className={styles.panelsPhotoMetaItem}>
                      <span className={styles.panelsPhotoMetaLabel}>{s.label}</span>
                      <span className={styles.panelsPhotoMetaValue}>{s.value}</span>
                    </div>
                  ))}
                </div>
              )}
              {theme.panelTagline && (
                <div className={styles.panelsWatermark}>{theme.panelTagline}</div>
              )}
            </section>
          </>
        )}

        {/* Ruler */}
        <PanelsRuler label={title.split(':')[0]} />

        {/* Content sections — alternating photo | text panels */}
        {standardSections.map((s, i) => (
          <section
            key={i}
            className={`${s.imagePosition === 'left' ? styles.panelsSectionReversed : styles.panelsSection} ${styles.reveal} ${above}`}
          >
            <div className={styles.panelsSectionText}>
              <span className={styles.panelsSectionLabel}>{type}</span>
              <h2 className={styles.panelsSectionHeading}>{s.heading}</h2>
              <p  className={styles.panelsSectionBody}>{s.body}</p>
            </div>
            {s.image && (
              <div className={styles.panelsSectionImgWrap}>
                <img src={s.image} alt={s.imageAlt ?? ''} className={styles.panelsSectionImg} />
              </div>
            )}
          </section>
        ))}

        {/* Ruler */}
        <PanelsRuler label={title.split(':')[0]} />

        {/* Gallery */}
        {gallery && gallery.length > 0 && (
          <section className={`${styles.panelsGallery} ${styles.reveal} ${above}`}>
            {gallery.map((g, i) => (
              <div key={i} className={styles.panelsGalleryItem}>
                <img src={g.src} alt={g.alt} className={styles.panelsGalleryImg} />
              </div>
            ))}
          </section>
        )}

        {/* Closing — split orange | cream */}
        <section className={`${styles.panelsClosing} ${styles.reveal} ${above}`}>
          <div className={styles.panelsClosingLeft}>
            <div>
              <h2 className={styles.panelsClosingHeading}>{closingHeading}</h2>
              <p  className={styles.panelsClosingBody}>{closingBody}</p>
            </div>
            <Link href="/projects" className={styles.panelsBack}>← Back to projects</Link>
          </div>
          <div className={styles.panelsClosingRight}>
            <p className={styles.panelsClosingBodyDark}>
              {overviewBody}
            </p>
            {tags && (
              <div className={styles.panelsTags}>
                {tags.map(t => <span key={t} className={styles.panelsTag}>{t}</span>)}
              </div>
            )}
          </div>
        </section>
      </div>
    );
  }

  // ── All other layouts ────────────────────────────────────────────────────
  return (
    <div
      id="project-root"
      className={`${styles.root} ${animClass} ${isMarquee ? styles.hasMarquee : ''}`}
    >
      <Decoration style={theme.decor} marqueeText={theme.marqueeText} />

      {/* § 1 — Hero */}
      {theme.heroStyle === 'typographic' && heroStatement ? (
        <StatementHero tokens={heroStatement} type={type} date={date} cutout={isCutout} />
      ) : theme.heroStyle === 'split' ? (
        <section className={`${styles.hero} ${styles.heroSplit} ${styles.reveal} ${styles.visible} ${above}`}>
          <div className={styles.heroSplitWrap}>
            <img src={heroImage} alt={heroImageAlt} className={styles.heroImage} />
            <div className={styles.heroOverlay} style={{ background: theme.heroOverlay }} />
          </div>
          <HeroObject slug={project.slug} color={theme.accent} muted={theme.muted} />
          <div className={styles.heroSplitContent}>
            <p className={`${styles.heroMeta} ${styles.heroMetaDark}`}>{type}{date && ` — ${date}`}</p>
            <h1 className={`${styles.heroTitle} ${styles.heroTitleDark}`}>{title}</h1>
          </div>
        </section>
      ) : (
        <section className={`${styles.hero} ${styles.reveal} ${styles.visible} ${above}`}>
          <div className={styles.heroImageWrap}>
            <img src={heroImage} alt={heroImageAlt} className={styles.heroImage} />
            <div className={styles.heroOverlay} style={{ background: theme.heroOverlay }} />
          </div>
          <HeroObject slug={project.slug} color={theme.accent} muted={theme.muted} />
          <div className={styles.heroContent}>
            <p className={styles.heroMeta}>{type}{date && ` — ${date}`}</p>
            <h1 className={`${styles.heroTitle} ${theme.heroStyle === 'outlined-title' ? styles.heroTitleOutlined : ''}`}>
              {title}
            </h1>
          </div>
        </section>
      )}

      {/* § 2 — Overview */}
      {isCutout && stats ? (
        <section className={`${styles.cutoutStats} ${styles.reveal} ${above}`}>
          {stats.map(s => (
            <div key={s.label} className={styles.cutoutStat}>
              <span className={styles.cutoutStatValue}>{s.value}</span>
              <span className={styles.cutoutStatLabel}>{s.label}</span>
            </div>
          ))}
        </section>
      ) : (
        <section className={`${styles.overview} ${styles.reveal} ${above} ${bodySurface}`}>
          <div className={`${styles.overviewLeft} ${styles.stagger1}`}>
            <p className={styles.tagline}>{tagline}</p>
            {stats && (
              <div className={styles.statsGrid}>
                {stats.map(s => (
                  <div key={s.label} className={styles.stat}>
                    <span className={styles.statValue}>{s.value}</span>
                    <span className={styles.statLabel}>{s.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className={`${styles.overviewRight} ${styles.stagger2}`}>
            <p className={styles.overviewBody}>{overviewBody}</p>
          </div>
        </section>
      )}

      {isCutout && (
        <section className={`${styles.overview} ${styles.reveal} ${above}`} style={{ borderBottom: 'none', paddingTop: '4rem' }}>
          <div className={styles.overviewLeft}><p className={styles.tagline}>{tagline}</p></div>
          <div className={styles.overviewRight}><p className={styles.overviewBody}>{overviewBody}</p></div>
        </section>
      )}

      {/* § 3 — Feature image */}
      {featureImage && (
        <section className={`${styles.feature} ${styles.reveal} ${above}`}>
          <figure className={styles.featureFigure}>
            <img src={featureImage} alt={featureImageAlt} className={`${styles.featureImg} ${isCutout ? styles.cutoutFeatureImg : ''}`} />
            {featureCaption && <figcaption className={styles.featureCaption}>{featureCaption}</figcaption>}
          </figure>
        </section>
      )}

      {/* § 4a — Numbered rule cards */}
      {isCutout && numberedSections.length > 0 && (
        <section className={`${styles.numberedSection} ${styles.reveal} ${above}`}>
          {numberedSections.map((s, i) => <NumberedCard key={i} index={i} body={s.body} />)}
        </section>
      )}

      {/* § 4b — Standard content sections */}
      {standardSections.map((s, i) => (
        <section
          key={i}
          className={`${s.imagePosition === 'left' ? styles.contentSectionReversed : styles.contentSection} ${styles.reveal} ${above} ${isMarquee && i % 2 === 0 ? bodySurface : ''}`}
        >
          <div className={`${styles.sectionText} ${styles.stagger1}`}>
            <h2 className={styles.sectionHeading}>{s.heading}</h2>
            <p  className={styles.sectionBody}>{s.body}</p>
          </div>
          {s.image && (
            <div className={`${isCutout ? styles.cutoutImageWrap : styles.sectionImageWrap} ${styles.stagger2}`}>
              <img src={s.image} alt={s.imageAlt ?? ''} className={isCutout ? styles.cutoutImage : styles.sectionImage} />
            </div>
          )}
        </section>
      ))}

      {/* § 5 — Gallery */}
      {gallery && gallery.length > 0 && (
        <section className={`${styles.gallery} ${styles.reveal} ${above}`}>
          {gallery.map((g, i) => (
            <div key={i} className={`${isCutout ? styles.cutoutGalleryItem : styles.galleryItem} ${i === 0 ? styles.stagger1 : i === 1 ? styles.stagger2 : styles.stagger3}`}>
              <img src={g.src} alt={g.alt} className={isCutout ? styles.cutoutGalleryImg : styles.galleryImg} />
            </div>
          ))}
        </section>
      )}

      {/* § 6 — Closing */}
      {isCutout ? (
        <section className={`${styles.cutoutClosing} ${styles.reveal} ${above}`}>
          <div className={styles.closingInner}>
            <h2 className={`${styles.cutoutClosingHeading} ${styles.stagger1}`}>{closingHeading}</h2>
            <p  className={`${styles.closingBody} ${styles.stagger2}`}>{closingBody}</p>
            {tags && (
              <div className={`${styles.tags} ${styles.stagger3}`}>
                {tags.map(t => <span key={t} className={styles.cutoutTag}>{t}</span>)}
              </div>
            )}
            <Link href="/projects" className={`${styles.back} ${styles.stagger4}`} style={{ color: 'var(--pt-muted)' }}>← Back to projects</Link>
          </div>
        </section>
      ) : (
        <section className={`${styles.closing} ${styles.reveal} ${above} ${bodySurface}`}>
          <div className={styles.closingInner}>
            <h2 className={`${styles.closingHeading} ${styles.stagger1}`}>{closingHeading}</h2>
            <p  className={`${styles.closingBody}    ${styles.stagger2}`}>{closingBody}</p>
            {tags && (
              <div className={`${styles.tags} ${styles.stagger3}`}>
                {tags.map(t => <span key={t} className={styles.tag}>{t}</span>)}
              </div>
            )}
            <Link href="/projects" className={`${styles.back} ${styles.stagger4}`}>← Back to projects</Link>
          </div>
        </section>
      )}
    </div>
  );
}