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
    .slice(0, 60)
}

function faqRef(question: string) {
  return { _type: 'reference', _ref: `faq-${slugify(question)}` }
}

function textBlock(text: string, style = 'normal') {
  return {
    _type: 'block',
    _key: Math.random().toString(36).slice(2, 8),
    style,
    markDefs: [],
    children: [{ _type: 'span', _key: Math.random().toString(36).slice(2, 8), text, marks: [] }],
  }
}

function portableTextFromParagraphs(paragraphs: string[]) {
  return paragraphs.map((p) => textBlock(p))
}

async function patchSingleton(id: string, type: string, data: Record<string, unknown>) {
  const existing = await client.fetch(`*[_id == "${id}"][0]{ _id }`)
  if (existing) {
    await client.patch(id).set(data).commit()
  } else {
    await client.createOrReplace({ _id: id, _type: type, ...data })
  }
}

async function fillSiteSettings() {
  console.log('📝 Filling siteSettings...')
  await patchSingleton('siteSettings', 'siteSettings', {
    brandName: 'Estela de Gracia',
    tagline: 'Psicóloga sanitaria especializada en ansiedad',
    contactInfo: {
      email: 'esteladgracia@gmail.com',
      phone: '+34 600 000 000',
      whatsappNumber: '34600000000',
      whatsappDefaultMessage: 'Hola! Me gustaría agendar una cita.',
      responseTime: 'Menos de 24 horas',
      schedule: 'Lunes a Viernes, 9:00 - 20:00',
    },
    socialLinks: [
      { _key: 'ig', platform: 'instagram', url: 'https://www.instagram.com/esteladegracia.psi/' },
    ],
    footerContent: {
      description: 'Terapia cercana, humana y sin distancia',
      copyright: '© 2026 Estela de Gracia. Todos los derechos reservados.',
      madeWithLoveText: 'Hecho con ❤️ para quienes buscan conexión',
    },
    navigation: {
      mainLinks: [
        { _key: 'n1', label: 'Sobre Mí', href: '/sobre-mi' },
        {
          _key: 'n2', label: 'Servicios', href: '/servicios',
          children: [
            { _key: 'n2a', label: 'Sesiones individuales', href: '/servicios/terapia-individual' },
            { _key: 'n2b', label: 'Terapia grupal', href: '/servicios/terapia-grupal' },
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
  console.log('  ✅ siteSettings')
}

async function fillHomePage() {
  console.log('📝 Filling homePage...')
  await patchSingleton('homePage', 'homePage', {
    hero: {
      badge: 'Psicología desde el amor.',
      headline: 'tu lugar seguro ♡',
      headlineHighlight: '',
      subtitle: 'Con humanidad, cercanía y honestidad. Aquí no vienes a fingir que estás bien ni a buscar respuestas perfectas. Vienes a ser tú, con todo lo que eso implica. Y yo estoy aquí para acompañarte.',
      primaryCta: { label: '¡Quiero empezar ya!', href: '/contacto' },
      secondaryCta: { label: 'Te escribo por WhatsApp', href: 'https://wa.me/34600000000' },
      videoPlaceholderText: 'Bienvenidx a este espacio',
      trustBadge: '500 vidas transformadas',
      rotatingPhrases: [
        '¿Sientes que la ansiedad controla tu vida?',
        '¿Te cuesta poner límites sin sentir culpa?',
        '¿Sientes que no eres suficiente?',
        '¿Vives en piloto automático?',
      ],
      scrollInviteText: 'Conóceme',
    },
    aboutPreview: {
      sectionLabel: 'Conóceme',
      title: 'Detrás de cada sesión hay alguien que',
      titleHighlight: 'te entiende de verdad',
      professionalStats: [
        { _key: 's1', icon: 'Users', label: 'Personas acompañadas', value: '600+' },
        { _key: 's2', icon: 'GraduationCap', label: 'Formación', value: 'Psicóloga sanitaria, TCC y Psicodrama' },
        { _key: 's3', icon: 'Heart', label: 'Especialización', value: 'Ansiedad' },
      ],
      personalQuote: 'He vivido la ansiedad en primera persona y sé lo difícil que puede ser sentirse perdidx, saturadx o sin saber por dónde empezar. Por eso mi forma de acompañarte nace tanto de lo profesional como de lo vivido.',
      personalTraits: [
        { _key: 't1', icon: 'Palette', label: 'Artista', description: 'La creatividad y la sensibilidad forman parte de mi mirada.' },
        { _key: 't2', icon: 'Plane', label: 'Migrante', description: 'Entiendo lo que significa soltar y volver a empezar.' },
        { _key: 't3', icon: 'Globe', label: 'Viajera', description: '30+ países que me enseñaron que a veces avanzar significa atreverse a salir de lo conocido.' },
      ],
      linkText: 'Conóceme mejor',
      linkHref: '/sobre-mi',
    },
    problemsSection: {
      sectionLabel: '¿Te suena de algo?',
      title: 'Si te pasa algo de esto...',
      titleHighlight: 'no estás solx',
      problems: [
        { _key: 'p1', text: 'Tu cabeza no para ni un segundo' },
        { _key: 'p2', text: 'Hay un nubarrón constante sobre ti' },
        { _key: 'p3', text: 'Sientes inseguridad todo el rato' },
        { _key: 'p4', text: 'No sabes por qué, pero estás triste' },
        { _key: 'p5', text: 'Te cuesta mucho decir que no' },
        { _key: 'p6', text: 'Sientes que no encajas en ningún sitio' },
        { _key: 'p7', text: 'El miedo te paraliza constantemente' },
        { _key: 'p8', text: 'Tu autoestima está por los suelos' },
        { _key: 'p9', text: 'Necesitas la aprobación de todos' },
        { _key: 'p10', text: 'Te cuesta gestionar tus emociones' },
        { _key: 'p11', text: 'Sientes que no eres suficiente' },
        { _key: 'p12', text: 'Vives en piloto automático' },
        { _key: 'p13', text: 'Las relaciones te agotan' },
        { _key: 'p14', text: 'Te preocupas por todo, siempre' },
        { _key: 'p15', text: 'Tienes ataques de ansiedad o pánico' },
        { _key: 'p16', text: 'Sientes que el cuerpo te avisa pero no sabes de qué' },
        { _key: 'p17', text: 'No consigues dormir bien' },
        { _key: 'p18', text: 'Evitas situaciones por miedo a pasarlo mal' },
      ],
      transitionLabel: 'Hay salida',
      helpTitle: 'Así es como',
      helpTitleHighlight: 'puedo ayudarte',
      helpSubtitle: 'Mi enfoque es cercano, humano y real. Para mí, la terapia funciona mejor cuando el vínculo se construye desde la confianza, la honestidad y el cariño.',
      helpCards: [
        { _key: 'h1', icon: 'Ear', title: 'Escucha real y sin juicio', description: 'Un espacio donde puedes ser tú, sin filtros ni exigencias. Eres bienvenida tal y como eres.' },
        { _key: 'h2', icon: 'Wrench', title: 'Herramientas prácticas', description: 'Trabajamos con herramientas concretas para que puedas entenderte mejor, sostenerte fuera de sesión y vivir cambios reales en tu día a día.' },
        { _key: 'h3', icon: 'Clock', title: 'A tu ritmo', description: 'Cada persona tiene su proceso. Aquí no hay prisa ni presión: avanzamos a tu ritmo, con cuidado y sin forzarte.' },
        { _key: 'h4', icon: 'Heart', title: 'Conexión genuina', description: 'Porque sanar también implica aprender a relacionarte desde el cariño, la compasión y la calidez.' },
      ],
      ctaLabel: 'Quiero empezar',
      ctaHref: '/contacto',
    },
    servicesPreview: {
      sectionLabel: 'Servicios',
      title: 'Dos caminos, un mismo objetivo:',
      titleHighlight: 'tu bienestar',
      subtitle: 'Cada camino responde a necesidades distintas; elige el que mejor encaje contigo en este momento.',
    },
    leadMagnet: {
      badge: 'Recurso Gratuito',
      title: 'Kit de Herramientas',
      titleHighlight: 'para la Ansiedad',
      description: 'Accede gratis a un kit práctico con 36 herramientas para la ansiedad, diseñado para que puedas utilizarlas cuando aparece la sintomatología o las señales previas, y regular tu sistema nervioso con recursos claros y aplicables.',
      features: [
        'Técnicas de respiración, regulación corporal y sensorial',
        'Recursos cognitivos y emocionales',
        'Ejercicios de exposición gradual y conexión con el presente',
        'Recursos para acompañarte en momentos de ansiedad, bloqueo y sobrecarga',
      ],
      formLabel: 'Tu correo electrónico',
      buttonText: 'Quiero mi kit gratis',
      successTitle: '¡Revisa tu bandeja de entrada!',
      successMessage: 'Tu kit de herramientas para la ansiedad está en camino. Llegará en los próximos minutos.',
      privacyNote: 'Sin spam, nunca. Cancela cuando quieras.',
    },
    faqPreview: [
      { _key: 'f1', ...faqRef('¿Cómo es la primera sesión?') },
      { _key: 'f2', ...faqRef('¿Cuánto duran las sesiones individuales?') },
      { _key: 'f3', ...faqRef('¿Cómo sé si la terapia grupal es para mí?') },
    ],
    ctaBanner: {
      title: '¿Listx para dar el primer paso?',
      highlight: 'No tienes que hacerlo solx.',
      description: 'Reserva tu primera sesión o escríbeme para que hablemos. Sin compromiso, solo una conversación para conocernos ♡',
      primaryCta: { label: '¡Quiero empezar ya!', href: '/contacto' },
      secondaryCta: { label: 'Te escribo por WhatsApp', href: 'https://wa.me/34600000000' },
    },
  })
  console.log('  ✅ homePage')
}

async function fillAboutPage() {
  console.log('📝 Filling aboutPage...')
  const storyBody = portableTextFromParagraphs([
    'Después de un tiempo, tuve mi primer ataque de ansiedad. Y ahí, me asusté mucho. Así que pedí ayuda y comencé mi propio proceso terapéutico con el profesional que me ayudó a mirar la vida y los procesos con más perspectiva.',
    'Por eso, he vivido en primera persona que, con un trabajo conjunto, constancia y esfuerzo, se consiguen cambios realmente profundos.',
    'Además, dentro de ese vínculo terapéutico me sentí tan segura y tan tranquila que pude entender muchas cosas. Sobre todo, que no era yo la loca ni la culpable de lo que había vivido.',
    'Y, aunque nunca he sido una persona a la que el miedo le haya paralizado — quizá por eso he viajado tanto y me he atrevido a hacer cosas como el teatro o el cante, que también me exponen—, sí he tenido momentos en los que me he asustado mucho. Y hoy puedo decir, con una gran sonrisa, que ya no me pasa.',
  ])

  await patchSingleton('aboutPage', 'aboutPage', {
    hero: {
      headline: 'Detrás de cada sesión hay alguien que te entiende de verdad',
      subheadline: 'He vivido la ansiedad en primera persona y sé lo difícil que puede ser sentirse perdidx, saturadx o sin saber por dónde empezar. Por eso mi forma de acompañarte nace tanto de lo profesional como de lo vivido.',
      badge: 'Conóceme',
    },
    personalStory: {
      sectionLabel: 'Mi historia',
      title: 'Te entiendo porque',
      titleHighlight: 'lo he vivido',
      pullQuotes: [
        'He pasado por relaciones en las que llegué a sentir que me estaba volviendo loca, que el problema lo tenía yo. La culpa, el malestar y la inseguridad en mí misma me fueron llevando poco a poco a tocar fondo.',
        'Mi manera de entender la terapia está profundamente marcada por el valor del vínculo. Porque cuando una se siente segura, escuchada y en confianza, es mucho más fácil empezar a poner palabras, bajar defensas y mirar lo que duele con menos miedo.',
      ],
      storyBody,
      personalTraits: [
        { _key: 't1', icon: 'Palette', label: 'Artista', description: 'La creatividad y la sensibilidad forman parte de mi mirada.' },
        { _key: 't2', icon: 'Plane', label: 'Migrante', description: 'Entiendo lo que significa soltar y volver a empezar.' },
        { _key: 't3', icon: 'Globe', label: 'Viajera', description: '30+ países que me enseñaron que a veces avanzar significa atreverse a salir de lo conocido.' },
      ],
      inlineCta: {
        text: 'Si algo de esto resuena contigo...',
        buttonLabel: 'Hablemos',
        buttonHref: '/contacto',
      },
    },
    trustBar: [
      { _key: 'tb1', value: '600+', label: 'Personas acompañadas' },
      { _key: 'tb2', value: 'Psicóloga sanitaria', label: 'Máster General Sanitario' },
      { _key: 'tb3', value: 'TCC y Psicodrama', label: 'Formación especializada' },
      { _key: 'tb4', value: 'Ansiedad', label: 'Especialización principal' },
      { _key: 'tb5', value: '100%', label: 'Online' },
    ],
    approach: {
      sectionLabel: 'Mi enfoque',
      title: 'Cómo trabajo y',
      titleHighlight: 'por qué es diferente',
      philosophy: 'Mi forma de trabajar une formación clínica, experiencia vivida y una mirada integradora. No trabajo desde un único enfoque, sino que adapto las herramientas a la persona que tengo delante, a su historia y al momento que está atravesando.',
      cards: [
        { _key: 'a1', icon: 'GraduationCap', title: 'Base clínica sólida', description: 'Mi trabajo parte de una base cognitivo-conductual, que me permite entender contigo qué está pasando y cómo intervenir con claridad.' },
        { _key: 'a2', icon: 'Eye', title: 'Mirada integradora', description: 'Además de mi base clínica, me he formado en terapias humanistas, de tercera generación y mindfulness, lo que me permite adaptar las herramientas a ti y a tu proceso.' },
        { _key: 'a3', icon: 'Heart', title: 'El cuerpo también habla', description: 'Mi forma de trabajar no se queda solo en la conversación. También integro recursos corporales y vivenciales desde el psicodrama, porque a veces el cuerpo expresa lo que todavía no sabemos decir.' },
        { _key: 'a4', icon: 'Sparkles', title: 'Adaptado a ti', description: 'No trabajo con fórmulas cerradas ni con un único camino para todo el mundo. El proceso se adapta a tu historia, tu momento y a lo que hoy necesitas.' },
      ],
    },
    timeline: [
      { _key: 'tl1', year: '2015–2019', title: 'Grado en Psicología', description: 'Universidad Complutense de Madrid' },
      { _key: 'tl2', year: '2021', title: 'Máster en Psicología General Sanitaria', description: 'Formación habilitante para el ejercicio clínico' },
      { _key: 'tl3', year: '2021–actualidad', title: 'Psicóloga sanitaria online', description: 'Acompañando procesos terapéuticos de forma autónoma' },
      { _key: 'tl4', year: '2022', title: 'Formación complementaria en duelo, Terapia Dialéctico-Conductual y Mindfulness', description: 'Ampliando herramientas para acompañar procesos complejos con más profundidad y flexibilidad' },
      { _key: 'tl5', year: '2022–2023', title: 'Fundación ANAR', description: 'Atención psicológica a menores y a personas adultas vinculadas con menores en situación de riesgo' },
      { _key: 'tl6', year: '2023–2025', title: 'Capacitación en Psicodrama', description: 'Especialización en SocioPsicodrama aplicado, profundizando en el trabajo vivencial, vincular y corporal dentro del proceso terapéutico' },
      { _key: 'tl7', year: 'Actualidad', title: 'Máster Origen: especialización en trauma desde un enfoque integrador', description: 'Formación avanzada orientada a comprender el trauma psicológico desde una mirada integradora, especialmente en cuadros donde ansiedad, somatización, patrones relacionales y sufrimiento emocional tienen raíz traumática.' },
    ],
    ctaBanner: {
      title: 'El primer paso no tiene que ser perfecto. Solo tiene que ser tuyo.',
      highlight: '',
      description: 'La primera sesión es un espacio para conocernos, entender qué te está pasando y ver cómo puedo acompañarte. Sin presión y sin tener que tenerlo todo claro.',
      primaryCta: { label: 'Quiero empezar', href: '/contacto' },
      secondaryCta: { label: 'Quiero escribirte por WhatsApp', href: 'https://wa.me/34600000000' },
    },
  })
  console.log('  ✅ aboutPage')
}

async function fillContactPage() {
  console.log('📝 Filling contactPage...')
  await patchSingleton('contactPage', 'contactPage', {
    sectionLabel: 'Hablemos',
    title: 'Da el primer paso.',
    titleHighlight: 'Estoy aquí.',
    subtitle: 'Elige cómo prefieres contactarme. Sin compromiso, solo una conversación para conocernos.',
    formLabels: {
      nameLabel: 'Tu nombre',
      namePlaceholder: 'María García',
      emailLabel: 'Correo electrónico',
      emailPlaceholder: 'maria@ejemplo.com',
      phoneLabel: 'Teléfono (opcional)',
      phonePlaceholder: '+34 600 000 000',
      messageLabel: 'Cuéntame un poco sobre ti',
      messagePlaceholder: '¿Qué te trae aquí? No hay respuestas correctas o incorrectas...',
      submitButton: 'Enviar mensaje',
      privacyNote: 'Respondo en menos de 24 horas. Tu información es completamente confidencial.',
    },
    successState: {
      title: '¡Mensaje recibido!',
      message: 'Gracias por dar el primer paso. Te responderé pronto para conocernos mejor.',
      farewell: 'Hasta pronto ♡',
    },
    whatsappSection: {
      title: 'Contáctame por WhatsApp',
      description: 'Si prefieres una respuesta más rápida y directa, escríbeme por WhatsApp. Respondo personalmente a cada mensaje.',
      buttonText: 'Abrir WhatsApp',
    },
    infoCards: [
      { _key: 'ic1', icon: 'Clock', title: 'Tiempo de respuesta', description: 'Menos de 24 horas. Lunes a Viernes, 9:00 - 20:00.' },
      { _key: 'ic2', icon: 'Globe', title: '100% Online', description: 'Terapia desde la comodidad de tu hogar. Sin barreras geográficas.' },
      { _key: 'ic3', icon: 'Shield', title: 'Confidencial', description: 'Tu información es completamente privada y protegida.' },
    ],
  })
  console.log('  ✅ contactPage')
}

async function fillFaqPage() {
  console.log('📝 Filling faqPage...')
  await patchSingleton('faqPage', 'faqPage', {
    heroLabel: 'FAQ',
    heroTitle: 'Preguntas que podrías',
    heroHighlight: 'tener',
    heroDescription: '¿No encuentras lo que buscas? No dudes en contactarme. Siempre estoy feliz de conversar.',
    ctaBanner: {
      title: '¿No encuentras tu pregunta?',
      highlight: 'Contáctame.',
      description: 'Estoy disponible para resolver cualquier duda que tengas. Escríbeme sin compromiso.',
      primaryCta: { label: 'Contactar', href: '/contacto' },
    },
  })
  console.log('  ✅ faqPage')
}

async function fillTestimonialsPage() {
  console.log('📝 Filling testimonialsPage...')
  await patchSingleton('testimonialsPage', 'testimonialsPage', {
    heroLabel: 'Testimonios',
    heroTitle: 'Historias reales,',
    heroHighlight: 'procesos reales',
    heroDescription: 'Los abrazos que acompañan estos testimonios hablan también de lo vivido: del vínculo, del proceso y del cambio.',
    ctaBanner: {
      title: 'Tu historia puede ser',
      highlight: 'la siguiente.',
      description: 'Reserva una sesión de valoración y descubre cómo la terapia puede transformar tu vida. Sin compromiso.',
      primaryCta: { label: 'Reservar mi primera sesión', href: '/contacto' },
      secondaryCta: { label: 'Ver servicios', href: '/servicios' },
    },
  })
  console.log('  ✅ testimonialsPage')
}

async function fillServicesIndexPage() {
  console.log('📝 Filling servicesIndexPage...')
  await patchSingleton('servicesIndexPage', 'servicesIndexPage', {
    heroLabel: 'Servicios',
    heroTitle: 'Encuentra el camino que',
    heroHighlight: 'se adapta a ti',
    heroDescription: 'No se trata de encajar en un formato, sino de encontrar el espacio que mejor responda a lo que hoy necesitas.',
    processSteps: [
      { _key: 'ps1', step: '01', title: 'Contáctame', description: 'Puedes escribirme por WhatsApp o rellenar el formulario. Cuéntame brevemente qué te pasa o qué necesitas.', icon: 'MessageCircle' },
      { _key: 'ps2', step: '02', title: 'Sesión de valoración', description: 'Un primer encuentro para conocernos, entender qué te está pasando y ver cómo puedo acompañarte.', icon: 'Users' },
      { _key: 'ps3', step: '03', title: 'Empezamos tu proceso', description: 'Establecemos los objetivos y el plan de acción que vamos a seguir para avanzar con claridad, estructura y pasos concretos.', icon: 'CircleCheck' },
    ],
    comparisonSection: {
      sectionLabel: 'Compara',
      title: 'Dos caminos,',
      titleHighlight: 'un mismo objetivo',
      subtitle: 'Tu bienestar. Elige el formato que mejor resuene contigo.',
    },
    trustStats: [
      { _key: 'ts1', value: '600', label: 'Personas acompañadas' },
      { _key: 'ts2', value: 'Sanitaria', label: 'Psicóloga sanitaria' },
      { _key: 'ts3', value: 'TCC', label: 'Terapia Cognitivo-Conductual' },
      { _key: 'ts4', value: 'Ansiedad', label: 'Especialización' },
      { _key: 'ts5', value: '100%', label: 'Online' },
    ],
    therapeuticApproach: {
      sectionLabel: 'Mi enfoque',
      title: 'Terapia basada en',
      titleHighlight: 'evidencia y calidez',
      subtitle: 'Combino las herramientas más efectivas de la psicología moderna con una relación terapéutica genuina.',
      methods: [
        { _key: 'm1', name: 'TCC', fullName: 'Terapia Cognitivo-Conductual', description: 'Permite identificar y cambiar patrones de pensamiento y comportamiento que mantienen el malestar.', icon: 'Brain' },
        { _key: 'm2', name: 'Mindfulness', fullName: 'Atención plena', description: 'Ayuda a entrenar la atención, salir del piloto automático y relacionarte con lo que sientes de una forma más consciente.', icon: 'Compass' },
        { _key: 'm3', name: 'Regulación', fullName: 'Comprender y manejar lo que sientes', description: 'Trabajamos para reconocer mejor las emociones, entender cómo funcionan y aprender recursos para sostenerlas sin desbordarte.', icon: 'Heart' },
        { _key: 'm4', name: 'Psicodrama', fullName: 'Trabajo vivencial y corporal', description: 'Permite explorar lo que te pasa más allá de la palabra, dando espacio al cuerpo, la acción y la experiencia.', icon: 'Sparkles' },
      ],
    },
    quickFaq: [
      { _key: 'qf1', question: '¿Cuál es la diferencia entre la terapia individual y la grupal?', answer: 'La terapia individual es un espacio solo para ti, donde profundizamos en lo que te pasa y trabajamos de forma continuada. Habitualmente, las sesiones son semanales o quincenales y duran 50 minutos. La terapia grupal, además de ayudarte a entender mejor lo que te ocurre, te permite compartir proceso con otras personas, trabajar vínculos, habilidades sociales y descubrir que no estás sola en esto. Las sesiones grupales son cada 15 días y duran alrededor de 3 horas. Tanto en las sesiones individuales como grupales, el proceso se adapta a las vivencias, necesidades y momento de las personas. Ambos formatos pueden ayudarte, pero cada uno responde a necesidades distintas.' },
      { _key: 'qf2', question: 'Nunca he ido a terapia, ¿por dónde empiezo?', answer: 'No necesitas hablar de todo lo que te ocurre si no estás preparadx, te da miedo o te da vergüenza. No hay nada de lo que tengas que hablar sí o sí. Y si no sabes por dónde empezar, no te preocupes: la profesional te irá guiando con las preguntas que considere necesarias para poder abordar lo que te está ocurriendo.' },
      { _key: 'qf3', question: '¿Las sesiones son 100% online?', answer: 'Sí, tanto las sesiones individuales como la terapia grupal son online. Esto te permite hacer terapia desde un espacio cómodo y seguro para ti, sin necesidad de desplazarte. Solo necesitas buena conexión a internet y un lugar donde puedas estar con cierta tranquilidad y privacidad.' },
    ],
    ctaBanner: {
      title: 'El primer paso es el más importante.',
      highlight: 'Empieza hoy ♡',
      description: 'Contáctame sin compromiso y te ayudo a encontrar la opción que mejor se adapte a ti.',
      primaryCta: { label: 'Reservar sesión', href: '/contacto' },
      secondaryCta: { label: 'Escríbeme por WhatsApp', href: 'https://wa.me/34600000000' },
    },
  })
  console.log('  ✅ servicesIndexPage')
}

async function fillBlogIndexPage() {
  console.log('📝 Filling blogIndexPage...')
  await patchSingleton('blogIndexPage', 'blogIndexPage', {
    heroLabel: 'Blog',
    heroTitle: 'Artículos para tu',
    heroHighlight: 'bienestar emocional',
    heroDescription: 'Explicaciones claras, herramientas prácticas y recursos psicológicos para entender mejor lo que te pasa y saber qué hacer con ello.',
    categories: [
      { _key: 'c0', key: 'todos', label: 'Todos' },
      { _key: 'c1', key: 'ansiedad', label: 'Ansiedad' },
      { _key: 'c2', key: 'herramientas', label: 'Herramientas' },
      { _key: 'c3', key: 'autoconocimiento', label: 'Autoconocimiento' },
      { _key: 'c4', key: 'relaciones', label: 'Relaciones' },
    ],
    emptyStateText: 'No hay artículos en esta categoría todavía.',
    ctaBanner: {
      title: '¿Necesitas apoyo profesional?',
      description: 'Los artículos informan, pero la terapia transforma.',
      primaryCta: { label: 'Reservar sesión', href: '/contacto' },
      secondaryCta: { label: 'Conoce mis servicios', href: '/servicios' },
    },
  })
  console.log('  ✅ blogIndexPage')
}

async function fillResourcesPage() {
  console.log('📝 Filling resourcesPage...')
  await patchSingleton('resourcesPage', 'resourcesPage', {
    heroLabel: 'Recursos Gratuitos',
    heroTitle: 'Tu caja de herramientas para el',
    heroHighlight: 'bienestar',
    heroDescription: 'El mismo material que uso con mis pacientes. Guías prácticas, meditaciones y ejercicios que puedes empezar hoy.',
    valuePropositions: [
      { _key: 'vp1', icon: '🧠', text: 'Basados en evidencia científica' },
      { _key: 'vp2', icon: '💜', text: 'Usados con 600+ pacientes' },
      { _key: 'vp3', icon: '🔓', text: 'Acceso inmediato y gratuito' },
      { _key: 'vp4', icon: '📱', text: 'Desde cualquier dispositivo' },
    ],
    previewSection: {
      sectionLabel: 'Qué incluye',
      title: 'Todo lo que necesitas para',
      titleHighlight: 'empezar',
    },
    emailGate: {
      title: 'Accede a todos los',
      titleHighlight: 'recursos',
      description: 'Deja tu email y desbloquea el acceso inmediato. Sin spam — solo contenido de valor.',
    },
    blogCrossLink: {
      text: 'También te puede interesar',
      linkLabel: 'Leer el blog',
      linkHref: '/blog',
    },
    ctaBanner: {
      title: 'Los recursos son el primer paso.',
      highlight: 'La terapia es el siguiente.',
      description: 'Cuando estés listx para profundizar, aquí estoy.',
      primaryCta: { label: 'Reservar sesión', href: '/contacto' },
      secondaryCta: { label: 'Ver servicios', href: '/servicios' },
    },
  })
  console.log('  ✅ resourcesPage')
}

async function main() {
  console.log('🚀 Filling singletons with final content...\n')
  await fillSiteSettings()
  await fillHomePage()
  await fillAboutPage()
  await fillContactPage()
  await fillFaqPage()
  await fillTestimonialsPage()
  await fillServicesIndexPage()
  await fillBlogIndexPage()
  await fillResourcesPage()
  console.log('\n🎉 All singletons filled successfully!')
}

main().catch((err) => {
  console.error('❌ Error:', err.message)
  process.exit(1)
})
