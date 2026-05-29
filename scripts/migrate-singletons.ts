import { createClient } from '@sanity/client'
import { markdownToPortableText } from './utils/markdown-to-portable-text'

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

// Deterministic reference IDs (must match migrate-to-sanity.ts)
function testimonialId(name: string) { return `testimonial-${slugify(name)}` }
function faqId(question: string) { return `faq-${slugify(question).slice(0, 60)}` }
function ref(id: string) { return { _type: 'reference', _ref: id } }

async function migrateSiteSettings() {
  console.log('📝 Migrating siteSettings...')
  await client.createOrReplace({
    _id: 'siteSettings',
    _type: 'siteSettings',
    brandName: 'Estela de Gracia',
    tagline: 'Psicología Sin Distancia',
    defaultSeo: {
      metaTitle: 'Estela de Gracia — Psicología Sin Distancia',
      metaDescription: 'Terapia online autentica, cercana y real. Psicologia sin distancia para quienes buscan conexion genuina.',
      geoRegion: 'ES',
      geoPlacename: 'Madrid, España',
      geoPosition: '40.4168;-3.7038',
    },
    socialLinks: [
      { _key: 'ig', platform: 'instagram', url: 'https://www.instagram.com/esteladegracia.psi/' },
      { _key: 'li', platform: 'linkedin', url: 'https://linkedin.com/' },
    ],
    contactInfo: {
      email: 'hello@psychologist.com',
      phone: '+34 600 000 000',
      whatsappNumber: '34600000000',
      whatsappDefaultMessage: 'Hola! Me gustaria agendar una cita.',
      responseTime: 'Menos de 24 horas',
      schedule: 'Lunes a Viernes, 9:00 - 20:00',
    },
    footerContent: {
      description: 'Terapia autentica que se siente como hablar con alguien que realmente se preocupa. Porque mereces mas que distancia clinica.',
      copyright: '© 2026 Estela de Gracia — Psicologia Sin Distancia. Todos los derechos reservados.',
      madeWithLoveText: 'Hecho con ❤️ para quienes buscan conexion',
    },
    navigation: {
      mainLinks: [
        { _key: 'n1', label: 'Sobre Mi', href: '/sobre-mi' },
        {
          _key: 'n2', label: 'Servicios', href: '/servicios',
          children: [
            { _key: 'n2a', label: 'Terapia Individual', href: '/servicios/terapia-individual' },
            { _key: 'n2b', label: 'Terapia Grupal', href: '/servicios/terapia-grupal' },
          ],
        },
        { _key: 'n3', label: 'Testimonios', href: '/testimonios' },
        { _key: 'n4', label: 'Blog', href: '/blog' },
        { _key: 'n5', label: 'FAQ', href: '/faq' },
        { _key: 'n6', label: 'Contacto', href: '/contacto' },
      ],
      ctaButton: { label: 'Reservar', href: '/contacto' },
    },
  })
  console.log('  ✅ siteSettings migrated')
}

async function migrateHomePage() {
  console.log('📝 Migrating homePage...')
  await client.createOrReplace({
    _id: 'homePage',
    _type: 'homePage',
    seo: {
      metaTitle: 'Estela de Gracia — Psicología Sin Distancia',
      metaDescription: 'Terapia online autentica, cercana y real. Sesiones individuales y grupales para ansiedad, autoestima y crecimiento personal.',
      geoRegion: 'ES',
      geoPlacename: 'Madrid, España',
      geoPosition: '40.4168;-3.7038',
    },
    hero: {
      badge: 'Un espacio seguro para ti',
      headline: 'Psicologia sin distancia.',
      headlineHighlight: 'Autentica, cercana y real.',
      subtitle: 'La terapia no tiene que sentirse fria. Aqui encontraras calidez, comprension y una conexion genuina.',
      primaryCta: { label: 'Comienza tu viaje', href: '/contacto' },
      secondaryCta: { label: 'Saber mas', href: '/sobre-mi' },
      videoPlaceholderText: 'Video de Presentacion',
      trustBadge: '500+ vidas transformadas',
    },
    aboutPreview: {
      sectionLabel: 'Conoceme',
      title: 'Detras de cada sesion hay alguien que',
      titleHighlight: 'te entiende de verdad',
      professionalStats: [
        { _key: 's1', icon: 'Award', label: 'Anos de experiencia', value: '12+' },
        { _key: 's2', icon: 'GraduationCap', label: 'Formacion especializada', value: 'TCC avanzada y EMDR' },
        { _key: 's3', icon: 'Users', label: 'Pacientes ayudados', value: '500+' },
      ],
      personalQuote: 'Creo que la verdadera conexion viene de la humanidad compartida. Mi propio viaje—como artista, migrante y viajera de toda la vida—ha moldeado como entiendo el dolor, la resiliencia y la hermosa complejidad de ser humano.',
      personalTraits: [
        { _key: 't1', icon: 'Palette', label: 'Artista', description: 'La creatividad fluye en todo lo que hago' },
        { _key: 't2', icon: 'Plane', label: 'Migrante', description: 'Entendiendo el desplazamiento de primera mano' },
        { _key: 't3', icon: 'Globe', label: 'Viajera', description: '30+ paises, infinitas perspectivas' },
      ],
      linkText: 'Conoceme mejor',
      linkHref: '/sobre-mi',
    },
    problemsSection: {
      sectionLabel: 'Reconoces algo de esto?',
      title: 'Si te pasa algo de esto...',
      titleHighlight: 'no estas solo/a',
      problems: [
        { _key: 'p1', text: 'Tu cabeza no para ni un segundo' },
        { _key: 'p2', text: 'Hay un nubarron constante sobre ti' },
        { _key: 'p3', text: 'Sientes inseguridad todo el rato' },
        { _key: 'p4', text: 'No sabes por que, pero estas triste' },
        { _key: 'p5', text: 'Te cuesta mucho decir que no' },
        { _key: 'p6', text: 'Sientes que no encajas en ningun sitio' },
        { _key: 'p7', text: 'El miedo te paraliza constantemente' },
        { _key: 'p8', text: 'Tu autoestima esta por los suelos' },
        { _key: 'p9', text: 'Necesitas la aprobacion de todos' },
        { _key: 'p10', text: 'Te cuesta gestionar tus emociones' },
        { _key: 'p11', text: 'Sientes que no eres suficiente' },
        { _key: 'p12', text: 'Vives en piloto automatico' },
        { _key: 'p13', text: 'Las relaciones te agotan' },
        { _key: 'p14', text: 'Te preocupas por todo, siempre' },
      ],
      transitionLabel: 'Hay salida',
      helpTitle: 'Asi es como',
      helpTitleHighlight: 'puedo ayudarte',
      helpSubtitle: 'Mi enfoque es cercano, humano y sin distancia. Porque la terapia funciona mejor cuando hay conexion real.',
      helpCards: [
        { _key: 'h1', icon: 'MessageCircle', title: 'Escucha activa y sin juicios', description: 'Un espacio donde puedes ser tu mismo/a sin filtros. Aqui no hay respuestas correctas o incorrectas.' },
        { _key: 'h2', icon: 'Compass', title: 'Herramientas practicas', description: 'Tecnicas que funcionan en tu dia a dia, no solo teoria. Cosas que puedes aplicar desde la primera sesion.' },
        { _key: 'h3', icon: 'Shield', title: 'Ritmo que te respeta', description: 'Cada persona tiene su proceso. No hay prisa, no hay presion. Avanzamos juntos a tu ritmo.' },
        { _key: 'h4', icon: 'Heart', title: 'Conexion genuina', description: 'No soy una terapeuta distante detras de un escritorio. Soy una persona que entiende porque tambien ha estado ahi.' },
      ],
      ctaLabel: 'Quiero empezar',
      ctaHref: '/contacto',
    },
    servicesPreview: {
      sectionLabel: 'Servicios',
      title: 'Dos caminos,',
      titleHighlight: 'un mismo objetivo',
      subtitle: 'Elige el formato que mejor resuene contigo.',
    },
    testimonials: [
      { _key: 'tr1', ...ref(testimonialId('Maria G.')) },
      { _key: 'tr2', ...ref(testimonialId('Carlos R.')) },
      { _key: 'tr3', ...ref(testimonialId('Ana L.')) },
      { _key: 'tr4', ...ref(testimonialId('David M.')) },
      { _key: 'tr5', ...ref(testimonialId('Laura P.')) },
      { _key: 'tr6', ...ref(testimonialId('Sofia M.')) },
    ],
    leadMagnet: {
      badge: 'Recurso Gratuito',
      title: 'Kit de Herramientas',
      titleHighlight: 'para la Ansiedad',
      description: 'Obten acceso instantaneo a tecnicas y ejercicios practicos que uso con mis pacientes. Comienza a manejar la ansiedad hoy con metodos suaves y comprobados.',
      features: ['5 Tecnicas de Anclaje', 'Guia de Ejercicios de Respiracion', 'Plantilla de Check-in Diario', 'Protocolo de Calma de Emergencia'],
      formLabel: 'Tu correo electronico',
      buttonText: 'Obtener Herramientas Gratis',
      successTitle: 'Revisa tu bandeja de entrada!',
      successMessage: 'Tus herramientas gratuitas para la ansiedad estan en camino. Llegaran en los proximos minutos.',
      privacyNote: 'Sin spam, nunca. Cancela cuando quieras.',
    },
    faqPreview: [
      { _key: 'f1', ...ref(faqId('Que pasa en la primera sesion?')) },
      { _key: 'f2', ...ref(faqId('Cuanto duran las sesiones?')) },
      { _key: 'f3', ...ref(faqId('Que tecnicas usas para la ansiedad?')) },
    ],
    ctaBanner: {
      title: '¿Lista para dar el primer paso?',
      highlight: 'No tienes que hacerlo sola.',
      description: 'Reserva tu sesion de valoracion y empecemos juntas. Sin compromiso.',
      primaryCta: { label: 'Reservar mi primera sesion', href: '/contacto' },
      secondaryCta: { label: 'Escribeme por WhatsApp', href: 'https://wa.me/34600000000' },
    },
  })
  console.log('  ✅ homePage migrated')
}

const personalStoryMarkdown = `Creo que la verdadera conexion viene de la humanidad compartida. Mi propio viaje—como artista, migrante y viajera de toda la vida—ha moldeado como entiendo el dolor, la resiliencia y la hermosa complejidad de ser humano.

He vivido la ansiedad en primera persona. Se lo que es despertarte con un nudo en el estomago sin saber por que. He estado en relaciones donde me sentia pequena, donde perdia mi voz. Y fue justamente ese dolor el que me llevo a entender la terapia no solo desde los libros, sino desde las entranas.

Por eso mi enfoque no es distante ni clinico. Es cercano, real y profundamente humano. Porque cuando has estado ahi, cuando has sentido ese miedo, esa tristeza, esa confusion—conectas de una manera diferente con quien esta pasando por lo mismo.`

async function migrateAboutPage() {
  console.log('📝 Migrating aboutPage...')
  await client.createOrReplace({
    _id: 'aboutPage',
    _type: 'aboutPage',
    seo: {
      metaTitle: 'Sobre Mi — Estela de Gracia',
      metaDescription: 'Conoce a la profesional y persona detras de la terapia. Mas de 12 anos de experiencia, artista, migrante y viajera.',
      geoRegion: 'ES',
      geoPlacename: 'Madrid, España',
      geoPosition: '40.4168;-3.7038',
    },
    hero: {
      headline: 'Detras de cada sesion hay alguien que te entiende de verdad',
      subheadline: 'He vivido la ansiedad en primera persona. Se lo que es despertarte con un nudo en el estomago sin saber por que. Y fue justamente ese dolor el que me llevo a entender la terapia desde las entranas.',
      badge: '500+ vidas transformadas',
      videoPlaceholderText: 'Conoce a Estela en 2 minutos',
    },
    personalStory: {
      sectionLabel: 'Mi historia',
      title: 'Te entiendo porque',
      titleHighlight: 'lo he vivido',
      pullQuotes: [
        'He vivido la ansiedad en primera persona. Se lo que es despertarte con un nudo en el estomago sin saber por que.',
        'Fue justamente ese dolor el que me llevo a entender la terapia no solo desde los libros, sino desde las entranas.',
      ],
      storyBody: markdownToPortableText(personalStoryMarkdown),
      personalTraits: [
        { _key: 't1', icon: 'Palette', label: 'Artista', description: 'La creatividad fluye en todo lo que hago' },
        { _key: 't2', icon: 'Plane', label: 'Migrante', description: 'Entendiendo el desplazamiento de primera mano' },
        { _key: 't3', icon: 'Globe', label: 'Viajera', description: '30+ paises, infinitas perspectivas' },
      ],
      inlineCta: {
        text: 'Si algo de esto resuena contigo...',
        buttonLabel: 'Hablemos',
        buttonHref: '/contacto',
      },
    },
    trustBar: [
      { _key: 'tb1', value: '12+', label: 'Anos de experiencia' },
      { _key: 'tb2', value: '500+', label: 'Pacientes atendidos' },
      { _key: 'tb3', value: '4.9/5', label: 'Valoracion media' },
      { _key: 'tb4', value: '100%', label: 'Online' },
    ],
    approach: {
      sectionLabel: 'Mi enfoque',
      title: 'Como trabajo y',
      titleHighlight: 'por que es diferente',
      philosophy: 'Mi enfoque terapeutico nace de la interseccion entre mi formacion clinica rigurosa y mis experiencias de vida. Creo firmemente que la terapia funciona mejor cuando hay una conexion genuina entre terapeuta y paciente.',
      cards: [
        { _key: 'a1', icon: 'Ear', title: 'Escucha activa', description: 'No escucho para responder. Escucho para entender. Cada palabra tuya importa.' },
        { _key: 'a2', icon: 'Heart', title: 'Empatia real', description: 'No finjo entender. Entiendo porque lo he vivido. Y eso cambia todo.' },
        { _key: 'a3', icon: 'Shield', title: 'Herramientas con evidencia', description: 'TCC, EMDR y Mindfulness adaptados a ti, no sacados de un manual generico.' },
        { _key: 'a4', icon: 'Sparkles', title: 'Sin distancia clinica', description: 'Aqui no hay bata blanca. Hay una persona real que te acompana de verdad.' },
      ],
    },
    testimonials: [
      { _key: 'tr1', ...ref(testimonialId('Maria G.')) },
      { _key: 'tr2', ...ref(testimonialId('Laura P.')) },
    ],
    timeline: [
      { _key: 'tl1', year: '2012', title: 'Licenciatura en Psicologia', description: 'Graduada con honores. Primeros pasos en la psicologia clinica.' },
      { _key: 'tl2', year: '2014', title: 'Master en Psicologia Clinica', description: 'Especializacion en trastornos de ansiedad y estado de animo.' },
      { _key: 'tl3', year: '2016', title: 'Formacion en EMDR', description: 'Certificacion en procesamiento y desensibilizacion por movimientos oculares.' },
      { _key: 'tl4', year: '2018', title: 'TCC Avanzada', description: 'Formacion avanzada en Terapia Cognitivo-Conductual de tercera generacion.' },
      { _key: 'tl5', year: '2020', title: 'Terapia Online', description: 'Transicion a la terapia online. Apertura a pacientes de todo el mundo.' },
      { _key: 'tl6', year: '2024', title: 'Psicologia Sin Distancia', description: 'Lanzamiento de la marca. Mas de 500 pacientes atendidos.' },
    ],
    ctaBanner: {
      title: 'El primer paso no tiene que ser perfecto.',
      highlight: 'Solo tiene que ser tuyo.',
      description: 'La sesion de valoracion es una conversacion abierta para conocernos. Sin compromiso, sin presion.',
      primaryCta: { label: 'Reservar mi primera sesion', href: '/contacto' },
      secondaryCta: { label: 'Escribeme por WhatsApp', href: 'https://wa.me/34600000000' },
    },
  })
  console.log('  ✅ aboutPage migrated')
}

async function migrateContactPage() {
  console.log('📝 Migrating contactPage...')
  await client.createOrReplace({
    _id: 'contactPage',
    _type: 'contactPage',
    seo: {
      metaTitle: 'Contacto — Estela de Gracia',
      metaDescription: 'Reserva tu sesion de valoracion. Contactame por formulario o WhatsApp. Sin compromiso.',
    },
    sectionLabel: 'Contacto',
    title: 'Da el primer paso.',
    titleHighlight: 'Estoy aqui.',
    subtitle: 'Elige como prefieres contactarme. Sin compromiso, solo una conversacion para conocernos.',
    formLabels: {
      nameLabel: 'Tu nombre',
      namePlaceholder: 'Maria Garcia',
      emailLabel: 'Correo electronico',
      emailPlaceholder: 'maria@ejemplo.com',
      phoneLabel: 'Telefono (opcional)',
      phonePlaceholder: '+34 600 000 000',
      messageLabel: 'Cuentame un poco sobre ti',
      messagePlaceholder: 'Que te trae aqui? No hay respuestas correctas o incorrectas...',
      submitButton: 'Enviar mensaje',
      privacyNote: 'Respondo en menos de 24 horas. Tu informacion es completamente confidencial.',
    },
    successState: {
      title: 'Mensaje recibido!',
      message: 'Gracias por dar el primer paso. Te respondere pronto para conocernos mejor.',
      farewell: 'Hasta pronto',
    },
    whatsappSection: {
      title: 'Contactame por WhatsApp',
      description: 'Si prefieres una respuesta mas rapida y directa, escribeme por WhatsApp. Respondo personalmente a cada mensaje.',
      buttonText: 'Abrir WhatsApp',
    },
    infoCards: [
      { _key: 'i1', icon: 'Clock', title: 'Horario', description: 'Lunes a Viernes, 9:00 - 20:00' },
      { _key: 'i2', icon: 'Mail', title: 'Email', description: 'hello@psychologist.com' },
      { _key: 'i3', icon: 'Phone', title: 'Telefono', description: '+34 600 000 000' },
    ],
  })
  console.log('  ✅ contactPage migrated')
}

async function migrateFaqPage() {
  console.log('📝 Migrating faqPage...')
  await client.createOrReplace({
    _id: 'faqPage',
    _type: 'faqPage',
    seo: {
      metaTitle: 'Preguntas Frecuentes — Estela de Gracia',
      metaDescription: 'Resuelve tus dudas sobre terapia individual, grupal y tratamiento de ansiedad.',
    },
    heroLabel: 'FAQ',
    heroTitle: 'Preguntas que podrias',
    heroHighlight: 'tener',
    heroDescription: 'No encuentras lo que buscas? No dudes en contactarme—siempre estoy feliz de conversar.',
    ctaBanner: {
      title: 'No encuentras tu pregunta?',
      highlight: 'Contactame.',
      description: 'Estoy disponible para resolver cualquier duda que tengas. Escribeme sin compromiso.',
      primaryCta: { label: 'Contactar', href: '/contacto' },
    },
  })
  console.log('  ✅ faqPage migrated')
}

async function migrateTestimonialsPage() {
  console.log('📝 Migrating testimonialsPage...')
  await client.createOrReplace({
    _id: 'testimonialsPage',
    _type: 'testimonialsPage',
    seo: {
      metaTitle: 'Testimonios — Estela de Gracia',
      metaDescription: 'Lee y escucha las experiencias de personas reales que han transformado su vida con terapia.',
    },
    heroLabel: 'Testimonios',
    heroTitle: 'Historias reales de',
    heroHighlight: 'personas reales',
    heroDescription: 'Cada testimonio viene acompanado de un momento especial: un abrazo que simboliza el progreso y la conexion genuina.',
    ctaBanner: {
      title: 'Tu historia puede ser',
      highlight: 'la siguiente. Empieza hoy.',
      description: 'Reserva una sesion de valoracion y descubre como la terapia puede transformar tu vida. Sin compromiso.',
      primaryCta: { label: 'Reservar mi primera sesion', href: '/contacto' },
      secondaryCta: { label: 'Ver servicios', href: '/servicios' },
    },
  })
  console.log('  ✅ testimonialsPage migrated')
}

async function migrateResourcesPage() {
  console.log('📝 Migrating resourcesPage...')
  await client.createOrReplace({
    _id: 'resourcesPage',
    _type: 'resourcesPage',
    seo: {
      metaTitle: 'Recursos Gratuitos — Estela de Gracia',
      metaDescription: 'Herramientas, guias y meditaciones gratuitas para tu bienestar emocional.',
    },
    heroLabel: 'Recursos Gratuitos',
    heroTitle: 'Tu caja de herramientas para el',
    heroHighlight: 'bienestar',
    heroDescription: 'El mismo material que uso con mis pacientes. Guias practicas, meditaciones y ejercicios que puedes empezar hoy.',
    valuePropositions: [
      { _key: 'vp1', icon: 'Brain', text: 'Basados en evidencia cientifica' },
      { _key: 'vp2', icon: 'Heart', text: 'Usados con 500+ pacientes' },
      { _key: 'vp3', icon: 'Lock', text: 'Acceso inmediato y gratuito' },
      { _key: 'vp4', icon: 'Phone', text: 'Desde cualquier dispositivo' },
    ],
    previewSection: {
      sectionLabel: 'Que incluye',
      title: 'Todo lo que necesitas para',
      titleHighlight: 'empezar',
    },
    emailGate: {
      title: 'Accede a todos los',
      titleHighlight: 'recursos',
      description: 'Deja tu email y desbloquea el acceso inmediato. Sin spam — solo contenido de valor.',
    },
    inlineTestimonial: {
      quote: 'Las guias de Estela me ayudaron a manejar mi ansiedad entre sesiones. Son practicas, claras y se nota que estan hechas con cariño.',
      author: 'Paciente anonima',
    },
    blogCrossLink: {
      text: 'Tambien te puede interesar',
      linkLabel: 'Leer el blog',
      linkHref: '/blog',
    },
    ctaBanner: {
      title: 'Los recursos son el primer paso.',
      highlight: 'La terapia es el siguiente.',
      description: 'Cuando estes lista para profundizar, aqui estoy.',
      primaryCta: { label: 'Reservar sesion', href: '/contacto' },
      secondaryCta: { label: 'Ver servicios', href: '/servicios' },
    },
  })
  console.log('  ✅ resourcesPage migrated')
}

async function migrateServicesIndexPage() {
  console.log('📝 Migrating servicesIndexPage...')
  await client.createOrReplace({
    _id: 'servicesIndexPage',
    _type: 'servicesIndexPage',
    seo: {
      metaTitle: 'Servicios — Estela de Gracia',
      metaDescription: 'Terapia individual y grupal online. Encuentra el camino que se adapta a ti.',
    },
    heroLabel: 'Servicios',
    heroTitle: 'Encuentra el camino que',
    heroHighlight: 'se adapta a ti',
    heroDescription: 'Ya sea que prefieras sesiones individuales o el poder de las experiencias compartidas, hay un espacio para ti aqui.',
    processSteps: [
      { _key: 'ps1', step: '01', title: 'Contactame', description: 'Escribeme por formulario o WhatsApp. Cuentame brevemente que te trae aqui.', icon: 'MessageCircle' },
      { _key: 'ps2', step: '02', title: 'Sesion de valoracion', description: 'Una primera conversacion para conocernos y ver como puedo ayudarte. Sin compromiso.', icon: 'Users' },
      { _key: 'ps3', step: '03', title: 'Tu viaje empieza', description: 'Diseñamos juntas tu plan terapeutico y empezamos a trabajar en tus objetivos.', icon: 'CircleCheck' },
    ],
    comparisonSection: {
      sectionLabel: 'Compara',
      title: 'Dos caminos,',
      titleHighlight: 'un mismo objetivo',
      subtitle: 'Tu bienestar. Elige el formato que mejor resuene contigo.',
    },
    trustStats: [
      { _key: 'ts1', value: '12+', label: 'Anos de experiencia' },
      { _key: 'ts2', value: '500+', label: 'Pacientes atendidos' },
      { _key: 'ts3', value: '4.9/5', label: 'Valoracion media' },
      { _key: 'ts4', value: '100%', label: 'Online' },
    ],
    therapeuticApproach: {
      sectionLabel: 'Mi enfoque',
      title: 'Terapia basada en',
      titleHighlight: 'evidencia y calidez',
      subtitle: 'Combino las herramientas mas efectivas de la psicologia moderna con una relacion terapeutica genuina.',
      methods: [
        { _key: 'tm1', name: 'TCC', fullName: 'Terapia Cognitivo-Conductual', description: 'Cambiar patrones de pensamiento y comportamiento', icon: 'Brain' },
        { _key: 'tm2', name: 'EMDR', fullName: 'Desensibilizacion y Reprocesamiento', description: 'Procesar traumas y experiencias dificiles', icon: 'Target' },
        { _key: 'tm3', name: 'Mindfulness', fullName: 'Atencion Plena', description: 'Conexion con el presente y regulacion emocional', icon: 'Sun' },
        { _key: 'tm4', name: 'Somatica', fullName: 'Practica Somatica', description: 'Escuchar y liberar lo que el cuerpo guarda', icon: 'Heart' },
      ],
    },
    quickFaq: [
      { _key: 'qf1', question: 'Cual es la diferencia entre individual y grupal?', answer: 'En individual trabajamos tu y yo solas, a tu ritmo. En grupal, compartes el proceso con 6-8 personas en un programa estructurado de 4 meses. Ambos formatos son igual de efectivos, pero cada uno tiene sus ventajas.' },
      { _key: 'qf2', question: 'Nunca he ido a terapia, por donde empiezo?', answer: 'La sesion de valoracion (EUR50) es perfecta para empezar. Es una conversacion sin compromiso donde hablamos de lo que te trae y vemos juntas como puedo ayudarte.' },
      { _key: 'qf3', question: 'Las sesiones son 100% online?', answer: 'Si, todas las sesiones son por videollamada. Solo necesitas un espacio tranquilo, conexion a internet y ganas de trabajar en ti.' },
    ],
    ctaBanner: {
      title: 'El primer paso es el mas importante.',
      highlight: 'Dalo hoy.',
      description: 'Contactame sin compromiso y te ayudo a encontrar la opcion que mejor se adapte a ti.',
      primaryCta: { label: 'Reservar sesion', href: '/contacto' },
      secondaryCta: { label: 'Escribeme por WhatsApp', href: 'https://wa.me/34600000000' },
    },
  })
  console.log('  ✅ servicesIndexPage migrated')
}

async function migrateBlogIndexPage() {
  console.log('📝 Migrating blogIndexPage...')
  await client.createOrReplace({
    _id: 'blogIndexPage',
    _type: 'blogIndexPage',
    seo: {
      metaTitle: 'Blog — Estela de Gracia',
      metaDescription: 'Articulos sobre ansiedad, autoestima, relaciones y herramientas de bienestar emocional.',
    },
    heroLabel: 'Blog',
    heroTitle: 'Articulos para tu',
    heroHighlight: 'bienestar emocional',
    heroDescription: 'Reflexiones, herramientas y psicoeducacion para acompanarte en tu proceso.',
    categories: [
      { _key: 'c0', key: 'todos', label: 'Todos' },
      { _key: 'c1', key: 'ansiedad', label: 'Ansiedad' },
      { _key: 'c2', key: 'autoestima', label: 'Autoestima' },
      { _key: 'c3', key: 'relaciones', label: 'Relaciones' },
      { _key: 'c4', key: 'herramientas', label: 'Herramientas' },
      { _key: 'c5', key: 'psicoeducacion', label: 'Psicoeducación' },
    ],
    emptyStateText: 'No hay articulos en esta categoria todavia.',
    ctaBanner: {
      title: '¿Necesitas apoyo profesional?',
      description: 'Los articulos informan, pero la terapia transforma.',
      primaryCta: { label: 'Reservar sesion', href: '/contacto' },
      secondaryCta: { label: 'Conoce mis servicios', href: '/servicios' },
    },
  })
  console.log('  ✅ blogIndexPage migrated')
}

// ─── Main ───

async function main() {
  console.log('🚀 Starting singletons migration...')
  console.log(`   Project: ${projectId}, Dataset: ${dataset}\n`)

  await migrateSiteSettings()
  await migrateHomePage()
  await migrateAboutPage()
  await migrateContactPage()
  await migrateFaqPage()
  await migrateTestimonialsPage()
  await migrateResourcesPage()
  await migrateServicesIndexPage()
  await migrateBlogIndexPage()

  console.log('\n🎉 Singletons migration complete!')
  console.log('   All content is now in Sanity. Verify in Sanity Studio.')
}

main().catch((err) => {
  console.error('❌ Migration failed:', err)
  process.exit(1)
})
