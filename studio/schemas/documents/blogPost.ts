import { defineType } from 'sanity'

export const blogPost = defineType({
  name: 'blogPost',
  title: 'Artículo del Blog',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Título del artículo. Aparece como H1 en la página y en los resultados de Google.',
    },
    {
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
      description: 'Parte de la URL del artículo. Se genera automáticamente desde el título.',
    },
    {
      name: 'description',
      title: 'Descripción',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
      description: 'Resumen del artículo que aparece en la tarjeta del blog y como meta description si no se define una específica en SEO.',
    },
    {
      name: 'body',
      title: 'Contenido',
      type: 'blockContent',
      description: 'El cuerpo del artículo. Puedes usar texto enriquecido con negritas, listas, imágenes, etc.',
    },
    {
      name: 'publishedDate',
      title: 'Fecha de publicación',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
      description: 'Fecha en la que se publica el artículo. Se usa para ordenar los posts del más reciente al más antiguo.',
    },
    {
      name: 'updatedDate',
      title: 'Fecha de actualización',
      type: 'datetime',
      description: 'Fecha de la última actualización significativa del contenido. Déjala vacía si no se ha actualizado.',
    },
    {
      name: 'author',
      title: 'Autora',
      type: 'string',
      initialValue: 'Estela de Gracia',
      description: 'Nombre de la autora del artículo.',
    },
    {
      name: 'category',
      title: 'Categoría',
      type: 'string',
      options: {
        list: [
          { title: 'Ansiedad', value: 'ansiedad' },
          { title: 'Herramientas', value: 'herramientas' },
          { title: 'Autoconocimiento', value: 'autoconocimiento' },
          { title: 'Relaciones', value: 'relaciones' },
        ],
        layout: 'dropdown',
      },
      description: 'Categoría principal del artículo. Se usa para el filtro de categorías en la página del blog.',
    },
    {
      name: 'tags',
      title: 'Etiquetas',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      description: 'Palabras clave asociadas al artículo. Ayudan a organizar y encontrar contenido relacionado.',
    },
    {
      name: 'coverImage',
      title: 'Imagen de portada',
      type: 'image',
      options: { hotspot: true },
      description: 'Imagen principal del artículo. Aparece en la tarjeta del blog y como cabecera del artículo.',
    },
    {
      name: 'readingTime',
      title: 'Tiempo de lectura (minutos)',
      type: 'number',
      description: 'Tiempo estimado de lectura en minutos. Aparece junto al título del artículo.',
    },
    {
      name: 'featured',
      title: 'Destacado',
      type: 'boolean',
      initialValue: false,
      description: 'Si lo activas, el artículo aparecerá en posición destacada en la página del blog.',
    },
    {
      name: 'relatedPosts',
      title: 'Artículos relacionados',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'blogPost' }] }],
      validation: (Rule) => Rule.max(3).unique(),
      description:
        'Selecciona hasta 3 artículos relacionados. Si lo dejas vacío, se mostrarán automáticamente artículos de la misma categoría/etiquetas.',
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'coverImage',
    },
  },
  orderings: [
    {
      title: 'Fecha (más reciente)',
      name: 'publishedDateDesc',
      by: [{ field: 'publishedDate', direction: 'desc' }],
    },
  ],
})
