import { defineType } from 'sanity'

export const testimonialsPage = defineType({
  name: 'testimonialsPage',
  title: 'Testimonios',
  type: 'document',
  preview: {
    select: { title: 'heroTitle' },
    prepare({ title }) {
      return { title: title || 'Testimonios' }
    },
  },
  fields: [
    {
      name: 'heroLabel',
      title: 'Etiqueta del hero',
      type: 'string',
      description: 'Texto pequeño que aparece encima del título (ej. "Lo que dicen").',
    },
    {
      name: 'heroTitle',
      title: 'Título del hero',
      type: 'string',
      description: 'Título principal de la página de testimonios.',
    },
    {
      name: 'heroHighlight',
      title: 'Texto resaltado',
      type: 'string',
      description: 'Parte del título que aparece en color destacado.',
    },
    {
      name: 'heroDescription',
      title: 'Descripción del hero',
      type: 'text',
      rows: 3,
      description: 'Texto introductorio bajo el título que da contexto sobre los testimonios.',
    },
    {
      name: 'heroImage',
      title: 'Imagen de hero',
      type: 'image',
      options: { hotspot: true },
      description: 'Imagen principal de la cabecera de la página de testimonios.',
    },
    {
      name: 'ctaBanner',
      title: 'Banner CTA',
      type: 'ctaBanner',
      description: 'Bloque final con un mensaje motivacional y un botón de acción.',
    },
  ],
})
