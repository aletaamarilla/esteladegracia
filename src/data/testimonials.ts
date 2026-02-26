export interface Testimonial {
  name: string
  text: string
  rating: number
  date: string
  source: string
  hasVideo: boolean
  videoUrl?: string
  serviceType: "individual" | "group"
}

export const testimonials: Testimonial[] = [
  {
    name: "Maria G.",
    text: "Encontrar a esta terapeuta cambio mi vida. Por primera vez, me senti verdaderamente escuchada y comprendida. La calidez y autenticidad en cada sesion hicieron toda la diferencia.",
    rating: 5,
    date: "hace 2 meses",
    source: "Resena Google",
    hasVideo: true,
    videoUrl: "/videos/abrazo-1.mov",
    serviceType: "individual",
  },
  {
    name: "Carlos R.",
    text: "Era esceptico sobre la terapia, pero la conexion genuina que encontre aqui me sorprendio. No se siente clinico para nada—solo conversaciones reales y honestas que ayudan.",
    rating: 5,
    date: "hace 1 mes",
    source: "Resena Google",
    hasVideo: true,
    videoUrl: "/videos/abrazo-2.mov",
    serviceType: "individual",
  },
  {
    name: "Ana L.",
    text: "Las sesiones de terapia grupal fueron transformadoras. Compartir con otros que entienden, guiados por una profesional tan compasiva, me dio herramientas que uso cada dia.",
    rating: 5,
    date: "hace 3 semanas",
    source: "Resena Google",
    hasVideo: true,
    videoUrl: "/videos/abrazo-3.mov",
    serviceType: "group",
  },
  {
    name: "David M.",
    text: "Despues de anos de ansiedad frenandome, finalmente encontre a alguien que me ayudo a liberarme. El enfoque aqui es tan humano y cercano.",
    rating: 5,
    date: "hace 1 semana",
    source: "Resena Google",
    hasVideo: true,
    videoUrl: "/videos/abrazo-4.mov",
    serviceType: "individual",
  },
  {
    name: "Laura P.",
    text: "Llegue rota y sin esperanza. Hoy, despues de 6 meses de terapia, me reconozco otra vez. Estela no solo te escucha—te ve. Y eso lo cambia todo.",
    rating: 5,
    date: "hace 2 semanas",
    source: "Resena Google",
    hasVideo: true,
    videoUrl: "/videos/abrazo-5.mov",
    serviceType: "individual",
  },
  {
    name: "Sofia M.",
    text: "El grupo se convirtio en mi red de seguridad. Cada sesion era un paso mas hacia entenderme y quererme. Gracias por crear ese espacio tan bonito.",
    rating: 5,
    date: "hace 5 dias",
    source: "Resena Google",
    hasVideo: true,
    videoUrl: "/videos/abrazo-6.mov",
    serviceType: "group",
  },
]
