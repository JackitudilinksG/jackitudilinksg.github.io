'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface ProjectCardProps {
  id: string;
  title: string;
  description?: string;
  image: string;
  date: string;
  team: string;
  link?: string;
  tags?: string[];
}

export default function ProjectCard({
  id,
  title,
  description,
  image,
  date,
  team,
  link = '#',
  tags = [],
}: ProjectCardProps) {
  return (
    <div className="flex-shrink-0 w-full md:w-96 bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Image Container */}
      <div className="relative w-full h-48 overflow-hidden bg-gray-100">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, 400px"
        />
      </div>

      {/* Content Container */}
      <div className="p-6 flex flex-col h-full">
        {/* Date and Team */}
        <div className="text-xs font-mono text-gray-500 uppercase tracking-wide mb-3">
          {team} • {date}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
          {title}
        </h3>

        {/* Description */}
        {description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
            {description}
          </p>
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Read More Button */}
        <Link
          href={link}
          className="inline-flex items-center gap-2 text-gray-900 font-medium hover:text-blue-600 transition-colors group"
        >
          <span>Read more</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
