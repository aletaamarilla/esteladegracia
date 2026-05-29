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

async function addDepressiveDisorders() {
  const docId = 'service-terapia-individual'

  const existing = await client.fetch<{ formalDisorders?: Array<{ category: string }> }>(
    `*[_id == "${docId}"][0]{ formalDisorders }`
  )

  if (!existing) {
    console.error(`❌ Document "${docId}" not found`)
    process.exit(1)
  }

  const alreadyExists = existing.formalDisorders?.some(
    (d) => d.category === 'Trastornos depresivos'
  )

  if (alreadyExists) {
    console.log('✅ "Trastornos depresivos" already exists — nothing to do.')
    return
  }

  const newEntry = {
    _key: 'depresivos',
    category: 'Trastornos depresivos',
    items: ['Depresión mayor', 'Distimia'],
  }

  const ansiedadIdx = existing.formalDisorders?.findIndex(
    (d) => d.category === 'Trastornos de Ansiedad'
  )

  if (ansiedadIdx !== undefined && ansiedadIdx >= 0) {
    await client
      .patch(docId)
      .insert('after', `formalDisorders[${ansiedadIdx}]`, [newEntry])
      .commit()
  } else {
    await client
      .patch(docId)
      .setIfMissing({ formalDisorders: [] })
      .append('formalDisorders', [newEntry])
      .commit()
  }

  console.log('✅ "Trastornos depresivos" added to Terapia Individual.')
}

addDepressiveDisorders().catch((err) => {
  console.error('❌ Error:', err.message)
  process.exit(1)
})
