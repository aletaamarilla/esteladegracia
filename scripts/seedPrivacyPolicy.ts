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

let keyCounter = 0
function key(): string {
  return `pp${(keyCounter++).toString(36).padStart(4, '0')}`
}

interface Span {
  _type: 'span'
  _key: string
  text: string
  marks: string[]
}

function span(text: string, marks: string[] = []): Span {
  return { _type: 'span', _key: key(), text, marks }
}

function textBlock(text: string, style = 'normal') {
  return {
    _type: 'block',
    _key: key(),
    style,
    markDefs: [] as unknown[],
    children: [span(text)],
  }
}

function linkBlock(segments: Array<{ text: string; href?: string; bold?: boolean }>, style = 'normal') {
  const markDefs: Array<{ _type: string; _key: string; href: string }> = []
  const children: Span[] = []

  for (const seg of segments) {
    const marks: string[] = []
    if (seg.bold) marks.push('strong')
    if (seg.href) {
      const linkKey = key()
      markDefs.push({ _type: 'link', _key: linkKey, href: seg.href })
      marks.push(linkKey)
    }
    children.push(span(seg.text, marks))
  }

  return { _type: 'block', _key: key(), style, markDefs, children }
}

function boldBlock(segments: Array<{ text: string; bold?: boolean }>, style = 'normal') {
  return {
    _type: 'block',
    _key: key(),
    style,
    markDefs: [],
    children: segments.map((seg) => span(seg.text, seg.bold ? ['strong'] : [])),
  }
}

function bulletItem(text: string, level = 1) {
  return {
    _type: 'block',
    _key: key(),
    style: 'normal',
    listItem: 'bullet',
    level,
    markDefs: [],
    children: [span(text)],
  }
}

function boldBulletItem(segments: Array<{ text: string; bold?: boolean }>, level = 1) {
  return {
    _type: 'block',
    _key: key(),
    style: 'normal',
    listItem: 'bullet',
    level,
    markDefs: [],
    children: segments.map((seg) => span(seg.text, seg.bold ? ['strong'] : [])),
  }
}

const body = [
  // --- 1. Responsable del tratamiento ---
  textBlock('1. Responsable del tratamiento', 'h2'),
  textBlock('En cumplimiento del Reglamento General de Protección de Datos (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD), se le informa de lo siguiente:'),
  boldBulletItem([{ text: 'Responsable: ', bold: true }, { text: 'Estela de Gracia García' }]),
  boldBulletItem([{ text: 'NIF: ', bold: true }, { text: '54.395.764-G' }]),
  boldBulletItem([{ text: 'Nº de colegiada: ', bold: true }, { text: 'M-35547' }]),
  boldBulletItem([{ text: 'Dirección profesional: ', bold: true }, { text: 'Servicio de terapia online — sin consulta física' }]),
  linkBlock([
    { text: 'Correo electrónico: ', bold: true },
    { text: 'esteladgracia@gmail.com', href: 'mailto:esteladgracia@gmail.com' },
  ]),

  // --- 2. Finalidad del tratamiento ---
  textBlock('2. Finalidad del tratamiento', 'h2'),
  textBlock('Los datos personales que nos facilite serán tratados con las siguientes finalidades:'),
  boldBulletItem([{ text: 'Gestión de citas y consultas: ', bold: true }, { text: 'responder a sus solicitudes de información, gestionar la reserva de sesiones de terapia individual o grupal, y mantener la comunicación necesaria para la prestación del servicio.' }]),
  boldBulletItem([{ text: 'Prestación del servicio de psicología: ', bold: true }, { text: 'llevar a cabo las sesiones de terapia, elaborar y custodiar la historia clínica, y realizar el seguimiento terapéutico.' }]),
  boldBulletItem([{ text: 'Facturación y gestión administrativa: ', bold: true }, { text: 'emisión de facturas y cumplimiento de las obligaciones fiscales y contables.' }]),
  boldBulletItem([{ text: 'Envío de comunicaciones: ', bold: true }, { text: 'si usted lo ha consentido expresamente, enviarle información sobre recursos gratuitos, artículos del blog, novedades del servicio o contenido relacionado con bienestar emocional.' }]),

  // --- 3. Legitimación ---
  textBlock('3. Legitimación', 'h2'),
  textBlock('La base legal para el tratamiento de sus datos es:'),
  boldBulletItem([{ text: 'Ejecución de un contrato: ', bold: true }, { text: 'el tratamiento es necesario para la prestación del servicio de psicología que usted ha solicitado (art. 6.1.b RGPD).' }]),
  boldBulletItem([{ text: 'Consentimiento del interesado: ', bold: true }, { text: 'para el envío de comunicaciones comerciales y/o newsletters (art. 6.1.a RGPD). Este consentimiento puede ser revocado en cualquier momento.' }]),
  boldBulletItem([{ text: 'Obligación legal: ', bold: true }, { text: 'para el cumplimiento de obligaciones fiscales, contables y de conservación de la historia clínica (art. 6.1.c RGPD).' }]),
  boldBulletItem([{ text: 'Interés legítimo: ', bold: true }, { text: 'para la gestión de consultas realizadas a través del formulario de contacto o WhatsApp (art. 6.1.f RGPD).' }]),

  // --- 4. Datos recabados ---
  textBlock('4. Datos recabados', 'h2'),
  textBlock('Los datos personales que podemos recopilar incluyen:'),
  bulletItem('Datos identificativos: nombre y apellidos.'),
  bulletItem('Datos de contacto: dirección de correo electrónico, número de teléfono.'),
  bulletItem('Datos de salud: información proporcionada durante las sesiones de terapia, necesaria para la prestación del servicio de psicología. Estos datos tienen la consideración de categoría especial (art. 9 RGPD) y son tratados con las máximas garantías de confidencialidad.'),
  bulletItem('Datos de facturación: los necesarios para la emisión de facturas (nombre, NIF/NIE, dirección fiscal).'),

  // --- 5. Formas de recogida de datos ---
  textBlock('5. Formas de recogida de datos', 'h2'),

  textBlock('5.1 Formulario de contacto', 'h3'),
  textBlock('A través del formulario disponible en la página de contacto, se recogen: nombre, correo electrónico, teléfono (opcional) y el mensaje que usted desee enviar. La finalidad es atender su consulta y, en su caso, iniciar el proceso de reserva de cita.'),

  textBlock('5.2 WhatsApp', 'h3'),
  textBlock('Si nos contacta por WhatsApp, trataremos el número de teléfono y la información que usted comparta voluntariamente en la conversación. WhatsApp LLC es un tercero responsable de su propio tratamiento de datos. Le recomendamos consultar su política de privacidad.'),

  textBlock('5.3 Suscripción a recursos gratuitos / newsletter', 'h3'),
  textBlock('Si se suscribe para recibir recursos gratuitos (como el Kit de Herramientas para la Ansiedad) o la newsletter, se recogerá su dirección de correo electrónico. La base legal es su consentimiento expreso, que puede revocar en cualquier momento mediante el enlace de baja incluido en cada comunicación.'),

  textBlock('5.4 Sesiones de terapia', 'h3'),
  textBlock('Durante las sesiones se podrán tratar datos de salud de categoría especial. Estos datos son estrictamente confidenciales, están protegidos por el secreto profesional y se tratan exclusivamente para la prestación del servicio de psicología.'),

  // --- 6. Destinatarios ---
  textBlock('6. Destinatarios', 'h2'),
  textBlock('Sus datos personales no serán cedidos a terceros salvo obligación legal. No obstante, para la prestación del servicio utilizamos las siguientes herramientas:'),
  boldBulletItem([{ text: 'Sanity.io: ', bold: true }, { text: 'gestor de contenidos (CMS) para la administración del sitio web.' }]),
  boldBulletItem([{ text: 'HubSpot: ', bold: true }, { text: 'gestión de formularios de contacto y comunicaciones por correo electrónico.' }]),
  boldBulletItem([{ text: 'Plataforma de videollamada: ', bold: true }, { text: 'para la realización de sesiones online (Google Meet, Zoom u otra que se indique).' }]),
  boldBulletItem([{ text: 'Proveedor de hosting: ', bold: true }, { text: 'para el alojamiento del sitio web.' }]),
  textBlock('Estos proveedores actúan como encargados del tratamiento y cuentan con las garantías adecuadas de protección de datos, incluyendo, en su caso, Cláusulas Contractuales Tipo de la Comisión Europea para transferencias internacionales.'),

  // --- 7. Conservación de datos ---
  textBlock('7. Conservación de datos', 'h2'),
  textBlock('Los datos personales se conservarán durante el tiempo necesario para cumplir con la finalidad para la que fueron recogidos:'),
  boldBulletItem([{ text: 'Datos de contacto (consultas): ', bold: true }, { text: 'se conservarán mientras dure la gestión de su consulta y, posteriormente, durante los plazos legales de prescripción aplicables.' }]),
  boldBulletItem([{ text: 'Historia clínica: ', bold: true }, { text: 'se conservará un mínimo de 5 años desde la última asistencia, conforme a la Ley 41/2002, de 14 de noviembre, básica reguladora de la autonomía del paciente.' }]),
  boldBulletItem([{ text: 'Datos de facturación: ', bold: true }, { text: 'se conservarán durante los plazos exigidos por la normativa fiscal (mínimo 4 años).' }]),
  boldBulletItem([{ text: 'Datos de suscripción (newsletter/recursos): ', bold: true }, { text: 'hasta que usted revoque su consentimiento o solicite la baja.' }]),

  // --- 8. Derechos del interesado ---
  textBlock('8. Derechos del interesado', 'h2'),
  textBlock('Usted tiene derecho a:'),

  textBlock('8.1 Derechos que puede ejercer', 'h3'),
  boldBulletItem([{ text: 'Acceso: ', bold: true }, { text: 'conocer qué datos personales estamos tratando.' }]),
  boldBulletItem([{ text: 'Rectificación: ', bold: true }, { text: 'solicitar la corrección de datos inexactos o incompletos.' }]),
  boldBulletItem([{ text: 'Supresión: ', bold: true }, { text: 'solicitar la eliminación de sus datos cuando ya no sean necesarios para la finalidad para la que fueron recogidos.' }]),
  boldBulletItem([{ text: 'Oposición: ', bold: true }, { text: 'oponerse al tratamiento de sus datos en determinadas circunstancias.' }]),
  boldBulletItem([{ text: 'Limitación del tratamiento: ', bold: true }, { text: 'solicitar que se limite el tratamiento de sus datos en los casos previstos por la normativa.' }]),
  boldBulletItem([{ text: 'Portabilidad: ', bold: true }, { text: 'recibir sus datos en un formato estructurado, de uso común y lectura mecánica.' }]),
  boldBulletItem([{ text: 'Revocación del consentimiento: ', bold: true }, { text: 'retirar el consentimiento prestado en cualquier momento, sin que ello afecte a la licitud del tratamiento previo.' }]),

  textBlock('8.2 Cómo ejercer sus derechos', 'h3'),
  linkBlock([
    { text: 'Para ejercer cualquiera de estos derechos, puede enviar una solicitud por correo electrónico a ' },
    { text: 'esteladgracia@gmail.com', href: 'mailto:esteladgracia@gmail.com' },
    { text: ', indicando el derecho que desea ejercer y acompañando, en su caso, una copia de su documento de identidad.' },
  ]),
  textBlock('El plazo máximo de respuesta es de un mes desde la recepción de la solicitud, pudiendo ampliarse en dos meses más en casos de especial complejidad.'),

  // --- 9. Reclamaciones ---
  textBlock('9. Derecho a presentar una reclamación', 'h2'),
  linkBlock([
    { text: 'Si considera que el tratamiento de sus datos no se ajusta a la normativa vigente, tiene derecho a presentar una reclamación ante la ' },
    { text: 'Agencia Española de Protección de Datos (AEPD)', href: 'https://www.aepd.es' },
    { text: ', con sede en C/ Jorge Juan, 6, 28001 Madrid.' },
  ]),

  // --- 10. Secreto profesional ---
  textBlock('10. Secreto profesional y confidencialidad', 'h2'),
  textBlock('Como psicóloga sanitaria colegiada (nº M-35547), estoy sujeta al deber de secreto profesional conforme al Código Deontológico del Psicólogo y a la legislación sanitaria vigente. Toda la información compartida durante las sesiones de terapia es estrictamente confidencial.'),
  textBlock('Este deber de confidencialidad se mantiene incluso después de finalizada la relación terapéutica, sin límite temporal, salvo en los supuestos legalmente previstos (riesgo grave para la vida del paciente o de terceros, requerimiento judicial).'),

  // --- 11. Medidas de seguridad ---
  textBlock('11. Medidas de seguridad', 'h2'),
  textBlock('Se han adoptado las medidas técnicas y organizativas necesarias para garantizar la seguridad de sus datos personales y evitar su alteración, pérdida, tratamiento o acceso no autorizado, teniendo en cuenta el estado de la tecnología, la naturaleza de los datos almacenados y los riesgos a que están expuestos.'),
  textBlock('Entre otras medidas:'),
  bulletItem('Comunicaciones cifradas (HTTPS/TLS).'),
  bulletItem('Acceso restringido a los datos mediante credenciales seguras.'),
  bulletItem('Uso de plataformas con garantías adecuadas de protección de datos.'),
  bulletItem('Copias de seguridad periódicas.'),

  // --- 12. Cookies ---
  textBlock('12. Cookies', 'h2'),
  textBlock('Este sitio web puede utilizar cookies técnicas y/o analíticas. Las cookies técnicas son necesarias para el correcto funcionamiento del sitio. Las cookies analíticas, en su caso, se utilizan para recopilar información estadística sobre el uso del sitio y mejorar su funcionamiento.'),
  textBlock('Puede obtener más información y configurar sus preferencias sobre cookies en nuestra página de política de cookies (si aplicable).'),

  // --- 13. Menores ---
  textBlock('13. Datos de menores', 'h2'),
  textBlock('Este sitio web y los servicios ofrecidos están dirigidos a personas mayores de 18 años. No se recopilan intencionadamente datos de menores de edad. Si un padre, madre o tutor legal detecta que un menor ha proporcionado datos personales sin su consentimiento, puede contactarnos para solicitar su eliminación.'),

  // --- 14. Redes sociales ---
  textBlock('14. Redes sociales', 'h2'),
  textBlock('Si nos sigue o interactúa con nosotros a través de redes sociales (Instagram, LinkedIn, TikTok, YouTube), la red social correspondiente actúa como responsable del tratamiento de los datos generados en su plataforma. Le recomendamos consultar la política de privacidad de cada red social.'),

  // --- 15. Transferencias internacionales ---
  textBlock('15. Transferencias internacionales de datos', 'h2'),
  textBlock('Algunas de las herramientas utilizadas (como HubSpot o la plataforma de videollamada) pueden implicar transferencias internacionales de datos a países fuera del Espacio Económico Europeo. En estos casos, se garantiza que existen las salvaguardas adecuadas, como la adhesión del proveedor al Marco de Privacidad de Datos UE-EE.UU. o la firma de Cláusulas Contractuales Tipo aprobadas por la Comisión Europea.'),

  // --- 16. Modificaciones ---
  textBlock('16. Modificaciones de la política de privacidad', 'h2'),
  textBlock('Esta política de privacidad puede ser actualizada en cualquier momento para adaptarla a novedades legislativas, jurisprudenciales o cambios en la actividad profesional. La fecha de la última actualización se indica al inicio del documento. Le recomendamos revisarla periódicamente.'),

  // --- 17. Contacto ---
  textBlock('17. Contacto', 'h2'),
  linkBlock([
    { text: 'Para cualquier consulta relacionada con el tratamiento de sus datos personales, puede contactar con la responsable del tratamiento en ' },
    { text: 'esteladgracia@gmail.com', href: 'mailto:esteladgracia@gmail.com' },
    { text: '.' },
  ]),
]

async function main() {
  console.log('📝 Seeding privacyPolicyPage...')

  await client.createOrReplace({
    _id: 'privacyPolicyPage',
    _type: 'privacyPolicyPage',
    title: 'Política de Privacidad',
    lastUpdated: '2025-04-06',
    body,
  })

  console.log('✅ privacyPolicyPage seeded successfully!')
}

main().catch((err) => {
  console.error('❌ Error:', err.message)
  process.exit(1)
})
