import { defineType } from 'sanity'
import { ALLOWED_ICONS } from '../shared/iconList'

export const resourcesPage = defineType({
  name: 'resourcesPage',
  title: 'Recursos',
  type: 'document',
  preview: {
    select: { title: 'heroTitle' },
    prepare({ title }) {
      return { title: title || 'Recursos' }
    },
  },
  fields: [
    {
      name: 'heroLabel',
      title: 'Etiqueta del hero',
      type: 'string',
      description: 'Texto pequeño que aparece encima del título (ej. "Recursos gratuitos").',
    },
    {
      name: 'heroTitle',
      title: 'Título del hero',
      type: 'string',
      description: 'Título principal de la página de recursos.',
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
      description: 'Texto introductorio que explica qué tipo de recursos encontrarán.',
    },
    {
      name: 'heroImage',
      title: 'Imagen del hero',
      type: 'image',
      options: { hotspot: true },
      description: 'Imagen de fondo de la cabecera de la página de recursos.',
    },
    {
      name: 'valuePropositions',
      title: 'Propuestas de valor',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'icon', title: 'Icono', type: 'string', options: { list: ALLOWED_ICONS, layout: 'dropdown' } },
            { name: 'text', title: 'Texto', type: 'string' },
          ],
        },
      ],
      description: 'Frases cortas con icono que destacan el valor de los recursos (ej. "Basados en evidencia", "100% gratuitos").',
    },
    {
      name: 'previewSection',
      title: 'Sección de vista previa',
      type: 'object',
      description: 'Título e introducción de la sección donde se listan los recursos disponibles.',
      fields: [
        { name: 'sectionLabel', title: 'Etiqueta de sección', type: 'string', description: 'Texto pequeño sobre el título de la sección.' },
        { name: 'title', title: 'Título', type: 'string', description: 'Título de la sección de vista previa de recursos.' },
        { name: 'titleHighlight', title: 'Texto resaltado', type: 'string', description: 'Parte del título en color destacado.' },
      ],
    },
    {
      name: 'emailGate',
      title: 'Email gate',
      type: 'object',
      description: 'Formulario para captar emails antes de dar acceso a los recursos completos.',
      fields: [
        { name: 'title', title: 'Título', type: 'string', description: 'Título del bloque de captación de email.' },
        { name: 'titleHighlight', title: 'Texto resaltado', type: 'string', description: 'Parte del título en color destacado.' },
        { name: 'description', title: 'Descripción', type: 'string', description: 'Texto que explica por qué pides el email y qué recibirán.' },
      ],
    },
    {
      name: 'inlineTestimonial',
      title: 'Testimonio inline',
      type: 'object',
      description: 'Cita de una persona que ha usado los recursos, para generar confianza.',
      fields: [
        { name: 'quote', title: 'Cita', type: 'text', rows: 3, description: 'El texto del testimonio entre comillas.' },
        { name: 'author', title: 'Autora', type: 'string', description: 'Nombre de la persona que da el testimonio.' },
      ],
    },
    {
      name: 'blogCrossLink',
      title: 'Enlace cruzado al blog',
      type: 'object',
      description: 'Bloque que invita a visitar el blog como complemento a los recursos.',
      fields: [
        { name: 'text', title: 'Texto', type: 'string', description: 'Frase que introduce el enlace al blog.' },
        { name: 'linkLabel', title: 'Texto del enlace', type: 'string', description: 'Texto visible del enlace (ej. "Ir al blog").' },
        { name: 'linkHref', title: 'URL del enlace', type: 'string', description: 'Ruta del blog (normalmente "/blog").' },
      ],
    },
    {
      name: 'ctaBanner',
      title: 'Banner CTA',
      type: 'ctaBanner',
      description: 'Bloque final con un mensaje motivacional y un botón de acción.',
    },
  ],
})
