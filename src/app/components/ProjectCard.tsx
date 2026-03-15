import Link from "next/link";
import styles from "./ProjectCard.module.css";

export interface Project {
  slug: string;
  image: string;
  type: string;
  date?: string;
  title: string;
  description: string;
  content?: string;
}

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { slug, image, type, date, title, description } = project;

  return (
    <Link href={`/projects/${slug}`} className={styles.cardLink}>
      <article className={styles.card}>
        {/* Image */}
        <div className={styles.imageWrapper}>
          <img src={image} alt={title} className={styles.image} />
        </div>

        {/* Meta */}
        <div className={styles.body}>
          <p className={styles.meta}>
            {type}
            {date && <span> — {date}</span>}
          </p>

          <h2 className={styles.title}>{title}</h2>

          <p className={styles.description}>{description}</p>
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <span className={styles.readMore}>View project</span>
          <span className={styles.arrow}>→</span>
        </div>
      </article>
    </Link>
  );
}