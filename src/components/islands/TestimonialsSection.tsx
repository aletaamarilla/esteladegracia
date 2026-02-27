import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Maria G.",
    text: "Encontrar a esta terapeuta cambio mi vida. Por primera vez, me senti verdaderamente escuchada y comprendida. La calidez y autenticidad en cada sesion hicieron toda la diferencia.",
    rating: 5,
    date: "hace 2 meses",
    source: "Resena Google",
    hasVideo: true,
  },
  {
    name: "Carlos R.",
    text: "Era esceptico sobre la terapia, pero la conexion genuina que encontre aqui me sorprendio. No se siente clinico para nada—solo conversaciones reales y honestas que ayudan.",
    rating: 5,
    date: "hace 1 mes",
    source: "Resena Google",
    hasVideo: true,
  },
  {
    name: "Ana L.",
    text: "Las sesiones de terapia grupal fueron transformadoras. Compartir con otros que entienden, guiados por una profesional tan compasiva, me dio herramientas que uso cada dia.",
    rating: 5,
    date: "hace 3 semanas",
    source: "Resena Google",
    hasVideo: false,
  },
  {
    name: "David M.",
    text: "Despues de anos de ansiedad frenandome, finalmente encontre a alguien que me ayudo a liberarme. El enfoque aqui es tan humano y cercano.",
    rating: 5,
    date: "hace 1 semana",
    source: "Resena Google",
    hasVideo: true,
  },
]

const avatarColors = ["bg-[#98465d]", "bg-[#9591eb]", "bg-[#98465d]", "bg-[#9591eb]"]

function TestimonialCardDesktop({ testimonial }: { testimonial: typeof testimonials[0] }) {
  return (
    <Card className="group hover-relief bg-white border-0 shadow-lg rounded-3xl overflow-hidden h-full">
      <CardContent className="p-6 md:p-8">
        <div className="flex items-center gap-1 mb-3">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 text-yellow-400" fill="#facc15" />
          ))}
        </div>

        <div className="relative mb-4">
          <Quote className="absolute -top-1 -left-1 w-6 h-6 text-[#cfcdff]" />
          <p className="text-[#5d5a5a] leading-relaxed pl-5 font-serif italic text-sm md:text-base">
            {testimonial.text}
          </p>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-[#f6f3f5]">
          <div>
            <p className="font-semibold text-[#5d5a5a] text-sm">{testimonial.name}</p>
            <p className="text-xs text-[#5d5a5a]/50">{testimonial.date}</p>
          </div>
          <span className="text-xs bg-[#f6f3f5] px-2 py-1 rounded-full text-[#5d5a5a]/60">
            {testimonial.source}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}

export default function TestimonialsSection() {
  const mobileTestimonials = testimonials.slice(0, 3)

  return (
    <section id="testimonials" className="py-14 md:py-20 lg:py-32 relative overflow-hidden">
      <div className="container mx-auto px-5 relative">
        <div className="text-center mb-8 md:mb-16">
          <span className="inline-block text-[#9591eb] font-medium mb-3 md:mb-4 tracking-wide uppercase text-sm">Testimonios</span>
          <h2 className="font-display text-2xl md:text-4xl lg:text-5xl text-[#5d5a5a] mb-3 md:mb-6 text-balance">
            Historias reales de{" "}
            <span className="text-[#98465d]">personas reales</span>
          </h2>
          <p className="text-sm md:text-lg text-[#5d5a5a]/70 max-w-2xl mx-auto">
            Cada testimonio refleja un camino unico de sanacion y crecimiento personal.
          </p>
        </div>

        {/* Mobile: stacked compact cards */}
        <div className="flex flex-col gap-4 md:hidden">
          {mobileTestimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm p-4 flex gap-3.5"
            >
              {/* Avatar */}
              <div className={`w-10 h-10 ${avatarColors[index]} rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 mt-0.5`}>
                {testimonial.name.charAt(0)}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                {/* Name + stars row */}
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-[#5d5a5a] text-sm">{testimonial.name}</span>
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-yellow-400" fill="#facc15" />
                    ))}
                  </div>
                </div>

                {/* Text */}
                <p className="text-[#5d5a5a]/75 text-[13px] leading-relaxed">
                  &ldquo;{testimonial.text}&rdquo;
                </p>

                {/* Meta */}
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[11px] text-[#5d5a5a]/40">{testimonial.date}</span>
                  <span className="text-[#cfcdff]">&middot;</span>
                  <span className="text-[11px] text-[#5d5a5a]/40">{testimonial.source}</span>
                </div>
              </div>
            </div>
          ))}

          {/* Link to see more */}
          <a
            href="/testimonios"
            className="text-center text-sm text-[#98465d] font-medium py-2 hover:underline underline-offset-4"
          >
            Ver todos los testimonios &rarr;
          </a>
        </div>

        {/* Desktop: grid */}
        <div className="hidden md:grid md:grid-cols-2 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCardDesktop key={index} testimonial={testimonial} />
          ))}
        </div>

        {/* Trust indicators */}
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 pt-6 md:pt-12 mt-6 md:mt-12 border-t border-[#cfcdff]/30">
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 md:w-5 h-4 md:h-5 text-yellow-400" fill="#facc15" />
              ))}
            </div>
            <span className="text-[#5d5a5a] font-medium text-sm md:text-base">4.9/5 en Google</span>
          </div>
          <div className="w-px h-5 bg-[#cfcdff]" />
          <span className="text-[#5d5a5a]/70 text-sm md:text-base">50+ resenas verificadas</span>
        </div>
      </div>
    </section>
  )
}
