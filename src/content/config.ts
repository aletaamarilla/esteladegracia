import { defineCollection, z } from "astro:content"

const blogCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedDate: z.date(),
    updatedDate: z.date().optional(),
    author: z.string().default("Estela de Gracia"),
    category: z.enum([
      "ansiedad",
      "autoestima",
      "relaciones",
      "herramientas",
      "psicoeducacion",
    ]),
    tags: z.array(z.string()),
    coverImage: z.string().optional(),
    readingTime: z.number().optional(),
    featured: z.boolean().default(false),
  }),
})

const recursosCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    type: z.enum(["pdf", "audio", "video", "checklist"]),
    coverImage: z.string().optional(),
    order: z.number().default(0),
  }),
})

export const collections = {
  blog: blogCollection,
  recursos: recursosCollection,
}
