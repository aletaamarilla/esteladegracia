import { defineType } from 'sanity'

export const resource = defineType({
  name: 'resource',
  title: 'Recurso',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Nombre del recurso (ej. "Guía para gestionar la ansiedad", "Meditación guiada").',
    },
    {
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
      description: 'Parte de la URL del recurso. Se genera automáticamente desde el título.',
    },
    {
      name: 'description',
      title: 'Descripción',
      type: 'text',
      rows: 3,
      description: 'Resumen del recurso que aparece en la tarjeta de vista previa. Explica brevemente qué contiene y para qué sirve.',
    },
    {
      name: 'type',
      title: 'Tipo de recurso',
      type: 'string',
      options: {
        list: [
          { title: 'PDF', value: 'pdf' },
          { title: 'Audio', value: 'audio' },
          { title: 'Vídeo', value: 'video' },
          { title: 'Checklist', value: 'checklist' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
      description: 'Formato del recurso. Determina el icono y la etiqueta que se muestra en la tarjeta.',
    },
    {
      name: 'coverImage',
      title: 'Imagen de portada',
      type: 'image',
      options: { hotspot: true },
      description: 'Imagen que representa el recurso en la tarjeta de vista previa.',
    },
    {
      name: 'file',
      title: 'Archivo',
      type: 'file',
      description: 'El archivo descargable del recurso (PDF, MP3, etc.).',
    },
    {
      name: 'order',
      title: 'Orden',
      type: 'number',
      description: 'Número para ordenar los recursos manualmente. Los números más bajos aparecen primero.',
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'type',
      media: 'coverImage',
    },
  },
  orderings: [
    {
      title: 'Orden manual',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})
