import { createClient } from '@sanity/client'

const projectId = process.env.PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID
const dataset = process.env.PUBLIC_SANITY_DATASET || process.env.SANITY_STUDIO_DATASET || 'production'

if (!projectId) {
  console.error('❌ Missing SANITY_STUDIO_PROJECT_ID or PUBLIC_SANITY_PROJECT_ID env var')
  process.exit(1)
}

if (!process.env.SANITY_API_TOKEN) {
  console.error('❌ Missing SANITY_API_TOKEN env var (needs write permissions)')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

const GEO_DEFAULTS = {
  geoRegion: 'ES-MD',
  geoPlacename: 'Madrid, España',
  geoPosition: '40.4168;-3.7038',
}

interface SeoDefaults {
  metaTitle: string
  metaDescription: string
}

const SEO_BY_TYPE: Record<string, SeoDefaults> = {
  homePage: {
    metaTitle: 'Estela de Gracia · Psicología Sin Distancia',
    metaDescription:
      'Terapia psicológica online con enfoque humano. Ansiedad, autoestima y trauma. Primera sesión de valoración sin compromiso.',
  },
  aboutPage: {
    metaTitle: 'Sobre Mí · Estela de Gracia Psicóloga',
    metaDescription:
      'Conoce a Estela de Gracia: +12 años de experiencia, formación en TCC, EMDR y Mindfulness. Artista, migrante y viajera.',
  },
  contactPage: {
    metaTitle: 'Contacto · Estela de Gracia',
    metaDescription:
      'Reserva tu primera sesión de valoración. Escríbeme por formulario o WhatsApp. Respuesta en menos de 24 horas.',
  },
  faqPage: {
    metaTitle: 'Preguntas Frecuentes · Estela de Gracia',
    metaDescription:
      'Resuelve tus dudas sobre terapia individual, grupal, precios, duración y modalidad online.',
  },
  testimonialsPage: {
    metaTitle: 'Testimonios · Estela de Gracia',
    metaDescription:
      'Opiniones reales de pacientes que han transformado su bienestar con terapia psicológica.',
  },
  resourcesPage: {
    metaTitle: 'Recursos Gratuitos · Estela de Gracia',
    metaDescription:
      'Descarga guías, audios y herramientas gratuitas para gestionar la ansiedad y mejorar tu bienestar emocional.',
  },
  servicesIndexPage: {
    metaTitle: 'Servicios de Terapia · Estela de Gracia',
    metaDescription:
      'Terapia individual y grupal para ansiedad, autoestima y bienestar emocional. Descubre cuál se adapta mejor a ti.',
  },
  blogIndexPage: {
    metaTitle: 'Blog · Estela de Gracia',
    metaDescription:
      'Artículos sobre psicología, ansiedad, autoestima y herramientas de bienestar emocional.',
  },
}

async function fillSeoDefaults() {
  const types = Object.keys(SEO_BY_TYPE)

  console.log(`\n🔍 Buscando documentos de tipo: ${types.join(', ')}...\n`)

  for (const docType of types) {
    try {
      const doc = await client.fetch<{ _id: string; _rev: string; seo?: Record<string, unknown> } | null>(
        `*[_type == $type][0]{ _id, _rev, seo }`,
        { type: docType },
      )

      if (!doc) {
        console.log(`⏭️  ${docType}: no existe en el dataset, omitiendo.`)
        continue
      }

      const seoValues = SEO_BY_TYPE[docType]

      const seoSetIfMissing: Record<string, string> = {
        'seo.metaTitle': seoValues.metaTitle,
        'seo.metaDescription': seoValues.metaDescription,
        'seo.geoRegion': GEO_DEFAULTS.geoRegion,
        'seo.geoPlacename': GEO_DEFAULTS.geoPlacename,
        'seo.geoPosition': GEO_DEFAULTS.geoPosition,
      }

      await client
        .patch(doc._id)
        .ifRevisionId(doc._rev)
        .setIfMissing({ seo: {} })
        .commit({ autoGenerateArrayKeys: true })

      const freshDoc = await client.fetch<{ _id: string; _rev: string }>(
        `*[_type == $type][0]{ _id, _rev }`,
        { type: docType },
      )

      if (!freshDoc) {
        console.log(`⚠️  ${docType}: no se pudo refetch, omitiendo.`)
        continue
      }

      await client
        .patch(freshDoc._id)
        .ifRevisionId(freshDoc._rev)
        .setIfMissing(seoSetIfMissing)
        .commit({ autoGenerateArrayKeys: true })

      console.log(`✅ ${docType}: campos SEO rellenados (setIfMissing).`)
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err)
      console.error(`❌ ${docType}: error — ${message}`)
    }
  }

  console.log(`\n🔍 Buscando siteSettings para SEO por defecto...\n`)

  try {
    const settings = await client.fetch<{ _id: string; _rev: string; defaultSeo?: Record<string, unknown> } | null>(
      `*[_type == "siteSettings"][0]{ _id, _rev, defaultSeo }`,
    )

    if (!settings) {
      console.log('⏭️  siteSettings: no existe en el dataset.')
    } else {
      await client
        .patch(settings._id)
        .ifRevisionId(settings._rev)
        .setIfMissing({ defaultSeo: {} })
        .commit({ autoGenerateArrayKeys: true })

      const fresh = await client.fetch<{ _id: string; _rev: string }>(
        `*[_type == "siteSettings"][0]{ _id, _rev }`,
      )

      if (fresh) {
        await client
          .patch(fresh._id)
          .ifRevisionId(fresh._rev)
          .setIfMissing({
            'defaultSeo.metaTitle': 'Estela de Gracia · Psicología Sin Distancia',
            'defaultSeo.metaDescription':
              'Terapia psicológica online con enfoque humano. Ansiedad, autoestima y trauma.',
            'defaultSeo.geoRegion': GEO_DEFAULTS.geoRegion,
            'defaultSeo.geoPlacename': GEO_DEFAULTS.geoPlacename,
            'defaultSeo.geoPosition': GEO_DEFAULTS.geoPosition,
          })
          .commit({ autoGenerateArrayKeys: true })

        console.log('✅ siteSettings: SEO por defecto rellenado (setIfMissing).')
      }
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error(`❌ siteSettings: error — ${message}`)
  }

  console.log('\n🎉 Script completado.\n')
}

fillSeoDefaults()
