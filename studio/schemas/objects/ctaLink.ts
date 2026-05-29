import { defineType } from 'sanity'

export const ctaLink = defineType({
  name: 'ctaLink',
  title: 'Enlace CTA',
  type: 'object',
  fields: [
    {
      name: 'label',
      title: 'Texto',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Texto visible del botón o enlace (ej. "Pide tu cita", "Saber más").',
    },
    {
      name: 'href',
      title: 'Enlace',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'URL de destino al hacer clic. Puede ser una ruta interna ("/contacto") o una URL externa ("https://...").',
    },
  ],
})
