import type { StructureBuilder } from 'sanity/structure'

const SINGLETON_TYPES = [
  'siteSettings',
  'homePage',
  'aboutPage',
  'contactPage',
  'faqPage',
  'testimonialsPage',
  'resourcesPage',
  'servicesIndexPage',
  'blogIndexPage',
  'privacyPolicyPage',
]

function singletonItem(S: StructureBuilder, typeName: string, title: string) {
  return S.listItem()
    .title(title)
    .id(typeName)
    .child(
      S.document()
        .schemaType(typeName)
        .documentId(typeName)
    )
}

export const deskStructure = (S: StructureBuilder) =>
  S.list()
    .title('Contenido')
    .items([
      S.listItem()
        .title('⚙ Configuración')
        .child(
          S.list()
            .title('Configuración')
            .items([
              singletonItem(S, 'siteSettings', 'Ajustes del Sitio'),
            ])
        ),

      S.divider(),

      S.listItem()
        .title('📄 Páginas')
        .child(
          S.list()
            .title('Páginas')
            .items([
              singletonItem(S, 'homePage', '🏠 Inicio'),
              singletonItem(S, 'aboutPage', '👩 Sobre Mí'),
              singletonItem(S, 'contactPage', '📞 Contacto'),
              singletonItem(S, 'faqPage', '❓ FAQ'),
              singletonItem(S, 'testimonialsPage', '💬 Testimonios'),
              singletonItem(S, 'resourcesPage', '🎁 Recursos'),
              singletonItem(S, 'servicesIndexPage', '🩺 Servicios — Índice'),
              singletonItem(S, 'blogIndexPage', '📝 Blog — Índice'),
            ])
        ),

      S.divider(),

      S.listItem()
        .title('⚖ Legal')
        .child(
          S.list()
            .title('Legal')
            .items([
              singletonItem(S, 'privacyPolicyPage', '📜 Política de Privacidad'),
            ])
        ),

      S.divider(),

      S.listItem()
        .title('📦 Contenido')
        .child(
          S.list()
            .title('Contenido')
            .items([
              S.documentTypeListItem('service').title('🩺 Servicios'),
              S.documentTypeListItem('testimonial').title('💬 Testimonios'),
              S.documentTypeListItem('faqItem').title('❓ Preguntas Frecuentes'),
              S.documentTypeListItem('blogPost').title('📝 Blog'),
              S.documentTypeListItem('resource').title('🎁 Recursos'),
            ])
        ),
    ])
