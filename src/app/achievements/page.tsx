import type { Metadata } from 'next';
import { AchievementsClient } from './achievements-client';
import { loadAchievements } from '@/lib/dataLoader';

export const metadata: Metadata = {
  title: 'Achievements & Certifications | Majid Qurashi - GeeksforGeeks Campus Mantri',
  description: 'Review Majid Qurashi’s academic honors, certification credentials from IITs/IBM/AICTE, and competitive programming achievements.',
};

export default async function AchievementsPage() {
  const achievements = await loadAchievements().catch(() => []);

  return <AchievementsClient initialAchievements={achievements} />;
}
