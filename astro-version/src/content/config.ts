import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    tag: z.string(),
    pitch: z.string(),
    context: z.string(),
    result: z.string(),
    hero: z.string().optional(),
    heroVideo: z.string().optional(),
    images: z.array(z.string()).optional(),
    videos: z.array(z.string()).optional(),
    stack: z.array(z.string()),
    metrics: z.array(z.object({
      label: z.string(),
      value: z.string(),
      sublabel: z.string().optional()
    })).optional(),
    publishedAt: z.coerce.date(),
    featured: z.boolean().default(false),
    order: z.number().default(99)
  })
});

export const collections = { projects };
