import type { Metadata } from 'next';
import { AboutClient } from './about-client';

export const metadata: Metadata = {
  title: 'About Me | Majid Qurashi - GeeksforGeeks Campus Mantri',
  description: 'Learn about Majid Qurashi’s academic credentials, technical skills, web engineering expertise, and software internships.',
};

export default function AboutPage() {
  return <AboutClient />;
}
