import type { Lang } from '../i18n/utils';
import type { Course, Lesson, LessonEntry } from '../lib/content';
export interface WidgetProps { lang: Lang; lesson: Lesson; course: Course; lessons: LessonEntry[] }
