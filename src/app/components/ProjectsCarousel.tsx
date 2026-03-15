'use client';

import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProjectCard from './ProjectCard';

interface Project {
  id: string;
  title: string;
  description?: string;
  image: string;
  date: string;
  team: string;
  link?: string;
  tags?: string[];
}

interface ProjectsCarouselProps {
  projects: Project[];
  title?: string;
  subtitle?: string;
}

export default function ProjectsCarousel({
  projects,
  title = 'Projects',
  subtitle,
}: ProjectsCarouselProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const itemsPerPage = 3;
  const totalPages = Math.ceil(projects.length / itemsPerPage);

  const handlePrevious = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
    scrollToPage(currentPage - 1);
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
    scrollToPage(currentPage + 1);
  };

  const scrollToPage = (page: number) => {
    if (scrollRef.current) {
      const scrollAmount = page * (scrollRef.current.offsetWidth / itemsPerPage);
      scrollRef.current.scrollTo({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const visibleProjects = projects.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <section className="w-full py-12 px-4 md:px-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          {title}
        </h2>
        {subtitle && (
          <p className="text-gray-600 text-lg">{subtitle}</p>
        )}
      </div>

      {/* Carousel Container */}
      <div className="relative">
        {/* Cards */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth pb-4"
          style={{ scrollBehavior: 'smooth' }}
        >
          {visibleProjects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={handlePrevious}
            className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors"
            aria-label="Previous projects"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>

          {/* Page Indicators */}
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentPage(index);
                  scrollToPage(index);
                }}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentPage
                    ? 'bg-gray-900'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to page ${index + 1}`}
                aria-current={index === currentPage ? 'page' : undefined}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors"
            aria-label="Next projects"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
    </section>
  );
}
