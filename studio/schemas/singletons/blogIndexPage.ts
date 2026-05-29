import { defineType } from 'sanity'

export const blogIndexPage = defineType({
  name: 'blogIndexPage',
  title: 'Blog — Índice',
  type: 'document',
  preview: {
    select: { title: 'heroTitle' },
    prepare({ title }) {
      return { title: title || 'Blog' }
    },
  },
  fields: [
    {
      name: 'heroLabel',
      title: 'Etiqueta del hero',
      type: 'string',
      description: 'Texto pequeño que aparece encima del título (ej. "Blog").',
    },
    {
      name: 'heroTitle',
      title: 'Título del hero',
      type: 'string',
      description: 'Título principal de la página del blog.',
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
      description: 'Texto introductorio que invita a leer los artículos.',
    },
    {
      name: 'heroImage',
      title: 'Imagen del hero',
      type: 'image',
      options: { hotspot: true },
      description: 'Imagen de fondo de la cabecera del blog (aparece con overlay translúcido).',
    },
    {
      name: 'categories',
      title: 'Categorías',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'key', title: 'Clave', type: 'string' },
            { name: 'label', title: 'Etiqueta', type: 'string' },
          ],
          preview: {
            select: { title: 'label', subtitle: 'key' },
          },
        },
      ],
      description: 'Categorías para filtrar artículos. La "Clave" es el identificador interno y la "Etiqueta" es lo que ve el visitante.',
    },
    {
      name: 'emptyStateText',
      title: 'Texto cuando no hay artículos',
      type: 'string',
      description: 'Mensaje que se muestra si no hay artículos publicados o la categoría seleccionada está vacía.',
    },
    {
      name: 'ctaBanner',
      title: 'Banner CTA',
      type: 'ctaBanner',
      description: 'Bloque final con un mensaje motivacional y un botón de acción.',
    },
  ],
})
