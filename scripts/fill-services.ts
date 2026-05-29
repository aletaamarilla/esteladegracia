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

async function patchService(id: string, data: Record<string, unknown>) {
  const existing = await client.fetch(`*[_id == "${id}"][0]{ _id }`)
  if (existing) {
    await client.patch(id).set(data).commit()
  } else {
    await client.createOrReplace({ _id: id, _type: 'service', ...data })
  }
}

async function fillTerapiaIndividual() {
  console.log('📝 Filling Terapia Individual...')
  await patchService('service-terapia-individual', {
    title: 'Sesiones individuales',
    slug: { _type: 'slug', current: 'terapia-individual' },
    tagline: 'Un espacio solo para ti, donde profundizar en lo que te pasa y trabajar a tu ritmo',
    color: 'rose',
    heroLabel: 'Terapia online',
    whoIsItFor: 'Para quienes sienten que llevan demasiado tiempo sosteniendo más de lo que pueden. El ser humano es capaz de aguantar casi lo inimaginable, sí, pero poder hacerlo no significa que haya que seguir viviendo así. Si algo no va bien, aunque todavía no sepas ponerle nombre, este espacio es un lugar dónde empezar a hacerlo. No hace falta tener un diagnóstico ni saber exactamente qué ocurre: a veces basta con reconocer que se necesita más calma, más alivio y una forma más amable de vivir lo que está pasando.',
    previewCard: {
      badge: '',
      shortDescription: 'Un espacio solo para ti, donde profundizar en lo que te pasa y trabajar de forma personalizada.',
      features: [
        'Sesiones de 50 minutos',
        'Frecuencia flexible',
        'Plan personalizado',
        'Herramientas prácticas desde la primera sesión',
      ],
    },
    formalDisorders: [
      {
        _key: 'ansiedad',
        category: 'Trastornos de Ansiedad',
        items: [
          'Ansiedad generalizada',
          'Trastorno de pánico',
          'Agorafobia',
          'Fobia social',
          'Fobias específicas',
        ],
      },
      {
        _key: 'otros',
        category: 'Otros',
        items: [
          'TOC',
          'Despersonalización/desrealización',
          'Consumo problemático de alcohol',
          'Consumo problemático de cannabis',
          'Estrés postraumático',
          'Trastorno por déficit de atención con hiperactividad (TDAH)',
        ],
      },
    ],
    transdiagnostic: [
      'Seguridad en ti y amor propio',
      'Gestión emocional',
      'Habilidades sociales',
      'Sentido de vida y propósito',
      'Relaciones de pareja',
      'Establecer límites',
      'Manejo del estrés',
      'Dependencia emocional',
      'Crisis vitales y procesos de cambio',
      'Toma de decisiones',
      'Autoexigencia',
      'Dificultad para soltar el control',
      'Procesos de duelo',
    ],
    evaluation: {
      description: 'Durante la primera sesión nos conoceremos y me contarás lo que necesites. Servirá para entender qué te está pasando, qué necesitas ahora y qué te gustaría trabajar. Es importante que empieces el proceso sintiéndote en confianza con el profesional que te acompaña. Además, podrás hacerme las preguntas que necesites y, muy probablemente, ya te lleves algunas herramientas desde esta primera sesión.',
      price: 50,
    },
    pricing: [
      { _key: 'eval', name: 'Sesión de Evaluación', price: 50 },
      { _key: 'regular', name: 'Sesión Individual', price: 70 },
      { _key: 'pack4', name: 'Bono de 4 Sesiones', price: 220, savings: 60 },
    ],
    methodology: [
      'Terapia Cognitivo-Conductual (TCC)',
      'Mindfulness y técnicas de atención plena',
      'Psicodrama terapéutico',
      'Terapias de tercera generación',
      'Especialización en ansiedad',
      'Regulación emocional',
    ],
    outcomes: [
      'Reducir significativamente la ansiedad',
      'Mejorar tu autoconcepto y la relación contigo mismo/a',
      'Adquirir herramientas para gestionar tus emociones',
      'Frenar los pensamientos en bucle',
      'Mejorar tus relaciones y establecer límites',
      'Encontrar claridad y propósito en tu vida',
      'Empezar a sentirte capaz y suficiente',
      'Reducir la sensación de alerta constante en tu cuerpo',
      'Tomar decisiones con más claridad y menos miedo',
      'Salir del piloto automático y conectar más contigo',
      'Sentirte más en paz con lo que eres y con lo que sientes',
      'Recuperar espacio para disfrutar, descansar y vivir con más calma',
    ],
    process: [
      { _key: 's1', step: 1, title: 'Contáctame', description: 'Escríbeme por WhatsApp o rellena el formulario. Te responderé en menos de 24 horas para agendar tu sesión de valoración.' },
      { _key: 's2', step: 2, title: 'Sesión de valoración', description: 'Nos conocemos, hablamos de lo que te trae aquí y diseñamos juntxs un plan terapéutico personalizado para ti.' },
      { _key: 's3', step: 3, title: 'Empezamos tu proceso', description: 'Empezamos a trabajar juntxs. Sesiones donde irás descubriendo herramientas, ganando claridad y sintiéndote cada vez mejor.' },
    ],
    ctaBanner: {
      title: 'Da el primer paso hacia tu bienestar.',
      highlight: 'Quiero empezar ya ♡',
      description: 'Reserva tu sesión de valoración y empecemos juntxs. Sin compromiso.',
      primaryCta: { label: '¡Quiero empezar ya!', href: '/contacto' },
      secondaryCta: { label: 'Escríbeme por WhatsApp', href: 'https://wa.me/34600000000' },
    },
  })
  console.log('  ✅ Terapia Individual')
}

async function fillTerapiaGrupal() {
  console.log('📝 Filling Terapia Grupal...')
  await patchService('service-terapia-grupal', {
    title: 'TERAPIA GRUPAL',
    slug: { _type: 'slug', current: 'terapia-grupal' },
    tagline: 'PROGRAMA: MIRARTE DISTINTO. Un proceso grupal para salir del bucle de la ansiedad, entender tus patrones y empezar a relacionarte de otra manera',
    color: 'purple',
    heroLabel: 'TERAPIA GRUPAL',
    whoIsItFor: 'Para quienes necesitan entender mejor que les pasa y aprender a manejar la ansiedad. Comprenderás como funciona la ansiedad, los pensamientos en bucle y tu sistema nervioso. También explorarás situaciones, conflictos o vivencias que han quedado bloqueadas y que necesitan encontrar una elaboración o una respuesta nueva. Eso permite atravesar los procesos de la vida con más conciencia, más estabilidad y una forma más sana de sostener lo que pasa. Y, junto a todo ello, aparece algo muy potente: la experiencia de sentirte acompañadx por una comunidad real.',
    previewCard: {
      badge: '',
      shortDescription: 'PROGRAMA: MIRARTE DISTINTO. Un proceso grupal para salir del bucle de la ansiedad, entender tus patrones y empezar a relacionarte de otra manera.',
      features: [
        '4 meses de programa',
        'Grupo muy reducido',
        'Sesiones quincenales de ~3h',
        'Kit de herramientas incluido',
        'Acompañamiento entre sesiones',
      ],
    },
    pricing: [
      { _key: 'total', name: 'Programa completo (pago único)', price: 320 },
      { _key: 'monthly', name: 'Pago mensual (x4 meses)', price: 100 },
    ],
    pricePerHour: '13,33€ por hora si decides abonarlo en un solo pago, 16,66€ si pagas mensualmente',
    programDetails: {
      duration: '4 meses',
      sessionsTotal: 8,
      frequency: 'Quincenal',
      groupSize: 'Grupo muy reducido',
      sessionLength: '~3 horas',
      modality: 'Online en directo vía Zoom',
    },
    differentiators: [
      'Sesiones grupales en directo cada 15 días, de alrededor de 3 horas',
      'Kit de herramientas para gestionar ataques de ansiedad (documentos + audios)',
      'Acceso a grabaciones de meditaciones guiadas',
      'Clase práctica para cortar pensamientos en bucle',
      'Psicoeducación sobre ansiedad, sistema nervioso y regulación',
      'Trabajo vivencial y psicodramático sobre temas o escenas bloqueadas',
      'Material exclusivo no disponible en terapia individual',
      'Una comunidad que acompaña durante y después del programa',
      'La riqueza de compartir proceso con miradas y experiencias distintas',
    ],
    bonuses: [
      { _key: 'b1', title: 'Kit de herramientas para la ansiedad', description: 'Documentos y audios prácticos para acompañarte en momentos de activación, crisis o bloqueo.' },
      { _key: 'b2', title: 'Meditaciones guiadas', description: 'Grabaciones para ayudarte a regularte, bajar revoluciones y volver al presente.' },
      { _key: 'b3', title: 'Clase para cortar pensamientos en bucle', description: 'Un recurso práctico para comprender la rumiación y aprender a salir de ella.' },
      { _key: 'b4', title: 'Bitácora de proceso', description: 'Una guía para registrar tu recorrido, hacerte más consciente de lo que te pasa y ver tu evolución con más claridad.' },
      { _key: 'b5', title: 'Recursos de regulación del sistema nervioso', description: 'Herramientas para acompañarte cuando el cuerpo se activa o sientas que todo te desborda.' },
      { _key: 'b6', title: 'Material exclusivo del programa', description: 'Contenido adicional pensado para complementar y enriquecer tu proceso.' },
      { _key: 'b7', title: 'Prácticas para integrar entre sesiones', description: 'Ejercicios sencillos para llevar lo trabajado al día a día.' },
      { _key: 'b8', title: 'Comunidad de apoyo', description: 'Un espacio donde compartir proceso y sentirte acompañada también fuera de las sesiones.' },
    ],
    monthlyBreakdown: [
      {
        _key: 'm1', month: 1, title: 'Entender lo que te pasa y empezar a sentir más seguridad',
        description: 'En este primer tramo, vas a comprender qué te pasa, dejar de asustarte tanto con los síntomas y empezar a tener herramientas claras para manejar la activación.',
        topics: ['Comprender cómo funciona la ansiedad y el sistema nervioso', 'Identificar señales previas de activación', 'Empezar a regularte con más claridad en momentos de crisis', 'Empezar a sentir más claridad y seguridad interna'],
      },
      {
        _key: 'm2', month: 2, title: 'Detectar lo que repites y empezar a salir del bucle',
        description: 'Aquí empezarás a ver con más claridad qué pensamientos, hábitos y respuestas automáticas están alimentando tu ansiedad y tu malestar.',
        topics: ['Identificar pensamientos automáticos y bucles mentales', 'Detectar patrones de evitación, control o autoexigencia', 'Entender qué mantiene el malestar en tu día a día', 'Empezar a responder de otra manera'],
      },
      {
        _key: 'm3', month: 3, title: 'Desbloquear lo que te frena y abrir respuestas nuevas',
        description: 'En este punto, el trabajo va más a fondo: podrás elaborar escenas, conflictos o vivencias que siguen pesando, para dejar de repetir respuestas que ya no te ayudan.',
        topics: ['Trabajar temas o escenas que siguen afectándote', 'Revisar patrones relacionales y emocionales', 'Encontrar respuestas nuevas ante ciertas situaciones', 'Ganar más estabilidad interna y flexibilidad'],
      },
      {
        _key: 'm4', month: 4, title: 'Integrar lo vivido y sostenerlo fuera del grupo',
        description: 'El último tramo te servirá para ordenar todo lo trabajado y salir con más claridad, estructura y recursos reales para tu vida cotidiana.',
        topics: ['Consolidar herramientas útiles para tu día a día', 'Saber qué hacer ante recaídas o picos de ansiedad', 'Clarificar necesidades, límites y señales de alarma', 'Cerrar el proceso con más claridad, estabilidad y dirección'],
      },
    ],
    process: [
      { _key: 's1', step: 1, title: 'Rellena el formulario', description: 'Responde brevemente a algunas preguntas.' },
      { _key: 's2', step: 2, title: 'Valoramos si este formato encaja contigo', description: 'En un plazo de 24 a 48 horas revisaremos tu formulario para asegurarnos de que el formato grupal responde a tus necesidades y a lo que estás buscando en este momento.' },
      { _key: 's3', step: 3, title: 'Recibirás la respuesta y el enlace de reserva', description: 'Si el grupo encaja contigo, te enviaré la respuesta junto con el enlace para reservar tu plaza.' },
      { _key: 's4', step: 4, title: 'Confirma tu plaza', description: 'Tendrás 48 horas para realizar el pago. Una vez hecho, la plaza será tuya.' },
    ],
    syllabusCapture: {
      title: '¿Quieres el programa detallado',
      titleHighlight: 'sesión a sesión?',
      description: 'Deja tu email y te envío el temario completo del programa con todo lo que trabajaremos.',
      buttonText: 'Recibir programa',
      successMessage: '¡Enviado! Revisa tu bandeja de entrada.',
    },
    ctaBanner: {
      title: 'Las plazas son limitadas.',
      highlight: 'Reserva la tuya ♡',
      description: 'Si sientes que el grupo puede ser tu espacio, no lo dejes para después. Contáctame y te cuento todo.',
      primaryCta: { label: 'Quiero formar parte', href: '/contacto' },
      secondaryCta: { label: 'Escríbeme por WhatsApp', href: 'https://wa.me/34600000000' },
    },
  })
  await client.patch('service-terapia-grupal').unset(['friendDiscount', 'previewCard.friendBadge']).commit()
  console.log('  ✅ Terapia Grupal')
}

async function main() {
  console.log('🚀 Filling services with final content...\n')
  await fillTerapiaIndividual()
  await fillTerapiaGrupal()
  console.log('\n🎉 All services filled successfully!')
}

main().catch((err) => {
  console.error('❌ Error:', err.message)
  process.exit(1)
})
