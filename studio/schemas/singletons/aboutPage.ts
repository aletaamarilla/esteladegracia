import { defineType } from 'sanity'
import { ALLOWED_ICONS } from '../shared/iconList'

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'Sobre Mí',
  type: 'document',
  preview: {
    select: { title: 'hero.headline' },
    prepare({ title }) {
      return { title: title || 'Sobre Mí' }
    },
  },
  fields: [
    {
      name: 'hero',
      title: 'Hero',
      type: 'object',
      description: 'Sección principal de la página Sobre Mí, con tu titular, vídeo de presentación y foto.',
      fields: [
        { name: 'headline', title: 'Titular', type: 'string', validation: (Rule) => Rule.required(), description: 'Título grande que aparece al entrar en la página Sobre Mí.' },
        { name: 'subheadline', title: 'Subtítulo', type: 'text', rows: 3, description: 'Texto de apoyo bajo el titular. 2-3 frases recomendadas.' },
        { name: 'badge', title: 'Badge', type: 'string', description: 'Frase corta que aparece encima del titular (ej. "Conóceme").' },
        { name: 'videoPlaceholderText', title: 'Texto del placeholder de vídeo', type: 'string', description: 'Texto que se muestra sobre el vídeo antes de reproducirlo.' },
        { name: 'videoUrl', title: 'URL del vídeo (legacy)', type: 'url', hidden: true },
        {
          name: 'video',
          title: 'Vídeo',
          type: 'file',
          options: { accept: 'video/mp4,video/webm,video/quicktime' },
          description: 'Subir el vídeo directamente. Tiene prioridad sobre la URL externa.',
        },
        {
          name: 'videoPoster',
          title: 'Poster del vídeo',
          type: 'image',
          options: { hotspot: true },
          description: 'Imagen que se muestra antes de reproducir el vídeo.',
        },
        {
          name: 'heroImage',
          title: 'Foto del hero',
          type: 'image',
          options: { hotspot: true },
          description: 'Retrato grande. Si hay vídeo, se muestra como poster con play overlay.',
        },
      ],
    },
    {
      name: 'personalStory',
      title: 'Historia personal',
      type: 'object',
      description: 'Tu historia contada de forma cercana: texto enriquecido, citas destacadas y rasgos que te definen.',
      fields: [
        { name: 'sectionLabel', title: 'Etiqueta de sección', type: 'string' },
        { name: 'title', title: 'Título', type: 'string' },
        { name: 'titleHighlight', title: 'Texto resaltado', type: 'string' },
        {
          name: 'pullQuotes',
          title: 'Citas destacadas',
          type: 'array',
          of: [{ type: 'string' }],
        },
        {
          name: 'storyBody',
          title: 'Cuerpo de la historia',
          type: 'blockContent',
        },
        {
          name: 'personalTraits',
          title: 'Rasgos personales',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'icon', title: 'Icono', type: 'string', options: { list: ALLOWED_ICONS, layout: 'dropdown' } },
                { name: 'label', title: 'Etiqueta', type: 'string' },
                { name: 'description', title: 'Descripción', type: 'string' },
              ],
            },
          ],
        },
        {
          name: 'inlineCta',
          title: 'CTA inline',
          type: 'object',
          fields: [
            { name: 'text', title: 'Texto', type: 'string' },
            { name: 'buttonLabel', title: 'Texto del botón', type: 'string' },
            { name: 'buttonHref', title: 'Enlace del botón', type: 'string' },
          ],
        },
        {
          name: 'storyImage',
          title: 'Foto editorial',
          type: 'image',
          options: { hotspot: true },
          description: 'Foto intercalada en la historia personal.',
        },
      ],
    },
    {
      name: 'trustBar',
      title: 'Barra de confianza',
      type: 'array',
      description: 'Datos numéricos que generan confianza (ej. "500+ pacientes", "8 años de experiencia").',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'value', title: 'Valor', type: 'string' },
            { name: 'label', title: 'Etiqueta', type: 'string' },
          ],
        },
      ],
    },
    {
      name: 'approach',
      title: 'Enfoque terapéutico',
      type: 'object',
      description: 'Sección que explica cómo trabajas, tu filosofía y los pilares de tu enfoque terapéutico.',
      fields: [
        { name: 'sectionLabel', title: 'Etiqueta de sección', type: 'string' },
        { name: 'title', title: 'Título', type: 'string' },
        { name: 'titleHighlight', title: 'Texto resaltado', type: 'string' },
        { name: 'philosophy', title: 'Filosofía', type: 'text', rows: 5 },
        {
          name: 'cards',
          title: 'Tarjetas',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'icon', title: 'Icono', type: 'string', options: { list: ALLOWED_ICONS, layout: 'dropdown' } },
                { name: 'title', title: 'Título', type: 'string' },
                { name: 'description', title: 'Descripción', type: 'string' },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'transitionBanner',
      title: 'Banner de transición',
      type: 'object',
      description: 'Bloque visual con foto de fondo y frase motivacional. Separa secciones de la página.',
      fields: [
        {
          name: 'image',
          title: 'Imagen de fondo',
          type: 'image',
          options: { hotspot: true },
          description: 'Foto ambiental/lifestyle para el banner de transición.',
        },
        { name: 'title', title: 'Frase principal', type: 'string' },
        { name: 'subtitle', title: 'Subtítulo (opcional)', type: 'string' },
      ],
    },
    {
      name: 'testimonials',
      title: 'Testimonios (seleccionar)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'testimonial' }] }],
      description: 'Elige qué testimonios de pacientes se muestran en esta página.',
    },
    {
      name: 'timeline',
      title: 'Línea temporal',
      type: 'array',
      description: 'Tu recorrido profesional en orden cronológico. Cada entrada tiene año, título y descripción.',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'year', title: 'Año', type: 'string' },
            { name: 'title', title: 'Título', type: 'string' },
            { name: 'description', title: 'Descripción', type: 'string' },
          ],
          preview: {
            select: { title: 'title', subtitle: 'year' },
          },
        },
      ],
    },
    {
      name: 'timelineImage',
      title: 'Imagen después de Trayectoria',
      type: 'image',
      options: { hotspot: true },
      description: 'Imagen que aparece debajo de la sección de trayectoria.',
    },
    {
      name: 'ctaBanner',
      title: 'Banner CTA',
      type: 'ctaBanner',
      description: 'Bloque final con un mensaje motivacional y un botón de acción.',
    },
  ],
})
