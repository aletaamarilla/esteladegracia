import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'
import { join } from 'path'

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

type AssetMap = Record<string, { _ref: string; hotspot: { x: number; y: number } }>
const assets: AssetMap = JSON.parse(
  readFileSync(join(process.cwd(), 'scripts', 'uploaded-assets.json'), 'utf-8')
)

function img(dsc: string, hotspotOverride?: { x: number; y: number }) {
  const a = assets[dsc]
  if (!a) throw new Error(`Asset not found: ${dsc}`)
  const hs = hotspotOverride ?? a.hotspot
  return {
    _type: 'image' as const,
    asset: { _type: 'reference' as const, _ref: a._ref },
    hotspot: { _type: 'sanity.imageHotspot' as const, x: hs.x, y: hs.y, width: 0.3, height: 0.3 },
    crop: { _type: 'sanity.imageCrop' as const, top: 0, bottom: 0, left: 0, right: 0 },
  }
}

function galleryImg(dsc: string, key: string) {
  return { _key: key, ...img(dsc) }
}

interface PatchJob {
  docId: string
  label: string
  fields: Record<string, unknown>
}

const jobs: PatchJob[] = [
  // ── Home Page ──
  {
    docId: 'homePage',
    label: 'homePage — hero + aboutPreview + transition + ctaBanner',
    fields: {
      'hero.backgroundImage': img('DSC00643', { x: 0.5, y: 0.25 }),
      'aboutPreview.profileImage': img('DSC00572', { x: 0.5, y: 0.2 }),
      'aboutPreview.humanImage': img('Copia de 3editada-5', { x: 0.5, y: 0.3 }),
      'transitionSection.image': img('DSC00670', { x: 0.5, y: 0.35 }),
      'ctaBanner.backgroundImage': img('DSC00600', { x: 0.5, y: 0.4 }),
    },
  },

  // ── About Page ──
  {
    docId: 'aboutPage',
    label: 'aboutPage — hero + story + transition + ctaBanner',
    fields: {
      'hero.heroImage': img('DSC00689', { x: 0.5, y: 0.25 }),
      'personalStory.storyImage': img('DSC00649', { x: 0.5, y: 0.3 }),
      'transitionBanner.image': img('DSC00621', { x: 0.5, y: 0.3 }),
      'ctaBanner.backgroundImage': img('DSC00604', { x: 0.5, y: 0.25 }),
    },
  },

  // ── Contact Page ──
  {
    docId: 'contactPage',
    label: 'contactPage — sideImage',
    fields: {
      sideImage: img('DSC00694', { x: 0.5, y: 0.25 }),
    },
  },

  // ── Testimonials Page ──
  {
    docId: 'testimonialsPage',
    label: 'testimonialsPage — heroImage + ctaBanner',
    fields: {
      heroImage: img('DSC00816', { x: 0.5, y: 0.3 }),
      'ctaBanner.backgroundImage': img('DSC00662', { x: 0.5, y: 0.3 }),
    },
  },

  // ── FAQ Page ──
  {
    docId: 'faqPage',
    label: 'faqPage — sideImage + ctaBanner',
    fields: {
      sideImage: img('DSC00566', { x: 0.5, y: 0.2 }),
      'ctaBanner.backgroundImage': img('DSC00769', { x: 0.5, y: 0.3 }),
    },
  },

  // ── Blog Index Page ──
  {
    docId: 'blogIndexPage',
    label: 'blogIndexPage — heroImage + ctaBanner',
    fields: {
      heroImage: img('DSC00686', { x: 0.5, y: 0.35 }),
      'ctaBanner.backgroundImage': img('DSC00817', { x: 0.5, y: 0.3 }),
    },
  },

  // ── Resources Page ──
  {
    docId: 'resourcesPage',
    label: 'resourcesPage — heroImage + ctaBanner',
    fields: {
      heroImage: img('DSC00677', { x: 0.5, y: 0.3 }),
      'ctaBanner.backgroundImage': img('DSC00651', { x: 0.5, y: 0.3 }),
    },
  },

  // ── Services Index Page ──
  {
    docId: 'servicesIndexPage',
    label: 'servicesIndexPage — heroImage + ctaBanner',
    fields: {
      heroImage: img('DSC00574', { x: 0.5, y: 0.25 }),
      'ctaBanner.backgroundImage': img('DSC00696', { x: 0.5, y: 0.25 }),
    },
  },

  // ── Service: Terapia Individual ──
  {
    docId: 'service-terapia-individual',
    label: 'Sesiones individuales — heroImage + ctaBanner (no gallery)',
    fields: {
      heroImage: img('DSC00604', { x: 0.5, y: 0.25 }),
      galleryImages: [],
      'ctaBanner.backgroundImage': img('DSC00816', { x: 0.5, y: 0.3 }),
    },
  },

  // ── Service: Terapia Grupal ──
  {
    docId: 'service-terapia-grupal',
    label: 'Terapia grupal - heroImage + gallery + ctaBanner',
    fields: {
      heroImage: img('DSC00751', { x: 0.5, y: 0.25 }),
      galleryImages: [
        galleryImg('DSC00769', 'g1'),
        galleryImg('DSC00790', 'g2'),
        galleryImg('DSC00777', 'g3'),
        galleryImg('DSC00764', 'g4'),
        galleryImg('DSC00749', 'g5'),
        galleryImg('DSC00767', 'g6'),
        galleryImg('DSC00743', 'g7'),
      ],
      'ctaBanner.backgroundImage': img('DSC00662', { x: 0.5, y: 0.3 }),
    },
  },
]

async function assignPhotos() {
  console.log(`\n🖼️  Assigning photos to ${jobs.length} Sanity documents...\n`)

  for (const job of jobs) {
    try {
      await client.patch(job.docId).set(job.fields).commit()
      console.log(`✅ ${job.label}`)
    } catch (err: any) {
      if (err?.statusCode === 404) {
        const draftId = `drafts.${job.docId}`
        try {
          await client.patch(draftId).set(job.fields).commit()
          console.log(`✅ ${job.label} (draft)`)
        } catch {
          console.error(`❌ ${job.label}: document not found (tried ${job.docId} and ${draftId})`)
        }
      } else {
        console.error(`❌ ${job.label}:`, err?.message ?? err)
      }
    }
  }

  console.log('\n🎯 Photo assignment complete!\n')
}

assignPhotos()
