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

const TYPES_TO_DELETE = ['faqItem', 'blogPost', 'resource'] as const

async function main() {
  const confirm = process.argv.includes('--confirm')

  console.log('🔍 Buscando datos de prueba...\n')

  const counts: Record<string, number> = {}
  for (const type of TYPES_TO_DELETE) {
    const docs = await client.fetch<{ _id: string }[]>(`*[_type == "${type}"]{ _id }`)
    counts[type] = docs.length
    console.log(`  ${type}: ${docs.length} documentos`)
  }

  const total = Object.values(counts).reduce((a, b) => a + b, 0)
  if (total === 0) {
    console.log('\n✅ No hay datos de prueba que borrar.')
    return
  }

  console.log(`\n  Total: ${total} documentos a eliminar`)

  if (!confirm) {
    console.log('\n⚠️  Ejecuta con --confirm para borrar los datos:')
    console.log('   npm run clean-test-data -- --confirm')
    return
  }

  console.log('\n🗑️  Eliminando documentos...\n')

  for (const type of TYPES_TO_DELETE) {
    if (counts[type] === 0) continue

    const ids = await client.fetch<string[]>(`*[_type == "${type}"]._id`)
    let deleted = 0
    for (const id of ids) {
      await client.delete(id)
      deleted++
    }
    console.log(`  ✅ ${type}: ${deleted} documentos eliminados`)
  }

  console.log('\n🎉 Limpieza completada.')
}

main().catch((err) => {
  console.error('❌ Error:', err.message)
  process.exit(1)
})
