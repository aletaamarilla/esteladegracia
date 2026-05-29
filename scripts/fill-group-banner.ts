import { createClient } from '@sanity/client'

const projectId = process.env.PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID
const dataset = process.env.PUBLIC_SANITY_DATASET || process.env.SANITY_STUDIO_DATASET || 'production'

if (!projectId) {
  console.error('❌ Missing SANITY_STUDIO_PROJECT_ID or PUBLIC_SANITY_PROJECT_ID env var')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

async function fillGroupBanner() {
  console.log('📝 Filling groupLaunchBanner on homePage...')

  const existing = await client.fetch(`*[_id == "homePage"][0]{ _id }`)
  if (!existing) {
    console.error('❌ homePage singleton not found. Run fill-singletons first.')
    process.exit(1)
  }

  await client.patch('homePage').set({
    groupLaunchBanner: {
      enabled: true,
      badge: 'TERAPIA GRUPAL',
      title: 'PROGRAMA: MIRARTE DISTINTO',
      subtitle:
        'Un proceso grupal para salir del bucle de la ansiedad, entender tus patrones y empezar a relacionarte de otra manera',
      ctaLabel: 'Reservar mi plaza',
      ctaHref: '/contacto',
      secondaryCtaLabel: 'Más información',
      secondaryCtaHref: '/servicios/terapia-grupal',
    },
  }).commit()

  console.log('  ✅ groupLaunchBanner filled and enabled')
}

fillGroupBanner().catch((err) => {
  console.error('❌ Error:', err.message)
  process.exit(1)
})
