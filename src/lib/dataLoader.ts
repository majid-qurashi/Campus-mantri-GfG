import { parseCSV } from './csv';
import { CONFIG } from '../config/content';
import type { Achievement, Workshop, GalleryImage, Project } from '../types';

interface CachedData<T> {
  data: T;
  timestamp: number;
}

const CACHE_EXPIRATION_MS = 10 * 60 * 1000; // 10 minutes

/**
 * Universal CSV fetcher from Google Sheets published feeds.
 */
async function fetchCSV(url: string, force = false): Promise<Record<string, string>[]> {
  if (!url || url.trim() === '') {
    throw new Error('Google Sheets feed URL is not configured.');
  }
  
  const fetchOptions: RequestInit = {};
  if (force) {
    fetchOptions.cache = 'no-store';
  } else {
    // Revalidate after 10 minutes (600 seconds)
    (fetchOptions as any).next = { revalidate: 600 };
  }

  const response = await fetch(url, fetchOptions);
  if (!response.ok) {
    throw new Error(`Failed to fetch CSV data from: ${url}`);
  }
  const text = await response.text();
  return parseCSV(text);
}

/**
 * Cache manager utilizing browser localStorage.
 */
async function getCachedOrFetch<T>(
  key: string,
  fetchFn: () => Promise<T>,
  force = false
): Promise<T> {
  if (!force) {
    const cached = typeof window !== 'undefined' ? localStorage.getItem(`gfg_cache_${key}`) : null;
    if (cached) {
      try {
        const parsed = JSON.parse(cached) as CachedData<T>;
        const now = Date.now();
        if (now - parsed.timestamp < CACHE_EXPIRATION_MS) {
          return parsed.data;
        }
      } catch (error) {
        console.warn(`Failed to parse cache for key ${key}`, error);
      }
    }
  }

  // Fetch fresh and update cache
  const fresh = await fetchFn();
  const cacheObj: CachedData<T> = {
    data: fresh,
    timestamp: Date.now()
  };
  if (typeof window !== 'undefined') {
    localStorage.setItem(`gfg_cache_${key}`, JSON.stringify(cacheObj));
  }
  return fresh;
}

export async function loadAchievements(force = false): Promise<Achievement[]> {
  return getCachedOrFetch(
    'achievements',
    async () => {
      const data = await fetchCSV(CONFIG.googleSheets.achievements, force);
      return data.map(item => ({
        title: item.title || '',
        issuingOrg: item.issuingOrg || '',
        date: item.date || '',
        verificationLink: item.verificationLink || '',
      }));
    },
    force
  );
}

export async function loadWorkshops(force = false): Promise<Workshop[]> {
  return getCachedOrFetch(
    'workshops',
    async () => {
      const data = await fetchCSV(CONFIG.googleSheets.workshops, force);
      return data.map(item => ({
        title: item.title || '',
        date: item.date || '',
        image: item.image || '',
        link: item.link || '',
        description: item.description || undefined,
        role: item.role || undefined,
        organizer: item.organizer || undefined,
      }));
    },
    force
  );
}

export async function loadGallery(force = false): Promise<GalleryImage[]> {
  return getCachedOrFetch(
    'gallery',
    async () => {
      const data = await fetchCSV(CONFIG.googleSheets.gallery, force);
      return data.map(item => ({
        image: item.image || '',
        title: item.title || undefined,
        caption: item.caption || undefined,
        category: item.category || undefined,
      }));
    },
    force
  );
}

export async function loadProjects(force = false): Promise<Project[]> {
  return getCachedOrFetch(
    'projects',
    async () => {
      const data = await fetchCSV(CONFIG.googleSheets.projects, force);
      return data.map(item => ({
        title: item.title || '',
        shortDescription: item.shortDescription || '',
        link: item.link || '',
        tech: item.tech ? item.tech.split(',').map(t => t.trim()).filter(Boolean) : [],
        problemStatement: item.problemStatement || undefined,
        highlights: item.highlights ? item.highlights.split(';').map(h => h.trim()).filter(Boolean) : undefined,
        image: item.image || undefined,
      }));
    },
    force
  );
}
