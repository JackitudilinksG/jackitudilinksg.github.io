'use client';

import ProjectsCarousel from '../components/ProjectsCarousel';

const SAMPLE_PROJECTS = [
  {
    id: '1',
    title: 'E-commerce Platform Redesign',
    description: 'A complete redesign of the shopping experience with modern UI/UX patterns',
    image: 'https://images.unsplash.com/photo-1460925895917-adf4e565db5d?w=800&h=400&fit=crop',
    date: 'MAR 15, 2026',
    team: 'DESIGN TEAM',
    link: '/projects/1',
    tags: ['React', 'Tailwind', 'Next.js'],
  },
  {
    id: '2',
    title: 'AI Content Generator',
    description: 'Intelligent tool for generating personalized content at scale',
    image: 'https://images.unsplash.com/photo-1677442d019cecf8978e4387d0b8016e536602a0?w=800&h=400&fit=crop',
    date: 'FEB 28, 2026',
    team: 'ML TEAM',
    link: '/projects/2',
    tags: ['Python', 'Machine Learning', 'API'],
  },
  {
    id: '3',
    title: 'Real-time Analytics Dashboard',
    description: 'Monitor and visualize data with interactive charts and insights',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
    date: 'FEB 10, 2026',
    team: 'DATA TEAM',
    link: '/projects/3',
    tags: ['TypeScript', 'D3.js', 'WebSocket'],
  },
  {
    id: '4',
    title: 'Mobile Banking App',
    description: 'Secure and user-friendly mobile banking experience',
    image: 'https://images.unsplash.com/photo-1563986768609-322d5f2d90a4?w=800&h=400&fit=crop',
    date: 'JAN 20, 2026',
    team: 'MOBILE TEAM',
    link: '/projects/4',
    tags: ['React Native', 'Security', 'Finance'],
  },
];

export default function Projects() {
  return (
    <main className="min-h-screen bg-gray-50">
      <ProjectsCarousel
        projects={SAMPLE_PROJECTS}
        title="My Projects"
        subtitle="Explore my recent work and contributions"
      />
    </main>
  );
}
