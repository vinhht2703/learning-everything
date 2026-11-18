import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n/utils';

export type Course = CollectionEntry<'courses'>['data'];
export type LessonEntry = CollectionEntry<'lessons'>;
export type Lesson = LessonEntry['data'];

export async function getCourses(): Promise<Course[]> {
  return (await getCollection('courses')).map((c) => c.data).sort((a, b) => a.order - b.order);
}

/** Lessons of one course in one language, sorted. Missing translations fall back to English. */
export async function getLessons(lang: Lang, course: string): Promise<LessonEntry[]> {
  const entries = await getCollection('lessons', (e) => e.id.startsWith(`en/${course}/`) || e.id.startsWith(`${lang}/${course}/`));
  const byId = new Map<string, LessonEntry>();
  for (const e of entries) if (e.id.startsWith('en/')) byId.set(e.data.id, e);
  if (lang !== 'en') for (const e of entries) if (e.id.startsWith(`${lang}/`)) byId.set(e.data.id, e);
  return [...byId.values()].sort((a, b) => a.data.order - b.data.order);
}
