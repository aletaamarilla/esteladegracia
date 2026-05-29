import { defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Ajustes del Sitio',
  type: 'document',
  preview: {
    select: { title: 'brandName' },
    prepare({ title }) {
      return { title: title || 'Configuración del Sitio' }
    },
  },
  fields: [
    {
      name: 'brandName',
      title: 'Nombre de la marca',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'El nombre que aparece en el logo, pestañas del navegador y correos automáticos. Se usa en toda la web.',
    },
    {
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Frase corta que acompaña al nombre de la marca (ej. "Psicología sin distancia").',
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
      description: 'Logo principal que aparece en la cabecera y el footer de toda la web.',
    },
    {
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      description: 'Icono pequeño que se ve en la pestaña del navegador. Tamaño recomendado: 32×32 px o 64×64 px.',
    },
    {
      name: 'socialLinks',
      title: 'Redes sociales',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'platform',
              title: 'Plataforma',
              type: 'string',
              options: {
                list: [
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'LinkedIn', value: 'linkedin' },
                  { title: 'TikTok', value: 'tiktok' },
                  { title: 'YouTube', value: 'youtube' },
                ],
                layout: 'dropdown',
              },
            },
            { name: 'url', title: 'URL', type: 'url' },
          ],
          preview: {
            select: { title: 'platform', subtitle: 'url' },
          },
        },
      ],
      description: 'Enlaces a tus perfiles de redes sociales. Aparecen en el footer de toda la web.',
    },
    {
      name: 'contactInfo',
      title: 'Información de contacto',
      type: 'object',
      description: 'Datos de contacto que se usan en toda la web: footer, página de contacto, botones de WhatsApp, etc.',
      fields: [
        { name: 'email', title: 'Email', type: 'string', description: 'Tu email profesional. Aparece en el footer y se usa para formularios.' },
        { name: 'phone', title: 'Teléfono', type: 'string', description: 'Número de teléfono que se muestra en la web.' },
        { name: 'whatsappNumber', title: 'Número de WhatsApp (sin +)', type: 'string', description: 'Número para el botón de WhatsApp. Escríbelo sin el + (ej. "34612345678").' },
        { name: 'whatsappDefaultMessage', title: 'Mensaje predeterminado de WhatsApp', type: 'text', rows: 2, description: 'Texto que se pre-rellena cuando alguien pulsa el botón de WhatsApp.' },
        { name: 'responseTime', title: 'Tiempo de respuesta', type: 'string', description: 'Indica cuánto tardas en responder (ej. "Respondo en menos de 24h").' },
        { name: 'schedule', title: 'Horario', type: 'string', description: 'Tu horario de atención (ej. "Lunes a Viernes, 9:00 - 20:00").' },
      ],
    },
    {
      name: 'footerContent',
      title: 'Contenido del footer',
      type: 'object',
      description: 'Textos que aparecen en el pie de página de toda la web.',
      fields: [
        { name: 'description', title: 'Descripción', type: 'text', rows: 3, description: 'Breve descripción que aparece en el footer, normalmente sobre tu actividad profesional.' },
        { name: 'copyright', title: 'Copyright', type: 'string', description: 'Texto legal de copyright (ej. "© 2025 Estela de Gracia").' },
        { name: 'madeWithLoveText', title: 'Texto "hecho con amor"', type: 'string', description: 'Texto decorativo al final del footer.' },
      ],
    },
    {
      name: 'navigation',
      title: 'Navegación',
      type: 'object',
      description: 'Menú de navegación principal que aparece en la cabecera de toda la web. Los cambios aquí afectan a todas las páginas.',
      fields: [
        {
          name: 'mainLinks',
          title: 'Enlaces principales',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'label', title: 'Texto', type: 'string', description: 'Texto visible del enlace.' },
                { name: 'href', title: 'Enlace', type: 'string', description: 'Ruta de destino (ej. "/sobre-mi", "/servicios").' },
                {
                  name: 'children',
                  title: 'Submenú',
                  type: 'array',
                  of: [
                    {
                      type: 'object',
                      fields: [
                        { name: 'label', title: 'Texto', type: 'string' },
                        { name: 'href', title: 'Enlace', type: 'string' },
                      ],
                    },
                  ],
                  description: 'Enlaces que aparecen en un desplegable al pasar el ratón sobre este enlace.',
                },
              ],
              preview: {
                select: { title: 'label', subtitle: 'href' },
              },
            },
          ],
          description: 'Enlaces del menú principal. El orden aquí es el orden en que aparecen.',
        },
        {
          name: 'ctaButton',
          title: 'Botón CTA',
          type: 'object',
          description:
            'Botón destacado de la cabecera (ej. "Pide tu cita"). En la página de inicio se usa el CTA del hero si está definido.',
          fields: [
            { name: 'label', title: 'Texto', type: 'string', description: 'Texto del botón.' },
            { name: 'href', title: 'Enlace', type: 'string', description: 'URL de destino al hacer clic.' },
          ],
        },
      ],
    },
  ],
})
