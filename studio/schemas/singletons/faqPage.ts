import { defineType } from 'sanity'

export const faqPage = defineType({
  name: 'faqPage',
  title: 'Preguntas Frecuentes',
  type: 'document',
  preview: {
    select: { title: 'heroTitle' },
    prepare({ title }) {
      return { title: title || 'Preguntas Frecuentes' }
    },
  },
  fields: [
    {
      name: 'heroLabel',
      title: 'Etiqueta del hero',
      type: 'string',
      description: 'Texto pequeño que aparece encima del título (ej. "FAQ").',
    },
    {
      name: 'heroTitle',
      title: 'Título del hero',
      type: 'string',
      description: 'Título principal de la página de preguntas frecuentes.',
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
      description: 'Texto introductorio que aparece debajo del título, animando a explorar las preguntas.',
    },
    {
      name: 'sideImage',
      title: 'Imagen lateral',
      type: 'image',
      options: { hotspot: true },
      description: 'Imagen que acompaña las preguntas frecuentes. En escritorio aparece a la derecha; en móvil, como banner superior.',
    },
    {
      name: 'ctaBanner',
      title: 'Banner CTA',
      type: 'ctaBanner',
      description: 'Bloque final con un mensaje motivacional y un botón de acción.',
    },
  ],
})
