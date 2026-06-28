import type { Metadata } from 'next';
import { ContactClient } from './contact-client';

export const metadata: Metadata = {
  title: 'Contact Me | Majid Qurashi - GeeksforGeeks Campus Mantri',
  description: 'Get in touch with Majid Qurashi for coding workshops, collaborative seminars, and B-Tech student outreach events.',
};

export default function ContactPage() {
  return <ContactClient />;
}
