import type { Metadata } from 'next';
import { WorkshopsClient } from './workshops-client';
import { loadWorkshops } from '@/lib/dataLoader';

export const metadata: Metadata = {
  title: 'Workshops & Events | Majid Qurashi - GeeksforGeeks Campus Mantri',
  description: 'View list of coding workshops, Competitive Programming classes, and open source webinars conducted by Majid Qurashi.',
};

export default async function WorkshopsPage() {
  const workshops = await loadWorkshops().catch(() => []);

  return <WorkshopsClient initialWorkshops={workshops} />;
}
