import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const localized = z.object({ en: z.string(), vi: z.string().optional() });

/** One YAML file per course: src/content/courses/<key>.yaml */
const courses = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/courses' }),
  schema: z.object({
    key: z.string(),
    order: z.number(),
    group: z.enum(['tech', 'personal']),
    /** Short badge shown in the course picker, e.g. "OOP", "Ax". */
    mark: z.string(),
    /** CSS class added to the badge (e.g. "linear-mark"). */
    markClass: z.string().optional(),
    /** Lesson page template: code (editor + console), concept (concept/widget/code cards), interactive (widget-first). */
    template: z.enum(['code', 'concept', 'interactive', 'visual']),
    /** CSS class prefix for concept-template cards: linear | iot | fiveam. */
    variant: z.string().default('linear'),
    title: localized,
    tagline: localized,
    description: localized,
    /** Small label above the lesson title, e.g. "MATH FOR MACHINE LEARNING". */
    lessonType: localized,
    /** Breadcrumb root, e.g. "TECH & COMPUTING". */
    crumb: localized,
    /** Headings for the concept template's code card. */
    codeCard: z.object({ label: localized, title: localized, outputLabel: localized }).optional(),
    sources: z.array(z.object({ label: localized, url: z.string().url() })).default([]),
    sourcesNote: localized.optional(),
    cornell: z.object({
      description: localized,
      cueQuestion: localized,
      cueClosing: localized.optional(),
      defineVerb: localized,
      formulaLabel: localized,
      exampleLabel: localized,
      outputLabel: localized,
      apply: localized.optional(),
    }),
  }),
});

const item = z.object({ label: z.string(), text: z.string() });

/** One Markdown file per lesson per language: src/content/lessons/<lang>/<course>/<NN>-<id>.md */
const lessons = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/lessons' }),
  schema: z.object({
    id: z.string(),
    order: z.number(),
    /** Sidebar group heading. */
    section: z.string(),
    title: z.string(),
    /** Optional shorter/different title for the sidebar. */
    navTitle: z.string().optional(),
    /** Sidebar subtitle. */
    summary: z.string(),
    duration: z.string().optional(),
    description: z.string(),
    goal: z.string(),
    eyebrow: z.string().optional(),
    conceptTitle: z.string().optional(),
    formula: z.string().optional(),
    takeaways: z.array(item).default([]),
    /** Optional static figure rendered between the concept card and the widget. */
    figure: z.string().optional(),
    widget: z.string().optional(),
    widgetTitle: z.string().optional(),
    widgetDescription: z.string().optional(),
    /** Free-form data for the widget (quiz questions, tactic cards, …). */
    widgetData: z.any().optional(),
    code: z
      .object({
        file: z.string().optional(),
        lang: z.string().default('python'),
        source: z.string(),
        output: z.string(),
        description: z.string().optional(),
        /** Same example in other languages, shown as tabs in the code playground. */
        variants: z
          .array(z.object({ lang: z.enum(['javascript', 'cpp']), file: z.string(), source: z.string(), output: z.string() }))
          .default([]),
      })
      .optional(),
    /** Big O table for the lesson's operations. */
    complexity: z.array(z.object({ op: z.string(), time: z.string(), space: z.string() })).default([]),
    /** External videos to review the topic (shown as "Watch & review"). */
    videos: z.array(z.object({ title: z.string(), channel: z.string(), url: z.string().url(), note: z.string().optional() })).default([]),
    /** External practice problems. */
    practice: z
      .array(z.object({ title: z.string(), url: z.string().url(), difficulty: z.enum(['easy', 'medium', 'hard']), platform: z.string().default('LeetCode') }))
      .default([]),
    reflectionPrompt: z.string().optional(),
    cornellCues: z.array(z.string()).optional(),
    cornellNotes: z.array(item).optional(),
    cornellApply: z.string().optional(),
  }),
});

export const collections = { courses, lessons };
