import type { Metadata } from 'next';
import { HomeClient } from './home-client';
import { loadWorkshops, loadAchievements, loadProjects } from '@/lib/dataLoader';

export const metadata: Metadata = {
  title: 'Home | Majid Qurashi - GeeksforGeeks Campus Mantri',
  description: 'Official GeeksforGeeks Campus Mantri Portfolio of Majid Yaseen Qurashi. B-Tech Computer Science student at GCET Safapora Kashmir.',
};

export default async function HomePage() {
  const [workshops, achievements, projects] = await Promise.all([
    loadWorkshops().catch(() => []),
    loadAchievements().catch(() => []),
    loadProjects().catch(() => [])
  ]);

  return (
    <HomeClient 
      initialWorkshops={workshops} 
      initialAchievements={achievements} 
      initialProjects={projects} 
    />
  );
}
