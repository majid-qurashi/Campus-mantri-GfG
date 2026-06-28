import type { Metadata } from 'next';
import { ProjectsClient } from './projects-client';
import { loadProjects } from '@/lib/dataLoader';

export const metadata: Metadata = {
  title: 'Projects Showcase | Majid Qurashi - GeeksforGeeks Campus Mantri',
  description: 'Examine Majid Qurashi’s software developments, open source repositories, machine learning tools, and web interface projects.',
};

export default async function ProjectsPage() {
  const projects = await loadProjects().catch(() => []);

  return <ProjectsClient initialProjects={projects} />;
}
