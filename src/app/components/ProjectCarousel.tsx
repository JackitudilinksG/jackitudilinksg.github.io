"use client";

import { useState } from "react";
import ProjectCard, { Project } from "./ProjectCard";
import styles from "./ProjectCarousel.module.css";

interface ProjectCarouselProps {
  projects: Project[];
}

const CARDS_PER_PAGE = 3;

export default function ProjectCarousel({ projects }: ProjectCarouselProps) {
  const totalPages = Math.ceil(projects.length / CARDS_PER_PAGE);
  const [page, setPage] = useState<number>(1);

  const start = (page - 1) * CARDS_PER_PAGE;
  const visible = projects.slice(start, start + CARDS_PER_PAGE);

  const goTo = (p: number) => {
    if (p >= 1 && p <= totalPages) setPage(p);
  };

  return (
    <div className={styles.wrapper}>
      {/* Cards grid */}
      <div className={styles.grid}>
        {visible.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            className={styles.navBtn}
            onClick={() => goTo(page - 1)}
            disabled={page === 1}
            aria-label="Previous page"
          >
            ←
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              className={`${styles.pageBtn} ${p === page ? styles.active : ""}`}
              onClick={() => goTo(p)}
              aria-label={`Page ${p}`}
              aria-current={p === page ? "page" : undefined}
            >
              {p}
            </button>
          ))}

          <button
            className={styles.navBtn}
            onClick={() => goTo(page + 1)}
            disabled={page === totalPages}
            aria-label="Next page"
          >
            →
          </button>
        </div>
      )}
    </div>
  );
}