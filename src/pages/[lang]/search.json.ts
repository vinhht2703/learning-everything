import type { APIRoute } from 'astro';
import { getCourses, getLessons } from '../../lib/content';
import { href, langs, loc, type Lang } from '../../i18n/utils';

export function getStaticPaths() {
  return langs.map((lang) => ({ params: { lang } }));
}

/** Static search index: one entry per lesson, fetched by the header search box. */
export const GET: APIRoute = async ({ params }) => {
  const lang = params.lang as Lang;
  const items = [];
  for (const course of await getCourses()) {
    for (const { data } of await getLessons(lang, course.key)) {
      items.push({ key: `${course.key}/${data.id}`, title: data.navTitle ?? data.title, summary: data.summary, course: loc(lang, course.title), url: href(lang, course.key, data.id) });
    }
  }
  return new Response(JSON.stringify(items), { headers: { 'Content-Type': 'application/json' } });
};
