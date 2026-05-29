import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'
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

interface WhatsAppReview {
  id: string
  name: string
  text: string
  source: 'WhatsApp' | 'Facebook'
  order: number
  featured: boolean
}

const REVIEWS: WhatsAppReview[] = [
  {
    id: 'testimonial-pablo-r',
    name: 'Pablo R.',
    text: 'Gracias por aquellos momentos de acompañamiento, seguimiento, asesoramiento, consejo y escucha. Me dieron el alta hace un mes y pico, dejé mi empresa y ahora estoy en otra, y además como director. Entreno en el gimnasio, conduzco, salgo a correr, viajo y voy a cualquier lado. Resulta que todo estaba detrás del miedo, solo había que dejar que te atraviese. Creo que esta versión de mí mismo es mejor que la anterior. Y tú has sido parte de este proceso.',
    source: 'WhatsApp',
    order: 12,
    featured: true,
  },
  {
    id: 'testimonial-maria-l',
    name: 'María L.',
    text: 'No podía haber escogido mejor psicóloga.',
    source: 'WhatsApp',
    order: 13,
    featured: false,
  },
  {
    id: 'testimonial-mari-s',
    name: 'Mari S.',
    text: 'Volvió, sí, volvió. Esa que te aprieta el pecho y te ahoga, esa que te arranca lágrimas sin saber por qué. Te sientes pequeña, apretada, triste, apática. No eres tú, yo no soy así, todo lo contrario. No busquemos explicaciones, así es la ansiedad. Llevo ya dos días libre. Me siento casi flotar, no me noto latir el corazón queriendo salirse de mi pecho, no tiemblo, no he llorado, estoy tranquila. Me siento feliz y plena. Hoy estoy bien.',
    source: 'Facebook',
    order: 14,
    featured: true,
  },
  {
    id: 'testimonial-daniel-f',
    name: 'Daniel F.',
    text: 'Me sirvió de mucho la sesión de ayer. Hoy llevo las clases preparadas y voy motivado.',
    source: 'WhatsApp',
    order: 15,
    featured: false,
  },
  {
    id: 'testimonial-laura-m',
    name: 'Laura M.',
    text: 'Quería que supieras que desde que hablamos, he conseguido comprarme un piso y venirme con mi hijo. Lo poquito que hemos podido hablar de mi situación me ha hecho ver más allá y dar este paso tan grande. A veces necesitamos desahogarnos con alguien externo a nuestro entorno para abrir nuevos caminos y proyectos.',
    source: 'WhatsApp',
    order: 16,
    featured: true,
  },
  {
    id: 'testimonial-lucia-h',
    name: 'Lucía H.',
    text: 'Gracias por la sesión de hoy. La verdad, estoy un poquito más feliz.',
    source: 'WhatsApp',
    order: 17,
    featured: false,
  },
  {
    id: 'testimonial-carmen-g',
    name: 'Carmen G.',
    text: 'Vi tu vídeo de Instagram y me ha encantado. Espero que ayude a otras personas. Es flipante cuando lo ves desde fuera.',
    source: 'WhatsApp',
    order: 18,
    featured: false,
  },
  {
    id: 'testimonial-elena-v',
    name: 'Elena V.',
    text: 'Qué lindo es escucharte. Qué paz.',
    source: 'WhatsApp',
    order: 19,
    featured: false,
  },
  {
    id: 'testimonial-ana-r',
    name: 'Ana R.',
    text: 'No imaginas lo que me estás ayudando.',
    source: 'WhatsApp',
    order: 20,
    featured: false,
  },
  {
    id: 'testimonial-sandra-p',
    name: 'Sandra P.',
    text: 'Gracias por estar en mi vida.',
    source: 'WhatsApp',
    order: 21,
    featured: false,
  },
]

async function run() {
  console.log('\n📱 Creating WhatsApp/Facebook text testimonials...\n')

  let created = 0

  for (const review of REVIEWS) {
    console.log(`📝 [${review.order - 11}/${REVIEWS.length}] ${review.name} (${review.source})...`)

    try {
      await client.createOrReplace({
        _id: review.id,
        _type: 'testimonial',
        name: review.name,
        text: review.text,
        rating: 5,
        source: review.source,
        serviceType: 'individual',
        date: '2025',
        hasVideo: false,
        featured: review.featured,
        order: review.order,
      })
      console.log(`   ✅ Created: ${review.id}`)
      created++
    } catch (err) {
      console.error(`   ❌ Failed for ${review.name}:`, err)
    }
  }

  console.log(`\n🎯 Done! Created ${created}/${REVIEWS.length} testimonials.`)
  console.log(`   Featured: ${REVIEWS.filter(r => r.featured).map(r => r.name).join(', ')}`)
  console.log(`   Order range: ${REVIEWS[0].order}-${REVIEWS[REVIEWS.length - 1].order}`)
}

run().catch(console.error)
