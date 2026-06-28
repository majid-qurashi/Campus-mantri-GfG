import type { Metadata } from 'next';
import { RefreshClient } from './refresh-client';

export const metadata: Metadata = {
  title: 'Cache Revalidation | Majid Qurashi - GeeksforGeeks Campus Mantri',
  description: 'Manually force data updates and clear search caches directly from published Google Sheets feeds.',
};

export default function RefreshPage() {
  return <RefreshClient />;
}
