import { defineCollection, z } from 'astro:content';

const berita = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    slug: z.string(),
    date: z.date(),
    author: z.string().default('Admin'),
    featuredImage: image().optional(),
    categories: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    excerpt: z.string().optional(),
    isPublished: z.boolean().default(false),
  }),
});

export const collections = {
  berita,
};
