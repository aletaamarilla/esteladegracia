import { createClient } from '@sanity/client'
import { createReadStream, writeFileSync, existsSync } from 'fs'
import { join } from 'path'

const projectId = process.env.PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID
const dataset = process.env.PUBLIC_SANITY_DATASET || process.env.SANITY_STUDIO_DATASET || 'production'

if (!projectId) {
  console.error('❌ Missing SANITY_STUDIO_PROJECT_ID or PUBLIC_SANITY_PROJECT_ID env var')
  process.exit(1)
}

if (!process.env.SANITY_API_TOKEN) {
  console.error('❌ Missing SANITY_API_TOKEN env var (needs write access)')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

interface PhotoEntry {
  file: string
  title: string
  alt: string
  hotspot: { x: number; y: number }
}

const PHOTOS: PhotoEntry[] = [
  // SET A — Retrato Cercano
  { file: 'DSC00566.JPG', title: 'Retrato pensativa', alt: 'Estela de Gracia en pose pensativa', hotspot: { x: 0.5, y: 0.2 } },
  { file: 'DSC00567.JPG', title: 'Headshot profesional', alt: 'Estela de Gracia headshot profesional', hotspot: { x: 0.5, y: 0.2 } },

  // SET B — De Pie con Libreta
  { file: 'DSC00572.JPG', title: 'De pie con libreta sonriendo', alt: 'Estela de Gracia de pie sosteniendo libreta con sonrisa', hotspot: { x: 0.5, y: 0.25 } },
  { file: 'DSC00574.JPG', title: 'De pie con libreta lateral', alt: 'Estela de Gracia con libreta, ángulo lateral', hotspot: { x: 0.5, y: 0.25 } },
  { file: 'DSC00585.JPG', title: 'De pie mirando a lo lejos', alt: 'Estela de Gracia de pie con libreta mirando al horizonte', hotspot: { x: 0.5, y: 0.35 } },

  // SET C — Terapia Online / Laptop
  { file: 'DSC00591.JPG', title: 'En laptop con libreta', alt: 'Estela de Gracia trabajando en laptop con libreta', hotspot: { x: 0.5, y: 0.3 } },
  { file: 'DSC00600.JPG', title: 'Sesión online saludando', alt: 'Estela de Gracia saludando en sesión de terapia online', hotspot: { x: 0.5, y: 0.3 } },
  { file: 'DSC00602.JPG', title: 'Saludo terapia online', alt: 'Estela de Gracia saludando con mano abierta y sonrisa amplia', hotspot: { x: 0.5, y: 0.25 } },
  { file: 'DSC00604.JPG', title: 'En sesión online cercana', alt: 'Estela de Gracia en sesión online con expresión cercana', hotspot: { x: 0.5, y: 0.25 } },
  { file: 'DSC00606.JPG', title: 'Gesto acogedor online', alt: 'Estela de Gracia con gesto acogedor en sesión online', hotspot: { x: 0.5, y: 0.25 } },
  { file: 'DSC00615.JPG', title: 'Escribiendo en laptop', alt: 'Estela de Gracia escribiendo en laptop', hotspot: { x: 0.5, y: 0.3 } },
  { file: 'DSC00617.JPG', title: 'Preparando sesión', alt: 'Estela de Gracia preparando sesión en laptop', hotspot: { x: 0.5, y: 0.3 } },
  { file: 'DSC00621.JPG', title: 'Trabajando en laptop', alt: 'Estela de Gracia trabajando concentrada en laptop', hotspot: { x: 0.5, y: 0.3 } },
  { file: 'DSC00622.JPG', title: 'Concentrada en pantalla', alt: 'Estela de Gracia concentrada mirando pantalla', hotspot: { x: 0.5, y: 0.3 } },
  { file: 'DSC00625.JPG', title: 'Saludo vertical', alt: 'Estela de Gracia saludando en formato vertical', hotspot: { x: 0.5, y: 0.25 } },
  { file: 'DSC00627.JPG', title: 'Sonrisa en escritorio', alt: 'Estela de Gracia sonriendo en escritorio', hotspot: { x: 0.5, y: 0.25 } },
  { file: 'DSC00629.JPG', title: 'Atendiendo con libreta', alt: 'Estela de Gracia atendiendo con libreta en mano', hotspot: { x: 0.5, y: 0.25 } },

  // SET D — Sofá / Cercanía
  { file: 'DSC00643.JPG', title: 'Close-up en sofá', alt: 'Estela de Gracia sentada en sofá con mirada directa', hotspot: { x: 0.5, y: 0.25 } },
  { file: 'DSC00649.JPG', title: 'En sofá relajada', alt: 'Estela de Gracia en sofá con expresión relajada', hotspot: { x: 0.5, y: 0.3 } },
  { file: 'DSC00650.JPG', title: 'En sofá con libreta', alt: 'Estela de Gracia en sofá con libreta sobre la mesa', hotspot: { x: 0.5, y: 0.3 } },
  { file: 'DSC00651.JPG', title: 'Sentada en sofá sonriendo', alt: 'Estela de Gracia sentada en sofá con sonrisa cálida', hotspot: { x: 0.5, y: 0.3 } },

  // SET E — En el Suelo / Café
  { file: 'DSC00662.JPG', title: 'Sentada en suelo con café', alt: 'Estela de Gracia sentada en el suelo con taza de café', hotspot: { x: 0.5, y: 0.3 } },
  { file: 'DSC00670.JPG', title: 'En el suelo con café cercana', alt: 'Estela de Gracia en el suelo con expresión cercana', hotspot: { x: 0.5, y: 0.35 } },
  { file: 'DSC00677.JPG', title: 'Escribiendo en journal', alt: 'Estela de Gracia escribiendo en su journal', hotspot: { x: 0.5, y: 0.3 } },
  { file: 'DSC00686.JPG', title: 'Journaling íntimo', alt: 'Estela de Gracia escribiendo recostada contra sofá', hotspot: { x: 0.5, y: 0.35 } },
  { file: 'DSC00689.JPG', title: 'Retrato en sofá natural', alt: 'Estela de Gracia con expresión natural y cercana', hotspot: { x: 0.5, y: 0.25 } },
  { file: 'DSC00691.JPG', title: 'Retrato sofá sonrisa', alt: 'Estela de Gracia con sonrisa genuina en sofá', hotspot: { x: 0.5, y: 0.25 } },

  // SET F — Escritorio / Profesional
  { file: 'DSC00694.JPG', title: 'Hablando con gesto abierto', alt: 'Estela de Gracia en escritorio hablando con gesto abierto', hotspot: { x: 0.5, y: 0.25 } },
  { file: 'DSC00696.JPG', title: 'Escuchando con empatía', alt: 'Estela de Gracia escuchando con expresión empática', hotspot: { x: 0.5, y: 0.25 } },
  { file: 'DSC00704.JPG', title: 'Trabajando en laptop escritorio', alt: 'Estela de Gracia trabajando concentrada en su escritorio', hotspot: { x: 0.5, y: 0.3 } },
  { file: 'DSC00718.JPG', title: 'Explicando con gesto', alt: 'Estela de Gracia explicando con gesto de manos', hotspot: { x: 0.5, y: 0.3 } },
  { file: 'DSC00721.JPG', title: 'Tomando notas', alt: 'Estela de Gracia tomando notas mientras habla', hotspot: { x: 0.5, y: 0.3 } },
  { file: 'DSC00724.JPG', title: 'Atenta en escritorio', alt: 'Estela de Gracia atenta en su escritorio', hotspot: { x: 0.5, y: 0.3 } },
  { file: 'DSC00731.JPG', title: 'Sonrisa profesional', alt: 'Estela de Gracia con sonrisa profesional en escritorio', hotspot: { x: 0.5, y: 0.3 } },
  { file: 'DSC00737.JPG', title: 'Concentrada en laptop', alt: 'Estela de Gracia concentrada mirando laptop', hotspot: { x: 0.5, y: 0.3 } },
  { file: 'DSC00743.JPG', title: 'Preparando material', alt: 'Estela de Gracia preparando material terapéutico', hotspot: { x: 0.5, y: 0.3 } },

  // SET G — Meditación / Enseñanza
  { file: 'DSC00749.JPG', title: 'Meditación serena', alt: 'Estela de Gracia en postura de meditación serena', hotspot: { x: 0.5, y: 0.25 } },
  { file: 'DSC00751.JPG', title: 'Meditación manos arriba', alt: 'Estela de Gracia en postura de meditación con manos arriba', hotspot: { x: 0.5, y: 0.25 } },
  { file: 'DSC00764.JPG', title: 'De pie revisando', alt: 'Estela de Gracia de pie revisando documentos', hotspot: { x: 0.5, y: 0.3 } },
  { file: 'DSC00767.JPG', title: 'Enseñando con modelo', alt: 'Estela de Gracia enseñando con modelo cerebral', hotspot: { x: 0.5, y: 0.3 } },
  { file: 'DSC00769.JPG', title: 'Sosteniendo cerebro', alt: 'Estela de Gracia sosteniendo modelo de cerebro', hotspot: { x: 0.5, y: 0.3 } },
  { file: 'DSC00777.JPG', title: 'Enseñando de pie', alt: 'Estela de Gracia enseñando de pie junto a escritorio', hotspot: { x: 0.5, y: 0.3 } },
  { file: 'DSC00790.JPG', title: 'Revisando papeles sonriendo', alt: 'Estela de Gracia revisando papeles con sonrisa', hotspot: { x: 0.5, y: 0.3 } },

  // SET H — Detalles / Tatuaje
  { file: 'DSC00810.JPG', title: 'Detalle manos tatuaje', alt: 'Detalle de manos entrelazadas con tatuaje', hotspot: { x: 0.5, y: 0.5 } },

  // SET I — Sentada Cruzada
  { file: 'DSC00816.JPG', title: 'Sentada cruzada sonriendo', alt: 'Estela de Gracia sentada con piernas cruzadas y sonrisa', hotspot: { x: 0.5, y: 0.3 } },
  { file: 'DSC00817.JPG', title: 'Sentada cruzada pensativa', alt: 'Estela de Gracia sentada con piernas cruzadas en pose pensativa', hotspot: { x: 0.5, y: 0.3 } },

  // SET J — Editadas / Personal
  { file: 'Copia de 3editada-5.jpg', title: 'Retrato personal editado', alt: 'Estela de Gracia – lado personal y humano', hotspot: { x: 0.5, y: 0.3 } },
]

const PHOTOS_DIR = join(process.cwd(), 'fotos')
const OUTPUT_FILE = join(process.cwd(), 'scripts', 'uploaded-assets.json')

async function uploadPhotos() {
  let existing: Record<string, { _ref: string; hotspot: { x: number; y: number } }> = {}
  if (existsSync(OUTPUT_FILE)) {
    try {
      existing = JSON.parse(require('fs').readFileSync(OUTPUT_FILE, 'utf-8'))
      console.log(`📂 Found existing asset map with ${Object.keys(existing).length} entries\n`)
    } catch { /* ignore */ }
  }

  const results: Record<string, { _ref: string; hotspot: { x: number; y: number } }> = { ...existing }
  let uploaded = 0
  let skipped = 0
  let cached = 0

  console.log(`\n📸 Uploading ${PHOTOS.length} photos to Sanity...\n`)

  for (const photo of PHOTOS) {
    const key = photo.file.replace(/\.jpe?g$/i, '')

    if (results[key]) {
      cached++
      console.log(`⏭️  [${cached + uploaded}/${PHOTOS.length}] ${photo.file} — already uploaded`)
      continue
    }

    const filePath = join(PHOTOS_DIR, photo.file)

    if (!existsSync(filePath)) {
      console.warn(`⚠️  Skipping ${photo.file} — file not found at ${filePath}`)
      skipped++
      continue
    }

    try {
      const stream = createReadStream(filePath)
      const asset = await client.assets.upload('image', stream, {
        filename: photo.file,
        title: photo.title,
        description: photo.alt,
      })

      results[key] = {
        _ref: asset._id,
        hotspot: photo.hotspot,
      }

      uploaded++
      console.log(`✅ [${cached + uploaded}/${PHOTOS.length}] ${photo.file} → ${asset._id}`)

      writeFileSync(OUTPUT_FILE, JSON.stringify(results, null, 2))
    } catch (err) {
      console.error(`❌ Failed to upload ${photo.file}:`, err)
    }
  }

  writeFileSync(OUTPUT_FILE, JSON.stringify(results, null, 2))
  console.log(`\n📝 Asset map saved to ${OUTPUT_FILE}`)
  console.log(`\n🎯 Done: ${uploaded} uploaded, ${cached} cached, ${skipped} skipped, ${PHOTOS.length - uploaded - skipped - cached} failed\n`)
}

uploadPhotos()
