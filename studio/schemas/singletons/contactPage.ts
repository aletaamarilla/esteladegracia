import { defineType } from 'sanity'
import { ALLOWED_ICONS } from '../shared/iconList'

export const contactPage = defineType({
  name: 'contactPage',
  title: 'Contacto',
  type: 'document',
  preview: {
    select: { title: 'title' },
    prepare({ title }) {
      return { title: title || 'Contacto' }
    },
  },
  fields: [
    {
      name: 'sectionLabel',
      title: 'Etiqueta de sección',
      type: 'string',
      description: 'Texto pequeño que aparece encima del título (ej. "Hablemos").',
    },
    {
      name: 'title',
      title: 'Título',
      type: 'string',
      description: 'Título principal de la página de contacto.',
    },
    {
      name: 'titleHighlight',
      title: 'Texto resaltado',
      type: 'string',
      description: 'Parte del título que aparece en color destacado.',
    },
    {
      name: 'subtitle',
      title: 'Subtítulo',
      type: 'string',
      description: 'Frase de apoyo bajo el título para animar a escribir.',
    },
    {
      name: 'formLabels',
      title: 'Etiquetas del formulario',
      type: 'object',
      description: 'Textos que se muestran en cada campo del formulario de contacto. Si los dejas vacíos se usan valores por defecto.',
      fields: [
        { name: 'nameLabel', title: 'Etiqueta nombre', type: 'string', description: 'Texto sobre el campo de nombre (ej. "Tu nombre").' },
        { name: 'namePlaceholder', title: 'Placeholder nombre', type: 'string', description: 'Texto de ejemplo dentro del campo de nombre.' },
        { name: 'emailLabel', title: 'Etiqueta email', type: 'string', description: 'Texto sobre el campo de email.' },
        { name: 'emailPlaceholder', title: 'Placeholder email', type: 'string', description: 'Texto de ejemplo dentro del campo de email.' },
        { name: 'phoneLabel', title: 'Etiqueta teléfono', type: 'string', description: 'Texto sobre el campo de teléfono.' },
        { name: 'phonePlaceholder', title: 'Placeholder teléfono', type: 'string', description: 'Texto de ejemplo dentro del campo de teléfono.' },
        { name: 'messageLabel', title: 'Etiqueta mensaje', type: 'string', description: 'Texto sobre el campo de mensaje.' },
        { name: 'messagePlaceholder', title: 'Placeholder mensaje', type: 'string', description: 'Texto de ejemplo dentro del campo de mensaje.' },
        { name: 'submitButton', title: 'Texto del botón enviar', type: 'string', description: 'Texto del botón para enviar el formulario (ej. "Enviar mensaje").' },
        { name: 'privacyNote', title: 'Nota de privacidad', type: 'string', description: 'Texto legal pequeño que aparece debajo del botón de envío.' },
      ],
    },
    {
      name: 'successState',
      title: 'Estado de éxito',
      type: 'object',
      description: 'Lo que ve la persona después de enviar el formulario correctamente.',
      fields: [
        { name: 'title', title: 'Título', type: 'string', description: 'Titular de confirmación (ej. "¡Mensaje enviado!").' },
        { name: 'message', title: 'Mensaje', type: 'text', rows: 3, description: 'Texto explicando que has recibido el mensaje y cuándo responderás.' },
        { name: 'farewell', title: 'Despedida', type: 'string', description: 'Frase de cierre cálida (ej. "Un abrazo, Estela").' },
      ],
    },
    {
      name: 'whatsappSection',
      title: 'Sección WhatsApp',
      type: 'object',
      description: 'Bloque alternativo al formulario para contactar directamente por WhatsApp.',
      fields: [
        { name: 'title', title: 'Título', type: 'string', description: 'Titular de la sección WhatsApp (ej. "¿Prefieres WhatsApp?").' },
        { name: 'description', title: 'Descripción', type: 'string', description: 'Texto de apoyo explicando la opción de WhatsApp.' },
        { name: 'buttonText', title: 'Texto del botón', type: 'string', description: 'Texto del botón de WhatsApp (ej. "Escríbeme por WhatsApp").' },
      ],
    },
    {
      name: 'sideImage',
      title: 'Imagen lateral',
      type: 'image',
      options: { hotspot: true },
      description: 'Foto cálida que aparece junto al formulario en escritorio. Se oculta en móvil.',
    },
    {
      name: 'infoCards',
      title: 'Tarjetas de información',
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
      description: 'Tarjetas informativas debajo del formulario (ej. horario, email, ubicación).',
    },
  ],
})
