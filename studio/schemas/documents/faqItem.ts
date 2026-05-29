import { defineType } from 'sanity'

export const faqItem = defineType({
  name: 'faqItem',
  title: 'Pregunta Frecuente',
  type: 'document',
  fields: [
    {
      name: 'question',
      title: 'Pregunta',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'La pregunta tal como la haría una paciente (ej. "¿Cuánto dura una sesión?").',
    },
    {
      name: 'answer',
      title: 'Respuesta',
      type: 'text',
      rows: 5,
      validation: (Rule) => Rule.required(),
      description: 'Respuesta clara y directa. Evita tecnicismos y usa un tono cercano.',
    },
    {
      name: 'category',
      title: 'Categoría',
      type: 'string',
      options: {
        list: [
          { title: 'Terapia Individual', value: 'individual' },
          { title: 'Terapia Grupal', value: 'grupal' },
          { title: 'Ansiedad', value: 'ansiedad' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
      description: 'Categoría para organizar las preguntas. Se usa para filtrar en la página de FAQ.',
    },
    {
      name: 'order',
      title: 'Orden',
      type: 'number',
      description: 'Número para ordenar las preguntas manualmente. Los números más bajos aparecen primero.',
    },
  ],
  preview: {
    select: {
      title: 'question',
      subtitle: 'category',
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
