import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProject } from './projectData';
import { getTheme }   from './themes';
import ProjectTemplate from './ProjectTemplate';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  return {
    title:       project?.title       ?? 'Project',
    description: project?.overviewBody ?? '',
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const theme = getTheme(slug);

  return <ProjectTemplate project={project} theme={theme} />;
}