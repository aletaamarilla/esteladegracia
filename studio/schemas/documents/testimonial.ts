import { defineType } from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonio',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Nombre',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Nombre de la persona que deja el testimonio. Puede ser un nombre ficticio si prefiere anonimato.',
    },
    {
      name: 'text',
      title: 'Texto del testimonio',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.max(500),
      description: 'Opcional si el testimonio es solo vídeo. Cópialo literalmente para mayor autenticidad.',
    },
    {
      name: 'rating',
      title: 'Valoración (1-5)',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).max(5),
      description: 'Puntuación de 1 a 5 estrellas que aparece junto al testimonio.',
    },
    {
      name: 'date',
      title: 'Fecha (texto)',
      type: 'string',
      description: 'Cuándo se recibió, en texto libre (ej. "hace 2 meses", "Enero 2025").',
    },
    {
      name: 'source',
      title: 'Fuente',
      type: 'string',
      description: 'De dónde viene el testimonio (ej. "Reseña Google", "Formulario web", "WhatsApp").',
    },
    {
      name: 'serviceType',
      title: 'Tipo de servicio',
      type: 'string',
      options: {
        list: [
          { title: 'Individual', value: 'individual' },
          { title: 'Grupal', value: 'group' },
        ],
        layout: 'radio',
      },
      description: 'Indica si el testimonio es de terapia individual o grupal. Se usa para filtrar en la web.',
    },
    {
      name: 'hasVideo',
      title: '¿Tiene vídeo?',
      type: 'boolean',
      initialValue: false,
      description: 'Activa esto si quieres adjuntar un vídeo-testimonio. Aparecerán los campos para subir el archivo.',
    },
    {
      name: 'videoUrl',
      title: 'URL del vídeo (legacy)',
      type: 'url',
      hidden: true,
    },
    {
      name: 'videoFile',
      title: 'Vídeo (archivo)',
      type: 'file',
      options: { accept: 'video/mp4,video/webm,video/quicktime' },
      description: 'Sube el vídeo del testimonio directamente. Formatos: MP4, WebM.',
      hidden: ({ document }) => !document?.hasVideo,
    },
    {
      name: 'videoPoster',
      title: 'Portada del vídeo',
      type: 'image',
      options: { hotspot: true },
      description: 'Fotograma del vídeo que se muestra como portada en la tarjeta.',
      hidden: ({ document }) => !document?.hasVideo,
    },
    {
      name: 'hugVideoUrl',
      title: 'URL del vídeo abrazo (legacy)',
      type: 'url',
      hidden: true,
    },
    {
      name: 'hugVideoFile',
      title: 'Vídeo abrazo (archivo)',
      type: 'file',
      options: { accept: 'video/mp4,video/webm,video/quicktime' },
      description: 'Vídeo corto tipo "abrazo" o agradecimiento. Se muestra como clip secundario.',
      hidden: ({ document }) => !document?.hasVideo,
    },
    {
      name: 'featured',
      title: 'Destacado',
      type: 'boolean',
      initialValue: false,
      description: 'Si lo activas, este testimonio puede aparecer en secciones destacadas de la web.',
    },
    {
      name: 'order',
      title: 'Orden',
      type: 'number',
      description: 'Número para ordenar los testimonios manualmente. Los números más bajos aparecen primero.',
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'text',
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
