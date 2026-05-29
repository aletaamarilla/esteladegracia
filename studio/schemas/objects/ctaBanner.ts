import { defineType } from 'sanity'

export const ctaBanner = defineType({
  name: 'ctaBanner',
  title: 'Banner CTA',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Frase motivacional principal del banner (ej. "¿Lista para dar el primer paso?").',
    },
    {
      name: 'highlight',
      title: 'Texto resaltado',
      type: 'string',
      description: 'Parte del título que aparece en color destacado para darle énfasis.',
    },
    {
      name: 'description',
      title: 'Descripción',
      type: 'text',
      rows: 3,
      description: 'Texto de apoyo bajo el título que refuerza el mensaje y anima a hacer clic.',
    },
    {
      name: 'primaryCta',
      title: 'Botón principal',
      type: 'object',
      description: 'Botón principal de acción (normalmente para pedir cita o contactar).',
      fields: [
        { name: 'label', title: 'Texto', type: 'string', validation: (Rule) => Rule.required(), description: 'Texto del botón (ej. "Reserva tu sesión").' },
        { name: 'href', title: 'Enlace', type: 'string', validation: (Rule) => Rule.required(), description: 'URL de destino al hacer clic (ej. "/contacto").' },
      ],
    },
    {
      name: 'secondaryCta',
      title: 'Botón secundario (opcional)',
      type: 'object',
      description: 'Botón alternativo con menos énfasis visual. Déjalo vacío si solo quieres un botón.',
      fields: [
        { name: 'label', title: 'Texto', type: 'string', description: 'Texto del botón secundario.' },
        { name: 'href', title: 'Enlace', type: 'string', description: 'URL de destino.' },
      ],
    },
    {
      name: 'backgroundImage',
      title: 'Foto de fondo',
      type: 'image',
      options: { hotspot: true },
      description: 'Imagen de fondo del banner. Se muestra con un overlay oscuro para que el texto sea legible. Opcional.',
    },
  ],
})
