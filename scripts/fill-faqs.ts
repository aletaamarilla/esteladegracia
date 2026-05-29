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

interface FaqEntry {
  id?: string
  question: string
  answer: string
  category: string
  order: number
}

const deletedFaqIds = [
  'faq-que-pasa-si-no-me-siento-comodx-compartiendo-en-grupo',
  'faq-puedo-unirme-con-un-amigo',
]

const faqs: FaqEntry[] = [
  // ─── Terapia Individual (8 preguntas) ───
  {
    category: 'individual',
    order: 1,
    question: '¿Cómo es la primera sesión?',
    answer: `A la primera sesión la llamo sesión de valoración. Es un primer encuentro en el que podrás contarme qué te está pasando ahora, qué necesitas y qué te gustaría trabajar.

Durante la sesión, exploraremos tu situación actual y, al finalizar, te haré una primera devolución para que puedas entender mejor qué está ocurriendo y hacia dónde podríamos orientar el proceso terapéutico.

Además, esta sesión también sirve para algo muy importante: que puedas ver cómo te sientes conmigo. La terapia implica confianza, constancia y compromiso, por eso es fundamental que sientas que estás con una profesional con la que puedes abrirte y sentirte acompañadx.

Después de esta primera sesión, podrás decidir con calma si quieres empezar el proceso conmigo, según cómo te hayas sentido y si crees que este espacio puede ayudarte.`,
  },
  {
    category: 'individual',
    order: 2,
    question: '¿Cuánto duran las sesiones individuales?',
    answer: 'Las sesiones individuales duran 50 minutos. Es un tiempo pensado para poder profundizar en lo que te pasa, trabajar con calma y que el espacio sea útil y sostenible en el tiempo.',
  },
  {
    category: 'individual',
    order: 3,
    question: '¿Y si me cuesta abrirme o no sé por dónde empezar?',
    answer: 'No pasa nada. Muchas personas llegan sin saber muy bien cómo explicarlo o por dónde empezar. No necesitas venir con todo ordenado. Mi labor también es ayudarte a entender lo que te pasa, poner palabras a lo que estás viviendo y empezar juntxs desde el punto en el que estés ahora.',
  },
  {
    category: 'individual',
    order: 4,
    question: '¿Con qué frecuencia debería ir a terapia?',
    answer: `La frecuencia de las sesiones depende de las necesidades de cada persona y del momento en el que se encuentre.

Al inicio del proceso, suelo recomendar una frecuencia semanal. Esto permite dar continuidad al trabajo, aplicar o registrar lo que vayamos viendo en sesión y observar con más claridad cómo impacta en tu día a día.

Además, durante las primeras sesiones es importante construir un buen vínculo terapéutico. Vernos semanalmente ayuda a generar más confianza, cercanía y seguridad dentro del proceso.

Más adelante, según tu evolución, tus circunstancias y tus necesidades, podemos ir espaciando las sesiones.

En cualquier caso, la frecuencia siempre se adapta a tu realidad. Si por motivos personales, económicos o de disponibilidad no puedes venir semanalmente, buscaremos una forma de trabajo que sea posible y sostenible para ti.`,
  },
  {
    category: 'individual',
    order: 5,
    question: '¿Puedo cambiar la frecuencia de las sesiones?',
    answer: 'Sí. La frecuencia no tiene por qué ser fija para siempre. Se puede revisar y ajustar según cómo estés, el momento que estés atravesando y lo que necesite tu proceso. Aun así, sobre todo al inicio, recomiendo mantener cierta continuidad para que el trabajo tenga más sostén, claridad y recorrido.',
  },
  {
    category: 'individual',
    order: 6,
    question: '¿Qué diferencia la terapia online de la presencial?',
    answer: `La principal diferencia es el formato: en la terapia online nos vemos por videollamada, mientras que en la presencial compartimos el mismo espacio físico.

En cuanto al proceso terapéutico, el trabajo puede ser igual de profundo y efectivo. En ambos casos hay escucha, acompañamiento, herramientas y un espacio seguro para entender lo que te ocurre y empezar a generar cambios.

La terapia online, además, tiene algunas ventajas: te permite hacer sesión desde un lugar cómodo para ti, ahorrar desplazamientos y mantener el proceso aunque viajes, cambies de ciudad o tengas horarios complicados.

Lo más importante es que puedas estar en un espacio privado, tranquilo y con buena conexión, donde te sientas libre para hablar de lo que quieras.`,
  },
  {
    category: 'individual',
    order: 7,
    question: '¿Puedo cancelar o modificar una sesión que ya tengo reservada?',
    answer: `Sí, puedes cancelar o modificar tu sesión siempre que lo hagas con al menos 24 horas de antelación.

Si la cancelación o el cambio se solicita dentro de las 24 horas previas a la sesión, no será posible modificar la cita ni realizar el reembolso.`,
  },
  {
    category: 'individual',
    order: 8,
    question: '¿Cómo sé si la terapia está funcionando?',
    answer: `La terapia es un proceso y, como cualquier cambio profundo, requiere constancia y compromiso. No es lineal, ni siempre se nota de golpe, pero poco a poco empiezan a aparecer cambios concretos.

Puedes notar que entiendes mejor lo que te pasa, te sientes menos perdidx y tienes más herramientas para manejar lo que sientes. También puede que respondas de otra forma ante situaciones que antes te desbordaban, que haya más calma o que los síntomas de ansiedad aparezcan con menos frecuencia e intensidad.

A veces el proceso puede remover, y eso no significa que no esté funcionando. Iremos revisando juntas tu evolución para ajustar el trabajo a lo que necesites en cada momento.`,
  },

  // ─── Terapia Grupal (6 preguntas) ───
  {
    id: 'faq-como-se-si-la-terapia-grupal-es-para-mi',
    category: 'grupal',
    order: 1,
    question: '¿Cómo sé si el grupo terapéutico es para mí?',
    answer: `Este grupo puede ser para ti si sientes que la ansiedad, los pensamientos en bucle o ciertos patrones te están limitando y quieres trabajarlo en un proceso grupal, cuidado y profundo.

No es solo un espacio para hablar: es un lugar para entender mejor qué te pasa, aprender a regularte, sentirte acompañadx y empezar a relacionarte de otra manera. Además, el grupo también ayuda a trabajar habilidades sociales, construir vínculos más sanos y experimentar formas nuevas de estar con los demás.`,
  },
  {
    category: 'grupal',
    order: 2,
    question: '¿Y si me da vergüenza o me cuesta abrirme?',
    answer: 'Es completamente normal. No tienes que hablar más de lo que quieras ni exponerte antes de sentirte preparadx. Cada persona tiene su ritmo, y en el grupo también se respeta eso. Muchas veces, empezar escuchando ya es una forma de estar, de sentirte acompañadx y de ir ganando confianza poco a poco.',
  },
  {
    category: 'grupal',
    order: 3,
    question: '¿Qué tipo de cosas trabajamos en el grupo?',
    answer: 'En el grupo trabajamos la ansiedad desde varios lugares: entenderás mejor cómo funcionan los pensamientos automáticos, el sistema nervioso y ciertos patrones que sostienen el malestar. También habrá herramientas prácticas, técnicas de regulación, trabajo vincular, habilidades sociales y dinámicas grupales para que no solo comprendas lo que te pasa, sino que puedas vivirlo y entrenarlo de una forma diferente, en un espacio cuidado y seguro.',
  },
  {
    category: 'grupal',
    order: 4,
    question: '¿Cuántas personas hay en un grupo?',
    answer: `El grupo es reducido para que haya espacio real de trabajo, escucha y participación. Como máximo, habrá 10 personas.

La idea es que sea lo bastante pequeño como para cuidar el proceso de cada una, pero también lo bastante amplio como para que el propio grupo aporte riqueza, espejo y nuevas perspectivas.`,
  },
  {
    category: 'grupal',
    order: 5,
    question: '¿Qué incluye el kit de herramientas?',
    answer: `El kit incluye recursos prácticos para acompañarte durante todo el proceso, tanto dentro como fuera de las sesiones: documentos, audios, meditaciones guiadas y materiales pensados para ayudarte a gestionar momentos de ansiedad, activación o bloqueo.

También incluye herramientas para cortar pensamientos en bucle, regular el sistema nervioso y dar continuidad a lo que vayas trabajando en el grupo, para que puedas sostener mejor el proceso en tu día a día.`,
  },
  {
    category: 'grupal',
    order: 6,
    question: '¿Puedo combinar terapia grupal con individual?',
    answer: `Sí, y en muchos casos puede ser una combinación muy recomendable.

En el trabajo grupal aparecen escenas o bloqueos que en muchas ocasiones no llegan a aparecer en la terapia individual. Durante las sesiones individuales puedes seguir elaborándolo e integrarlo mejor.

Para no saturarte, normalmente no recomendaría hacer más de dos sesiones individuales al mes mientras participas en el grupo.`,
  },

  // ─── Ansiedad (9 preguntas) ───
  {
    category: 'ansiedad',
    order: 1,
    question: '¿Por qué mi cuerpo reacciona así si no hay un peligro real?',
    answer: 'Porque la ansiedad forma parte de un sistema de supervivencia muy antiguo. Hace millones de años, nuestro cuerpo se activaba para huir o luchar ante un peligro, y hoy sigue respondiendo de una forma muy parecida. Cuando interpreta que hay una amenaza, se prepara para actuar: se tensa, acelera el pulso, cambia la respiración y se pone en alerta. Por eso, aunque no haya un peligro físico real delante, tu cuerpo puede reaccionar como si lo hubiera. De hecho, cierta dosis de ansiedad es necesaria: nos ayuda a protegernos, reaccionar y sobrevivir.',
  },
  {
    // TODO: verificar con clienta — duplicación en PDF (la respuesta del PDF para esta pregunta es idéntica a la de FAQ 1)
    category: 'ansiedad',
    order: 2,
    question: '¿Por qué siento ansiedad si "en teoría" todo está bien?',
    answer: 'Porque la ansiedad no siempre tiene que ver con lo que está pasando fuera. Muchas veces está relacionada con cómo procesamos lo que sentimos, con patrones aprendidos o con necesidades emocionales no atendidas. Que "todo esté bien" en la superficie no significa que por dentro no haya cosas que necesitan atención.',
  },
  {
    category: 'ansiedad',
    order: 3,
    question: '¿La ansiedad se cura o se aprende a gestionar?',
    answer: 'En muchos casos, la ansiedad no desaparece de un día para otro, pero sí puede dejar de dirigir tu vida. Más que hablar de "curarla", muchas veces hablamos de entenderla, regularla y aprender a relacionarte con ella de otra manera. Cuando comprendes cómo funciona, dejas de asustarte tanto, aprendes a sostener lo que te pasa y recuperas poco a poco sensación de control, calma y confianza en ti.',
  },
  {
    category: 'ansiedad',
    order: 4,
    question: '¿Qué técnicas utilizar para la ansiedad?',
    answer: 'Trabajo con herramientas basadas en evidencia que se adaptan a la persona y al momento que está viviendo. Entre ellas, utilizo recursos de Terapia Cognitivo-Conductual, mindfulness, regulación emocional, trabajo con pensamientos automáticos, técnicas corporales y herramientas vivenciales desde el psicodrama. El objetivo no es aplicar una única técnica, sino encontrar lo que más puede ayudarte según cómo se exprese tu ansiedad.',
  },
  {
    category: 'ansiedad',
    order: 5,
    question: '¿Cuándo empezaré a notar mejoría?',
    answer: 'Depende de cada persona, de la intensidad de lo que está viviendo y de la continuidad del proceso. Aun así, muchas personas empiezan a notar cierto alivio relativamente pronto: entienden mejor lo que les pasa, dejan de sentirse tan perdidas y empiezan a tener herramientas para manejar la ansiedad. Los cambios más profundos suelen necesitar más tiempo, porque no se trata solo de calmar síntomas, sino de transformar patrones y construir una forma más estable de sostenerse.',
  },
  {
    category: 'ansiedad',
    order: 6,
    question: '¿Ofreces apoyo de emergencia?',
    answer: 'No. Este espacio no funciona como un servicio de urgencias ni de atención inmediata. Si estás en una situación de crisis o emergencia, lo más importante es acudir a los recursos sanitarios correspondientes de tu zona o pedir ayuda urgente a un servicio especializado. Dentro del proceso terapéutico sí trabajamos herramientas para que tengas más recursos cuando aparezcan momentos de mucha activación o desborde, pero no sustituyen una atención de emergencia.',
  },
  {
    category: 'ansiedad',
    order: 7,
    question: '¿Cuál es la diferencia entre ansiedad normal y un trastorno de ansiedad?',
    answer: 'La ansiedad, en cierta medida, es una respuesta normal y necesaria del cuerpo. Nos ayuda a reaccionar ante amenazas, anticiparnos y protegernos. El problema aparece cuando esa ansiedad deja de ser puntual y empieza a vivirse con demasiada frecuencia, intensidad o interferencia en la vida diaria. Ahí es cuando puede hablarse de un trastorno de ansiedad: cuando el miedo, la activación o la evitación empiezan a limitar tu bienestar, tus decisiones, tus relaciones o tu forma de vivir.',
  },
  {
    category: 'ansiedad',
    order: 8,
    question: '¿Se puede superar la ansiedad completamente?',
    answer: 'En muchos casos, la ansiedad puede reducirse muchísimo y dejar de dirigir tu vida. A veces desaparecen ciertos síntomas, y otras veces lo que cambia es la relación que tienes con ellos: dejan de asustarte tanto, aparecen con menos frecuencia o intensidad y ya no condicionan tu vida como antes.',
  },
  {
    category: 'ansiedad',
    order: 9,
    question: '¿Necesito medicación para tratar la ansiedad?',
    answer: 'No siempre. Hay personas que pueden trabajar la ansiedad en terapia sin necesidad de medicación, y otras que, según el momento que estén viviendo o la intensidad de los síntomas, pueden beneficiarse de una valoración psiquiátrica. La medicación no es la única vía ni tiene por qué ser para siempre, pero en algunos casos puede ayudar a estabilizar mientras se trabaja en terapia.',
  },
]

async function main() {
  const confirm = process.argv.includes('--confirm')

  console.log(`🔍 ${faqs.length} FAQs a crear...\n`)

  for (const faq of faqs) {
    const id = faq.id ?? `faq-${slugify(faq.question)}`
    console.log(`  [${faq.category}] ${faq.question.slice(0, 50)}... → ${id}`)
    if (!confirm) continue

    await client.createOrReplace({
      _id: id,
      _type: 'faqItem',
      question: faq.question,
      answer: faq.answer,
      category: faq.category,
      order: faq.order,
    })
  }

  if (confirm) {
    for (const id of deletedFaqIds) {
      console.log(`  Eliminando FAQ obsoleta → ${id}`)
      await client.delete(id).catch((err) => {
        if (err.statusCode === 404) return
        throw err
      })
    }
  }

  if (!confirm) {
    console.log('\n⚠️  Ejecuta con --confirm para crear las FAQs:')
    console.log('   npm run fill-faqs -- --confirm')
    return
  }

  console.log(`\n🎉 ${faqs.length} FAQs creadas exitosamente!`)
}

main().catch((err) => {
  console.error('❌ Error:', err.message)
  process.exit(1)
})
