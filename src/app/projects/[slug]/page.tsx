import Link from "next/link";
import { Metadata } from "next";
import styles from "./projects.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Project {
  slug: string;
  image: string;
  type: string;
  date?: string;
  title: string;
  description: string;
  content?: string;
}

type Props = {
  params: { slug: string };
};

// ─── Data — replace with your real data fetching logic ────────────────────────
const PROJECTS: Project[] = [
  {
    slug: "project-alpha",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
    type: "Web Design",
    date: "Mar 10, 2025",
    title: "Project Alpha: Redesigning the onboarding experience",
    description:
      "A full redesign of the user onboarding flow, reducing drop-off by 40% through clearer copy and progressive disclosure.",
    content: `
      We started by auditing every step of the existing onboarding, 
      mapping out friction points through session recordings and user interviews. 
      The core insight: users were overwhelmed by choice too early.

      By introducing progressive disclosure — surfacing only what users needed 
      at each step — and rewriting all copy to be action-oriented rather than 
      feature-oriented, we reduced the average time-to-activate from 8 minutes 
      to under 3.

      The redesign shipped in Q1 2025 and immediately showed a 40% improvement 
      in 7-day retention for new signups.
    `,
  },
  // Add your other projects here…
];

function getProject(slug: string): Project | null {
  return PROJECTS.find((p) => p.slug === slug) ?? null;
}
// ─────────────────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject(params.slug);
  return {
    title: project?.title ?? "Project",
    description: project?.description,
  };
}

export default function ProjectPage({ params }: Props) {
  const project = getProject(params.slug);

  if (!project) {
    return (
      <main className={styles.page}>
        <p className={styles.notFound}>Project not found.</p>
        <Link href="/projects" className={styles.back}>
          ← Back to projects
        </Link>
      </main>
    );
  }

  const { image, type, date, title, description, content } = project;

  return (
    <main className={styles.page}>
      {/* Back link */}
      <Link href="/projects" className={styles.back}>
        ← Back to projects
      </Link>

      {/* Hero image */}
      <div className={styles.heroWrapper}>
        <img src={image} alt={title} className={styles.hero} />
      </div>

      {/* Meta */}
      <p className={styles.meta}>
        {type}
        {date && <span> — {date}</span>}
      </p>

      {/* Title */}
      <h1 className={styles.title}>{title}</h1>

      {/* Description / lead */}
      <p className={styles.lead}>{description}</p>

      {/* Full content */}
      {content && (
        <div className={styles.content}>
          {content
            .trim()
            .split("\n\n")
            .map((para, i) => (
              <p key={i}>{para.trim()}</p>
            ))}
        </div>
      )}
    </main>
  );
}