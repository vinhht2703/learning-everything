import type { Lang } from '../i18n/utils';
import type { Course, LessonEntry } from '../lib/content';

export interface TemplateProps {
  lang: Lang;
  course: Course;
  entry: LessonEntry;
  lessons: LessonEntry[];
  index: number;
  prevUrl?: string;
  nextUrl?: string;
  notesUrl: string;
}
