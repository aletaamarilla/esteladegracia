import { defineType } from 'sanity'

export const privacyPolicyPage = defineType({
  name: 'privacyPolicyPage',
  title: 'Política de Privacidad',
  type: 'document',
  preview: {
    prepare() {
      return { title: 'Política de Privacidad' }
    },
  },
  fields: [
    {
      name: 'title',
      title: 'Título',
      type: 'string',
      initialValue: 'Política de Privacidad',
      description: 'Título que se muestra como encabezado de la página.',
    },
    {
      name: 'lastUpdated',
      title: 'Última actualización',
      type: 'date',
      description: 'Fecha visible al usuario indicando cuándo se actualizó por última vez la política.',
    },
    {
      name: 'body',
      title: 'Contenido',
      type: 'blockContent',
      description: 'Texto completo de la política de privacidad en formato enriquecido.',
    },
  ],
})
