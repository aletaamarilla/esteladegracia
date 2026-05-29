import { createClient } from '@sanity/client'
import { createReadStream, readFileSync } from 'fs'
import { join } from 'path'

const configPath = join(process.env.HOME || '~', '.config', 'sanity', 'config.json')
const sanityConfig = JSON.parse(readFileSync(configPath, 'utf-8'))

const projectId = 'iqen5afi'
const dataset = 'production'
const token = sanityConfig.authToken

if (!token) {
  console.error('❌ No auth token found in ~/.config/sanity/config.json')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: false,
  token,
})

interface TestimonialEntry {
  id: string
  name: string
  serviceType: 'individual' | 'group'
  file: string
  order: number
}

const TESTIMONIALS: TestimonialEntry[] = [
  { id: 'testimonial-maria', name: 'María', serviceType: 'individual', file: 'testimonios/TESTIMONIOS/maria_individual.mp4', order: 1 },
  { id: 'testimonial-cathy', name: 'Cathy', serviceType: 'group', file: 'testimonios/TESTIMONIOS/sesiones-grupales/cathy.MOV', order: 2 },
  { id: 'testimonial-chemi', name: 'Chemi', serviceType: 'group', file: 'testimonios/TESTIMONIOS/sesiones-grupales/chemi.MOV', order: 3 },
  { id: 'testimonial-ramon', name: 'Ramón', serviceType: 'group', file: 'testimonios/TESTIMONIOS/sesiones-grupales/ramon.MOV', order: 4 },
  { id: 'testimonial-ale', name: 'Ale', serviceType: 'group', file: 'testimonios/TESTIMONIOS/sesiones-grupales/testimonio ALE.mov', order: 5 },
  { id: 'testimonial-lau', name: 'Lau', serviceType: 'group', file: 'testimonios/TESTIMONIOS/sesiones-grupales/testimonio LAU.mov', order: 6 },
  { id: 'testimonial-vane', name: 'Vane', serviceType: 'group', file: 'testimonios/TESTIMONIOS/sesiones-grupales/testimonio VANE.mov', order: 7 },
  { id: 'testimonial-toni', name: 'Toñi', serviceType: 'group', file: 'testimonios/TESTIMONIOS/sesiones-grupales/toni.MOV', order: 8 },
  { id: 'testimonial-wendy', name: 'Wendy', serviceType: 'group', file: 'testimonios/TESTIMONIOS/sesiones-grupales/wendy.MP4', order: 9 },
  { id: 'testimonial-fatima', name: 'Fátima', serviceType: 'group', file: 'testimonios/TESTIMONIOS/sesiones-grupales/fatima.mp4', order: 10 },
  { id: 'testimonial-agustin', name: 'Agustín', serviceType: 'group', file: 'testimonios/TESTIMONIOS/sesiones-grupales/agustin.mp4', order: 11 },
]

const DUMMY_IDS = [
  'testimonial-maria-g',
  'testimonial-carlos-r',
  'testimonial-david-m',
  'testimonial-laura-p',
  'testimonial-ana-l',
  'testimonial-sofia-m',
]

const FEATURED_IDS = [
  'testimonial-maria',
  'testimonial-cathy',
  'testimonial-ale',
  'testimonial-lau',
]

async function run() {
  console.log('\n🎬 Uploading testimonial videos and creating documents...\n')

  const createdIds: string[] = []
  const individualIds: string[] = []
  const groupIds: string[] = []

  for (const entry of TESTIMONIALS) {
    const filePath = join(process.cwd(), entry.file)
    console.log(`📤 [${entry.order}/${TESTIMONIALS.length}] Uploading ${entry.name} (${entry.file})...`)

    try {
      const stream = createReadStream(filePath)
      const asset = await client.assets.upload('file', stream, {
        filename: entry.file.split('/').pop()!,
        contentType: 'video/mp4',
      })

      console.log(`   ✅ Asset uploaded: ${asset._id}`)

      const doc = {
        _id: entry.id,
        _type: 'testimonial',
        name: entry.name,
        rating: 5,
        serviceType: entry.serviceType,
        hasVideo: true,
        videoFile: {
          _type: 'file',
          asset: { _type: 'reference', _ref: asset._id },
        },
        featured: FEATURED_IDS.includes(entry.id),
        order: entry.order,
      }

      await client.createOrReplace(doc)
      console.log(`   ✅ Document created: ${entry.id}`)

      createdIds.push(entry.id)
      if (entry.serviceType === 'individual') individualIds.push(entry.id)
      else groupIds.push(entry.id)
    } catch (err) {
      console.error(`   ❌ Failed for ${entry.name}:`, err)
    }
  }

  console.log(`\n📎 Linking testimonials to services and homepage...\n`)

  // Update service-terapia-individual
  try {
    await client
      .patch('service-terapia-individual')
      .set({
        testimonials: individualIds.map((id, i) => ({
          _type: 'reference',
          _ref: id,
          _key: `ti-${i}`,
        })),
      })
      .commit()
    console.log(`✅ service-terapia-individual: linked ${individualIds.length} testimonials`)
  } catch (err) {
    console.error('❌ Failed to update service-terapia-individual:', err)
  }

  // Update service-terapia-grupal
  try {
    await client
      .patch('service-terapia-grupal')
      .set({
        testimonials: groupIds.map((id, i) => ({
          _type: 'reference',
          _ref: id,
          _key: `tg-${i}`,
        })),
      })
      .commit()
    console.log(`✅ service-terapia-grupal: linked ${groupIds.length} testimonials`)
  } catch (err) {
    console.error('❌ Failed to update service-terapia-grupal:', err)
  }

  // Update homePage with featured testimonials
  try {
    const featuredRefs = FEATURED_IDS
      .filter((id) => createdIds.includes(id))
      .map((id, i) => ({
        _type: 'reference',
        _ref: id,
        _key: `hp-${i}`,
      }))

    await client
      .patch('homePage')
      .set({ testimonials: featuredRefs })
      .commit()
    console.log(`✅ homePage: linked ${featuredRefs.length} featured testimonials`)
  } catch (err) {
    console.error('❌ Failed to update homePage:', err)
  }

  // Delete dummy testimonials
  console.log(`\n🗑️  Deleting ${DUMMY_IDS.length} dummy testimonials...\n`)
  for (const id of DUMMY_IDS) {
    try {
      await client.delete(id)
      console.log(`   ✅ Deleted: ${id}`)
    } catch (err) {
      console.error(`   ❌ Failed to delete ${id}:`, err)
    }
  }

  console.log(`\n🎯 Done!`)
  console.log(`   Created: ${createdIds.length} testimonials`)
  console.log(`   Individual: ${individualIds.length}`)
  console.log(`   Group: ${groupIds.length}`)
  console.log(`   Featured on homepage: ${FEATURED_IDS.length}`)
  console.log(`   Deleted dummies: ${DUMMY_IDS.length}`)
}

run().catch(console.error)
