export interface Pricing {
  name: string
  price: number
  description?: string
  savings?: number
}

export interface ProcessStep {
  step: number
  title: string
  description: string
}

export interface DisorderCategory {
  category: string
  items: string[]
}

export interface ServiceData {
  slug: string
  title: string
  tagline: string
  color: "rose" | "purple"
  whoIsItFor: string
  formalDisorders: DisorderCategory[]
  transdiagnostic: string[]
  evaluation: { description: string; price: number }
  pricing: Pricing[]
  methodology: string[]
  outcomes: string[]
  process: ProcessStep[]
}

export const individualTherapy: ServiceData = {
  slug: "terapia-individual",
  title: "Terapia Individual",
  tagline: "Atencion personal y enfocada en tu viaje unico",
  color: "rose",
  whoIsItFor:
    "Para ti, que sientes que algo no esta bien pero no sabes exactamente que. Para ti, que llevas tiempo cargando con un peso que ya no puedes sostener solo/a. No necesitas tener un diagnostico ni saber que te pasa—solo necesitas querer sentirte mejor.",
  formalDisorders: [
    {
      category: "Trastornos de Ansiedad",
      items: [
        "Trastorno de Ansiedad Generalizada (TAG)",
        "Trastorno de Panico",
        "Fobia Social",
        "Fobias Especificas",
        "Agorafobia",
      ],
    },
    {
      category: "Trastornos del Estado de Animo",
      items: [
        "Depresion Mayor",
        "Distimia (depresion persistente)",
        "Trastorno Adaptativo",
      ],
    },
    {
      category: "Trauma y Estres",
      items: [
        "Trastorno de Estres Postraumatico (TEPT)",
        "Trauma complejo",
        "Duelo complicado",
      ],
    },
    {
      category: "Otros",
      items: [
        "Trastorno Obsesivo-Compulsivo (TOC)",
        "Dependencia emocional",
        "Problemas de apego",
      ],
    },
  ],
  transdiagnostic: [
    "Autoestima y amor propio",
    "Gestion emocional",
    "Habilidades sociales",
    "Sentido de la vida y proposito",
    "Relaciones de pareja",
    "Establecer limites",
    "Manejo del estres",
    "Crecimiento personal",
  ],
  evaluation: {
    description:
      "La sesion de valoracion es nuestro primer encuentro. Nos conocemos, hablamos de lo que te trae aqui, y vemos si hacemos buen match. No hay compromiso—es simplemente una conversacion abierta para que ambas sepamos si queremos trabajar juntas.",
    price: 50,
  },
  pricing: [
    { name: "Sesion de Evaluacion", price: 50 },
    { name: "Sesion Regular", price: 70 },
    { name: "Pack de 4 Sesiones", price: 220, savings: 60 },
  ],
  methodology: [
    "Terapia Cognitivo-Conductual (TCC)",
    "EMDR (Desensibilizacion y Reprocesamiento por Movimientos Oculares)",
    "Mindfulness y tecnicas de atencion plena",
    "Practicas somaticas",
    "Terapias de tercera generacion",
  ],
  outcomes: [
    "Reducir significativamente la ansiedad y el estres",
    "Mejorar tu autoestima y relacion contigo mismo/a",
    "Desarrollar herramientas para gestionar tus emociones",
    "Romper patrones de pensamiento negativos",
    "Mejorar tus relaciones personales y establecer limites",
    "Encontrar claridad y proposito en tu vida",
    "Superar experiencias traumaticas",
    "Sentirte capaz de afrontar los desafios del dia a dia",
  ],
  process: [
    {
      step: 1,
      title: "Contacta conmigo",
      description:
        "Escribeme por WhatsApp o rellena el formulario. Te respondere en menos de 24 horas para agendar tu sesion de valoracion.",
    },
    {
      step: 2,
      title: "Sesion de valoracion",
      description:
        "Nos conocemos, hablamos de lo que te trae aqui y diseñamos juntas un plan terapeutico personalizado para ti.",
    },
    {
      step: 3,
      title: "Comienza tu proceso",
      description:
        "Empezamos a trabajar juntas. Sesiones semanales donde iras descubriendo herramientas, ganando claridad y sintiendote cada vez mejor.",
    },
  ],
}

export const groupTherapy = {
  slug: "terapia-grupal",
  title: "Terapia Grupal",
  tagline: "Crecimiento compartido en una comunidad de apoyo",
  color: "purple" as const,
  whoIsItFor:
    "Para ti, que sientes que compartir tu experiencia con otros puede darte una perspectiva nueva. Para ti, que quieres sentirte acompanado/a en el proceso y saber que no estas solo/a. El grupo es un espacio seguro donde cada persona va a su ritmo.",
  programDetails: {
    duration: "3 meses",
    sessionsTotal: 12,
    frequency: "Semanal",
    groupSize: "6-8 personas",
    sessionLength: "90 minutos",
    modality: "Online (Zoom)",
  },
  pricing: {
    total: 450,
    perSession: 37.5,
    friendDiscount: 30,
    friendDiscountMonthly: 10,
  },
  differentiators: [
    "Kit de herramientas para gestionar ataques de ansiedad (documentos + audios)",
    "Acceso a grabaciones de meditaciones guiadas",
    "Comunidad de apoyo durante y despues del programa",
    "Material exclusivo no disponible en terapia individual",
    "Perspectivas diversas que enriquecen tu proceso",
  ],
  bonuses: [
    {
      title: "Kit de Herramientas Anti-Ansiedad",
      description: "Documentos practicos y audios guiados para gestionar momentos de crisis",
    },
    {
      title: "Meditaciones Guiadas",
      description: "Grabaciones exclusivas para practicar entre sesiones",
    },
    {
      title: "Diario de Progreso",
      description: "Plantilla de seguimiento para registrar tu evolucion semana a semana",
    },
    {
      title: "Comunidad Privada",
      description: "Grupo de apoyo entre participantes durante todo el programa",
    },
  ],
  monthlyBreakdown: [
    {
      month: 1,
      title: "Fundamentos",
      description: "Nos conocemos, creamos un espacio seguro y aprendemos las herramientas basicas para gestionar la ansiedad.",
      topics: ["Psicoeducacion sobre ansiedad", "Tecnicas de respiracion", "Identificacion de patrones", "Primeras herramientas practicas"],
    },
    {
      month: 2,
      title: "Trabajo Profundo",
      description: "Profundizamos en los patrones emocionales, trabajamos creencias limitantes y fortalecemos habilidades.",
      topics: ["Reestructuracion cognitiva", "Exposicion gradual", "Gestion emocional avanzada", "Trabajo con creencias"],
    },
    {
      month: 3,
      title: "Integracion",
      description: "Consolidamos lo aprendido, creamos un plan de mantenimiento y nos preparamos para continuar solos/as.",
      topics: ["Plan de prevencion de recaidas", "Consolidacion de herramientas", "Proyeccion al futuro", "Cierre y celebracion"],
    },
  ],
  process: [
    {
      step: 1,
      title: "Reserva tu plaza",
      description:
        "Contactame para confirmar tu interes. Te explicare los detalles y resolveremos dudas.",
    },
    {
      step: 2,
      title: "Entrevista previa",
      description:
        "Tendremos una breve llamada para conocernos y asegurar que el grupo es adecuado para ti.",
    },
    {
      step: 3,
      title: "Comienza el programa",
      description:
        "Te unes al grupo y empezamos el viaje de 3 meses juntos. Cada semana, un paso mas hacia tu bienestar.",
    },
  ],
}
