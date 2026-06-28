import type { Metadata } from 'next';
import { GalleryClient } from './gallery-client';
import { loadGallery } from '@/lib/dataLoader';

export const metadata: Metadata = {
  title: 'Gallery | Majid Qurashi - GeeksforGeeks Campus Mantri',
  description: 'View photos documenting GFG tech workshops, hackathons, team coding, and campus outreach sessions organized by Majid Qurashi.',
};

export default async function GalleryPage() {
  const images = await loadGallery().catch(() => []);

  return <GalleryClient initialImages={images} />;
}
