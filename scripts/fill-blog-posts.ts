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

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function textBlock(text: string) {
  return {
    _type: 'block',
    _key: Math.random().toString(36).slice(2, 8),
    style: 'normal',
    markDefs: [],
    children: [{ _type: 'span', _key: Math.random().toString(36).slice(2, 8), text, marks: [] }],
  }
}

interface BlogPostEntry {
  title: string
  slug: string
  description: string
  category: 'ansiedad' | 'herramientas' | 'autoconocimiento' | 'relaciones'
  tags: string[]
  readingTime: number
  featured: boolean
  bodyPlaceholder: string
}

const blogPosts: BlogPostEntry[] = [
  // ── Ansiedad (4 posts) ──
  {
    title: '10 señales claras de que necesitas ayuda',
    slug: '10-senales-claras-de-que-necesitas-ayuda',
    description: '¿Cómo saber si lo que sientes es normal o necesitas ayuda profesional? Estas 10 señales te ayudan a identificar cuándo es momento de pedir apoyo.',
    category: 'ansiedad',
    tags: ['ansiedad', 'señales', 'ayuda profesional', 'salud mental'],
    readingTime: 8,
    featured: true,
    bodyPlaceholder: 'Contenido del artículo "10 señales claras de que necesitas ayuda" — pendiente de extraer del PDF de Canva.',
  },
  {
    title: 'Agorafobia: qué es y cómo manejarla',
    slug: 'agorafobia-que-es-y-como-manejarla',
    description: 'La agorafobia va más allá del miedo a salir de casa. Descubre qué es realmente, cómo se manifiesta y qué puedes hacer para manejarla.',
    category: 'ansiedad',
    tags: ['agorafobia', 'ansiedad', 'fobias', 'tratamiento'],
    readingTime: 10,
    featured: false,
    bodyPlaceholder: 'Contenido del artículo "Agorafobia: qué es y cómo manejarla" — pendiente de extraer del PDF de Canva.',
  },
  {
    title: 'Despersonalización y Desrealización',
    slug: 'despersonalizacion-y-desrealizacion',
    description: '¿Alguna vez has sentido que no eres real o que el mundo a tu alrededor parece irreal? Hablamos de la despersonalización y la desrealización: qué son, por qué ocurren y cómo gestionarlas.',
    category: 'ansiedad',
    tags: ['despersonalización', 'desrealización', 'ansiedad', 'disociación'],
    readingTime: 10,
    featured: false,
    bodyPlaceholder: 'Contenido del artículo "Despersonalización y Desrealización" — pendiente de extraer del PDF de Canva.',
  },
  {
    title: 'Kit de 32 estrategias para gestionar la ansiedad',
    slug: 'kit-32-estrategias-gestionar-ansiedad',
    description: '32 herramientas prácticas para gestionar la ansiedad en tu día a día. Desde técnicas de respiración hasta estrategias cognitivas y corporales.',
    category: 'ansiedad',
    tags: ['ansiedad', 'herramientas', 'estrategias', 'kit'],
    readingTime: 15,
    featured: true,
    bodyPlaceholder: 'Contenido del artículo "Kit de 32 estrategias para gestionar la ansiedad" — pendiente de extraer del PDF de Canva.',
  },

  // ── Herramientas (2 posts) ──
  {
    title: '6 meditaciones rápidas y efectivas',
    slug: '6-meditaciones-rapidas-y-efectivas',
    description: 'No necesitas una hora para meditar. Estas 6 meditaciones cortas y efectivas te ayudarán a encontrar calma en minutos.',
    category: 'herramientas',
    tags: ['meditación', 'mindfulness', 'herramientas', 'regulación emocional'],
    readingTime: 7,
    featured: false,
    bodyPlaceholder: 'Contenido del artículo "6 meditaciones rápidas y efectivas" — pendiente de extraer del PDF de Canva.',
  },
  {
    title: 'Explora tu parte oculta: 5 preguntas para empezar',
    slug: 'explora-tu-parte-oculta-5-preguntas-para-empezar',
    description: 'El autoconocimiento empieza por hacerte las preguntas correctas. Estas 5 preguntas te ayudarán a explorar partes de ti que quizás no conocías.',
    category: 'herramientas',
    tags: ['autoconocimiento', 'sombra', 'preguntas', 'reflexión'],
    readingTime: 8,
    featured: false,
    bodyPlaceholder: 'Contenido del artículo "Explora tu parte oculta: 5 preguntas para empezar" — pendiente de extraer del PDF de Canva.',
  },

  // ── Autoconocimiento (3 posts) ──
  {
    title: 'La profecía autocumplida: cómo lo que crees de ti moldea tu vida',
    slug: 'la-profecia-autocumplida-como-lo-que-crees-de-ti-moldea-tu-vida',
    description: 'Lo que crees sobre ti mismx tiende a hacerse realidad. Descubre cómo funciona la profecía autocumplida y cómo romper el ciclo.',
    category: 'autoconocimiento',
    tags: ['profecía autocumplida', 'creencias limitantes', 'autoestima', 'psicología'],
    readingTime: 10,
    featured: false,
    bodyPlaceholder: 'Contenido del artículo "La profecía autocumplida" — pendiente de extraer del PDF de Canva.',
  },
  {
    title: 'Persona Altamente Sensible (PAS)',
    slug: 'persona-altamente-sensible-pas',
    description: '¿Te afectan más las cosas que a los demás? Quizás seas una Persona Altamente Sensible. Descubre qué significa y cómo vivir con ello de forma plena.',
    category: 'autoconocimiento',
    tags: ['PAS', 'alta sensibilidad', 'emociones', 'autoconocimiento'],
    readingTime: 10,
    featured: false,
    bodyPlaceholder: 'Contenido del artículo "Persona Altamente Sensible (PAS)" — pendiente de extraer del PDF de Canva.',
  },
  {
    title: 'Bases del bienestar psicológico',
    slug: 'bases-del-bienestar-psicologico',
    description: 'El bienestar psicológico no es la ausencia de problemas, sino la capacidad de gestionarlos. Conoce los pilares fundamentales para construirlo.',
    category: 'autoconocimiento',
    tags: ['bienestar', 'salud mental', 'psicología positiva', 'fundamentos'],
    readingTime: 8,
    featured: false,
    bodyPlaceholder: 'Contenido del artículo "Bases del bienestar psicológico" — pendiente de extraer del PDF de Canva.',
  },

  // ── Relaciones (1 post) ──
  {
    title: 'Guía para despertar el deseo y reconectar con tu cuerpo y tu pareja',
    slug: 'guia-despertar-deseo-reconectar-cuerpo-pareja',
    description: 'El deseo no siempre es espontáneo, y eso está bien. Esta guía te ayuda a reconectar contigo y con tu pareja de forma genuina.',
    category: 'relaciones',
    tags: ['deseo', 'pareja', 'sexualidad', 'relaciones', 'cuerpo'],
    readingTime: 12,
    featured: false,
    bodyPlaceholder: 'Contenido del artículo "Guía para despertar el deseo y reconectar con tu cuerpo y tu pareja" — pendiente de extraer del PDF de Canva.',
  },
]

async function main() {
  const confirm = process.argv.includes('--confirm')

  console.log(`📝 ${blogPosts.length} blog posts a crear...\n`)

  for (const post of blogPosts) {
    const id = `blogpost-${post.slug}`
    console.log(`  [${post.category}] ${post.title.slice(0, 50)}... → ${id}`)
    if (!confirm) continue

    await client.createOrReplace({
      _id: id,
      _type: 'blogPost',
      title: post.title,
      slug: { _type: 'slug', current: post.slug },
      description: post.description,
      body: [textBlock(post.bodyPlaceholder)],
      publishedDate: new Date().toISOString(),
      author: 'Estela de Gracia',
      category: post.category,
      tags: post.tags,
      readingTime: post.readingTime,
      featured: post.featured,
    })
  }

  if (!confirm) {
    console.log('\n⚠️  Ejecuta con --confirm para crear los blog posts:')
    console.log('   npm run fill-blog-posts -- --confirm')
    console.log('\n📌 NOTA: Los PDFs de "Blog web/" son documentos de Canva (diseño gráfico).')
    console.log('   El contenido del body se ha dejado como placeholder.')
    console.log('   El cuerpo de cada artículo debe completarse manualmente desde Sanity Studio')
    console.log('   copiando el texto de cada PDF de Canva.')
    return
  }

  console.log(`\n🎉 ${blogPosts.length} blog posts creados exitosamente!`)
  console.log('\n📌 Recuerda: El cuerpo de cada artículo debe completarse manualmente en Sanity Studio.')
}

main().catch((err) => {
  console.error('❌ Error:', err.message)
  process.exit(1)
})
