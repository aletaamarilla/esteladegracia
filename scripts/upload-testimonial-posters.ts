import { createClient } from '@sanity/client'
import { createReadStream, readFileSync } from 'fs'
import { join } from 'path'

const configPath = join(process.env.HOME || '~', '.config', 'sanity', 'config.json')
const sanityConfig = JSON.parse(readFileSync(configPath, 'utf-8'))

const client = createClient({
  projectId: 'iqen5afi',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: sanityConfig.authToken,
})

const POSTERS_DIR = join(process.cwd(), 'testimonios', 'posters')

const ENTRIES = [
  { docId: 'testimonial-maria', file: 'maria.jpg' },
  { docId: 'testimonial-cathy', file: 'cathy.jpg' },
  { docId: 'testimonial-chemi', file: 'chemi.jpg' },
  { docId: 'testimonial-ramon', file: 'ramon.jpg' },
  { docId: 'testimonial-ale', file: 'ale.jpg' },
  { docId: 'testimonial-lau', file: 'lau.jpg' },
  { docId: 'testimonial-vane', file: 'vane.jpg' },
  { docId: 'testimonial-toni', file: 'toni.jpg' },
  { docId: 'testimonial-wendy', file: 'wendy.jpg' },
  { docId: 'testimonial-fatima', file: 'fatima.jpg' },
  { docId: 'testimonial-agustin', file: 'agustin.jpg' },
]

async function run() {
  console.log('\n🖼️  Uploading video posters to Sanity...\n')

  for (const [i, entry] of ENTRIES.entries()) {
    const filePath = join(POSTERS_DIR, entry.file)
    console.log(`📤 [${i + 1}/${ENTRIES.length}] ${entry.file} → ${entry.docId}`)

    try {
      const stream = createReadStream(filePath)
      const asset = await client.assets.upload('image', stream, {
        filename: entry.file,
      })

      await client
        .patch(entry.docId)
        .set({
          videoPoster: {
            _type: 'image',
            asset: { _type: 'reference', _ref: asset._id },
          },
        })
        .commit()

      console.log(`   ✅ Uploaded & linked: ${asset._id}`)
    } catch (err) {
      console.error(`   ❌ Failed:`, err)
    }
  }

  console.log('\n🎯 Done! All posters uploaded.\n')
}

run().catch(console.error)
