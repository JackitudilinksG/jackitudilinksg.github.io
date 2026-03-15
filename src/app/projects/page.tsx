import ProjectCarousel from '../components/ProjectCarousel';
import styles from './projects.module.css'

const PROJECTS = [
  {
    slug: "project-alpha",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    type: "Web Design",
    date: "Mar 10, 2025",
    title: "Project Alpha: Redesigning the onboarding experience",
    description:
      "A full redesign of the user onboarding flow, reducing drop-off by 40% through clearer copy and progressive disclosure.",
  },
  {
    slug: "project-beta",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    type: "Mobile App",
    date: "Jan 22, 2025",
    title: "Project Beta: Real-time data dashboard",
    description:
      "A cross-platform mobile app for monitoring IoT sensor data with live charts, alerts, and offline caching.",
  },
  {
    slug: "project-gamma",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    type: "Branding",
    date: "Nov 05, 2024",
    title: "Project Gamma: Visual identity system",
    description:
      "Built a comprehensive brand identity from scratch — logo, type scale, color system, and component library.",
  },
  {
    slug: "project-delta",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    type: "AI / ML",
    date: "Sep 14, 2024",
    title: "Project Delta: Predictive analytics engine",
    description:
      "Trained and deployed a forecasting model that improved inventory planning accuracy by 28% quarter-over-quarter.",
  },
  {
    slug: "project-epsilon",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80",
    type: "Web App",
    date: "Jul 30, 2024",
    title: "Project Epsilon: Collaborative workspace tool",
    description:
      "A real-time collaborative platform with presence awareness, live commenting, and version history.",
  },
];

export const metadata = {
  title: "Projects",
  description: "A collection of work across design, engineering, and strategy.",
};

export default function ProjectsPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.heading}>Projects</h1>
        <p className={styles.subheading}>
          A collection of work across design, engineering, and strategy.
        </p>
      </header>
 
      <ProjectCarousel projects={PROJECTS} />
    </main>
  );
}