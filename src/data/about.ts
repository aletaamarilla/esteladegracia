export interface ProfessionalStat {
  icon: string
  label: string
  value: string
}

export interface PersonalTrait {
  icon: string
  label: string
  description: string
}

export interface TimelineItem {
  year: string
  title: string
  description: string
}

export const professionalStats: ProfessionalStat[] = [
  { icon: "Award", label: "Anos de experiencia", value: "12+" },
  { icon: "GraduationCap", label: "Formacion especializada", value: "TCC avanzada y EMDR" },
  { icon: "Users", label: "Pacientes ayudados", value: "500+" },
]

export const personalTraits: PersonalTrait[] = [
  { icon: "Palette", label: "Artista", description: "La creatividad fluye en todo lo que hago" },
  { icon: "Plane", label: "Migrante", description: "Entendiendo el desplazamiento de primera mano" },
  { icon: "Globe", label: "Viajera", description: "30+ paises, infinitas perspectivas" },
]

export const timeline: TimelineItem[] = [
  {
    year: "2012",
    title: "Licenciatura en Psicologia",
    description: "Graduada con honores. Primeros pasos en la psicologia clinica.",
  },
  {
    year: "2014",
    title: "Master en Psicologia Clinica",
    description: "Especializacion en trastornos de ansiedad y estado de animo.",
  },
  {
    year: "2016",
    title: "Formacion en EMDR",
    description: "Certificacion en procesamiento y desensibilizacion por movimientos oculares.",
  },
  {
    year: "2018",
    title: "TCC Avanzada",
    description: "Formacion avanzada en Terapia Cognitivo-Conductual de tercera generacion.",
  },
  {
    year: "2020",
    title: "Terapia Online",
    description: "Transicion a la terapia online. Apertura a pacientes de todo el mundo.",
  },
  {
    year: "2024",
    title: "Psicologia Sin Distancia",
    description: "Lanzamiento de la marca. Mas de 500 pacientes atendidos.",
  },
]

export const personalStory = `Creo que la verdadera conexion viene de la humanidad compartida. Mi propio viaje—como artista, migrante y viajera de toda la vida—ha moldeado como entiendo el dolor, la resiliencia y la hermosa complejidad de ser humano.

He vivido la ansiedad en primera persona. Se lo que es despertarte con un nudo en el estomago sin saber por que. He estado en relaciones donde me sentia pequena, donde perdia mi voz. Y fue justamente ese dolor el que me llevo a entender la terapia no solo desde los libros, sino desde las entranas.

Por eso mi enfoque no es distante ni clinico. Es cercano, real y profundamente humano. Porque cuando has estado ahi, cuando has sentido ese miedo, esa tristeza, esa confusion—conectas de una manera diferente con quien esta pasando por lo mismo.`

export const philosophy = `Mi enfoque terapeutico nace de la interseccion entre mi formacion clinica rigurosa y mis experiencias de vida. Creo firmemente que la terapia funciona mejor cuando hay una conexion genuina entre terapeuta y paciente.

No creo en la distancia clinica artificial. Creo en la escucha activa, en la empatia real y en crear un espacio donde puedas ser completamente tu, sin filtros ni juicios. Utilizo herramientas basadas en evidencia—TCC, EMDR, mindfulness—pero siempre adaptadas a ti, a tu ritmo y a tu realidad.`

// --- New data for conversion-optimized Sobre Mi page ---

export interface ApproachCard {
  icon: string
  title: string
  description: string
}

export const aboutHeroData = {
  headline: "Detras de cada sesion hay alguien que te entiende de verdad",
  subheadline: "He vivido la ansiedad en primera persona. Se lo que es despertarte con un nudo en el estomago sin saber por que. Y fue justamente ese dolor el que me llevo a entender la terapia desde las entranas.",
  badge: "500+ vidas transformadas",
  videoPlaceholderText: "Conoce a Estela en 2 minutos",
}

export const approachCards: ApproachCard[] = [
  {
    icon: "Ear",
    title: "Escucha activa",
    description: "No escucho para responder. Escucho para entender. Cada palabra tuya importa.",
  },
  {
    icon: "Heart",
    title: "Empatia real",
    description: "No finjo entender. Entiendo porque lo he vivido. Y eso cambia todo.",
  },
  {
    icon: "Shield",
    title: "Herramientas con evidencia",
    description: "TCC, EMDR y Mindfulness adaptados a ti, no sacados de un manual generico.",
  },
  {
    icon: "Sparkles",
    title: "Sin distancia clinica",
    description: "Aqui no hay bata blanca. Hay una persona real que te acompana de verdad.",
  },
]

export const storyPullQuotes: string[] = [
  "He vivido la ansiedad en primera persona. Se lo que es despertarte con un nudo en el estomago sin saber por que.",
  "Fue justamente ese dolor el que me llevo a entender la terapia no solo desde los libros, sino desde las entranas.",
]
