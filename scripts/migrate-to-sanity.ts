import { createClient } from '@sanity/client'
import { readFileSync, existsSync } from 'fs'
import { join } from 'path'
import { markdownToPortableText, parseFrontmatter } from './utils/markdown-to-portable-text'

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

// ─── Testimonials ───

const testimonials = [
  {
    name: 'Maria G.',
    text: 'Encontrar a esta terapeuta cambio mi vida. Por primera vez, me senti verdaderamente escuchada y comprendida. La calidez y autenticidad en cada sesion hicieron toda la diferencia.',
    rating: 5,
    date: 'hace 2 meses',
    source: 'Resena Google',
    hasVideo: true,
    videoUrl: '/videos/abrazo-1.mov',
    serviceType: 'individual' as const,
  },
  {
    name: 'Carlos R.',
    text: 'Era esceptico sobre la terapia, pero la conexion genuina que encontre aqui me sorprendio. No se siente clinico para nada—solo conversaciones reales y honestas que ayudan.',
    rating: 5,
    date: 'hace 1 mes',
    source: 'Resena Google',
    hasVideo: true,
    videoUrl: '/videos/abrazo-2.mov',
    serviceType: 'individual' as const,
  },
  {
    name: 'Ana L.',
    text: 'Las sesiones de terapia grupal fueron transformadoras. Compartir con otros que entienden, guiados por una profesional tan compasiva, me dio herramientas que uso cada dia.',
    rating: 5,
    date: 'hace 3 semanas',
    source: 'Resena Google',
    hasVideo: true,
    videoUrl: '/videos/abrazo-3.mov',
    serviceType: 'group' as const,
  },
  {
    name: 'David M.',
    text: 'Despues de anos de ansiedad frenandome, finalmente encontre a alguien que me ayudo a liberarme. El enfoque aqui es tan humano y cercano.',
    rating: 5,
    date: 'hace 1 semana',
    source: 'Resena Google',
    hasVideo: true,
    videoUrl: '/videos/abrazo-4.mov',
    serviceType: 'individual' as const,
  },
  {
    name: 'Laura P.',
    text: 'Llegue rota y sin esperanza. Hoy, despues de 6 meses de terapia, me reconozco otra vez. Estela no solo te escucha—te ve. Y eso lo cambia todo.',
    rating: 5,
    date: 'hace 2 semanas',
    source: 'Resena Google',
    hasVideo: true,
    videoUrl: '/videos/abrazo-5.mov',
    serviceType: 'individual' as const,
  },
  {
    name: 'Sofia M.',
    text: 'El grupo se convirtio en mi red de seguridad. Cada sesion era un paso mas hacia entenderme y quererme. Gracias por crear ese espacio tan bonito.',
    rating: 5,
    date: 'hace 5 dias',
    source: 'Resena Google',
    hasVideo: true,
    videoUrl: '/videos/abrazo-6.mov',
    serviceType: 'group' as const,
  },
]

async function migrateTestimonials() {
  console.log('📝 Migrating testimonials...')
  const tx = client.transaction()

  for (let i = 0; i < testimonials.length; i++) {
    const t = testimonials[i]
    const _id = `testimonial-${slugify(t.name)}`
    tx.createOrReplace({
      _id,
      _type: 'testimonial',
      name: t.name,
      text: t.text,
      rating: t.rating,
      date: t.date,
      source: t.source,
      serviceType: t.serviceType,
      hasVideo: t.hasVideo,
      videoUrl: t.videoUrl,
      featured: i < 3,
      order: i + 1,
    })
  }

  await tx.commit()
  console.log(`  ✅ ${testimonials.length} testimonials migrated`)
}

// ─── FAQ Items ───

interface FaqEntry { question: string; answer: string }

const faqData: Record<string, FaqEntry[]> = {
  individual: [
    { question: 'Que pasa en la primera sesion?', answer: 'La primera sesion es una evaluacion donde nos conocemos. Te preguntare sobre tu historia, que te trae a terapia y que esperas lograr. Tambien es una oportunidad para que hagas preguntas y veas si somos un buen match. Sin presion—solo una conversacion abierta.' },
    { question: 'Cuanto duran las sesiones?', answer: 'Las sesiones de terapia individual duran 50 minutos. Esto nos da suficiente tiempo para profundizar mientras mantenemos las cosas enfocadas y productivas. Algunos clientes prefieren sesiones mas largas para trabajo especifico como procesamiento de trauma—podemos discutir que funciona mejor para ti.' },
    { question: 'Con que frecuencia deberia venir?', answer: 'La mayoria de los clientes comienzan con sesiones semanales. A medida que progresas, podriamos pasar a sesiones quincenales o mensuales. La frecuencia siempre es flexible y basada en tus necesidades, metas y lo que se sienta correcto para ti.' },
    { question: 'Puedo cambiar la frecuencia de las sesiones?', answer: 'Por supuesto. La terapia se adapta a ti, no al reves. Podemos ajustar la frecuencia en cualquier momento segun como te sientas y lo que necesites. Algunas personas empiezan semanal y luego pasan a quincenal cuando se sienten mas estables.' },
    { question: 'Como se si la terapia esta funcionando?', answer: 'Juntos revisaremos tu progreso regularmente. Algunos indicadores incluyen: sentirte mas capaz de manejar situaciones dificiles, notar cambios en tus patrones de pensamiento, mejorar tus relaciones, y sentir mas claridad sobre ti mismo/a. El progreso no siempre es lineal, y eso esta bien.' },
  ],
  group: [
    { question: 'Cuantas personas hay en un grupo?', answer: 'Los grupos se mantienen pequenos e intimos—entre 6 a 8 participantes. Esto asegura que todos tengan espacio para compartir mientras se benefician de diversas perspectivas y experiencias.' },
    { question: 'Que incluye el kit de herramientas?', answer: 'El kit de herramientas incluye hojas de trabajo, ejercicios guiados, prompts de diario y recursos que complementan nuestro trabajo grupal. Tambien tendras acceso a grabaciones de meditaciones guiadas y tecnicas que practicamos juntos.' },
    { question: 'Que pasa si no me siento comodo/a compartiendo en grupo?', answer: 'Es completamente normal sentir eso al principio. No hay obligacion de compartir hasta que te sientas preparado/a. Muchas personas empiezan escuchando y poco a poco se van abriendo. El grupo crea un espacio seguro donde cada persona va a su ritmo.' },
    { question: 'Puedo combinar terapia grupal con individual?', answer: 'Si, y de hecho es una combinacion muy potente. La terapia individual te permite profundizar en temas personales, mientras que la grupal te ofrece perspectivas y apoyo comunitario. Podemos hablar sobre como integrar ambas.' },
  ],
  anxiety: [
    { question: 'Que tecnicas usas para la ansiedad?', answer: 'Uso una combinacion de enfoques basados en evidencia incluyendo Terapia Cognitivo-Conductual (TCC), tecnicas de mindfulness y practicas somaticas. Trabajaremos juntos para encontrar lo que resuena contigo—la terapia nunca deberia sentirse como un enfoque unico para todos.' },
    { question: 'Que tan rapido vere resultados?', answer: 'El viaje de cada persona es diferente, pero la mayoria de los clientes notan algun alivio dentro de las primeras sesiones—a menudo solo por ser escuchados y comprendidos. El cambio duradero tipicamente se desarrolla en 8-12 sesiones, aunque esto varia segun las circunstancias individuales.' },
    { question: 'Ofreces apoyo de emergencia?', answer: 'Aunque no proporciono soporte de crisis 24/7, ofrezco flexibilidad para situaciones urgentes. Siempre te proporcionare recursos de emergencia y crearemos un plan de seguridad juntos como parte de tu tratamiento.' },
    { question: 'Cual es la diferencia entre ansiedad normal y un trastorno de ansiedad?', answer: 'La ansiedad es una emocion normal y util que todos experimentamos. Se convierte en un trastorno cuando es desproporcionada, persistente y afecta significativamente tu vida diaria—trabajo, relaciones, sueno. Si sientes que la ansiedad te controla en vez de al reves, es un buen momento para buscar ayuda.' },
    { question: 'Se puede superar la ansiedad completamente?', answer: 'El objetivo no es eliminar la ansiedad (es una emocion necesaria), sino aprender a gestionarla. Con las herramientas adecuadas, puedes reducir drasticamente su impacto en tu vida y sentirte capaz de manejar los momentos dificiles. Muchos de mis pacientes describen un antes y un despues.' },
    { question: 'Necesito medicacion para tratar la ansiedad?', answer: 'No necesariamente. La psicoterapia sola es muy efectiva para muchos tipos de ansiedad. En algunos casos, la combinacion de terapia y medicacion puede ser beneficiosa. Si lo consideramos necesario, te derivare a un psiquiatra de confianza para una valoracion. Siempre sera una decision conjunta.' },
  ],
}

async function migrateFaqItems() {
  console.log('📝 Migrating FAQ items...')
  const tx = client.transaction()
  let order = 1

  for (const [category, items] of Object.entries(faqData)) {
    for (const item of items) {
      const _id = `faq-${slugify(item.question).slice(0, 60)}`
      tx.createOrReplace({
        _id,
        _type: 'faqItem',
        question: item.question,
        answer: item.answer,
        category,
        order: order++,
      })
    }
  }

  await tx.commit()
  console.log(`  ✅ ${order - 1} FAQ items migrated`)
}

// ─── Services ───

async function migrateServices() {
  console.log('📝 Migrating services...')
  const tx = client.transaction()

  tx.createOrReplace({
    _id: 'service-terapia-individual',
    _type: 'service',
    title: 'Terapia Individual',
    slug: { _type: 'slug', current: 'terapia-individual' },
    tagline: 'Atencion personal y enfocada en tu viaje unico',
    color: 'rose',
    whoIsItFor: 'Para ti, que sientes que algo no esta bien pero no sabes exactamente que. Para ti, que llevas tiempo cargando con un peso que ya no puedes sostener solo/a. No necesitas tener un diagnostico ni saber que te pasa—solo necesitas querer sentirte mejor.',
    formalDisorders: [
      { _key: 'ansiedad', category: 'Trastornos de Ansiedad', items: ['Trastorno de Ansiedad Generalizada (TAG)', 'Trastorno de Panico', 'Fobia Social', 'Fobias Especificas', 'Agorafobia'] },
      { _key: 'animo', category: 'Trastornos del Estado de Animo', items: ['Depresion Mayor', 'Distimia (depresion persistente)', 'Trastorno Adaptativo'] },
      { _key: 'trauma', category: 'Trauma y Estres', items: ['Trastorno de Estres Postraumatico (TEPT)', 'Trauma complejo', 'Duelo complicado'] },
      { _key: 'otros', category: 'Otros', items: ['Trastorno Obsesivo-Compulsivo (TOC)', 'Dependencia emocional', 'Problemas de apego'] },
    ],
    transdiagnostic: ['Autoestima y amor propio', 'Gestion emocional', 'Habilidades sociales', 'Sentido de la vida y proposito', 'Relaciones de pareja', 'Establecer limites', 'Manejo del estres', 'Crecimiento personal'],
    evaluation: { description: 'La sesion de valoracion es nuestro primer encuentro. Nos conocemos, hablamos de lo que te trae aqui, y vemos si hacemos buen match. No hay compromiso—es simplemente una conversacion abierta para que ambas sepamos si queremos trabajar juntas.', price: 50 },
    pricing: [
      { _key: 'eval', name: 'Sesion de Evaluacion', price: 50 },
      { _key: 'regular', name: 'Sesion Regular', price: 70 },
      { _key: 'pack4', name: 'Pack de 4 Sesiones', price: 220, savings: 60 },
    ],
    methodology: ['Terapia Cognitivo-Conductual (TCC)', 'EMDR (Desensibilizacion y Reprocesamiento por Movimientos Oculares)', 'Mindfulness y tecnicas de atencion plena', 'Practicas somaticas', 'Terapias de tercera generacion'],
    outcomes: ['Reducir significativamente la ansiedad y el estres', 'Mejorar tu autoestima y relacion contigo mismo/a', 'Desarrollar herramientas para gestionar tus emociones', 'Romper patrones de pensamiento negativos', 'Mejorar tus relaciones personales y establecer limites', 'Encontrar claridad y proposito en tu vida', 'Superar experiencias traumaticas', 'Sentirte capaz de afrontar los desafios del dia a dia'],
    process: [
      { _key: 's1', step: 1, title: 'Contacta conmigo', description: 'Escribeme por WhatsApp o rellena el formulario. Te respondere en menos de 24 horas para agendar tu sesion de valoracion.' },
      { _key: 's2', step: 2, title: 'Sesion de valoracion', description: 'Nos conocemos, hablamos de lo que te trae aqui y diseñamos juntas un plan terapeutico personalizado para ti.' },
      { _key: 's3', step: 3, title: 'Comienza tu proceso', description: 'Empezamos a trabajar juntas. Sesiones semanales donde iras descubriendo herramientas, ganando claridad y sintiendote cada vez mejor.' },
    ],
  })

  tx.createOrReplace({
    _id: 'service-terapia-grupal',
    _type: 'service',
    title: 'Terapia Grupal',
    slug: { _type: 'slug', current: 'terapia-grupal' },
    tagline: 'Crecimiento compartido en una comunidad de apoyo',
    color: 'purple',
    whoIsItFor: 'Para ti, que sientes que compartir tu experiencia con otros puede darte una perspectiva nueva. Para ti, que quieres sentirte acompanado/a en el proceso y saber que no estas solo/a. El grupo es un espacio seguro donde cada persona va a su ritmo.',
    pricing: [
      { _key: 'total', name: 'Programa completo (4 meses)', price: 450 },
    ],
    process: [
      { _key: 's1', step: 1, title: 'Reserva tu plaza', description: 'Contactame para confirmar tu interes. Te explicare los detalles y resolveremos dudas.' },
      { _key: 's2', step: 2, title: 'Entrevista previa', description: 'Tendremos una breve llamada para conocernos y asegurar que el grupo es adecuado para ti.' },
      { _key: 's3', step: 3, title: 'Comienza el programa', description: 'Te unes al grupo y empezamos el viaje de 4 meses juntas. Cada 15 dias, un paso mas hacia tu bienestar.' },
    ],
    programDetails: {
      duration: '4 meses',
      sessionsTotal: 8,
      frequency: 'Quincenal',
      groupSize: '6-8 personas',
      sessionLength: '~3 horas',
      modality: 'Online en directo via Zoom',
    },
    differentiators: [
      'Kit de herramientas para gestionar ataques de ansiedad (documentos + audios)',
      'Acceso a grabaciones de meditaciones guiadas',
      'Comunidad de apoyo durante y despues del programa',
      'Material exclusivo no disponible en terapia individual',
      'Perspectivas diversas que enriquecen tu proceso',
    ],
    bonuses: [
      { _key: 'b1', title: 'Kit de Herramientas Anti-Ansiedad', description: 'Documentos practicos y audios guiados para gestionar momentos de crisis' },
      { _key: 'b2', title: 'Meditaciones Guiadas', description: 'Grabaciones exclusivas para practicar entre sesiones' },
      { _key: 'b3', title: 'Diario de Progreso', description: 'Plantilla de seguimiento para registrar tu evolucion semana a semana' },
      { _key: 'b4', title: 'Comunidad Privada', description: 'Grupo de apoyo entre participantes durante todo el programa' },
    ],
    monthlyBreakdown: [
      {
        _key: 'm1',
        month: 1,
        title: 'Entender lo que te pasa y empezar a sentir mas seguridad',
        description: 'En este primer tramo, vas a comprender que te pasa, dejar de asustarte tanto con los sintomas y empezar a tener herramientas claras para manejar la activacion.',
        topics: ['Comprender como funciona la ansiedad y el sistema nervioso', 'Identificar senales previas de activacion', 'Empezar a regularte con mas claridad en momentos de crisis', 'Empezar a sentir mas claridad y seguridad interna'],
      },
      {
        _key: 'm2',
        month: 2,
        title: 'Detectar lo que repites y empezar a salir del bucle',
        description: 'Aqui empezaras a ver con mas claridad que pensamientos, habitos y respuestas automaticas estan alimentando tu ansiedad y tu malestar.',
        topics: ['Identificar pensamientos automaticos y bucles mentales', 'Detectar patrones de evitacion, control o autoexigencia', 'Entender que mantiene el malestar en tu dia a dia', 'Empezar a responder de otra manera'],
      },
      {
        _key: 'm3',
        month: 3,
        title: 'Desbloquear lo que te frena y abrir respuestas nuevas',
        description: 'En este punto, el trabajo va mas a fondo: podras elaborar escenas, conflictos o vivencias que siguen pesando, para dejar de repetir respuestas que ya no te ayudan.',
        topics: ['Trabajar temas o escenas que siguen afectandote', 'Revisar patrones relacionales y emocionales', 'Encontrar respuestas nuevas ante ciertas situaciones', 'Ganar mas estabilidad interna y flexibilidad'],
      },
      {
        _key: 'm4',
        month: 4,
        title: 'Integrar lo vivido y sostenerlo fuera del grupo',
        description: 'El ultimo tramo te servira para ordenar todo lo trabajado y salir con mas claridad, estructura y recursos reales para tu vida cotidiana.',
        topics: ['Consolidar herramientas utiles para tu dia a dia', 'Saber que hacer ante recaidas o picos de ansiedad', 'Clarificar necesidades, limites y senales de alarma', 'Cerrar el proceso con mas claridad, estabilidad y direccion'],
      },
    ],
  })

  await tx.commit()
  console.log('  ✅ 2 services migrated')
}

// ─── Blog Posts ───

async function migrateBlogPosts() {
  console.log('📝 Migrating blog posts...')
  const tx = client.transaction()
  const blogDir = join(process.cwd(), 'src/content/blog')
  const blogFiles = ['que-es-la-ansiedad.md', 'libros-recomendados-ansiedad.md']
  let count = 0

  for (const file of blogFiles) {
    const filePath = join(blogDir, file)
    if (!existsSync(filePath)) {
      console.log(`  ⚠️ Blog file not found: ${filePath}`)
      continue
    }
    const content = readFileSync(filePath, 'utf-8')
    const { frontmatter, body } = parseFrontmatter(content)
    const slug = file.replace('.md', '')

    tx.createOrReplace({
      _id: `blogpost-${slug}`,
      _type: 'blogPost',
      title: frontmatter.title as string,
      slug: { _type: 'slug', current: slug },
      description: frontmatter.description as string,
      body: markdownToPortableText(body),
      publishedDate: frontmatter.publishedDate as string,
      author: 'Estela de Gracia',
      category: frontmatter.category as string,
      tags: frontmatter.tags as string[],
      readingTime: frontmatter.readingTime as number,
      featured: frontmatter.featured as boolean,
    })
    count++
  }

  await tx.commit()
  console.log(`  ✅ ${count} blog posts migrated`)
}

// ─── Resources ───

async function migrateResources() {
  console.log('📝 Migrating resources...')
  const tx = client.transaction()
  const resourcesDir = join(process.cwd(), 'src/content/recursos')
  const resourceFiles = ['kit-ansiedad.md', 'meditaciones-guiadas.md']
  let count = 0

  for (const file of resourceFiles) {
    const filePath = join(resourcesDir, file)
    if (!existsSync(filePath)) {
      console.log(`  ⚠️ Resource file not found: ${filePath}`)
      continue
    }
    const content = readFileSync(filePath, 'utf-8')
    const { frontmatter } = parseFrontmatter(content)
    const slug = file.replace('.md', '')

    tx.createOrReplace({
      _id: `resource-${slug}`,
      _type: 'resource',
      title: frontmatter.title as string,
      slug: { _type: 'slug', current: slug },
      description: frontmatter.description as string,
      type: frontmatter.type as string,
      order: frontmatter.order as number,
    })
    count++
  }

  await tx.commit()
  console.log(`  ✅ ${count} resources migrated`)
}

// ─── Main ───

async function main() {
  console.log('🚀 Starting migration to Sanity...')
  console.log(`   Project: ${projectId}, Dataset: ${dataset}\n`)

  await migrateTestimonials()
  await migrateFaqItems()
  await migrateServices()
  await migrateBlogPosts()
  await migrateResources()

  console.log('\n🎉 Collections migration complete!')
  console.log('   Run `npx tsx scripts/migrate-singletons.ts` next.')
}

main().catch((err) => {
  console.error('❌ Migration failed:', err)
  process.exit(1)
})
