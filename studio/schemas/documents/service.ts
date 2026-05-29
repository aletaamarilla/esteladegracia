import { defineType } from 'sanity'
import { ALLOWED_ICONS } from '../shared/iconList'

export const service = defineType({
  name: 'service',
  title: 'Servicio',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Nombre del servicio (ej. "Terapia Individual", "Terapia Grupal").',
    },
    {
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
      description: 'Parte de la URL del servicio. Se genera automáticamente desde el título. Ej: "terapia-individual".',
    },
    {
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Frase corta que acompaña al título en la tarjeta de vista previa y en la cabecera.',
    },
    {
      name: 'color',
      title: 'Color del tema',
      type: 'string',
      options: {
        list: [
          { title: 'Rosa', value: 'rose' },
          { title: 'Púrpura', value: 'purple' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
      description: 'Color visual del servicio. "Púrpura" activa los campos específicos de terapia grupal.',
    },
    {
      name: 'heroLabel',
      title: 'Etiqueta del hero',
      type: 'string',
      description: 'Texto pequeño encima del título en la cabecera del servicio (ej. "Terapia online").',
    },
    {
      name: 'heroImage',
      title: 'Imagen del hero',
      type: 'image',
      options: { hotspot: true },
      description: 'Imagen principal de la cabecera de la página del servicio.',
    },
    {
      name: 'whoIsItFor',
      title: '¿Para quién es?',
      type: 'text',
      rows: 4,
      description: 'Texto que describe el perfil de persona a la que va dirigido este servicio.',
    },
    {
      name: 'galleryImages',
      title: 'Galería de fotos',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
        },
      ],
      description: 'Fotos profesionales que se muestran en la página del servicio. Recomendado: 3-6 imágenes.',
    },
    {
      name: 'previewCard',
      title: 'Tarjeta de vista previa',
      type: 'object',
      description: 'Datos que aparecen en la tarjeta del servicio en la página de Servicios (índice).',
      fields: [
        { name: 'badge', title: 'Badge (ej: "Más Popular")', type: 'string', description: 'Etiqueta destacada en la esquina de la tarjeta. Déjala vacía si no quieres badge.' },
        { name: 'shortDescription', title: 'Descripción corta', type: 'string', description: 'Resumen del servicio para la tarjeta (1-2 frases).' },
        {
          name: 'features',
          title: 'Características',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'Lista de características principales que aparecen como bullets en la tarjeta.',
        },
      ],
    },
    {
      name: 'formalDisorders',
      title: 'Trastornos formales',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'category', title: 'Categoría', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'items', title: 'Elementos', type: 'array', of: [{ type: 'string' }] },
          ],
          preview: {
            select: { title: 'category' },
          },
        },
      ],
      description: 'Categorías de trastornos que tratas, organizados por tipo (ej. "Trastornos de ansiedad", "Trastornos del ánimo").',
    },
    {
      name: 'transdiagnostic',
      title: 'Temas transdiagnósticos',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Temas que no son trastornos específicos pero que trabajas en terapia (ej. "Autoestima", "Duelo", "Estrés laboral").',
    },
    {
      name: 'evaluation',
      title: 'Evaluación',
      type: 'object',
      description: 'Información sobre la sesión de evaluación inicial.',
      fields: [
        { name: 'description', title: 'Descripción', type: 'text', rows: 3, description: 'Explica en qué consiste la sesión de evaluación.' },
        { name: 'price', title: 'Precio (€)', type: 'number', description: 'Precio de la sesión de evaluación.' },
        {
          name: 'video',
          title: 'Vídeo explicativo',
          type: 'file',
          options: { accept: 'video/*' },
          description: 'Vídeo breve explicando cómo funciona la sesión de valoración.',
        },
        {
          name: 'videoPoster',
          title: 'Imagen de portada del vídeo',
          type: 'image',
          options: { hotspot: true },
          description: 'Imagen que se muestra antes de reproducir el vídeo.',
        },
        {
          name: 'videoLabel',
          title: 'Texto del botón de vídeo',
          type: 'string',
          description: 'Texto accesible y visible bajo el vídeo. Ej: "Cómo es la sesión de valoración".',
        },
      ],
    },
    {
      name: 'pricing',
      title: 'Precios',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Nombre', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'price', title: 'Precio (€)', type: 'number', validation: (Rule) => Rule.required() },
            { name: 'savings', title: 'Ahorro (€)', type: 'number' },
          ],
          preview: {
            select: { title: 'name', subtitle: 'price' },
            prepare: ({ title, subtitle }) => ({
              title,
              subtitle: subtitle ? `${subtitle}€` : '',
            }),
          },
        },
      ],
      description: 'Opciones de precio del servicio (ej. sesión suelta, bono de 4 sesiones, bono de 8).',
    },
    {
      name: 'pricePerHour',
      title: 'Nota de precio por hora',
      type: 'string',
      description: 'Texto con el precio por hora del servicio (ej. "13,33€ por hora si abonas en un solo pago, 16,66€ si pagas mensualmente").',
      hidden: ({ document }) => document?.color !== 'purple',
    },
    {
      name: 'methodology',
      title: 'Metodología',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Enfoques terapéuticos que aplicas en este servicio (ej. "Terapia Cognitivo-Conductual", "EMDR").',
    },
    {
      name: 'outcomes',
      title: 'Resultados esperados',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Resultados que la persona puede esperar al terminar el proceso terapéutico.',
    },
    {
      name: 'process',
      title: 'Proceso',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'step', title: 'Paso', type: 'number', validation: (Rule) => Rule.required() },
            { name: 'title', title: 'Título', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'description', title: 'Descripción', type: 'string' },
          ],
          preview: {
            select: { title: 'title', step: 'step' },
            prepare: ({ title, step }) => ({
              title: `Paso ${step}: ${title}`,
            }),
          },
        },
      ],
      description: 'Pasos del proceso terapéutico (ej. "1. Evaluación", "2. Plan personalizado", "3. Sesiones semanales").',
    },
    {
      name: 'testimonials',
      title: 'Testimonios',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'testimonial' }] }],
      description: 'Elige qué testimonios de pacientes se muestran en la página de este servicio.',
    },
    {
      name: 'ctaBanner',
      title: 'Banner CTA',
      type: 'ctaBanner',
      description: 'Bloque final con un mensaje motivacional y un botón de acción.',
    },
    {
      name: 'programDetails',
      title: 'Detalles del programa (solo grupal)',
      type: 'object',
      description: 'Información logística del programa grupal: duración, frecuencia, tamaño del grupo, etc.',
      fields: [
        { name: 'duration', title: 'Duración', type: 'string', description: 'Duración total del programa (ej. "4 meses").' },
        { name: 'sessionsTotal', title: 'Total de sesiones', type: 'number', description: 'Número total de sesiones del programa.' },
        { name: 'frequency', title: 'Frecuencia', type: 'string', description: 'Con qué frecuencia se hacen las sesiones (ej. "Semanal").' },
        { name: 'groupSize', title: 'Tamaño del grupo', type: 'string', description: 'Número de participantes (ej. "6-10 personas").' },
        { name: 'sessionLength', title: 'Duración de sesión', type: 'string', description: 'Duración de cada sesión (ej. "90 minutos").' },
        { name: 'modality', title: 'Modalidad', type: 'string', description: 'Formato de las sesiones (ej. "Online en directo vía Zoom").' },
      ],
      hidden: ({ document }) => document?.color !== 'purple',
    },
    {
      name: 'differentiators',
      title: 'Diferenciadores (solo grupal)',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Qué hace especial tu programa grupal frente a otros (ej. "Grupo reducido", "Material incluido").',
      hidden: ({ document }) => document?.color !== 'purple',
    },
    {
      name: 'bonuses',
      title: 'Bonuses (solo grupal)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Título', type: 'string' },
            { name: 'description', title: 'Descripción', type: 'string' },
          ],
        },
      ],
      description: 'Extras que se incluyen con el programa (ej. "Acceso a comunidad privada", "Cuaderno de trabajo").',
      hidden: ({ document }) => document?.color !== 'purple',
    },
    {
      name: 'monthlyBreakdown',
      title: 'Desglose mensual (solo grupal)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'month', title: 'Mes', type: 'number' },
            { name: 'title', title: 'Título', type: 'string' },
            { name: 'description', title: 'Descripción', type: 'text', rows: 2 },
            { name: 'topics', title: 'Temas', type: 'array', of: [{ type: 'string' }] },
          ],
          preview: {
            select: { title: 'title', month: 'month' },
            prepare: ({ title, month }) => ({
              title: `Mes ${month}: ${title}`,
            }),
          },
        },
      ],
      description: 'Detalle mes a mes de lo que se trabaja en cada fase del programa.',
      hidden: ({ document }) => document?.color !== 'purple',
    },
    {
      name: 'syllabusCapture',
      title: 'Captura de temario (solo grupal)',
      type: 'object',
      description: 'Sección para que las visitantes dejen su email a cambio del temario completo del programa.',
      fields: [
        { name: 'title', title: 'Título', type: 'string', description: 'Título del bloque de captación.' },
        { name: 'titleHighlight', title: 'Texto resaltado', type: 'string', description: 'Parte del título en color destacado.' },
        { name: 'description', title: 'Descripción', type: 'text', rows: 2, description: 'Texto que explica qué recibirán al dejar su email.' },
        { name: 'buttonText', title: 'Texto del botón', type: 'string', description: 'Texto del botón de envío.' },
        { name: 'successMessage', title: 'Mensaje de éxito', type: 'string', description: 'Texto que se muestra tras enviar el email.' },
      ],
      hidden: ({ document }) => document?.color !== 'purple',
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'tagline',
    },
  },
})
