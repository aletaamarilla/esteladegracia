import { createClient } from '@sanity/client'

const projectId = process.env.PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID
const dataset = process.env.PUBLIC_SANITY_DATASET || process.env.SANITY_STUDIO_DATASET || 'production'
const token = process.env.SANITY_API_TOKEN

if (!projectId) {
  console.error('❌ Missing SANITY_STUDIO_PROJECT_ID or PUBLIC_SANITY_PROJECT_ID env var')
  process.exit(1)
}
if (!token) {
  console.error('❌ Missing SANITY_API_TOKEN env var (needs write access)')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: false,
  token,
})

async function publishAllDrafts() {
  const drafts = await client.fetch<Array<Record<string, unknown>>>(
    `*[_id in path("drafts.**")]`,
  )

  if (drafts.length === 0) {
    console.log('✅ No drafts found — everything is already published.')
    return
  }

  console.log(`📦 Found ${drafts.length} draft(s). Publishing…\n`)

  let published = 0
  let failed = 0

  for (const draft of drafts) {
    const draftId = draft._id as string
    const publishedId = draftId.replace(/^drafts\./, '')
    const docType = draft._type as string

    try {
      const { _id, _createdAt, _updatedAt, _rev, ...rest } = draft
      const publishedDoc = { ...rest, _id: publishedId }

      await client
        .transaction()
        .createOrReplace(publishedDoc as any)
        .delete(draftId)
        .commit()

      published++
      console.log(`  ✅ [${docType}] ${publishedId}`)
    } catch (err: any) {
      failed++
      console.error(`  ❌ [${docType}] ${publishedId}: ${err.message}`)
    }
  }

  console.log(`\n🎉 Done — ${published} published, ${failed} failed.`)
}

publishAllDrafts()
