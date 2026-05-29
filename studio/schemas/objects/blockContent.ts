import { defineType, defineArrayMember } from 'sanity'

export const blockContent = defineType({
  name: 'blockContent',
  title: 'Contenido enriquecido',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'Título 2', value: 'h2' },
        { title: 'Título 3', value: 'h3' },
        { title: 'Título 4', value: 'h4' },
        { title: 'Cita', value: 'blockquote' },
      ],
      marks: {
        decorators: [
          { title: 'Negrita', value: 'strong' },
          { title: 'Itálica', value: 'em' },
          { title: 'Resaltado Rosa', value: 'highlightRose' },
          { title: 'Resaltado Púrpura', value: 'highlightPurple' },
        ],
        annotations: [
          {
            name: 'link',
            title: 'Enlace',
            type: 'object',
            fields: [
              {
                name: 'href',
                title: 'URL',
                type: 'url',
                validation: (Rule) =>
                  Rule.uri({ allowRelative: true, scheme: ['http', 'https', 'mailto', 'tel'] }),
              },
              {
                name: 'blank',
                title: 'Abrir en nueva pestaña',
                type: 'boolean',
                initialValue: false,
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          title: 'Texto alternativo',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
  ],
})
