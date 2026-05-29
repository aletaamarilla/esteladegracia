import { defineType } from 'sanity'
import { ALLOWED_ICONS } from '../shared/iconList'

export const homePage = defineType({
  name: 'homePage',
  title: 'Página de Inicio',
  type: 'document',
  preview: {
    select: { title: 'hero.headline' },
    prepare({ title }) {
      return { title: title || 'Página de Inicio' }
    },
  },
  fields: [
    {
      name: 'hero',
      title: 'Hero',
      type: 'object',
      description: 'Sección principal que se ve nada más entrar a la web. Incluye el titular, subtítulo, vídeo y botones de acción.',
      fields: [
        { name: 'badge', title: 'Badge', type: 'string', description: 'Frase muy corta (p. ej. una línea).' },
        {
          name: 'headline',
          title: 'Titular',
          type: 'string',
          validation: (Rule) => Rule.required(),
          description: 'H1 principal. Recomendación: frases cortas (~12 palabras o menos) para que se vea bien en móvil.',
        },
        {
          name: 'headlineHighlight',
          title: 'Texto resaltado del titular',
          type: 'string',
          description: 'Complemento bajo el H1; mejor más corto que el titular.',
        },
        {
          name: 'subtitle',
          title: 'Subtítulo',
          type: 'text',
          rows: 3,
          description: 'Párrafo de apoyo; ~2–4 líneas evita bloques demasiado largos.',
        },
        { name: 'primaryCta', title: 'CTA principal', type: 'ctaLink' },
        { name: 'secondaryCta', title: 'CTA secundario', type: 'ctaLink' },
        { name: 'videoPlaceholderText', title: 'Texto del placeholder de vídeo', type: 'string' },
        { name: 'trustBadge', title: 'Badge de confianza', type: 'string' },
        { name: 'presentationVideoUrl', title: 'URL del vídeo de presentación (legacy)', type: 'url', hidden: true },
        {
          name: 'presentationVideo',
          title: 'Vídeo de presentación',
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
          name: 'backgroundImage',
          title: 'Foto de fondo',
          type: 'image',
          options: { hotspot: true },
          description:
            'Opcional. Ajusta el recorte (hotspot) para mantener el rostro visible en móvil y escritorio. Si no se sube, se mantiene el gradiente actual.',
        },
        {
          name: 'heroImageAlt',
          title: 'Descripción de la foto (accesibilidad)',
          type: 'string',
          description:
            'Texto alternativo para lectores de pantalla y SEO. Déjalo vacío solo si la imagen es puramente decorativa (sin información).',
        },
        {
          name: 'rotatingPhrases',
          title: 'Frases emocionales rotativas',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'Frases que rotan bajo el titular. Si está vacío, no se muestra el rotador. Máx. recomendado: ~60 caracteres por frase para que no ocupe más de 2 líneas en móvil.',
        },
        {
          name: 'scrollInviteText',
          title: 'Texto del indicador de scroll',
          type: 'string',
          description: 'Texto que aparece en la parte inferior del hero invitando a hacer scroll. Default: "Conóceme".',
        },
      ],
    },
    {
      name: 'groupLaunchBanner',
      title: 'Banner Terapia Grupal',
      type: 'object',
      description:
        'Banner del programa Mirarte Distinto. Se muestra justo después del Hero si está activado.',
      fields: [
        {
          name: 'enabled',
          title: 'Activar banner',
          type: 'boolean',
          initialValue: false,
          description: 'Activa o desactiva la visibilidad del banner en la home sin tener que borrar su contenido.',
        },
        { name: 'badge', title: 'Badge', type: 'string' },
        { name: 'title', title: 'Título', type: 'string' },
        { name: 'subtitle', title: 'Subtítulo', type: 'text', rows: 3 },
        { name: 'ctaLabel', title: 'Texto del CTA principal', type: 'string' },
        { name: 'ctaHref', title: 'Enlace del CTA principal', type: 'string' },
        { name: 'secondaryCtaLabel', title: 'Texto del CTA secundario', type: 'string' },
        { name: 'secondaryCtaHref', title: 'Enlace del CTA secundario', type: 'string' },
        {
          name: 'backgroundImage',
          title: 'Imagen de fondo',
          type: 'image',
          options: { hotspot: true },
        },
      ],
    },
    {
      name: 'aboutPreview',
      title: 'Vista previa Sobre Mí',
      type: 'object',
      description: 'Resumen de quién eres que aparece en la página de inicio, con fotos y datos profesionales.',
      fields: [
        { name: 'sectionLabel', title: 'Etiqueta de sección', type: 'string' },
        { name: 'title', title: 'Título', type: 'string' },
        { name: 'titleHighlight', title: 'Texto resaltado', type: 'string' },
        {
          name: 'professionalStats',
          title: 'Stats profesionales',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'icon', title: 'Icono', type: 'string', options: { list: ALLOWED_ICONS, layout: 'dropdown' } },
                { name: 'label', title: 'Etiqueta', type: 'string' },
                { name: 'value', title: 'Valor', type: 'string' },
              ],
            },
          ],
        },
        { name: 'personalQuote', title: 'Cita personal', type: 'text', rows: 4 },
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
        { name: 'linkText', title: 'Texto del enlace', type: 'string' },
        { name: 'linkHref', title: 'URL del enlace', type: 'string' },
        {
          name: 'profileImage',
          title: 'Foto de retrato',
          type: 'image',
          options: { hotspot: true },
          description: 'Retrato de Estela junto a las cards.',
        },
        {
          name: 'humanImage',
          title: 'Foto personal/casual',
          type: 'image',
          options: { hotspot: true },
          description: 'Foto personal/casual de Estela — se muestra en la columna "La Humana" del home.',
        },
      ],
    },
    {
      name: 'transitionSection',
      title: 'Sección de transición (imagen puente)',
      type: 'object',
      description: 'Bloque visual a ancho completo con foto, frase y botón. Separa la sección de problemas de la de servicios.',
      fields: [
        {
          name: 'image',
          title: 'Imagen',
          type: 'image',
          options: { hotspot: true },
          description: 'Foto a ancho completo entre Problemas y Servicios.',
        },
        { name: 'title', title: 'Título', type: 'string' },
        { name: 'subtitle', title: 'Subtítulo', type: 'text', rows: 2 },
        { name: 'ctaLabel', title: 'Texto del CTA', type: 'string' },
        { name: 'ctaHref', title: 'Enlace del CTA', type: 'string' },
      ],
    },
    {
      name: 'problemsSection',
      title: 'Sección de problemas',
      type: 'object',
      description: 'Sección que conecta emocionalmente con el visitante mostrando situaciones cotidianas y cómo puedes ayudar.',
      fields: [
        { name: 'sectionLabel', title: 'Etiqueta de sección', type: 'string' },
        { name: 'title', title: 'Título', type: 'string' },
        { name: 'titleHighlight', title: 'Texto resaltado', type: 'string' },
        {
          name: 'problems',
          title: 'Problemas',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'text', title: 'Texto', type: 'string' },
              ],
            },
          ],
        },
        { name: 'transitionLabel', title: 'Etiqueta de transición', type: 'string' },
        { name: 'helpTitle', title: 'Título de ayuda', type: 'string' },
        { name: 'helpTitleHighlight', title: 'Texto resaltado de ayuda', type: 'string' },
        { name: 'helpSubtitle', title: 'Subtítulo de ayuda', type: 'string' },
        {
          name: 'helpCards',
          title: 'Tarjetas de ayuda',
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
        { name: 'ctaLabel', title: 'Texto del CTA', type: 'string' },
        { name: 'ctaHref', title: 'Enlace del CTA', type: 'string' },
      ],
    },
    {
      name: 'servicesPreview',
      title: 'Vista previa de servicios',
      type: 'object',
      description: 'Título e introducción de la sección de servicios en la página de inicio. Las tarjetas se generan automáticamente desde los servicios que hayas creado.',
      fields: [
        { name: 'sectionLabel', title: 'Etiqueta de sección', type: 'string' },
        { name: 'title', title: 'Título', type: 'string' },
        { name: 'titleHighlight', title: 'Texto resaltado', type: 'string' },
        { name: 'subtitle', title: 'Subtítulo', type: 'string' },
      ],
    },
    {
      name: 'testimonials',
      title: 'Testimonios (seleccionar)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'testimonial' }] }],
      description: 'Elige qué testimonios de pacientes se muestran en la página de inicio. Se mostrarán en el orden que los pongas.',
    },
    {
      name: 'leadMagnet',
      title: 'Lead Magnet',
      type: 'object',
      description: 'Sección para captar emails ofreciendo un recurso gratuito (guía, meditación, etc.).',
      fields: [
        { name: 'badge', title: 'Badge', type: 'string' },
        { name: 'title', title: 'Título', type: 'string' },
        { name: 'titleHighlight', title: 'Texto resaltado', type: 'string' },
        { name: 'description', title: 'Descripción', type: 'text', rows: 3 },
        { name: 'features', title: 'Características', type: 'array', of: [{ type: 'string' }] },
        { name: 'formLabel', title: 'Etiqueta del formulario', type: 'string' },
        { name: 'buttonText', title: 'Texto del botón', type: 'string' },
        { name: 'successTitle', title: 'Título de éxito', type: 'string' },
        { name: 'successMessage', title: 'Mensaje de éxito', type: 'string' },
        { name: 'privacyNote', title: 'Nota de privacidad', type: 'string' },
      ],
    },
    {
      name: 'faqPreview',
      title: 'FAQ (seleccionar)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'faqItem' }] }],
      description: 'Elige qué preguntas frecuentes se muestran en la página de inicio.',
    },
    {
      name: 'ctaBanner',
      title: 'Banner CTA final',
      type: 'ctaBanner',
      description: 'Bloque final con un mensaje motivacional y un botón de acción (normalmente para pedir cita).',
    },
  ],
})
