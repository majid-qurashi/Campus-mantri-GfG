import type { Metadata } from 'next';
import { CampusMantriClient } from './campus-client';

export const metadata: Metadata = {
  title: 'Campus Mantri Journey | Majid Qurashi - GeeksforGeeks Campus Mantri',
  description: 'Explore Majid Qurashi’s official leadership objectives, coding club timelines, and GFG Campus Representative journey milestones.',
};

export default function CampusMantriPage() {
  return <CampusMantriClient />;
}
